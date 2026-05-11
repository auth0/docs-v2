import { useLayoutEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/media-query';
import { rootStore } from '@/stores';

import { AuthMenu } from './auth-menu';
import { UnauthenticatedMenu } from './ui/unauthenticated-menu';

const NavActions = observer(({ className }: { className?: string }) => {
  const { sessionStore } = rootStore;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isLgUp = useBreakpoint('lg');
  const user = sessionStore.user;
  const [isPositioned, setIsPositioned] = useState(false);

  // Use useLayoutEffect to calculate position synchronously before paint
  // This prevents visible layout shift
  useLayoutEffect(() => {
    const updatePosition = () => {
      const referenceDiv = isLgUp
        ? document.querySelector('.topbar-right-container')
        : document.querySelector('.topbar-right-container+div');

      if (!referenceDiv) return;

      const { right } = referenceDiv.getBoundingClientRect();

      if (wrapperRef.current) {
        const iconsWidth = isLgUp ? 30 + 16 : -8; // icon width + margin
        wrapperRef.current.style.right = `${window.innerWidth - right + iconsWidth}px`;
        setIsPositioned(true);
      }
    };

    // Initial position setup
    updatePosition();

    // Add window resize listener
    window.addEventListener('resize', updatePosition);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updatePosition);
  }, [isLgUp]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'adu:fixed adu:top-0 adu:z-30 adu:flex adu:h-14 adu:items-center adu:gap-3',
        // Hide until positioned to prevent layout shift flash
        !isPositioned && 'adu:opacity-0',
        isPositioned && 'adu:opacity-100 adu:transition-opacity adu:duration-75',
        className,
      )}
    >
      {user ? <AuthMenu /> : <UnauthenticatedMenu />}
    </div>
  );
});

export { NavActions };
