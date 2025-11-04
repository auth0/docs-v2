import React, { type JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const displayTextVariants = cva(
  'adu:font-aeonik adu:font-medium adu:text-foreground-bold',
  {
    variants: {
      variant: {
        'heading-lg': 'adu:text-3xl adu:leading-1.20 adu:tracking-n-6xl',
        'heading-regular': 'adu:text-2xl adu:leading-1.20 adu:tracking-n-2xl',
        'heading-sm': 'adu:text-xl adu:leading-1.15 adu:tracking-n-xl',
        'subtitle-regular': 'adu:text-lg adu:leading-1.40 adu:tracking-n-md',
        'subtitle-sm': 'adu:text-base adu:leading-1.40 adu:tracking-p-xs',
        'link-regular':
          'adu:text-base adu:leading-1.25 adu:font-normal adu:tracking-p-md',
        'link-sm': 'adu:text-sm adu:leading-1.40 adu:font-normal',
        'link-sm-bold': 'adu:text-sm adu:leading-1.40',
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
