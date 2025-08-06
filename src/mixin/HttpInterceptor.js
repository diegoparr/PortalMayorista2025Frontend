import ApiConfig from '../config/apiConfig';

export default {
  created() {
    // Configurar interceptor para peticiones
    this.$http.interceptors.push((request, next) => {
      // Agregar headers específicos para producción
      if (process.env.NODE_ENV === 'production') {
        request.headers.set('Origin', 'https://lahipertienda-fronted.vercel.app');
      }
      
      next((response) => {
        // Manejar errores de CORS solo en desarrollo
        if (process.env.NODE_ENV !== 'production' && (response.status === 0 || response.status === 404)) {
          console.warn('CORS error detected in development, trying alternative approach');
          // Solo en desarrollo, intentar con URL completa si es necesario
          if (request.url && !request.url.startsWith('http')) {
            request.url = `http://127.0.0.1:8000${request.url}`;
          }
        }
        return response;
      });
    });
  }
}; 