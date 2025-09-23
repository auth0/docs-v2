// Core types for Auth0 Docs UI
export interface User {
  user_name: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface Tenant {
  name: string;
  loginUrl: string;
  overrideSubdomain?: string;
  accessToken?: string;
  environment: {
    id: string;
    apex: string;
    shortName: string;
    tag: 'development' | 'staging' | 'production';
    enabled: boolean;
    aliases: string[];
  };
}

// UI Component Props Types
export interface BaseComponentProps {
  className?: string;
}

// Theme types for adu- prefixed CSS variables
export type ThemeMode = 'light' | 'dark';

// Component composition types for presentational/container pattern
export type ComponentWithHooks<T extends Record<string, any>, P = {}> = (
  props: T & P,
) => React.ReactElement;

// Hook composition utility type
export type HookMap = Record<string, () => any>;

export type ComposeHooksReturnType<T extends HookMap> = {
  [K in keyof T]: ReturnType<T[K]>;
};
