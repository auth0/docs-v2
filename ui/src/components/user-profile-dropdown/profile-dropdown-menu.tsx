import React from 'react';
import { cn, getDisplayName } from './utils';
import { Avatar } from './avatar';
import { TenantList } from './tenant-list';
import { Icon } from './icon';
import type { Tenant } from '../../stores/auth-store';

interface ProfileDropdownMenuProps {
  user: { user_name?: string; name?: string; email?: string; picture?: string };
  tenants?: Tenant[];
  isOpen: boolean;
  isTenantListExpanded: boolean;
  onToggleTenantList: () => void;
  onSelectTenant: (tenantName: string) => void;
  onOpenDashboard: () => void;
  onViewProfile: () => void;
  onLogout: () => void;
}

export const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({
  user,
  tenants,
  isOpen,
  isTenantListExpanded,
  onToggleTenantList,
  onSelectTenant,
  onOpenDashboard,
  onViewProfile,
  onLogout,
}) => {
  const displayName = getDisplayName(user);

  return (
    <div
      className={cn(
        'absolute top-full right-0 mt-1 bg-adu-popover border border-adu-popover-foreground/20 rounded-lg shadow-lg min-w-[240px] z-50 p-1 transition-all duration-150 ease-out',
        isOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-1',
      )}
    >
      <div className="p-3 border-b border-adu-popover-foreground/20 mb-1">
        <div className="flex items-center gap-3">
          <Avatar user={user} size="large" />
          <div className="flex-1">
            <h3 className="m-0 text-sm font-semibold text-adu-popover-foreground">
              {displayName}
            </h3>
            <button
              className="text-xs text-adu-primary bg-transparent border-0 p-0 cursor-pointer hover:text-adu-primary/80 transition-colors duration-150 ease-out"
              onClick={onViewProfile}
            >
              View profile
            </button>
          </div>
        </div>
      </div>

      <button
        className="flex items-center gap-2 w-full p-2 bg-transparent border-0 rounded-md cursor-pointer text-sm text-adu-popover-foreground transition-colors duration-150 ease-out text-left font-medium hover:bg-adu-popover-foreground/10"
        onClick={onOpenDashboard}
      >
        <Icon name="dashboard" />
        <span>Open Dashboard</span>
      </button>

      <TenantList
        tenants={tenants || []}
        isExpanded={isTenantListExpanded}
        onToggle={onToggleTenantList}
        onSelectTenant={onSelectTenant}
      />

      <div className="h-px bg-adu-popover-foreground/20 my-1"></div>

      <button
        className="flex items-center gap-2 w-full p-2 bg-transparent border-0 rounded-md cursor-pointer text-sm text-adu-popover-foreground transition-colors duration-150 ease-out text-left font-medium hover:bg-adu-popover-foreground/10"
        onClick={onLogout}
      >
        <Icon name="logout" />
        <span>Logout</span>
      </button>
    </div>
  );
};
