import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../stores/auth-store';
import { cn } from './utils';
import { LoadingSpinner } from './loading-spinner';
import { TriggerButton } from './trigger-button';
import { ProfileDropdownMenu } from './profile-dropdown-menu';
import './user-profile-dropdown.css';

export interface UserProfileDropdownProps {
  isMobile?: boolean;
  className?: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = observer(
  ({ isMobile = false, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTenantListExpanded, setIsTenantListExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // No need for manual initialization - the store auto-initializes
    // Components just observe the state and automatically re-render when it changes

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setIsTenantListExpanded(false);
        }
      };

      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      }

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [isOpen]);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setIsTenantListExpanded(false);
      }
    };

    const toggleTenantList = () => {
      setIsTenantListExpanded(!isTenantListExpanded);
    };

    const handleSelectTenant = async (tenantName: string) => {
      try {
        await authStore.switchTenant(tenantName);
        setIsOpen(false);
        setIsTenantListExpanded(false);
      } catch (error) {
        console.error('Failed to switch tenant:', error);
        // Keep dropdown open on error
      }
    };

    const handleOpenDashboard = () => {
      window.open('https://manage.auth0.com', '_blank');
      setIsOpen(false);
    };

    const handleViewProfile = () => {
      // TODO: Implement view profile functionality
      // View profile clicked
      setIsOpen(false);
    };

    const handleLogout = () => {
      authStore.logout();
      setIsOpen(false);
    };

    if (authStore.isLoading) {
      return <LoadingSpinner isMobile={isMobile} className={className} />;
    }

    // Show login button when not authenticated
    if (!authStore.isAuthenticated) {
      return (
        <div className={cn('adu relative z-[1000]', className)}>
          <button
            onClick={() => authStore.login()}
            className="flex items-center gap-1.5 whitespace-nowrap font-medium text-adu-popover-foreground/70 hover:text-adu-popover-foreground"
          >
            <span>Login</span>
          </button>
        </div>
      );
    }

    const user = authStore.user;
    if (!user) return null;

    return (
      <div
        ref={dropdownRef}
        className={cn(
          'adu relative z-[1000]',
          isMobile ? 'block' : 'hidden',
          className,
        )}
        style={{ display: authStore.isAuthenticated ? 'block' : 'none' }}
      >
        <TriggerButton user={user} isOpen={isOpen} onClick={toggleDropdown} />

        <ProfileDropdownMenu
          user={user}
          tenants={authStore.tenants}
          isOpen={isOpen}
          isTenantListExpanded={isTenantListExpanded}
          onToggleTenantList={toggleTenantList}
          onSelectTenant={handleSelectTenant}
          onOpenDashboard={handleOpenDashboard}
          onViewProfile={handleViewProfile}
          onLogout={handleLogout}
        />
      </div>
    );
  },
);

export { UserProfileDropdown };
export default UserProfileDropdown;
