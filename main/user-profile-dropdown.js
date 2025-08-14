(function() {
  let dropdownElement = null;
  let observer = null;
  let clickOutsideHandler = null;
  let isDesktop = false;

  // [TODO]: get tenants from user object, this is just for testing
  const TENANTS = [
    {
      name: 'dev-aiwjcme3i3zhgur5',
      region: 'US-5',
      flag: 'US',
      selected: true
    },
    {
      name: 'prod-xyz9876543210abc',
      region: 'EU-1',
      flag: 'EU',
      selected: false
    },
    {
      name: 'staging-def4567890123ghi',
      region: 'US-2',
      flag: 'US',
      selected: false
    },
    {
      name: 'test-jkl1234567890mno',
      region: 'AP-1',
      flag: 'AP',
      selected: false
    },
    {
      name: 'demo-pqr5678901234stu',
      region: 'EU-2',
      flag: 'EU',
      selected: false
    },
    {
      name: 'dev-vwx9012345678yza',
      region: 'US-3',
      flag: 'US',
      selected: false
    },
    {
      name: 'beta-bcd3456789012efg',
      region: 'AP-2',
      flag: 'AP',
      selected: false
    },
    {
      name: 'sandbox-hij6789012345klm',
      region: 'EU-3',
      flag: 'EU',
      selected: false
    },
    {
      name: 'enterprise-nop0123456789qrs',
      region: 'US-1',
      flag: 'US',
      selected: false
    },
    {
      name: 'preview-tuv3456789012wxy',
      region: 'AP-3',
      flag: 'AP',
      selected: false
    }
  ];

  function generateTenantListHTML() {
    return TENANTS.map(tenant => {
      const checkIcon = tenant.selected ? '<div class="dropdown-action-icon icon-check"></div>' : '';
      const selectedClass = tenant.selected ? ' selected' : '';
      
      return `
        <button class="tenant-item${selectedClass}" onclick="selectTenant('${tenant.name}')">
          <div class="tenant-item-details">
            <p class="tenant-item-name">${tenant.name}</p>
            <div class="tenant-item-region">
              <div class="tenant-item-flag">${tenant.flag}</div>
              <p class="tenant-item-region-text">${tenant.region}</p>
            </div>
          </div>
          ${checkIcon}
        </button>
      `;
    }).join('');
  }

  function initializeUserDropdown() {
    const navbarLink = document.querySelector('.navbar-link');
    if (!navbarLink) return;
    
    const navbar = navbarLink.parentElement;
    if (!navbar) return;

    const existingDropdown = navbar.querySelector('.user-profile-dropdown');
    if (existingDropdown) {
      dropdownElement = existingDropdown;
      
      const button = existingDropdown.querySelector('.user-profile-button');
      if (button) {
        button.replaceWith(button.cloneNode(true));
        const newButton = existingDropdown.querySelector('.user-profile-button');
        newButton.addEventListener('click', function(event) {
          event.stopPropagation();
          toggleDropdown();
        });
      }
      
      existingDropdown.addEventListener('click', function(event) {
        const dropdownMenu = existingDropdown.querySelector('.dropdown-menu');
        if (dropdownMenu && dropdownMenu.contains(event.target)) {
          event.stopPropagation();
        }
      });
      
      checkAuthenticationState();
      return;
    }

    createUserDropdown(navbar);
    
    checkAuthenticationState();
  }

  function checkIsDesktop() {
    return window.innerWidth >= 1024;
  }

  function updateDesktopState() {
    const currentIsDesktop = checkIsDesktop();
    const hasChanged = currentIsDesktop !== isDesktop;
    isDesktop = currentIsDesktop;
    return hasChanged;
  }

  function createUserDropdownDesktop(navbar, dropdownContainer) {
    const topbarCtaButton = navbar.querySelector('#topbar-cta-button');
    
    // Ensure desktop classes are set
    dropdownContainer.classList.add('navbar-link');
    dropdownContainer.classList.remove('mobile-user-dropdown');
    
    if (topbarCtaButton) {
      navbar.insertBefore(dropdownContainer, topbarCtaButton);
    } else {
      navbar.appendChild(dropdownContainer);
    }
  }
  
  function createUserDropdownMobile(dropdownContainer) {
    const searchBarMobile = document.querySelector('#search-bar-entry-mobile');
    const mobileContainer = searchBarMobile ? searchBarMobile.parentElement : null;
    
    if (mobileContainer) {
      // Check if dropdown already exists in mobile container
      const existingMobileDropdown = mobileContainer.querySelector('.user-profile-dropdown, .mobile-user-dropdown');
      if (existingMobileDropdown) {
        dropdownElement = existingMobileDropdown;
        return true; // Signal that we're using existing dropdown
      }
      
      // Set mobile classes
      dropdownContainer.classList.remove('navbar-link');
      dropdownContainer.classList.add('mobile-user-dropdown');
      
      mobileContainer.insertBefore(dropdownContainer, mobileContainer.firstChild);
      return false; // Signal that we created new dropdown
    }
    return false;
  }


  function createUserDropdown(navbar) {
    const dropdownContainer = document.createElement('li');
    dropdownContainer.className = 'user-profile-dropdown navbar-link';

    // [TODO]: Implement "Switch tenant" functionality
    // [TODO]: get "tenant-flag" from user object
    dropdownContainer.innerHTML = `
      <div class="user-profile-loading">
        <div class="loading-spinner"></div>
      </div>
      <button class="user-profile-button" style="display: none;">
        <div class="user-avatar"></div>
        <span class="user-name"></span>
        <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="dropdown-menu">
        <div class="dropdown-header">
          <div class="dropdown-user-info">
            <div class="dropdown-user-avatar"></div>
            <div class="dropdown-user-details">
              <h3 class="user-display-name"></h3>
              <button class="view-profile-btn">View profile</button>
            </div>
          </div>
          <div class="dropdown-tenant-info">
            <div class="tenant-flag">US</div>
            <div class="tenant-details">
              <span class="tenant-name"></span>
            </div>
          </div>
        </div>
        <div class="dropdown-actions">
          <button class="dropdown-action" onclick="window.open('https://manage.auth0.com', '_blank')">
            <div class="dropdown-action-icon icon-dashboard"></div>
            <span>Open Dashboard</span>
          </button>
          <button class="dropdown-action tenant-switcher-toggle" onclick="toggleTenantList(event)">
            <div class="dropdown-action-icon icon-refresh"></div>
            <span>Switch tenant</span>
            <div class="dropdown-action-icon icon-chevron-down ml-auto"></div>
          </button>
          <div class="tenant-list">
            ${generateTenantListHTML()}
          </div>
          <div class="dropdown-divider"></div>
          <button class="dropdown-action" onclick="window.authService.logout()">
            <div class="dropdown-action-icon icon-logout"></div>
            <span>Logout</span>
          </button>
        </div>
      </div>
    `;

    const button = dropdownContainer.querySelector('.user-profile-button');
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleDropdown();
    });

    if (clickOutsideHandler) {
      document.removeEventListener('click', clickOutsideHandler);
    }
    clickOutsideHandler = function(event) {
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('click', clickOutsideHandler);
    
    dropdownContainer.addEventListener('click', function(event) {
      const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
      if (dropdownMenu && dropdownMenu.contains(event.target)) {
        event.stopPropagation();
      }
    });

    if (isDesktop) {
      createUserDropdownDesktop(navbar, dropdownContainer);
    } else {
      const usingExisting = createUserDropdownMobile(dropdownContainer);
      if (usingExisting) {
        return; 
      }
    }

    dropdownElement = dropdownContainer;
  }

  function toggleDropdown() {
    if (!dropdownElement) {
      console.warn('Dropdown element not found');
      return;
    }
    
    const isOpen = dropdownElement.classList.contains('open');
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function openDropdown() {
    if (!dropdownElement) return;
    dropdownElement.classList.add('open');
  }

  function closeTenantList() {
    if (!dropdownElement) return;
    
    const tenantList = dropdownElement.querySelector('.tenant-list');
    const chevron = dropdownElement.querySelector('.tenant-switcher-toggle .icon-chevron-down');
    
    if (tenantList && tenantList.classList.contains('expanded')) {
      tenantList.classList.remove('expanded');
      if (chevron) {
        chevron.style.transform = 'rotate(0deg)';
      }
    }
  }

  function closeDropdown() {
    if (!dropdownElement) return;
    dropdownElement.classList.remove('open');
    
    closeTenantList();
  }

  async function checkAuthenticationState() {
    try {
      await window.authService.getAuthStatus();
      
      if (window.authService.isAuthenticated) {
        showAuthenticatedState();
      } else {
        showUnauthenticatedState();
      }
    } catch (error) {
      console.error('Failed to check authentication state:', error);
      showUnauthenticatedState();
    }
  }

  function showAuthenticatedState() {
    if (!dropdownElement) return;

    const user = window.authService.user;
    if (!user) return;

    document.body.classList.add('authenticated');

    const loadingEl = dropdownElement.querySelector('.user-profile-loading');
    loadingEl.style.display = 'none';

    const buttonEl = dropdownElement.querySelector('.user-profile-button');
    buttonEl.style.display = 'flex';
    const avatarEl = dropdownElement.querySelector('.user-avatar');
    const nameEl = dropdownElement.querySelector('.user-name');
    const dropdownAvatarEl = dropdownElement.querySelector('.dropdown-user-avatar');
    const displayNameEl = dropdownElement.querySelector('.user-display-name');
    const viewProfileBtn = dropdownElement.querySelector('.view-profile-btn');
    const tenantNameEl = dropdownElement.querySelector('.tenant-name');

    const displayName = user.name || user.email;
    const avatarLetter = displayName ? displayName.charAt(0).toUpperCase() : 'U';
    if (user.picture) {
      avatarEl.innerHTML = `<img src="${user.picture}" alt="${displayName}" class="avatar-img">`;
      dropdownAvatarEl.innerHTML = `<img src="${user.picture}" alt="${displayName}" class="avatar-img">`;
    } else {
      avatarEl.textContent = avatarLetter;
      dropdownAvatarEl.textContent = avatarLetter;
    }
    nameEl.textContent = displayName;
    displayNameEl.textContent = displayName;
    
    viewProfileBtn.addEventListener('click', function() {
      // [TODO]: Add user profile URL
      console.log('View profile clicked');
    });
    
    // [TODO]: get "tenant-name" from user object
    tenantNameEl.textContent = 'dev-aiwjcme3i3zhgur5';
  }

  function showUnauthenticatedState() {
    document.body.classList.remove('authenticated');

    if (!dropdownElement) return;

    const loadingEl = dropdownElement.querySelector('.user-profile-loading');
    const buttonEl = dropdownElement.querySelector('.user-profile-button');
    
    loadingEl.style.display = 'none';
    buttonEl.style.display = 'none';
  }


  function replaceLoginButton() {
    const loginLinks = document.querySelectorAll('a[href*="auth0.com/login"]');
    const signupLinks = document.querySelectorAll('a[href*="auth0.com/signup"]');
    
    loginLinks.forEach(loginLink => {
      if (!loginLink.hasAttribute('data-replaced')) {
        const loginLi = loginLink.closest('li');
        if (loginLi) {
          loginLi.classList.add('navbar-link-login');
        }
      }
    });

    loginLinks.forEach(loginLink => {
      loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.authService.login();
        loginLink.setAttribute('data-replaced', 'true');
      });
    });
    
    signupLinks.forEach(signupLink => {
      if (!signupLink.hasAttribute('data-replaced')) {
        const signupLi = signupLink.closest('li');
        if (signupLi) {
        signupLi.classList.add('navbar-link-signup');
      }
        signupLink.setAttribute('data-replaced', 'true');
      }
    });
  }


  function setupDOMObserver() {
    if (observer) {
      observer.disconnect();
    }

    observer = new MutationObserver(function(mutations) {
      let shouldReinitialize = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.querySelector && node.querySelector('.navbar-link')) {
                shouldReinitialize = true;
              }
            }
          });
          
          mutation.removedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE && node === dropdownElement) {
              dropdownElement = null;
              shouldReinitialize = true;
            }
          });
        }
      });

      if (shouldReinitialize) {
        setTimeout(() => {
          initializeUserDropdown();
          replaceLoginButton();
        }, 100);
      }
    });


    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }


  window.reinitializeUserDropdown = function() {
    dropdownElement = null;
    setTimeout(() => {
      initializeUserDropdown();
      replaceLoginButton();
    }, 100);
  };


  function initialize() {
    // Initialize desktop state cache
    isDesktop = checkIsDesktop();
    
    initializeUserDropdown();
    replaceLoginButton();
    setupDOMObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    setTimeout(initialize, 100);
  }

  let currentUrl = window.location.href;
  setInterval(function() {
    checkAuthenticationState();
    
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href;
      setTimeout(() => {
        initializeUserDropdown();
        replaceLoginButton();
      }, 200);
    }
    
    if (dropdownElement && !document.body.contains(dropdownElement)) {
      dropdownElement = null;
      setTimeout(() => {
        initializeUserDropdown();
        replaceLoginButton();
      }, 100);
    }
    
    const navbarLink = document.querySelector('.navbar-link');
    if (navbarLink) {
      const navbar = navbarLink.parentElement;
      if (navbar && !navbar.querySelector('.user-profile-dropdown')) {
        setTimeout(() => {
          initializeUserDropdown();
          replaceLoginButton();
        }, 100);
      }
    }
  }, 1000);
  window.addEventListener('popstate', function() {
    setTimeout(() => {
      initializeUserDropdown();
      replaceLoginButton();
    }, 200);
  });


  window.addEventListener('hashchange', function() {
    setTimeout(() => {
      initializeUserDropdown();
      replaceLoginButton();
    }, 200);
  });


  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(() => {
      initializeUserDropdown();
      replaceLoginButton();
    }, 200);
  };

  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(() => {
      initializeUserDropdown();
      replaceLoginButton();
    }, 200);
  };


  window.addEventListener('focus', function() {
    setTimeout(() => {
      initializeUserDropdown();
      replaceLoginButton();
    }, 200);
  });

  // Handle window resize to move dropdown between desktop/mobile containers
  window.addEventListener('resize', function() {
    setTimeout(() => {
      // Only re-initialize if viewport actually changed between desktop/mobile
      const hasViewportChanged = updateDesktopState();
      
      if (hasViewportChanged && dropdownElement) {
        // Force re-initialization to move dropdown to correct container
        const currentDropdown = dropdownElement;
        dropdownElement = null;
        currentDropdown.remove();
        initializeUserDropdown();
        replaceLoginButton();
      }
    }, 100);
  });

  function toggleTenantList(event) {
    event.stopPropagation();
    
    if (!dropdownElement) {
      console.log('No dropdownElement found');
      return;
    }
    
    const tenantList = dropdownElement.querySelector('.tenant-list');
    const chevron = dropdownElement.querySelector('.tenant-switcher-toggle .icon-chevron-down');
    
    if (!tenantList || !chevron) return;
    
    const isExpanded = tenantList.classList.contains('expanded');
    
    if (isExpanded) {
      tenantList.classList.remove('expanded');
      chevron.style.transform = 'rotate(0deg)';
    } else {
      tenantList.classList.add('expanded');
      chevron.style.transform = 'rotate(180deg)';
    }
  }

  function selectTenant(tenantName) {
    // [TODO]: Implement actual tenant switching logic
    window.authService.switchTenant(tenantName);
    closeDropdown();
  }

  window.toggleTenantList = toggleTenantList;
  window.selectTenant = selectTenant;
})();
