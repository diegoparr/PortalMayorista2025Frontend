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
        // Manejar errores de CORS
        if (response.status === 0 || response.status === 404) {
          console.warn('CORS error detected, trying alternative approach');
          // Intentar con URL completa si es necesario
          if (request.url && !request.url.startsWith('http')) {
            request.url = `http://82.25.91.192:8082${request.url}`;
          }
        }
        return response;
      });
    });
  }
}; 