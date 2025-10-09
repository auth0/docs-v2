import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/media-query';

import { AuthMenu } from './auth-menu';
import { Button } from './ui/button';
import type { UserData } from './ui/profile-menu';
import type { TenantData } from './ui/tenant';

interface NavActionsProps {
  className?: string;
  user: UserData | null;
  tenants: TenantData[];
}

function NavActions({ className, user, tenants }: NavActionsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isLgUp = useBreakpoint('lg');

  const [currentTenant, setCurrentTenant] = useState(tenants[0] || null);

  const handleSelectTenant = (tenant: TenantData) => {
    setCurrentTenant(tenant);
  };

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
      {user && currentTenant ? (
        <AuthMenu
          user={user}
          selectedTenant={currentTenant}
          tenants={tenants}
          onSelectTenant={handleSelectTenant}
        />
      ) : (
        <>
          <Button variant="ghost" asChild>
            <a href="/docs/v2/auth/user/login">Log In</a>
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
