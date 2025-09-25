import { cn, getInitials } from '@/lib/utils';
import { Tenant, type TenantData } from './tenant';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

interface ProfileMenuContentProps {
  className?: string;
  tenant: TenantData;
  user: UserData;
}

function ProfileMenuContent({
  className,
  tenant,
  user,
}: ProfileMenuContentProps) {
  return (
    <DropdownMenuContent
      className={cn('flex max-h-75 w-73 flex-col gap-1 py-2', className)}
    >
      <DropdownMenuItem className="p-0">
        <Tenant
          highlightName={true}
          name={tenant.name}
          flag={tenant.flag}
          locality={tenant.locality}
        />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <ContentText
          className="text-foreground-bold"
          variant="text-sm-bold"
          asChild
        >
          <a href="https://manage.auth0.com/" target="_blank" rel="noreferrer">
            <SvgIcon iconName="grid" className="mr-2" />
            Open Dashboard
          </a>
        </ContentText>
      </DropdownMenuItem>
      <DropdownMenuItem>
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
      <DropdownMenuItem className="bg-surface-selected -mx-2 -mb-2 h-14 items-center justify-center">
        <ContentText variant="button" className="text-foreground" asChild>
          <span>Log Out</span>
        </ContentText>
        <SvgIcon iconName="logout" className="text-foreground ml-2" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export { ProfileMenuContent };
