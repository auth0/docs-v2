import { MoreVertical } from 'lucide-react';

import { useBreakpoint } from '@/hooks/media-query';
import { userLogin } from '@/lib/api';

import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

const UnauthenticatedMenu = () => {
  const isLgUp = useBreakpoint('lg');

  if (isLgUp) {
    return (
      <>
        <Button className='adu:text-sm!' variant="ghost" onClick={() => userLogin(window.location.href)}>
          Log In
        </Button>
        <Button
          className="no_external_icon adu:text-foreground-inverse!"
          variant="default"
          asChild
        >
          <a href="https://auth0.com/signup?&signUpData={%22category%22%3A%22docs%22%7D">
            Sign Up
          </a>
        </Button>
        <Button
          className="no_external_icon adu:adu:border-border-muted! adu:border!"
          variant="outline"
          asChild
        >
          <a href="https://auth0.com/get-started?place=header&type=button&text=talk%20to%20sales">
            Contact Sales
          </a>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="adu:h-8 adu:w-8 adu:p-0">
          <MoreVertical className="adu:h-4 adu:w-4" />
          <span className="adu:sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="adu:w-48">
        <DropdownMenuItem
          className="adu:text-foreground-bold"
          onClick={() => userLogin(window.location.href)}
        >
          Log In
        </DropdownMenuItem>
        <DropdownMenuItem className="adu:text-foreground-bold" asChild>
          <a
            className="no_external_icon"
            href="https://auth0.com/signup?&signUpData={%22category%22%3A%22docs%22%7D"
          >
            Sign Up
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="adu:text-foreground-bold" asChild>
          <a
            className="no_external_icon"
            href="https://auth0.com/get-started?place=header&type=button&text=talk%20to%20sales"
          >
            Contact Sales
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UnauthenticatedMenu };
