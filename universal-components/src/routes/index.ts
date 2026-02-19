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
};

// Create lazy components for each route
Object.entries(componentRoutes).forEach(([, route]) => {
  route.LazyComponent = lazy(() =>
    mintlifyLoader().then((m) => ({ default: (m as any)[route.componentKey] })),
  );
});
