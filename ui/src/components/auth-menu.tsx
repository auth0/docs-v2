import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { TenantMenuContent, type TenantData } from './ui/tenant';
import {
  ProfileMenuContent,
  ProfileMenuTrigger,
  type UserData,
} from './ui/profile-menu';
import { DisplayText } from './ui/display-text';
import { DropdownMenu, DropdownMenuContent } from './ui/dropdown-menu';

const SelectedMenu = {
  NONE: 'none',
  PROFILE: 'profile',
  TENANT: 'tenant',
} as const;

type SelectedMenu = (typeof SelectedMenu)[keyof typeof SelectedMenu];

const MenuAction = {
  OPEN: 'open',
  CLOSE: 'close',
  SWITCH_TENANT: 'switch_tenant',
  BACK: 'back',
} as const;

type MenuAction = (typeof MenuAction)[keyof typeof MenuAction];

interface MenuState {
  selectedMenu: SelectedMenu;
  lastMenuAction: MenuAction;
}

interface AnimationClasses {
  profileMenuClasses: string;
  tenantMenuClasses: string;
}

export function useMenuAnimation(): [
  MenuState & { isOpen: boolean },
  {
    openMenu: (open: boolean) => void;
    closeMenu: () => void;
    openTenantMenu: () => void;
    openProfileMenu: () => void;
  },
  AnimationClasses,
] {
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>(
    SelectedMenu.NONE,
  );
  const [lastMenuAction, setLastMenuAction] = useState<MenuAction>(
    MenuAction.CLOSE,
  );

  const isOpen = useMemo(
    () =>
      selectedMenu !== SelectedMenu.NONE && lastMenuAction !== MenuAction.CLOSE,
    [selectedMenu, lastMenuAction],
  );

  const openMenu = (open: boolean) => {
    if (!open) return;
    setSelectedMenu(SelectedMenu.PROFILE);
    setLastMenuAction(MenuAction.OPEN);
  };

  const closeMenu = () => {
    setLastMenuAction(MenuAction.CLOSE);
  };

  const openTenantMenu = () => {
    setSelectedMenu(SelectedMenu.TENANT);
    setLastMenuAction(MenuAction.SWITCH_TENANT);
  };

  const openProfileMenu = () => {
    setSelectedMenu(SelectedMenu.PROFILE);
    setLastMenuAction(MenuAction.BACK);
  };

  const profileMenuClasses = useMemo(() => {
    const className =
      'fill-mode-both absolute top-0 bottom-0 left-0 flex w-full flex-col';

    if (
      lastMenuAction === MenuAction.SWITCH_TENANT ||
      (selectedMenu === SelectedMenu.TENANT &&
        lastMenuAction === MenuAction.CLOSE)
    ) {
      return cn(className, 'animate-out fade-out slide-out-to-left');
    }

    if (
      selectedMenu === SelectedMenu.PROFILE &&
      lastMenuAction === MenuAction.BACK
    ) {
      return cn(className, 'animate-in fade-in slide-in-from-left');
    }

    return className;
  }, [selectedMenu, lastMenuAction]);

  const tenantMenuClasses = useMemo(() => {
    const className =
      'fill-mode-both absolute top-0 bottom-0 flex w-full flex-col py-2';

    if (
      selectedMenu === SelectedMenu.TENANT &&
      lastMenuAction === MenuAction.SWITCH_TENANT
    ) {
      return cn(className, 'animate-in fade-in slide-in-from-right left-0');
    }

    if (
      selectedMenu === SelectedMenu.PROFILE &&
      lastMenuAction === MenuAction.BACK
    ) {
      return cn(className, 'animate-out fade-out slide-out-to-right left-73');
    }

    if (
      selectedMenu === SelectedMenu.TENANT &&
      lastMenuAction === MenuAction.CLOSE
    ) {
      return cn(className, 'left-0');
    }

    return cn(className, 'left-73');
  }, [selectedMenu, lastMenuAction]);

  return [
    { selectedMenu, lastMenuAction, isOpen },
    { openMenu, closeMenu, openTenantMenu, openProfileMenu },
    { profileMenuClasses, tenantMenuClasses },
  ];
}

interface AuthMenuProps {
  tenant: TenantData;
  tenants: TenantData[];
  user: UserData;
}

function AuthMenu({ tenant, user, tenants }: AuthMenuProps) {
  const [menuState, menuActions, animationClasses] = useMenuAnimation();

  return (
    <>
      <DisplayText variant="heading-sm">Profile Menu</DisplayText>
      <DropdownMenu open={menuState.isOpen} onOpenChange={menuActions.openMenu}>
        <ProfileMenuTrigger tenant={tenant} user={user} />
        <DropdownMenuContent
          className="relative h-74 w-73 p-0"
          onInteractOutside={menuActions.closeMenu}
        >
          <ProfileMenuContent
            onSwitchTenant={menuActions.openTenantMenu}
            className={animationClasses.profileMenuClasses}
            tenant={tenant}
            user={user}
          />
          <TenantMenuContent
            className={animationClasses.tenantMenuClasses}
            tenants={tenants}
            onBack={menuActions.openProfileMenu}
            onSelectTenant={(tenant) => {
              console.log('Selected tenant:', tenant);
              menuActions.closeMenu();
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export { AuthMenu };
