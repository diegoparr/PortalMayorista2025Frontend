export default {
  // Configuración de API según el entorno
  getApiBaseUrl() {
    if (process.env.NODE_ENV === 'production') {
      // En producción, usar el proxy de Vercel
      return '';
    } else {
      // En desarrollo, usar la URL directa del backend
      //return 'http://82.25.91.192:8082';
      //return 'http://127.0.0.1:8000';
      return 'http://hipertiendaapi.test';
    }
  },

  // Configuración de headers según el entorno
  getApiHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // En producción, agregar headers específicos para CORS
    if (process.env.NODE_ENV === 'production') {
      headers['Origin'] = 'https://lahipertienda-fronted.vercel.app';
    }

    return headers;
  },

  // Función para construir URLs de API
  buildApiUrl(endpoint) {
    const baseUrl = this.getApiBaseUrl();
    if (baseUrl) {
      return `${baseUrl}/${endpoint}`;
    }
    return `/${endpoint}`;
  }
}; 