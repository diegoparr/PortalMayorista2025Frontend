<template>
  <button 
    class="mobile-menu-toggle" 
    @click="toggleSidebar"
    :class="{ 'active': isSidebarOpen }"
    aria-label="Toggle navigation menu"
  >
    <i class="fa" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
  </button>
</template>

<script>
export default {
  name: 'MobileMenuToggle',
  data() {
    return {
      isSidebarOpen: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      
      // Toggle sidebar class
      const sidebar = document.querySelector('.main-sidebar');
      const contentWrapper = document.querySelector('.content-wrapper');
      const overlay = document.querySelector('.sidebar-overlay');
      
      if (this.isSidebarOpen) {
        sidebar.classList.add('sidebar-open');
        contentWrapper.classList.add('sidebar-open');
        
        // Create overlay if it doesn't exist
        if (!overlay) {
          const overlayElement = document.createElement('div');
          overlayElement.className = 'sidebar-overlay show';
          overlayElement.addEventListener('click', this.closeSidebar);
          document.body.appendChild(overlayElement);
        } else {
          overlay.classList.add('show');
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        this.closeSidebar();
      }
    },
    
    closeSidebar() {
      this.isSidebarOpen = false;
      
      const sidebar = document.querySelector('.main-sidebar');
      const contentWrapper = document.querySelector('.content-wrapper');
      const overlay = document.querySelector('.sidebar-overlay');
      
      if (sidebar) {
        sidebar.classList.remove('sidebar-open');
      }
      
      if (contentWrapper) {
        contentWrapper.classList.remove('sidebar-open');
      }
      
      if (overlay) {
        overlay.classList.remove('show');
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
  },
  
  mounted() {
    // Close sidebar when route changes
    this.$router.afterEach(() => {
      this.closeSidebar();
    });
    
    // Close sidebar when window is resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
        this.closeSidebar();
      }
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (event) => {
      const sidebar = document.querySelector('.main-sidebar');
      const toggle = document.querySelector('.mobile-menu-toggle');
      
      if (this.isSidebarOpen && 
          !sidebar.contains(event.target) && 
          !toggle.contains(event.target)) {
        this.closeSidebar();
      }
    });
  },
  
  beforeDestroy() {
    // Clean up event listeners
    window.removeEventListener('resize', this.closeSidebar);
    document.removeEventListener('click', this.closeSidebar);
  }
}
</script>

<style scoped>
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1001;
  background: #ff6633;
  border: none;
  color: white;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: #e55a2b;
  transform: scale(1.05);
}

.mobile-menu-toggle:active {
  transform: scale(0.95);
}

.mobile-menu-toggle.active {
  background: #e55a2b;
  transform: rotate(90deg);
}

.mobile-menu-toggle i {
  transition: transform 0.3s ease;
}

.mobile-menu-toggle.active i {
  transform: rotate(180deg);
}

@media (max-width: 767px) {
  .mobile-menu-toggle {
    display: block;
  }
}

@media (min-width: 768px) {
  .mobile-menu-toggle {
    display: none !important;
  }
}
</style>
