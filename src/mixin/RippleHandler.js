export default {
  methods: {
    clearRippleEffects() {
      // Limpiar todos los efectos ripple activos de forma más segura
      try {
        const rippleElements = document.querySelectorAll('.v-ripple__container');
        rippleElements.forEach(element => {
          if (element && element.parentNode) {
            try {
              // Verificar que el elemento sigue siendo hijo del padre antes de eliminarlo
              if (element.parentNode.contains(element)) {
                element.parentNode.removeChild(element);
              }
            } catch (e) {
              // Ignorar errores si el elemento ya no existe
              console.log('Elemento ripple ya eliminado o no es hijo válido');
            }
          }
        });
        
        // También limpiar elementos ripple que puedan estar en proceso de eliminación
        setTimeout(() => {
          try {
            const remainingRipples = document.querySelectorAll('.v-ripple__container');
            remainingRipples.forEach(element => {
              if (element && element.parentNode) {
                try {
                  if (element.parentNode.contains(element)) {
                    element.parentNode.removeChild(element);
                  }
                } catch (e) {
                  // Ignorar errores
                }
              }
            });
          } catch (e) {
            // Ignorar errores
          }
        }, 50);
      } catch (e) {
        console.log('Error al limpiar efectos ripple:', e);
      }
    },
    
    clearRippleEffectsDelayed(delay = 100) {
      // Limpiar efectos ripple después de un delay
      setTimeout(() => {
        this.clearRippleEffects();
      }, delay);
    },
    
    safeModalClose() {
      // Cerrar modal de forma segura limpiando efectos ripple
      this.clearRippleEffects();
      
      // Cerrar el modal de Bootstrap de forma segura
      try {
        const modal = document.getElementById('modal');
        if (modal) {
          $(modal).modal('hide');
        }
      } catch (e) {
        console.log('Error al cerrar modal:', e);
      }
      
      // Limpiar efectos ripple restantes después de un delay
      setTimeout(() => {
        this.clearRippleEffects();
      }, 200);
    },
    
    disableRippleOnButtons() {
      // Deshabilitar efectos ripple en botones específicos
      try {
        const buttons = document.querySelectorAll('button, .v-btn');
        buttons.forEach(button => {
          if (button.classList.contains('v-btn')) {
            button.setAttribute('data-no-ripple', 'true');
          }
        });
      } catch (e) {
        console.log('Error al deshabilitar ripple en botones:', e);
      }
    },
    
    enableRippleOnButtons() {
      // Habilitar efectos ripple en botones
      try {
        const buttons = document.querySelectorAll('button[data-no-ripple], .v-btn[data-no-ripple]');
        buttons.forEach(button => {
          button.removeAttribute('data-no-ripple');
        });
      } catch (e) {
        console.log('Error al habilitar ripple en botones:', e);
      }
    },
    
    // Nuevo método para manejar clics en botones de forma segura
    safeButtonClick(callback, delay = 50) {
      // Limpiar efectos ripple antes de ejecutar la acción
      this.clearRippleEffects();
      
      // Ejecutar la acción después de un pequeño delay
      setTimeout(() => {
        if (typeof callback === 'function') {
          callback();
        }
      }, delay);
    },
    
    // Método para prevenir errores de ripple en modales
    setupModalRippleHandling() {
      // Escuchar eventos de apertura y cierre de modales
      $(document).on('show.bs.modal', () => {
        this.clearRippleEffects();
      });
      
      $(document).on('hidden.bs.modal', () => {
        this.clearRippleEffectsDelayed(100);
      });
    },
    
    // Método para deshabilitar ripple en botones específicos de forma permanente
    disableRippleOnSpecificButtons() {
      try {
        // Deshabilitar ripple en botones de editar, mostrar y eliminar
        const buttons = document.querySelectorAll('.v-btn[color="primary"], .v-btn[color="info"], .v-btn[color="error"]');
        buttons.forEach(button => {
          if (button.classList.contains('v-btn')) {
            button.setAttribute('data-no-ripple', 'true');
            // También agregar estilo CSS para deshabilitar ripple
            button.style.setProperty('--v-ripple-opacity', '0');
          }
        });
      } catch (e) {
        console.log('Error al deshabilitar ripple en botones específicos:', e);
      }
    },
    
    // Método para aplicar estilos CSS que deshabiliten ripple
    applyRippleDisableStyles() {
      try {
        const style = document.createElement('style');
        style.textContent = `
          .v-btn[data-no-ripple] .v-ripple__container {
            display: none !important;
          }
          .v-btn[data-no-ripple] .v-ripple__animation {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
      } catch (e) {
        console.log('Error al aplicar estilos de ripple:', e);
      }
    }
  },
  
  mounted() {
    // Configurar manejo de ripple para modales cuando el componente se monta
    this.setupModalRippleHandling();
  }
} 