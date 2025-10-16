import { useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { cn } from '@/lib/utils';
import { rootStore } from '@/stores';

import { ProfileMenuContent, ProfileMenuTrigger } from './ui/profile-menu';
import { TenantMenuContent, type TenantData } from './ui/tenant-menu';
import { DropdownMenu, DropdownMenuContent } from './ui/dropdown-menu';
import { userLogout } from '@/lib/api';

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
      'adu:fill-mode-both adu:absolute adu:top-0 adu:left-0 adu:flex adu:w-full adu:flex-col';

    if (
      lastMenuAction === MenuAction.SWITCH_TENANT ||
      (selectedMenu === SelectedMenu.TENANT &&
        lastMenuAction === MenuAction.CLOSE)
    ) {
      return cn(
        className,
        'adu:animate-out adu:fade-out adu:slide-out-to-left',
      );
    }

    if (
      selectedMenu === SelectedMenu.PROFILE &&
      lastMenuAction === MenuAction.BACK
    ) {
      return cn(className, 'adu:animate-in adu:fade-in adu:slide-in-from-left');
    }

    return className;
  }, [selectedMenu, lastMenuAction]);

  const tenantMenuClasses = useMemo(() => {
    // had to add 2px to max height to avoid unnecessary scrollbar issue for smaller content
    const className =
      'adu:fill-mode-both adu:absolute adu:top-0 adu:flex adu:w-full adu:flex-col adu:py-2 adu:max-h-[calc(100%+2px)]';

    if (
      selectedMenu === SelectedMenu.TENANT &&
      lastMenuAction === MenuAction.SWITCH_TENANT
    ) {
      return cn(
        className,
        'adu:left-0 adu:animate-in adu:fade-in adu:slide-in-from-right',
      );
    }

    if (
      selectedMenu === SelectedMenu.PROFILE &&
      lastMenuAction === MenuAction.BACK
    ) {
      return cn(
        className,
        'adu:left-73 adu:animate-out adu:fade-out adu:slide-out-to-right',
      );
    }

    if (
      selectedMenu === SelectedMenu.TENANT &&
      lastMenuAction === MenuAction.CLOSE
    ) {
      return cn(className, 'adu:left-0');
    }

    return cn(className, 'adu:left-73');
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

const AuthMenu = observer(() => {
  const { sessionStore, tenantStore } = rootStore;
  const [menuState, menuActions, animationClasses, refs] = useMenuAnimation();

  const user = sessionStore.user;
  const selectedTenant = sessionStore.selectedTenant;
  const tenants = tenantStore.tenants;

  const handleSelectTenant = async (tenant: TenantData) => {
    try {
      const tenantLoginUrl = new URL(tenant.loginUrl);

      tenantLoginUrl.searchParams.append('returnTo', window.location.href);

      window.location.href = tenantLoginUrl.toString();
    } catch (error) {
      console.error('Failed to redirect to tenant login URL:', error);
      menuActions.closeMenu();
    }
  };

  if (!user || !selectedTenant) return null;

  return (
    <DropdownMenu open={menuState.isOpen} onOpenChange={menuActions.openMenu}>
      <ProfileMenuTrigger selectedTenant={selectedTenant} user={user} />
      <DropdownMenuContent
        className="adu:relative adu:max-h-74 adu:w-73 adu:overflow-hidden adu:p-0 adu:transition-[height] adu:ease-in-out"
        style={{ height: menuState.height }}
        align="end"
        onInteractOutside={menuActions.closeMenu}
      >
        <ProfileMenuContent
          ref={refs.profileMenuRef}
          onSwitchTenant={menuActions.openTenantMenu}
          className={animationClasses.profileMenuClasses}
          selectedTenant={selectedTenant}
          user={user}
          onLogout={() => {
            userLogout(window.location.href);
          }}
        />
        <TenantMenuContent
          ref={refs.tenantMenuRef}
          className={animationClasses.tenantMenuClasses}
          selectedTenant={selectedTenant}
          tenants={tenants}
          onBack={menuActions.openProfileMenu}
          onSelectTenant={handleSelectTenant}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export { AuthMenu };
