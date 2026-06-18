/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from 'react';

// Components (and hooks like `useCoreClient`) are exposed from the package root,
// while `Auth0ComponentProvider` lives on the `/spa` subpath. Merge both so the
// wrapper in `src/index.tsx` can destructure everything from a single module.
export const mintlifyLoader = () =>
  Promise.all([
    import('@auth0/universal-components-react'),
    import('@auth0/universal-components-react/spa'),
  ]).then(([components, provider]) => ({ ...components, ...provider }));

// Component key mapping
export const componentRoutes: Record<
  string,
  {
    LazyComponent: any;
    componentKey: string;
  }
> = {
  'domain-table-view': { LazyComponent: null, componentKey: 'DomainTableView' },
  'sso-provider-create': {
    LazyComponent: null,
    componentKey: 'SsoProviderCreateView',
  },
  'sso-provider-edit': {
    LazyComponent: null,
    componentKey: 'SsoProviderEditView',
  },
  'sso-provider-table': {
    LazyComponent: null,
    componentKey: 'SsoProviderTableView',
  },
  'organization-details-edit': {
    LazyComponent: null,
    componentKey: 'OrganizationDetailsEditView',
  },
  'user-mfa-management': {
    LazyComponent: null,
    componentKey: 'UserMFAMgmtView',
  },
};

// Create lazy components for each route
Object.entries(componentRoutes).forEach(([, route]) => {
  route.LazyComponent = lazy(() =>
    mintlifyLoader().then((m) => ({ default: (m as any)[route.componentKey] })),
  );
});
