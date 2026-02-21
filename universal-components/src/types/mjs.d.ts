declare module "*.mjs" {
  import type { ComponentType, ReactNode } from "react";

  export const Auth0ComponentProvider: ComponentType<{
    authDetails: Record<string, unknown>;
    themeSettings?: Record<string, unknown>;
    children: ReactNode;
  }>;

  export const useCoreClient: () => { coreClient: any };

  // Default export
  const component: ComponentType<any>;
  export default component;
}
