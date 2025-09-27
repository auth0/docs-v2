import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

import { ContentText } from './content-text';
import { SvgIcon } from './svg-icon';
import { FlagIcon, type FlagIconProps } from './flag-icon';
import { Button } from './button';
import { DropdownMenuItem, DropdownMenuSeparator } from './dropdown-menu';

interface TenantData {
  name: string;
  flag: FlagIconProps['country'];
  locality: string;
  isSelected?: boolean;
  highlightName?: boolean;
}

interface TenantProp extends TenantData {
  asChild?: boolean;
  className?: string;
}

function Tenant({
  asChild,
  className,
  name,
  flag,
  locality,
  isSelected,
  highlightName,
  ...props
}: React.ComponentProps<'div'> & TenantProp) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="tenant"
      className={cn(
        'flex w-full items-center gap-3 self-stretch px-3 py-2',
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-start justify-center gap-1">
        <ContentText
          asChild={true}
          className={isSelected || highlightName ? 'text-foreground-bold' : ''}
          variant={isSelected || highlightName ? 'button' : 'text-sm-bold'}
        >
          <span>{name}</span>
        </ContentText>
        <div className="flex items-center gap-1">
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

interface TenantMenuContentProps extends React.ComponentProps<'div'> {
  tenants: TenantData[];
  onBack?: React.MouseEventHandler<HTMLButtonElement>;
  onSelectTenant?: (tenant: TenantData) => void;
}

function TenantMenuContent({
  tenants,
  onBack,
  onSelectTenant,
  ...props
}: TenantMenuContentProps) {
  return (
    <div {...props}>
      <div className="flex items-center gap-0 self-stretch px-1">
        <Button className="z-0" size="icon" variant="ghost" onClick={onBack}>
          <SvgIcon iconName="arrow-left" />
        </Button>
        <div className="-ml-8 flex flex-1 items-center justify-center gap-1 py-2">
          <ContentText
            asChild={true}
            className="text-foreground-bold"
            variant="button"
          >
            <span>Switch Tenant</span>
          </ContentText>
        </div>
      </div>
      <DropdownMenuSeparator />
      {tenants.map((tenant) => (
        <DropdownMenuItem
          className="p-0"
          key={tenant.name}
          onClick={() => onSelectTenant?.(tenant)}
        >
          <Tenant
            name={tenant.name}
            flag={tenant.flag}
            locality={tenant.locality}
            isSelected={tenant.isSelected}
          />
        </DropdownMenuItem>
      ))}
    </div>
  );
}

export { Tenant, type TenantData, TenantMenuContent };
