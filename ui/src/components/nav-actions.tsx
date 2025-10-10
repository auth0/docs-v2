import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/media-query';

import { AuthMenu } from './auth-menu';
import { Button } from './ui/button';
import { useAppStore } from '@/hooks/use-app-store';
import { userLogin } from '@/lib/api';

function NavActions({ className }: { className?: string }) {
  const { session } = useAppStore();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isLgUp = useBreakpoint('lg');
  const user = session.user;

  useEffect(() => {
    const updatePosition = () => {
      const referenceDiv = isLgUp
        ? document.querySelector('.topbar-right-container')
        : document.querySelector('.topbar-right-container+div');

      if (!referenceDiv) return;

      const { right } = referenceDiv.getBoundingClientRect();

      if (wrapperRef.current) {
        const iconsWidth = isLgUp ? 30 + 16 : 0; // icon width + margin
        wrapperRef.current.style.right = `${window.innerWidth - right + iconsWidth}px`;
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
        'adu:fixed adu:top-0 adu:z-30 adu:flex adu:h-14 adu:items-center adu:gap-2',
        className,
      )}
    >
      {user ? (
        <AuthMenu />
      ) : (
        <>
          <Button
            variant="ghost"
            onClick={() => userLogin(window.location.href)}
          >
            Log In
          </Button>
          <Button variant="default" asChild>
            <a href="https://auth0.com/signup?&signUpData=%7B%22category%22%3A%22docs%22%7D">
              Sign Up
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://auth0.com/get-started?place=header&type=button&text=talk%20to%20sales">
              Contact Sales
            </a>
          </Button>
        </>
      )}
    </div>
  );
}

export { NavActions };
