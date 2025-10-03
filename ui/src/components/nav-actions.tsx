import { useEffect, useRef, useState } from 'react';
import { AuthMenu } from './auth-menu';
import { Button } from './ui/button';
import type { UserData } from './ui/profile-menu';
import type { TenantData } from './ui/tenant';
import { cn } from '@/lib/utils';

interface NavActionsProps {
  className?: string;
  user: UserData | null;
  tenants: TenantData[];
}

function NavActions({ className, user, tenants }: NavActionsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentTenant, setCurrentTenant] = useState(tenants[0] || null);

  const handleSelectTenant = (tenant: TenantData) => {
    setCurrentTenant(tenant);
  };

  useEffect(() => {
    const referenceDiv = document.querySelector('div.topbar-right-container');

    if (!referenceDiv) return;

    const updatePosition = () => {
      const { right } = referenceDiv.getBoundingClientRect();

      if (wrapperRef.current) {
        const darkModeIconWidth = 30 + 16; // icon width + margin
        wrapperRef.current.style.right = `${window.innerWidth - right + darkModeIconWidth}px`;
      }
    };

    // Initial position setup
    updatePosition();

    // Add window resize listener
    window.addEventListener('resize', updatePosition);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'adu:fixed adu:top-0 adu:z-50 adu:flex adu:h-14 adu:items-center adu:gap-2',
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
