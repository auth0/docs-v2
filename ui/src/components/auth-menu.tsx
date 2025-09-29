import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { TenantMenuContent, type TenantData } from './ui/tenant';
import {
  ProfileMenuContent,
  ProfileMenuTrigger,
  type UserData,
} from './ui/profile-menu';
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
  MenuState & { isOpen: boolean; height: number },
  {
    openMenu: (open: boolean) => void;
    closeMenu: () => void;
    openTenantMenu: () => void;
    openProfileMenu: () => void;
  },
  AnimationClasses,
  {
    profileMenuRef: React.RefObject<HTMLDivElement | null>;
    tenantMenuRef: React.RefObject<HTMLDivElement | null>;
  },
] {
  const [menuHeight, setMenuHeight] = useState<number>(296);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const tenantMenuRef = useRef<HTMLDivElement>(null);

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
      'fill-mode-both absolute top-0 left-0 flex w-full flex-col';

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
    // had to add 2px to max height to avoid unnecessary scrollbar issue for smaller content
    const className =
      'fill-mode-both absolute top-0 flex w-full flex-col py-2 max-h-[calc(100%+2px)]';

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

  // dynamically set height based on current menu content
  useEffect(() => {
    if (selectedMenu === SelectedMenu.PROFILE) {
      const height =
        profileMenuRef.current?.getBoundingClientRect().height ?? 296;
      setMenuHeight(height);
    } else if (selectedMenu === SelectedMenu.TENANT) {
      const height =
        tenantMenuRef.current?.getBoundingClientRect().height ?? 296;
      setMenuHeight(height);
    }
  }, [selectedMenu]);

  return [
    { selectedMenu, lastMenuAction, isOpen, height: menuHeight },
    { openMenu, closeMenu, openTenantMenu, openProfileMenu },
    { profileMenuClasses, tenantMenuClasses },
    { profileMenuRef, tenantMenuRef },
  ];
}

interface AuthMenuProps {
  tenant: TenantData;
  tenants: TenantData[];
  user: UserData;
}

function AuthMenu({ tenant, user, tenants }: AuthMenuProps) {
  const [menuState, menuActions, animationClasses, refs] = useMenuAnimation();

  return (
    <DropdownMenu open={menuState.isOpen} onOpenChange={menuActions.openMenu}>
      <ProfileMenuTrigger tenant={tenant} user={user} />
      <DropdownMenuContent
        className="relative max-h-74 w-73 overflow-hidden p-0 transition-[height] ease-in-out"
        style={{ height: menuState.height }}
        onInteractOutside={menuActions.closeMenu}
      >
        <ProfileMenuContent
          ref={refs.profileMenuRef}
          onSwitchTenant={menuActions.openTenantMenu}
          className={animationClasses.profileMenuClasses}
          tenant={tenant}
          user={user}
        />
        <TenantMenuContent
          ref={refs.tenantMenuRef}
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
  );
}

export { AuthMenu };
