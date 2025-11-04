import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const namesArray = name.trim().split(' ');
  if (namesArray.length === 0) return '';
  if (namesArray.length === 1) return namesArray[0].charAt(0).toUpperCase();
  const firstInitial = namesArray[0].charAt(0).toUpperCase();
  const lastInitial = namesArray[namesArray.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}
