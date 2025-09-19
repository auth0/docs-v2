import React, { useState } from 'react';
import { cn, getUserDisplayName, getUserInitials } from '../utils';

export interface AvatarProps {
  user: {
    user_name?: string;
    name?: string;
    email?: string;
    picture?: string;
  } | null;
  size: 'small' | 'large';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ user, size, className }) => {
  const [imageError, setImageError] = useState(false);

  if (!user) return null;

  const displayName = getUserDisplayName(user);
  const avatarLetter = getUserInitials(user);
  const sizeClasses =
    size === 'small' ? 'w-5 h-5 text-xs' : 'w-10 h-10 text-base';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={cn(
        sizeClasses,
        'bg-adu-primary text-adu-primary-foreground flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
        className,
      )}
    >
      {user.picture && !imageError ? (
        <img
          src={user.picture}
          alt={displayName}
          className="h-full w-full rounded-full object-cover"
          onError={handleImageError}
        />
      ) : (
        avatarLetter
      )}
    </div>
  );
};
