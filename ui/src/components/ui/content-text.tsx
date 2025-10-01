import React, { type JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const contentTextVariants = cva('adu:font-inter adu:text-foreground', {
  variants: {
    variant: {
      'heading-lg':
        'adu:text-foreground-bold adu:tracking-n-5xl adu:text-2xl adu:leading-1.25 adu:font-medium',
      'heading-regular':
        'adu:text-foreground-bold adu:tracking-n-3xl adu:leading-1.20 adu:text-lg adu:font-semibold',
      'heading-sm':
        'adu:text-foreground-bold adu:tracking-n-sm adu:text-base adu:leading-1.25 adu:font-semibold',
      'heading-overline':
        'adu:text-foreground-bold adu:leading-1.33 adu:tracking-p-2xl adu:text-xs adu:font-semibold adu:uppercase',
      'subtitle-regular':
        'adu:leading-1.30 adu:tracking-n-3xl adu:text-lg adu:font-medium',
      'subtitle-sm':
        'adu:leading-1.15 adu:tracking-n-lg adu:text-base adu:font-semibold',
      'text-regular':
        'adu:tracking-n-lg adu:text-base adu:leading-1.5 adu:font-normal',
      'text-bold':
        'adu:text-foreground-bold adu:tracking-p-lg adu:text-base adu:leading-1.5 adu:font-semibold',
      'text-sm':
        'adu:tracking-n-xs adu:leading-1.45 adu:text-sm adu:font-normal',
      'text-sm-bold':
        'adu:tracking-n-xs adu:leading-1.45 adu:text-sm adu:font-medium',
      'text-xs': 'adu:leading-1.30 adu:text-xs adu:font-normal',
      'caption-lg':
        'adu:leading-1.30 adu:tracking-n-3xl adu:text-lg adu:font-medium',
      'caption-sm': 'adu:leading-1.30 adu:text-xs adu:font-medium',
      list: 'adu:leading-1.65 adu:tracking-n-lg adu:text-base adu:font-normal',
      button: 'adu:leading-1.40 adu:text-sm adu:font-semibold',
      'link-regular':
        'adu:tracking-n-sm adu:text-base adu:leading-1.25 adu:font-medium',
      'link-sm': 'adu:leading-1.15 adu:text-sm adu:font-medium',
      code: 'adu:font-roboto-mono adu:leading-1.65 adu:tracking-p-sm adu:text-base adu:font-normal',
      'code-sm':
        'adu:font-roboto-mono adu:leading-1.40 adu:text-sm adu:font-normal',
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
