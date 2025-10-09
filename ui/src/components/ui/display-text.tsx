import React, { type JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const displayTextVariants = cva(
  'adu:font-aeonik adu:text-foreground-bold adu:font-medium',
  {
    variants: {
      variant: {
        'heading-lg': 'adu:leading-1.20 adu:tracking-n-6xl adu:text-3xl',
        'heading-regular': 'adu:leading-1.20 adu:tracking-n-2xl adu:text-2xl',
        'heading-sm': 'adu:leading-1.15 adu:tracking-n-xl adu:text-xl',
        'subtitle-regular': 'adu:leading-1.40 adu:tracking-n-md adu:text-lg',
        'subtitle-sm': 'adu:leading-1.40 adu:tracking-p-xs adu:text-base',
        'link-regular':
          'adu:tracking-p-md adu:text-base adu:leading-1.25 adu:font-normal',
        'link-sm': 'adu:leading-1.40 adu:text-sm adu:font-normal',
        'link-sm-bold': 'adu:leading-1.40 adu:text-sm',
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
