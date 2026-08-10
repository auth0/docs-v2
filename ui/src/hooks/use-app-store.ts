import { useContext } from 'react';
import { AppStoreContext } from '../lib/app-store';

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
