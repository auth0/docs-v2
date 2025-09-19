import React from 'react';
import { cn } from './utils';
import { Icon } from './icon';
import type { Tenant } from '../../stores/auth-store';

export interface TenantListItemProps {
  tenant: Tenant & {
    selected?: boolean;
    flag?: string;
  };
  onSelect: (tenantName: string) => void;
}

export const TenantListItem: React.FC<TenantListItemProps> = ({
  tenant,
  onSelect,
}) => {
  return (
    <button
      className={cn(
        'flex items-center gap-2 p-2 cursor-pointer transition-colors duration-150 ease-out border-0 bg-transparent w-full text-left rounded my-0.5 hover:bg-adu-popover-foreground/10',
        tenant.selected ? 'text-adu-primary' : 'text-adu-popover-foreground',
      )}
      onClick={() => onSelect(tenant.name)}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium m-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {tenant.name}
        </p>
        <div className="flex items-center gap-1">
          <div className="w-5 h-3.5 rounded-sm bg-adu-primary flex items-center justify-center text-xs text-adu-primary-foreground font-bold flex-shrink-0">
            {tenant.flag}
          </div>
          <p className="text-xs text-adu-popover-foreground/60 m-0">
            {tenant.environment.shortName}
          </p>
        </div>
      </div>
      {tenant.selected && <Icon name="check" className="bg-adu-primary" />}
    </button>
  );
};
