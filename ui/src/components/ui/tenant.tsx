import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

import { ContentText } from './content-text';
import { SvgIcon } from './svg-icon';
import { FlagIcon, type FlagIconProps } from './flag-icon';
import { Button } from './button';

interface TenantProp {
  asChild?: boolean;
  className?: string;
  name: string;
  flag: FlagIconProps['country'];
  locality: string;
  isSelected?: boolean;
}

function Tenant({
  asChild,
  className,
  name,
  flag,
  locality,
  isSelected,
  ...props
}: React.ComponentProps<'div'> & TenantProp) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="tenant"
      className={cn(
        'flex items-center gap-3 self-stretch px-3 py-2',
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-start justify-center gap-1">
        <ContentText
          asChild={true}
          className={isSelected ? 'text-foreground-bold' : ''}
          variant={isSelected ? 'button' : 'text-sm-bold'}
        >
          <span>{name}</span>
        </ContentText>
        <div className="flex items-start gap-1">
          <FlagIcon country={flag} />
          <ContentText variant="text-sm-bold" className="text-foreground">
            {locality}
          </ContentText>
        </div>
      </div>
      {isSelected ? <SvgIcon iconName="check" /> : null}
    </Comp>
  );
}

interface TenantListProps {
  className?: string;
  tenants: Array<{
    name: string;
    flag: FlagIconProps['country'];
    locality: string;
  }>;
  selectedTenant: string;
  onSelectTenant?: (tenantName: string) => void;
}

function TenantList({
  className,
  tenants,
  selectedTenant,
  onSelectTenant,
}: TenantListProps) {
  return (
    <div
      className={cn('flex flex-col items-start gap-1 self-stretch', className)}
    >
      {tenants.map((tenant) => (
        <Button
          asChild={true}
          key={tenant.name}
          variant="ghost"
          className="h-auto"
          onClick={() => onSelectTenant?.(tenant.name)}
        >
          <Tenant
            name={tenant.name}
            flag={tenant.flag}
            locality={tenant.locality}
            isSelected={tenant.name === selectedTenant}
          />
        </Button>
      ))}
    </div>
  );
}

export { Tenant, TenantList };
