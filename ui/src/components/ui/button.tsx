import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "adu:focus-visible:border-ring adu:focus-visible:ring-ring/50 adu:inline-flex adu:shrink-0 adu:items-center adu:justify-center adu:gap-2 adu:rounded-full adu:text-sm adu:font-medium adu:whitespace-nowrap adu:transition-all adu:outline-none adu:focus-visible:ring-[3px] adu:disabled:pointer-events-none adu:disabled:opacity-50 adu:aria-invalid:border-destructive adu:aria-invalid:ring-destructive/20 adu:dark:aria-invalid:ring-destructive/40 adu:[&_svg]:pointer-events-none adu:[&_svg]:shrink-0 adu:[&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'adu:bg-button-primary adu:text-foreground-inverse adu:hover:bg-button-primary/90',
        destructive:
          'adu:bg-destructive adu:text-white adu:hover:bg-destructive/90 adu:focus-visible:ring-destructive/20 adu:dark:bg-destructive/60 adu:dark:focus-visible:ring-destructive/40',
        outline:
          'adu:hover:bg-accent adu:hover:text-accent-foreground adu:border adu:border-border-muted adu:bg-input adu:text-foreground-bold adu:shadow-sm adu:dark:bg-input/30 adu:dark:hover:bg-input/50',
        secondary:
          'adu:bg-secondary adu:text-secondary-foreground adu:hover:bg-secondary/80',
        ghost:
          'adu:hover:bg-accent adu:hover:text-accent-foreground adu:dark:hover:bg-accent/50 adu:text-foreground',
        link: 'adu:text-primary adu:text-foreground adu:underline-offset-4 adu:hover:underline',
      },
      size: {
        default: 'adu:h-9 adu:px-4 adu:py-2 adu:has-[>svg]:px-3',
        sm: 'adu:h-8 adu:gap-1.5 adu:rounded-md adu:px-3 adu:has-[>svg]:px-2.5',
        lg: 'adu:h-10 adu:rounded-md adu:px-6 adu:has-[>svg]:px-4',
        icon: 'adu:size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
