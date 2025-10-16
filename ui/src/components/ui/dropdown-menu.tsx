import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return (
    <DropdownMenuPrimitive.Root
      data-slot="dropdown-menu"
      modal={false}
      {...props}
    />
  );
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'adu-dropdown-menu-content adu:text-popover-foreground adu:z-50 adu:max-h-(--radix-dropdown-menu-content-available-height) adu:min-w-[8rem] adu:origin-(--radix-dropdown-menu-content-transform-origin) adu:overflow-x-hidden adu:overflow-y-auto adu:rounded-md adu:border adu:border-border-input adu:bg-popover adu:p-1 adu:shadow-md adu:data-[side=bottom]:slide-in-from-top-2 adu:data-[side=left]:slide-in-from-right-2 adu:data-[side=right]:slide-in-from-left-2 adu:data-[side=top]:slide-in-from-bottom-2 adu:data-[state=closed]:animate-out adu:data-[state=closed]:fade-out-0 adu:data-[state=closed]:zoom-out-95 adu:data-[state=open]:animate-in adu:data-[state=open]:fade-in-0 adu:data-[state=open]:zoom-in-95 adu:dark:shadow-xs',
          className,
        )}
        style={{
          borderWidth: '1px',
        }}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "adu:focus:bg-accent adu:focus:text-accent-foreground adu:[&_svg:not([class*='text-'])]:text-muted-foreground adu:relative adu:flex adu:cursor-default adu:items-center adu:gap-2 adu:rounded-sm adu:px-2 adu:py-1.5 adu:text-sm adu:outline-hidden adu:select-none adu:data-[disabled]:pointer-events-none adu:data-[disabled]:opacity-50 adu:data-[inset]:pl-8 adu:data-[variant=destructive]:text-destructive adu:data-[variant=destructive]:focus:bg-destructive/10 adu:data-[variant=destructive]:focus:text-destructive adu:dark:data-[variant=destructive]:focus:bg-destructive/20 adu:[&_svg]:pointer-events-none adu:[&_svg]:shrink-0 adu:[&_svg:not([class*='size-'])]:size-4 adu:data-[variant=destructive]:*:[svg]:!text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "adu:focus:bg-accent adu:focus:text-accent-foreground adu:relative adu:flex adu:cursor-default adu:items-center adu:gap-2 adu:rounded-sm adu:py-1.5 adu:pr-2 adu:pl-8 adu:text-sm adu:outline-hidden adu:select-none adu:data-[disabled]:pointer-events-none adu:data-[disabled]:opacity-50 adu:[&_svg]:pointer-events-none adu:[&_svg]:shrink-0 adu:[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="adu:pointer-events-none adu:absolute adu:left-2 adu:flex adu:size-3.5 adu:items-center adu:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="adu:size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "adu:focus:bg-accent adu:focus:text-accent-foreground adu:relative adu:flex adu:cursor-default adu:items-center adu:gap-2 adu:rounded-sm adu:py-1.5 adu:pr-2 adu:pl-8 adu:text-sm adu:outline-hidden adu:select-none adu:focus-visible:outline-hidden adu:data-[disabled]:pointer-events-none adu:data-[disabled]:opacity-50 adu:[&_svg]:pointer-events-none adu:[&_svg]:shrink-0 adu:[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="adu:pointer-events-none adu:absolute adu:left-2 adu:flex adu:size-3.5 adu:items-center adu:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="adu:size-2 adu:fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'adu:px-2 adu:py-1.5 adu:text-sm adu:font-medium adu:data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        'adu:-mx-1 adu:my-1 adu:h-px adu:bg-border-input',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'adu:text-muted-foreground adu:ml-auto adu:text-xs adu:tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'adu:focus:bg-accent adu:focus:text-accent-foreground adu:data-[state=open]:bg-accent adu:data-[state=open]:text-accent-foreground adu:flex adu:cursor-default adu:items-center adu:rounded-sm adu:px-2 adu:py-1.5 adu:text-sm adu:outline-hidden adu:select-none adu:data-[inset]:pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="adu:ml-auto adu:size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'adu:text-popover-foreground adu:z-50 adu:min-w-[8rem] adu:origin-(--radix-dropdown-menu-content-transform-origin) adu:overflow-hidden adu:rounded-md adu:border adu:bg-popover adu:p-1 adu:shadow-lg adu:data-[side=bottom]:slide-in-from-top-2 adu:data-[side=left]:slide-in-from-right-2 adu:data-[side=right]:slide-in-from-left-2 adu:data-[side=top]:slide-in-from-bottom-2 adu:data-[state=closed]:animate-out adu:data-[state=closed]:fade-out-0 adu:data-[state=closed]:zoom-out-95 adu:data-[state=open]:animate-in adu:data-[state=open]:fade-in-0 adu:data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
