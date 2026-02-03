/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from "react";

// Single import for all components
export const mintlifyLoader = () => import("../assets/index.mjs");

// Component key mapping
export const componentRoutes: Record<
  string,
  {
    LazyComponent: any;
    componentKey: string;
  }
> = {
  "domain-table-view": { LazyComponent: null, componentKey: "DomainTableView" },
  // Add more components:
  // "mfa-enrollment-view": { LazyComponent: null, componentKey: "MfaEnrollmentUI" },
};

// Create lazy components for each route
Object.entries(componentRoutes).forEach(([, route]) => {
  route.LazyComponent = lazy(() =>
    mintlifyLoader().then((m) => ({ default: (m as any)[route.componentKey] })),
  );
});
