import React, { type JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const displayTextVariants = cva(
  'font-aeonik text-foreground-bold font-medium',
  {
    variants: {
      variant: {
        'heading-lg': 'leading-1.20 tracking-n-6xl text-3xl',
        'heading-regular': 'leading-1.20 tracking-n-2xl text-2xl',
        'heading-sm': 'leading-1.15 tracking-n-xl text-xl',
        'subtitle-regular': 'leading-1.40 tracking-n-md text-lg',
        'subtitle-sm': 'leading-1.40 tracking-p-xs text-base',
        'link-regular': 'tracking-p-md text-base leading-1.25 font-normal',
        'link-sm': 'leading-1.40 text-sm font-normal',
        'link-sm-bold': 'leading-1.40 text-sm',
      },
    },
  },
);

export interface DisplayTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof displayTextVariants> {
  asChild?: boolean;
}

function DisplayText({
  className,
  variant,
  asChild = false,
  ...props
}: DisplayTextProps) {
  const defaultElementMap: {
    [key in NonNullable<
      DisplayTextProps['variant']
    >]: keyof JSX.IntrinsicElements;
  } = {
    'heading-lg': 'h1',
    'heading-regular': 'h2',
    'heading-sm': 'h3',
    'subtitle-regular': 'h4',
    'subtitle-sm': 'h5',
    'link-regular': 'a',
    'link-sm': 'a',
    'link-sm-bold': 'a',
  };

  const defaultElement = variant ? defaultElementMap[variant] || 'p' : 'p';

  const Comp = asChild ? Slot : (defaultElement as React.ElementType);

  return (
    <Comp
      data-slot="display-text"
      className={cn(displayTextVariants({ variant }), className)}
      {...props}
    />
  );
}

DisplayText.displayName = 'DisplayText';

export { DisplayText, displayTextVariants };
