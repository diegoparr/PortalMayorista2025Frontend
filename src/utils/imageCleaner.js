import imageConfig from '../config/imageConfig';

/**
 * Utilidad para limpiar URLs de imágenes obsoletas
 */
export default class ImageCleaner {
  
  /**
   * Limpia una URL de imagen individual
   * @param {string} url - URL de la imagen a limpiar
   * @returns {string} - URL limpia o imagen por defecto
   */
  static cleanImageUrl(url) {
    return imageConfig.cleanUrl(url);
  }
  
  /**
   * Limpia un array de URLs de imágenes
   * @param {Array} urls - Array de URLs a limpiar
   * @returns {Array} - Array de URLs limpias
   */
  static cleanImageUrls(urls) {
    if (!Array.isArray(urls)) return [];
    
    return urls.map(url => this.cleanImageUrl(url));
  }
  
  /**
   * Limpia URLs de imágenes en un objeto de datos
   * @param {Object} data - Objeto con datos que contienen URLs de imágenes
   * @param {Array} imageFields - Array de nombres de campos que contienen URLs de imágenes
   * @returns {Object} - Objeto con URLs limpias
   */
  static cleanDataImages(data, imageFields = ['v_logo', 'v_portada', 'v_imagen', 'v_avatar']) {
    if (!data || typeof data !== 'object') return data;
    
    const cleanedData = { ...data };
    
    imageFields.forEach(field => {
      if (cleanedData[field]) {
        cleanedData[field] = this.cleanImageUrl(cleanedData[field]);
      }
    });
    
    return cleanedData;
  }
  
  /**
   * Limpia URLs de imágenes en un array de objetos
   * @param {Array} dataArray - Array de objetos con datos
   * @param {Array} imageFields - Array de nombres de campos que contienen URLs de imágenes
   * @returns {Array} - Array de objetos con URLs limpias
   */
  static cleanArrayImages(dataArray, imageFields = ['v_logo', 'v_portada', 'v_imagen', 'v_avatar']) {
    if (!Array.isArray(dataArray)) return [];
    
    return dataArray.map(item => this.cleanDataImages(item, imageFields));
  }
  
  /**
   * Verifica si una URL necesita ser limpiada
   * @param {string} url - URL a verificar
   * @returns {boolean} - true si la URL es obsoleta
   */
  static needsCleaning(url) {
    return imageConfig.isObsoleteUrl(url);
  }
  
  /**
   * Obtiene estadísticas de limpieza de URLs
   * @param {Array} urls - Array de URLs a analizar
   * @returns {Object} - Estadísticas de limpieza
   */
  static getCleaningStats(urls) {
    if (!Array.isArray(urls)) return { total: 0, obsolete: 0, clean: 0 };
    
    const stats = {
      total: urls.length,
      obsolete: 0,
      clean: 0
    };
    
    urls.forEach(url => {
      if (this.needsCleaning(url)) {
        stats.obsolete++;
      } else {
        stats.clean++;
      }
    });
    
    return stats;
  }
  
  /**
   * Genera un reporte de limpieza
   * @param {Array} dataArray - Array de datos a analizar
   * @param {Array} imageFields - Campos de imagen a verificar
   * @returns {Object} - Reporte de limpieza
   */
  static generateCleaningReport(dataArray, imageFields = ['v_logo', 'v_portada', 'v_imagen', 'v_avatar']) {
    if (!Array.isArray(dataArray)) {
      return { error: 'Data must be an array' };
    }
    
    const report = {
      totalItems: dataArray.length,
      fieldsAnalyzed: imageFields,
      fieldStats: {},
      totalObsoleteUrls: 0,
      totalCleanUrls: 0
    };
    
    // Inicializar estadísticas por campo
    imageFields.forEach(field => {
      report.fieldStats[field] = { total: 0, obsolete: 0, clean: 0 };
    });
    
    // Analizar cada item
    dataArray.forEach(item => {
      imageFields.forEach(field => {
        if (item[field]) {
          report.fieldStats[field].total++;
          
          if (this.needsCleaning(item[field])) {
            report.fieldStats[field].obsolete++;
            report.totalObsoleteUrls++;
          } else {
            report.fieldStats[field].clean++;
            report.totalCleanUrls++;
          }
        }
      });
    });
    
    return report;
  }
} 