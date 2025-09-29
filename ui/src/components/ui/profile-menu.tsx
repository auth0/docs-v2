import { cn, getInitials } from '@/lib/utils';
import { Tenant, type TenantData } from './tenant';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { SvgIcon } from './svg-icon';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { ContentText } from './content-text';
import type { MouseEventHandler } from 'react';

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
    <div className={cn('flex w-full items-center gap-3 px-3 py-2', className)}>
      <Avatar className="h-9 w-9">
        <AvatarImage src={profilePicture} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-1">
        <ContentText variant="text-sm-bold" className="text-foreground-bold">
          {name}
        </ContentText>
        <ContentText
          variant="link-sm"
          className="text-foreground-bold underline"
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
  selectedTenant: TenantData;
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
      className={cn('flex w-8 items-center gap-2 md:w-auto', className)}
    >
      <ContentText
        variant="button"
        className="text-foreground-bold hidden md:block"
        asChild
      >
        <span>{selectedTenant.name}</span>
      </ContentText>
      <Avatar className="h-8 w-8">
        <AvatarImage src={profilePicture} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <SvgIcon
        iconName="caret-down"
        className="text-foreground hidden md:block"
      />
    </DropdownMenuTrigger>
  );
}

interface ProfileMenuContentProps extends React.ComponentProps<'div'> {
  selectedTenant: TenantData;
  user: UserData;
  onSwitchTenant?: MouseEventHandler<HTMLDivElement>;
}

function ProfileMenuContent({
  className,
  selectedTenant,
  user,
  onSwitchTenant,
  ...props
}: ProfileMenuContentProps) {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex shrink-0 flex-col gap-1 py-2">
        <DropdownMenuItem className="p-0">
          <Tenant
            highlightName={true}
            name={selectedTenant.name}
            flag={selectedTenant.flag}
            locality={selectedTenant.locality}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ContentText
            className="text-foreground-bold"
            variant="text-sm-bold"
            asChild
          >
            <a
              href="https://manage.auth0.com/"
              target="_blank"
              rel="noreferrer"
            >
              <SvgIcon iconName="grid" className="mr-2" />
              Open Dashboard
            </a>
          </ContentText>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSwitchTenant}>
          <SvgIcon iconName="refresh" className="mr-2" />
          <ContentText className="text-foreground-bold" variant="text-sm-bold">
            Switch Tenant
          </ContentText>
          <SvgIcon iconName="caret-right" className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <UserDetails
            name={user.name}
            profilePicture={user.profilePicture}
            profileUrl={user.profileUrl}
          />
        </DropdownMenuItem>
      </div>
      <DropdownMenuItem className="bg-surface-selected h-14 shrink-0 items-center justify-center rounded-none">
        <ContentText variant="button" className="text-foreground" asChild>
          <span>Log Out</span>
        </ContentText>
        <SvgIcon iconName="logout" className="text-foreground ml-2" />
      </DropdownMenuItem>
    </div>
  );
}

export { ProfileMenuContent, ProfileMenuTrigger, type UserData };
