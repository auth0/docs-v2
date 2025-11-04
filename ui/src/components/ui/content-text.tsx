import React, { type JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const contentTextVariants = cva('adu:font-inter adu:text-foreground', {
  variants: {
    variant: {
      'heading-lg':
        'adu:text-2xl adu:leading-1.25 adu:font-medium adu:tracking-n-5xl adu:text-foreground-bold',
      'heading-regular':
        'adu:text-lg adu:leading-1.20 adu:font-semibold adu:tracking-n-3xl adu:text-foreground-bold',
      'heading-sm':
        'adu:text-base adu:leading-1.25 adu:font-semibold adu:tracking-n-sm adu:text-foreground-bold',
      'heading-overline':
        'adu:text-xs adu:leading-1.33 adu:font-semibold adu:tracking-p-2xl adu:text-foreground-bold adu:uppercase',
      'subtitle-regular':
        'adu:text-lg adu:leading-1.30 adu:font-medium adu:tracking-n-3xl',
      'subtitle-sm':
        'adu:text-base adu:leading-1.15 adu:font-semibold adu:tracking-n-lg',
      'text-regular':
        'adu:text-base adu:leading-1.5 adu:font-normal adu:tracking-n-lg',
      'text-bold':
        'adu:text-base adu:leading-1.5 adu:font-semibold adu:tracking-p-lg adu:text-foreground-bold',
      'text-sm':
        'adu:text-sm adu:leading-1.45 adu:font-normal adu:tracking-n-xs',
      'text-sm-bold':
        'adu:text-sm adu:leading-1.45 adu:font-medium adu:tracking-n-xs',
      'text-xs': 'adu:text-xs adu:leading-1.30 adu:font-normal',
      'caption-lg':
        'adu:text-lg adu:leading-1.30 adu:font-medium adu:tracking-n-3xl',
      'caption-sm': 'adu:text-xs adu:leading-1.30 adu:font-medium',
      list: 'adu:text-base adu:leading-1.65 adu:font-normal adu:tracking-n-lg',
      button: 'adu:text-sm adu:leading-1.40 adu:font-semibold',
      'link-regular':
        'adu:text-base adu:leading-1.25 adu:font-medium adu:tracking-n-sm',
      'link-sm': 'adu:text-sm adu:leading-1.15 adu:font-medium',
      code: 'adu:font-roboto-mono adu:text-base adu:leading-1.65 adu:font-normal adu:tracking-p-sm',
      'code-sm':
        'adu:font-roboto-mono adu:text-sm adu:leading-1.40 adu:font-normal',
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
