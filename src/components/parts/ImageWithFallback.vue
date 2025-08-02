<template>
  <img 
    :src="processedSrc" 
    :alt="alt"
    :class="imgClass"
    :style="imgStyle"
    @error="handleError"
    @load="handleLoad"
    v-bind="$attrs"
  />
</template>

<script>
import ImageHandler from '../../mixin/ImageHandler';

export default {
  name: 'ImageWithFallback',
  mixins: [ImageHandler],
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
    },
    imgStyle: {
      type: Object,
      default: () => ({})
    },
    fallbackSrc: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      hasError: false,
      processedSrc: ''
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(newSrc) {
        this.processImage(newSrc);
      }
    }
  },
  methods: {
    processImage(src) {
      if (!src) {
        this.processedSrc = this.fallbackSrc || this.defaultImage;
        return;
      }

      // Procesar la URL usando el mixin
      this.processedSrc = this.getImageUrl(src);
    },
    handleError(event) {
      console.log('Error cargando imagen:', event.target.src);
      this.hasError = true;
      
      // Si ya estamos usando la imagen por defecto, no hacer nada más
      if (event.target.src === this.defaultImage) {
        return;
      }
      
      // Usar fallback personalizado si está disponible, sino usar el default
      if (this.fallbackSrc && event.target.src !== this.fallbackSrc) {
        event.target.src = this.fallbackSrc;
      } else {
        event.target.src = this.defaultImage;
      }
      
      this.$emit('error', event);
    },
    handleLoad(event) {
      this.hasError = false;
      this.$emit('load', event);
    }
  }
}
</script> 