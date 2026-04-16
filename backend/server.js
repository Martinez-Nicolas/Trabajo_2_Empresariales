import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./inventario.db');

const runQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function onRun(error) {
    if (error) {
      reject(error);
      return;
    }
    resolve({ id: this.lastID, changes: this.changes });
  });
});

const allQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (error, rows) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(rows);
  });
});

const getQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (error, row) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(row);
  });
});

const initializeDatabase = async () => {
  await runQuery(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      price REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  await runQuery(`
    CREATE TABLE IF NOT EXISTS movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('entrada', 'salida')),
      quantity INTEGER NOT NULL,
      reason TEXT NOT NULL,
      reference TEXT,
      previous_quantity INTEGER NOT NULL,
      new_quantity INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);
};

app.get('/api/health', async (_req, res) => {
  try {
    const productCount = await getQuery('SELECT COUNT(*) as count FROM products');
    const movementCount = await getQuery('SELECT COUNT(*) as count FROM movements');
    res.json({
      status: 'ok',
      products: productCount?.count || 0,
      movements: movementCount?.count || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', async (_req, res) => {
  try {
    const rows = await allQuery('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getQuery('SELECT * FROM products WHERE id = ?', [id]);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { code, name, quantity = 0, price = 0 } = req.body;

    if (!code || !name) {
      res.status(400).json({ error: 'Code y name son obligatorios' });
      return;
    }

    const now = new Date().toISOString();
    const result = await runQuery(
      'INSERT INTO products (code, name, quantity, price, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [code.trim(), name.trim(), Number(quantity), Number(price), now, now]
    );

    const created = await getQuery('SELECT * FROM products WHERE id = ?', [result.id]);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, quantity, price } = req.body;

    const existing = await getQuery('SELECT * FROM products WHERE id = ?', [id]);
    if (!existing) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const now = new Date().toISOString();
    await runQuery(
      `
      UPDATE products
      SET code = ?, name = ?, quantity = ?, price = ?, updated_at = ?
      WHERE id = ?
      `,
      [
        code ?? existing.code,
        name ?? existing.name,
        quantity ?? existing.quantity,
        price ?? existing.price,
        now,
        id
      ]
    );

    const updated = await getQuery('SELECT * FROM products WHERE id = ?', [id]);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM movements WHERE product_id = ?', [id]);
    const deleted = await runQuery('DELETE FROM products WHERE id = ?', [id]);

    if (!deleted.changes) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/movements', async (_req, res) => {
  try {
    const rows = await allQuery(
      `
      SELECT m.*, p.code as productCode, p.name as productName
      FROM movements m
      INNER JOIN products p ON p.id = m.product_id
      ORDER BY m.created_at DESC
      `
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/movements', async (req, res) => {
  try {
    const { productId, type, quantity, reason, reference = '' } = req.body;
    const normalizedProductId = Number(productId);
    const normalizedQuantity = Number(quantity);

    if (!normalizedProductId || !type || !normalizedQuantity || !reason) {
      res.status(400).json({ error: 'Faltan campos requeridos' });
      return;
    }

    const product = await getQuery('SELECT * FROM products WHERE id = ?', [normalizedProductId]);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const qty = normalizedQuantity;
    const delta = type === 'entrada' ? qty : -qty;
    const newQuantity = product.quantity + delta;

    if (newQuantity < 0) {
      res.status(400).json({ error: 'Stock insuficiente para salida' });
      return;
    }

    const now = new Date().toISOString();

    await runQuery('UPDATE products SET quantity = ?, updated_at = ? WHERE id = ?', [newQuantity, now, normalizedProductId]);

    const movement = await runQuery(
      `
      INSERT INTO movements (product_id, type, quantity, reason, reference, previous_quantity, new_quantity, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [normalizedProductId, type, qty, reason.trim(), reference.trim(), product.quantity, newQuantity, now]
    );

    const created = await getQuery('SELECT * FROM movements WHERE id = ?', [movement.id]);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend inventario escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error inicializando base de datos:', error.message);
    process.exit(1);
  });
