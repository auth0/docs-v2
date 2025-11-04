/**
 * Dynamic Navbar Controller
 * Controls the opacity state of the navbar based on scroll position
 */

class NavbarController {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.scrollThreshold = 50; // Pixels to scroll before making navbar opaque
    this.isOpaque = false;
    
    if (!this.navbar) {
      console.warn('Navbar element not found');
      return;
    }
    
    this.init();
  }
  
  init() {
    // Set initial state
    this.setOpacity(false);
    
    // Listen to scroll events with throttling for performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateOpacity();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also check on page load
    this.updateOpacity();
  }
  
  updateOpacity() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const shouldBeOpaque = scrollY > this.scrollThreshold;
    
    if (shouldBeOpaque !== this.isOpaque) {
      this.setOpacity(shouldBeOpaque);
    }
  }
  
  setOpacity(opaque) {
    this.isOpaque = opaque;
    this.navbar.setAttribute('data-is-opaque', opaque.toString());
    
    // Optional: Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('navbar-opacity-change', {
      detail: { isOpaque: opaque }
    }));
  }
  
  // Public methods for manual control
  makeOpaque() {
    this.setOpacity(true);
  }
  
  makeTransparent() {
    this.setOpacity(false);
  }
  
  toggle() {
    this.setOpacity(!this.isOpaque);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.navbarController = new NavbarController();
});

// Also expose for manual control
window.NavbarController = NavbarController;
