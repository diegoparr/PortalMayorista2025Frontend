<template>
  <img 
    :src="processedSrc" 
    :alt="alt" 
    :class="imgClass"
    @error="handleImageError"
    @load="handleImageLoad"
    v-bind="$attrs"
  />
</template>

<script>
import imageConfig from '../../config/imageConfig';

export default {
  name: 'ImageWithFallback',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: 'Imagen'
    },
    imgClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      processedSrc: '',
      hasError: false
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(newSrc) {
        this.processImageUrl(newSrc);
      }
    }
  },
  methods: {
    processImageUrl(url) {
      if (!url) {
        this.processedSrc = imageConfig.defaultImage;
        return;
      }

      // Usar la función de limpieza centralizada
      this.processedSrc = imageConfig.cleanUrl(url);
    },

    handleImageError(event) {
      console.warn('Image failed to load:', event.target.src);
      this.hasError = true;
      event.target.src = imageConfig.defaultImage;
    },

    handleImageLoad(event) {
      this.hasError = false;
      this.$emit('load', event);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style> 