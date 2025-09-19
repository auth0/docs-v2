import React from 'react';
import { cn, getDisplayName } from './utils';
import { Avatar } from './avatar';

export interface TriggerButtonProps {
  user: { user_name?: string; name?: string; email?: string; picture?: string };
  isOpen: boolean;
  onClick: () => void;
  isMobile?: boolean;
  className?: string;
}

export const TriggerButton: React.FC<TriggerButtonProps> = ({
  user,
  isOpen,
  onClick,
  className,
}) => {
  const displayName = getDisplayName(user);

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-transparent cursor-pointer text-sm font-medium text-adu-popover-foreground transition-all duration-200 ease-out hover:bg-adu-popover-foreground/10 border border-transparent hover:border-adu-popover-foreground/20',
        className,
      )}
      onClick={onClick}
    >
      <Avatar user={user} size="small" />
      <span className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
        {displayName}
      </span>
      <svg
        className={cn(
          'transition-transform duration-200 ease-out text-adu-popover-foreground/60 w-3 h-3',
          isOpen ? 'rotate-180' : '',
        )}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
