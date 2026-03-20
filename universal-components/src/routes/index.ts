/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from "react";

// Single import for all components
export const mintlifyLoader = () =>
  import("@auth0/universal-components-react/spa");

// Component key mapping
export const componentRoutes: Record<
  string,
  {
    LazyComponent: any;
    componentKey: string;
  }
> = {
  "domain-table-view": { LazyComponent: null, componentKey: "DomainTableView" },
  "sso-provider-create": {
    LazyComponent: null,
    componentKey: "SsoProviderCreateView",
  },
  "sso-provider-edit": {
    LazyComponent: null,
    componentKey: "SsoProviderEditView",
  },
  "sso-provider-table": {
    LazyComponent: null,
    componentKey: "SsoProviderTableView",
  },
  "organization-details-edit": {
    LazyComponent: null,
    componentKey: "OrganizationDetailsEditView",
  },
  "user-mfa-management": {
    LazyComponent: null,
    componentKey: "UserMFAMgmtView",
  },
};

// Create lazy components for each route
Object.entries(componentRoutes).forEach(([, route]) => {
  route.LazyComponent = lazy(() =>
    mintlifyLoader().then((m) => ({ default: (m as any)[route.componentKey] })),
  );
});
