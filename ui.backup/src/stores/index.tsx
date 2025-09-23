import * as React from 'react';
import { createContext, useContext } from 'react';
import { authStore } from './auth-store';

// Create React context for the auth store
const AuthStoreContext = createContext(authStore);

// Provider component
interface AuthStoreProviderProps {
  children: React.ReactNode;
  store?: typeof authStore;
}

export const AuthStoreProvider: React.FC<AuthStoreProviderProps> = ({
  children,
  store = authStore,
}) => {
  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
};

// Hook to use auth store
export const useAuthStore = () => {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error('useAuthStore must be used within AuthStoreProvider');
  }
  return store;
};

// Export the store for direct access if needed
export { authStore };
