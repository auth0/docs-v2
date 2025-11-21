import type { MouseEventHandler } from 'react';

import { cn, getInitials } from '@/lib/utils';

import { Tenant, type TenantData } from './tenant-menu';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { SvgIcon } from './svg-icon';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { ContentText } from './content-text';

interface UserData {
  name: string;
  profilePicture?: string;
  profileUrl: string;
}

interface UserDetailsProps extends UserData {
  className?: string;
}

function UserDetails({
  className,
  name,
  profilePicture,
  profileUrl,
}: UserDetailsProps) {
  const initials = getInitials(name);
  return (
    <div
      className={cn(
        'adu:flex adu:w-full adu:items-center adu:gap-3 adu:px-3 adu:py-2',
        className,
      )}
    >
      <Avatar className="adu:h-9 adu:w-9">
        <AvatarImage src={profilePicture} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="adu:flex adu:flex-1 adu:flex-col adu:gap-1">
        <ContentText
          variant="text-sm-bold"
          className="adu:text-foreground-bold"
        >
          {name}
        </ContentText>
        <ContentText
          variant="link-sm"
          className="adu:text-foreground-bold adu:underline"
          asChild
        >
          <a href={profileUrl} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </ContentText>
      </div>
    </div>
  );
}

interface ProfileMenuTriggerProps {
  className?: string;
  selectedTenant?: TenantData | null;
  user: UserData;
}

function ProfileMenuTrigger({
  className,
  selectedTenant,
  user,
}: ProfileMenuTriggerProps) {
  const { profilePicture } = user;
  const initials = getInitials(user.name);
  return (
    <DropdownMenuTrigger
      className={cn(
        'adu:flex adu:w-8 adu:items-center adu:gap-2 adu:focus-visible:outline-hidden adu:lg:w-auto',
        className,
      )}
    >
      {selectedTenant && (
        <ContentText
          variant="button"
          className="adu:hidden adu:text-foreground-bold adu:lg:block"
          asChild
        >
          <span>{selectedTenant.name}</span>
        </ContentText>
      )}
      <Avatar className="adu:h-8 adu:w-8">
        <AvatarImage src={profilePicture} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <SvgIcon
        iconName="caret-down"
        className="adu:hidden adu:text-foreground adu:lg:block"
      />
    </DropdownMenuTrigger>
  );
}

interface ProfileMenuContentProps extends React.ComponentProps<'div'> {
  selectedTenant?: TenantData | null;
  user: UserData;
  dashboardBaseUrl: string;
  onSwitchTenant?: MouseEventHandler<HTMLDivElement>;
  onLogout?: MouseEventHandler<HTMLButtonElement>;
}

function ProfileMenuContent({
  className,
  dashboardBaseUrl,
  onSwitchTenant,
  onLogout,
  selectedTenant,
  user,
  ...props
}: ProfileMenuContentProps) {
  return (
    <div className={cn(className)} {...props}>
      <div className="adu:flex adu:shrink-0 adu:flex-col adu:gap-1 adu:py-2">
        {selectedTenant ? (
          <>
            <DropdownMenuItem className="adu:p-0">
              <Tenant
                highlightName={true}
                name={selectedTenant.name}
                flag={selectedTenant.flag}
                locality={selectedTenant.locality}
                loginUrl={selectedTenant.loginUrl}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ContentText
                className="adu:text-foreground-bold"
                variant="text-sm-bold"
                asChild
              >
                <a
                  className="no_external_icon"
                  href={`${dashboardBaseUrl}/dashboard/${selectedTenant.locality}/${selectedTenant.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SvgIcon iconName="grid" className="adu:mr-2" />
                  Open Dashboard
                </a>
              </ContentText>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSwitchTenant}>
              <SvgIcon iconName="refresh" className="adu:mr-2" />
              <ContentText
                className="adu:text-foreground-bold"
                variant="text-sm-bold"
              >
                Switch Tenant
              </ContentText>
              <SvgIcon iconName="caret-right" className="adu:ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <DropdownMenuItem
             className="adu:gap-2 adu:px-3 adu:py-2 adu:pt-3">
              <ContentText
                variant="text-sm-bold"
                className="adu:text-foreground-bold"
              >
                No tenant available
              </ContentText>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ContentText variant="text-sm" className="adu:text-foreground">
                You need a tenant to access the dashboard.
              </ContentText>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ContentText
                variant="link-sm"
                className="adu:text-foreground-bold adu:underline"
                asChild
              >
                <a
                  href={`${dashboardBaseUrl}/dashboard`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Create a tenant in the dashboard
                </a>
              </ContentText>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {user && (
          <DropdownMenuItem className="adu:p-0">
            <UserDetails
              name={user.name}
              profilePicture={user.profilePicture}
              profileUrl={user.profileUrl}
            />
          </DropdownMenuItem>
        )}
      </div>
      <DropdownMenuItem className="adu:h-14 adu:shrink-0 adu:items-center adu:justify-center adu:rounded-none adu:bg-surface-selected">
        <ContentText variant="button" className="adu:text-foreground" asChild>
          <button onClick={onLogout}>Log Out</button>
        </ContentText>
        <SvgIcon iconName="logout" className="adu:ml-2 adu:text-foreground" />
      </DropdownMenuItem>
    </div>
  );
}

export { ProfileMenuContent, ProfileMenuTrigger, type UserData };
