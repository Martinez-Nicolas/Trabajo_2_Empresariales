/**
 * formatters.js
 * Funciones para formatear datos a nivel de presentación
 */

export const formatCurrency = (value, currency = '$') => {
  if (typeof value !== 'number' || isNaN(value)) {
    return `${currency}0.00`;
  }
  
  return `${currency}${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
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
  } catch (error) {
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
  } catch (error) {
    return 'Fecha inválida';
  }
};

export const getStockStatus = (quantity) => {
  if (quantity === 0) {
    return { status: 'Agotado', color: '#E74C3C' };
  } else if (quantity < 10) {
    return { status: 'Bajo', color: '#F39C12' };
  } else {
    return { status: 'Disponible', color: '#27AE60' };
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