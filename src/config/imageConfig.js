export default {
  // URLs base para diferentes entornos
  baseUrls: {
    development: 'http://127.0.0.1:8000',
    production: '', // Usar proxy de Vercel en producción
    staging: 'https://staging.tu-dominio.com'
  },
  
  // URLs del backend para detección de URLs absolutas
  backendUrls: {
    development: ['http://127.0.0.1:8000', 'https://127.0.0.1:8000'],
    production: ['http://82.25.91.192:8082', 'https://82.25.91.192:8082'],
    staging: ['https://staging.tu-dominio.com']
  },
  
  // Servidores obsoletos que ya no existen
  obsoleteServers: [
    'lahipertienda.com:7443',
    'lahipertienda.com',
    'via.placeholder.com'
  ],
  
  // Rutas de imágenes por tipo
  imagePaths: {
    logos: '/images/logos/',
    portadas: '/images/portadas/',
    productos: '/images/productos/',
    avatars: '/images/avatars/',
    slider: '/images/slider/',
    rut: '/images/rut/',
    camara_comercios: '/images/camara_comercios/',
    contratos: '/images/contratos/',
    catalogo: '/images/catalogo/'
  },
  
  // Imagen por defecto (SVG base64)
  defaultImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNjBDMTE2LjU2OSA2MCAxMzAgNzMuNDMxIDEzMCA5MEMxMzAgMTA2LjU2OSAxMTYuNTY5IDEyMCAxMDAgMTIwQzgzLjQzMSAxMjAgNzAgMTA2LjU2OSA3MCA5MEM3MCA3My40MzEgODMuNDMxIDYwIDEwMCA2MFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPHBhdGggZD0iTTEwMCAxNDBDMTE2LjU2OSAxNDAgMTMwIDEzMy41NjkgMTMwIDEyMEMxMzAgMTA2LjQzMSAxMTYuNTY5IDEwMCAxMDAgMTAwQzgzLjQzMSAxMDAgNzAgMTA2LjQzMSA3MCAxMjBDNzAgMTMzLjU2OSA4My40MzEgMTQwIDEwMCAxNDBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo=',
  
  // Función para obtener la URL base según el entorno
  getBaseUrl() {
    const env = process.env.NODE_ENV || 'development';
    return this.baseUrls[env] || this.baseUrls.development;
  },
  
  // Función para verificar si una URL es obsoleta
  isObsoleteUrl(url) {
    if (!url) return true;
    
    const isObsolete = this.obsoleteServers.some(server => 
      url.includes(server)
    );
    return isObsolete;
  },
  
  // Función para verificar si una URL es del backend
  isBackendUrl(url) {
    if (!url) return false;
    
    const env = process.env.NODE_ENV || 'development';
    const backendUrls = this.backendUrls[env] || this.backendUrls.development;
    
    return backendUrls.some(backendUrl => url.startsWith(backendUrl));
  },

  // Función para limpiar URLs obsoletas
  cleanUrl(url) {
    if (!url || this.isObsoleteUrl(url)) {
      return this.defaultImage;
    }
    
    // Si es una URL completa válida, manejarla según el entorno
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (this.isBackendUrl(url)) {
        if (process.env.NODE_ENV === 'production') {
          // En producción, convertir URLs absolutas del backend a relativas para usar el proxy
          const urlObj = new URL(url);
          return urlObj.pathname;
        }
        // En desarrollo, mantener la URL tal como está
        return url;
      }
      // Si no es del backend, mantener la URL tal como está
      return url;
    }
    
    // Si es una ruta relativa, construir la URL completa
    if (url.startsWith('/')) {
      const fullUrl = this.getBaseUrl() + url;
      return fullUrl;
    }
    
    // Si no tiene protocolo, asumir que es relativa
    const fullUrl = this.getBaseUrl() + '/' + url;
    return fullUrl;
  },
  
  // Función para generar URL de imagen por tipo
  getImageUrlByType(type, filename) {
    if (!filename) return this.defaultImage;
    
    const baseUrl = this.getBaseUrl();
    const path = this.imagePaths[type] || '/images/';
    
    return baseUrl + path + filename;
  }
}; 