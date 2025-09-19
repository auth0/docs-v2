import React from 'react';
import { cn } from './utils';
import { Icon } from './icon';
import { TenantListItem } from './tenant-list-item';
import type { Tenant } from '../../stores/auth-store';

export interface TenantListProps {
  tenants: Tenant[];
  isExpanded: boolean;
  onToggle: () => void;
  onSelectTenant: (tenantName: string) => void;
}

export const TenantList: React.FC<TenantListProps> = ({
  tenants,
  isExpanded,
  onToggle,
  onSelectTenant,
}) => {
  return (
    <>
      <button
        className="flex items-center gap-2 w-full p-2 bg-transparent border-0 rounded-md cursor-pointer text-sm text-adu-popover-foreground transition-colors duration-150 ease-out text-left font-medium hover:bg-adu-popover-foreground/10"
        onClick={onToggle}
      >
        <Icon name="refresh" />
        <span>Switch tenant</span>
        <Icon
          name="chevron-down"
          className="ml-auto transition-transform duration-200 ease-out"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div
        className={cn(
          'my-1 px-1 overflow-hidden transition-all duration-300 ease-in-out tenant-list-scrollbar',
          isExpanded ? 'max-h-56 overflow-y-auto' : 'max-h-0',
        )}
      >
        {tenants.map((tenant) => (
          <TenantListItem
            key={tenant.name}
            tenant={tenant}
            onSelect={onSelectTenant}
          />
        ))}
      </div>
    </>
  );
};
