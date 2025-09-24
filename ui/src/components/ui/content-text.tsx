import React, { type JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const contentTextVariants = cva('font-inter text-foreground', {
  variants: {
    variant: {
      'heading-lg':
        'text-foreground-bold tracking-n-5xl text-2xl leading-1.25 font-medium',
      'heading-regular':
        'text-foreground-bold tracking-n-3xl leading-1.20 text-lg font-semibold',
      'heading-sm':
        'text-foreground-bold tracking-n-sm text-base leading-1.25 font-semibold',
      'heading-overline':
        'text-foreground-bold leading-1.33 tracking-p-2xl text-xs font-semibold uppercase',
      'subtitle-regular': 'leading-1.30 tracking-n-3xl text-lg font-medium',
      'subtitle-sm': 'leading-1.15 tracking-n-lg text-base font-semibold',
      'text-regular': 'tracking-n-lg text-base leading-1.5 font-normal',
      'text-bold':
        'text-foreground-bold tracking-p-lg text-base leading-1.5 font-semibold',
      'text-sm': 'tracking-n-xs leading-1.45 text-sm font-normal',
      'text-sm-bold':
        'text-foreground-bold tracking-n-xs leading-1.45 text-sm font-medium',
      'text-xs': 'leading-1.30 text-xs font-normal',
      'caption-lg': 'leading-1.30 tracking-n-3xl text-lg font-medium',
      'caption-sm': 'leading-1.30 text-xs font-medium',
      list: 'leading-1.65 tracking-n-lg text-base font-normal',
      button: 'leading-1.40 text-sm font-semibold',
      'link-regular': 'tracking-n-sm text-base leading-1.25 font-medium',
      'link-sm': 'leading-1.15 text-sm font-medium',
      code: 'font-roboto-mono leading-1.65 tracking-p-sm text-base font-normal',
      'code-sm': 'font-roboto-mono leading-1.40 text-sm font-normal',
    },
  },
});

export interface ContentTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof contentTextVariants> {
  asChild?: boolean;
}

function ContentText({
  className,
  variant,
  asChild = false,
  ...props
}: ContentTextProps) {
  const defaultElementMap: {
    [key in NonNullable<
      ContentTextProps['variant']
    >]: keyof JSX.IntrinsicElements;
  } = {
    'heading-lg': 'h1',
    'heading-regular': 'h2',
    'heading-sm': 'h3',
    'heading-overline': 'h4',
    'subtitle-regular': 'h5',
    'subtitle-sm': 'h5',
    'caption-lg': 'figcaption',
    'caption-sm': 'figcaption',
    list: 'li',
    button: 'button',
    'link-regular': 'a',
    'link-sm': 'a',
    code: 'code',
    'code-sm': 'code',
    'text-regular': 'p',
    'text-bold': 'p',
    'text-sm': 'p',
    'text-sm-bold': 'p',
    'text-xs': 'p',
  };

  const defaultElement = variant ? defaultElementMap[variant] || 'p' : 'p';

  const Comp = asChild ? Slot : (defaultElement as React.ElementType);

  return (
    <Comp
      data-slot="content-text"
      className={cn(contentTextVariants({ variant }), className)}
      {...props}
    />
  );
}

ContentText.displayName = 'ContentText';

export { ContentText, contentTextVariants };
