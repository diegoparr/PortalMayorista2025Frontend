import imageConfig from '../config/imageConfig';

export default {
  data() {
    return {
      defaultImage: imageConfig.defaultImage,
      obsoleteServers: imageConfig.obsoleteServers
    }
  },
  methods: {
    // Método para manejar URLs de imágenes
    getImageUrl(imageUrl) {
      const processedUrl = imageConfig.cleanUrl(imageUrl);
      return processedUrl;
    },
    
    // Método para manejar errores de carga de imágenes
    handleImageError(event) {
      if (event && event.target) {
        event.target.src = this.defaultImage;
      }
    },
    
    // Método para verificar si una imagen existe
    async checkImageExists(url) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    },
    
    // Método para obtener imagen con fallback
    async getImageWithFallback(imageUrl) {
      const processedUrl = this.getImageUrl(imageUrl);
      
      // Si ya es la imagen por defecto, la devolvemos
      if (processedUrl === this.defaultImage) {
        return this.defaultImage;
      }
      
      // Verificar si la imagen existe
      const exists = await this.checkImageExists(processedUrl);
      return exists ? processedUrl : this.defaultImage;
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