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
  highlightName?: boolean;
  loginUrl: string;
}

interface TenantProp extends TenantData {
  asChild?: boolean;
  className?: string;
  isSelected?: boolean;
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
        'adu:flex adu:w-full adu:items-center adu:gap-3 adu:self-stretch adu:px-3 adu:py-2',
        className,
      )}
      {...props}
    >
      <div className="adu:flex adu:flex-1 adu:flex-col adu:items-start adu:justify-center adu:gap-1">
        <ContentText
          asChild={true}
          className={
            isSelected || highlightName ? 'adu:text-foreground-bold' : ''
          }
          variant={isSelected || highlightName ? 'button' : 'text-sm-bold'}
        >
          <span>{name}</span>
        </ContentText>
        <div className="adu:flex adu:items-center adu:gap-1">
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
  selectedTenant?: TenantData | null;
  tenants: TenantData[];
  onBack?: React.MouseEventHandler<HTMLButtonElement>;
  onSelectTenant?: (tenant: TenantData) => void;
}

function TenantMenuContent({
  selectedTenant,
  tenants,
  onBack,
  onSelectTenant,
  ...props
}: TenantMenuContentProps) {
  return (
    <div {...props}>
      <div className="adu:flex adu:items-center adu:gap-0 adu:self-stretch adu:px-1">
        <Button
          className="adu:z-0"
          size="icon"
          variant="ghost"
          onClick={onBack}
        >
          <SvgIcon iconName="arrow-left" />
        </Button>
        <div className="adu:-ml-8 adu:flex adu:flex-1 adu:items-center adu:justify-center adu:gap-1 adu:py-2">
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
      <div className="adu:flex-1 adu:overflow-auto">
        {tenants.map((tenant) => (
          <DropdownMenuItem
            className="adu:p-0"
            key={tenant.name}
            onClick={() => onSelectTenant?.(tenant)}
          >
            <Tenant
              name={tenant.name}
              flag={tenant.flag}
              locality={tenant.locality}
              isSelected={
                selectedTenant ? tenant.name === selectedTenant.name : false
              }
              loginUrl={tenant.loginUrl}
            />
          </DropdownMenuItem>
        ))}
      </div>
    </div>
  );
}

export { Tenant, type TenantData, TenantMenuContent };
