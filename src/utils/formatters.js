/**
 * formatters.js
 * Funciones para formatear datos a nivel de presentación
 */

export const formatCurrency = (value) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '$0';
  }

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatQuantity = (value) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }
  
  return value.toLocaleString('es-CL');
};

export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return 'Fecha inválida';
  }
};

export const formatDateTime = (dateString) => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    const dateFormatted = date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    
    const timeFormatted = date.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    return `${dateFormatted} ${timeFormatted}`;
  } catch {
    return 'Fecha inválida';
  }
};

export const getStockStatus = (quantity) => {
  if (quantity === 0) {
    return { status: 'Agotado', color: '#182825' };
  } else if (quantity < 10) {
    return { status: 'Bajo', color: '#6D8EA0' };
  } else {
    return { status: 'Disponible', color: '#22AED1' };
  }
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};