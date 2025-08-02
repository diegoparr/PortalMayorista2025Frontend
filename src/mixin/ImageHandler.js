import imageConfig from '../config/imageConfig';

export default {
  methods: {
    // Función para procesar URLs de imágenes
    processImageUrl(url) {
      if (!url) return imageConfig.defaultImage;
      
      // Si es una URL absoluta del backend, convertirla a relativa en producción
      if (url.startsWith('http://82.25.91.192:8082/') || url.startsWith('https://82.25.91.192:8082/')) {
        if (process.env.NODE_ENV === 'production') {
          // Extraer solo la ruta para usar el proxy de Vercel
          const urlObj = new URL(url);
          return urlObj.pathname;
        }
      }
      
      // Usar la función de limpieza existente
      return imageConfig.cleanUrl(url);
    },

    // Función getImageUrl que usan los componentes
    getImageUrl(url) {
      if (!url) return imageConfig.defaultImage;
      
      // Si es una URL absoluta del backend, convertirla a relativa en producción
      if (url.startsWith('http://82.25.91.192:8082/') || url.startsWith('https://82.25.91.192:8082/') || 
          url.startsWith('http://127.0.0.1:8000/') || url.startsWith('https://127.0.0.1:8000/')) {
        if (process.env.NODE_ENV === 'production') {
          // Extraer solo la ruta para usar el proxy de Vercel
          const urlObj = new URL(url);
          return urlObj.pathname;
        }
      }
      
      // Usar la función de limpieza existente
      return imageConfig.cleanUrl(url);
    },

    // Función para manejar errores de imagen
    handleImageError(event) {
      console.warn('Image failed to load:', event.target.src);
      event.target.src = imageConfig.defaultImage;
    },

    // Función para verificar si una imagen existe
    async checkImageExists(url) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        console.warn('Error checking image:', url, error);
        return false;
      }
    },
    
    // Método para obtener imagen con fallback
    async getImageWithFallback(imageUrl) {
      const processedUrl = this.processImageUrl(imageUrl);
      
      // Si ya es la imagen por defecto, la devolvemos
      if (processedUrl === imageConfig.defaultImage) {
        return imageConfig.defaultImage;
      }
      
      // Verificar si la imagen existe
      const exists = await this.checkImageExists(processedUrl);
      return exists ? processedUrl : imageConfig.defaultImage;
    },
    
    // Método para obtener URL de imagen por tipo
    getImageUrlByType(type, filename) {
      return imageConfig.getImageUrlByType(type, filename);
    },
    
    // Método para verificar si una URL es obsoleta
    isObsoleteUrl(url) {
      return imageConfig.isObsoleteUrl(url);
    }
  }
} 