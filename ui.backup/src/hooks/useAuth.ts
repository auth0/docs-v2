import { useCallback } from 'react';
import { useAuthStore } from '../stores';
import { Tenant } from '../types';

/**
 * Custom hook for authentication functionality
 * Provides all auth-related state and actions for components
 */
export const useAuth = () => {
  const authStore = useAuthStore();

  // Memoized callbacks to prevent unnecessary re-renders
  const handleSwitchTenant = useCallback(
    async (tenant: Tenant) => {
      try {
        await authStore.switchTenant(tenant);
      } catch (error) {
        console.error('Failed to switch tenant:', error);
        // Error is handled in the store
      }
    },
    [authStore],
  );

  const handleLogout = useCallback(async () => {
    try {
      await authStore.logout();
    } catch (error) {
      console.error('Failed to logout:', error);
      // Error is handled in the store
    }
  }, [authStore]);

  const handleClearError = useCallback(() => {
    authStore.clearError();
  }, [authStore]);

  const handleRefresh = useCallback(async () => {
    try {
      await authStore.refresh();
    } catch (error) {
      console.error('Failed to refresh auth state:', error);
    }
  }, [authStore]);

  return {
    // State
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    tenants: authStore.tenants,
    selectedTenant: authStore.selectedTenant,
    isLoading: authStore.isLoading,
    isFetchingTenants: authStore.isFetchingTenants,
    isInitialized: authStore.isInitialized,
    error: authStore.error,

    // Computed values
    hasMultipleTenants: authStore.hasMultipleTenants,
    userDisplayName: authStore.userDisplayName,
    userInitials: authStore.userInitials,
    currentTenantDisplayName: authStore.currentTenantDisplayName,
    currentTenantRegion: authStore.currentTenantRegion,

    // Actions
    switchTenant: handleSwitchTenant,
    logout: handleLogout,
    clearError: handleClearError,
    refresh: handleRefresh,
  };
};

/**
 * Hook specifically for user profile dropdown functionality
 */
export const useUserProfile = () => {
  const auth = useAuth();

  const handleOpenDashboard = useCallback(() => {
    if (!auth.selectedTenant) return;

    // Open Auth0 dashboard in new tab
    const dashboardUrl = `https://manage.auth0.com/dashboard/${auth.selectedTenant.environment.shortName}/${auth.selectedTenant.name}`;
    window.open(dashboardUrl, '_blank', 'noopener,noreferrer');
  }, [auth.selectedTenant]);

  const handleViewProfile = useCallback(() => {
    if (!auth.selectedTenant) return;

    // Open Auth0 user profile in new tab
    const profileUrl = `https://manage.auth0.com/dashboard/${auth.selectedTenant.environment.shortName}/${auth.selectedTenant.name}/users`;
    window.open(profileUrl, '_blank', 'noopener,noreferrer');
  }, [auth.selectedTenant]);

  return {
    ...auth,
    openDashboard: handleOpenDashboard,
    viewProfile: handleViewProfile,
  };
};

/**
 * Hook for tenant switching functionality
 */
export const useTenantSwitcher = () => {
  const auth = useAuth();

  const getCountryFlag = useCallback((tenant: Tenant): string => {
    // Map environment short names to country flag emojis
    const flagMap: Record<string, string> = {
      US: '🇺🇸',
      EU: '🇪🇺',
      AU: '🇦🇺',
      JP: '🇯🇵',
      UK: '🇬🇧',
    };

    return flagMap[tenant.environment.shortName] || '🌍';
  }, []);

  const formatTenantDisplay = useCallback(
    (tenant: Tenant) => {
      return {
        name: tenant.name,
        region: `${tenant.environment.shortName}-${tenant.environment.id}`,
        flag: getCountryFlag(tenant),
        isSelected: auth.selectedTenant?.name === tenant.name,
      };
    },
    [auth.selectedTenant, getCountryFlag],
  );

  return {
    tenants: auth.tenants.map(formatTenantDisplay),
    isLoading: auth.isFetchingTenants,
    hasMultipleTenants: auth.hasMultipleTenants,
    switchTenant: auth.switchTenant,
    error: auth.error,
    clearError: auth.clearError,
  };
};
