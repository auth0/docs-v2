import { twMerge } from 'tailwind-merge';

// Utility function for merging Tailwind classes
export const cn = (...classes: (string | undefined)[]): string => {
  return twMerge(classes.filter(Boolean).join(' '));
};

// Helper function to get display name from user
export const getDisplayName = (
  user: { user_name?: string; name?: string; email?: string } | null,
): string => {
  if (!user) return 'User';
  return user.name || user.user_name || user.email || 'User';
};

// Helper function to get avatar letter
export const getAvatarLetter = (displayName: string): string => {
  return displayName ? displayName.charAt(0).toUpperCase() : 'U';
};
