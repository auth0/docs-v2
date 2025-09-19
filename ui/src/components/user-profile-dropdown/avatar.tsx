import React, { useState } from 'react';
import { cn, getDisplayName, getAvatarLetter } from './utils';

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

  const displayName = getDisplayName(user);
  const avatarLetter = getAvatarLetter(displayName);
  const sizeClasses =
    size === 'small' ? 'w-5 h-5 text-xs' : 'w-10 h-10 text-base';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={cn(
        sizeClasses,
        'rounded-full bg-adu-primary text-adu-primary-foreground flex items-center justify-center font-semibold overflow-hidden flex-shrink-0',
        className,
      )}
    >
      {user.picture && !imageError ? (
        <img
          src={user.picture}
          alt={displayName}
          className="w-full h-full object-cover rounded-full"
          onError={handleImageError}
        />
      ) : (
        avatarLetter
      )}
    </div>
  );
};
