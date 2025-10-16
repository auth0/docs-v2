import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'adu:relative adu:flex adu:size-8 adu:shrink-0 adu:overflow-hidden adu:rounded-full',
        className,
      )}
      style={{
        background:
          'linear-gradient(216deg, var(--button-primary) -92.57%, var(--button-primary) 38.72%, var(--foreground-selected) 93.13%, var(--foreground-info) 130.12%)',
      }}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('adu:aspect-square adu:size-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'adu:flex adu:size-full adu:items-center adu:justify-center adu:rounded-full adu:text-foreground-inverse',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
