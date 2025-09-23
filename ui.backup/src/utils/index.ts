import * as React from 'react';
import { HookMap, ComposeHooksReturnType } from '../types';

/**
 * Utility function to compose multiple hooks with a component
 * Follows the pattern described in llm-instructions.md
 */
export const composeHooks =
  <T extends HookMap>(hooks: T) =>
  <P extends Record<string, any>>(
    Component: React.ComponentType<ComposeHooksReturnType<T> & P>,
  ) =>
  (props: P): React.ReactElement => {
    const hookedProps = Object.fromEntries(
      Object.entries(hooks).map(([key, useHook]) => [key, useHook()]),
    ) as ComposeHooksReturnType<T>;

    return React.createElement(Component, { ...hookedProps, ...props });
  };

/**
 * Utility to combine class names with proper deduplication
 * Uses tailwind-merge for intelligent Tailwind class merging
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Utility to safely get user initials from user object
 */
export const getUserInitials = (
  user: { name?: string; user_name?: string } | null,
): string => {
  if (!user) return '';

  const displayName = user.name || user.user_name || '';
  if (displayName.includes(' ')) {
    const parts = displayName.split(' ');
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return displayName.slice(0, 2).toUpperCase();
};

/**
 * Utility to safely get user display name
 */
export const getUserDisplayName = (
  user: { name?: string; user_name?: string } | null,
): string => {
  if (!user) return '';
  return user.name || user.user_name || '';
};

/**
 * Utility to format tenant region display
 */
export const formatTenantRegion = (
  tenant: {
    environment: {
      shortName?: string;
      id: string;
    };
  } | null,
): string => {
  if (!tenant) return '';
  return `${tenant.environment.shortName || 'US'}-${tenant.environment.id}`;
};

/**
 * Utility for polling DOM elements (useful for Mintlify integration)
 */
export const pollForElement = (
  selector: string,
  timeout = 5000,
  interval = 100,
): Promise<Element> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const poll = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      if (Date.now() - startTime >= timeout) {
        reject(
          new Error(
            `Element with selector "${selector}" not found within ${timeout}ms`,
          ),
        );
        return;
      }

      setTimeout(poll, interval);
    };

    poll();
  });
};

/**
 * Utility to create a DOM observer for dynamic content changes
 */
export const createDOMObserver = (
  callback: (mutations: MutationRecord[]) => void,
  options: MutationObserverInit = { childList: true, subtree: true },
): MutationObserver => {
  const observer = new MutationObserver(callback);
  observer.observe(document.body, options);
  return observer;
};
