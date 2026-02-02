/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";

import "./assets/styles.css";
import "./index.css";

import {
  overrideHistoryMethods,
  addRouteChangeListener,
  removeRouteChangeListener,
} from "./helpers/history";
import { getMockLogic } from "./mocks";
import { componentRoutes, mintlifyLoader } from "./routes";
import { setupPopperFix } from "./helpers/util";

// Cache for loaded module
let cachedModule: any = null;

async function getModule() {
  if (!cachedModule) {
    cachedModule = await mintlifyLoader();
  }
  return cachedModule;
}

function WaitForCoreClient({
  useCoreClient,
  children,
  fallback,
}: {
  useCoreClient: () => { coreClient: any };
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const { coreClient } = useCoreClient();
  if (!coreClient) return <>{fallback}</>;
  return <>{children}</>;
}

const wrapperCache: Record<string, React.ComponentType<any>> = {};

async function getWrapper(
  componentName: string
): Promise<React.ComponentType<any> | null> {
  if (wrapperCache[componentName]) {
    return wrapperCache[componentName];
  }

  const route = componentRoutes[componentName];
  if (!route) return null;

  const module = await getModule();
  const { Auth0ComponentProvider, useCoreClient } = module;
  const Component = module[route.componentKey];

  if (!Component) {
    console.error(`Component "${route.componentKey}" not found in module`);
    return null;
  }

  function Wrapper(props: Record<string, unknown>) {
    const logic = getMockLogic(componentName);

    return (
      <Auth0ComponentProvider
        authDetails={{
          skipApiClients: true,
          domain: "example.auth0.com", // Add domain here
        }}
        themeSettings={{ theme: "default", mode: "light" }}
      >
        <WaitForCoreClient
          useCoreClient={useCoreClient}
          fallback={<div>Initializing...</div>}
        >
          <Component logic={logic} {...props} />
        </WaitForCoreClient>
      </Auth0ComponentProvider>
    );
  }

  wrapperCache[componentName] = Wrapper;
  return Wrapper;
}

const mountedRoots = new Map<HTMLElement, Root>();

function unmountAll() {
  mountedRoots.forEach((root) => {
    root.unmount();
  });
  mountedRoots.clear();
}

async function mountComponent(
  componentName: string,
  container: HTMLElement,
  props?: Record<string, unknown>
) {
  if (mountedRoots.has(container)) return;

  const Wrapper = await getWrapper(componentName);
  if (!Wrapper) {
    console.error(`Component "${componentName}" not found`);
    return;
  }

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Wrapper {...props} />
    </StrictMode>
  );
  mountedRoots.set(container, root);
}

function scanAndMount() {
  console.log("scanAndMount called");
  // Unmount components that are no longer in DOM
  mountedRoots.forEach((root, container) => {
    if (!document.body.contains(container)) {
      root.unmount();
      mountedRoots.delete(container);
    }
  });

  // Mount new components
  document
    .querySelectorAll<HTMLElement>("[data-uc-component]")
    .forEach((el) => {
      const name = el.dataset.ucComponent;
      if (!name) return;

      let props = {};
      try {
        props = el.dataset.ucProps ? JSON.parse(el.dataset.ucProps) : {};
      } catch (e) {
        console.error("Failed to parse props:", e);
      }

      mountComponent(name, el, props);
    });
}

let routeChangeHandler: (() => void) | null = null;
let popperObserver: MutationObserver | null = null;

function main() {
  overrideHistoryMethods();
  
  // Setup popper fix after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      popperObserver = setupPopperFix();
    });
  } else {
    popperObserver = setupPopperFix();
  }
  
  // Scan on route change
  routeChangeHandler = () => {
    setTimeout(scanAndMount, 100);
  };
  addRouteChangeListener(routeChangeHandler);

  // Initial scan
  scanAndMount();
}

// Cleanup function (useful for HMR or SPA unmount)
function cleanup() {
  if (routeChangeHandler) {
    removeRouteChangeListener(routeChangeHandler);
    routeChangeHandler = null;
  }
  if (popperObserver) {
    popperObserver.disconnect();
    popperObserver = null;
  }
  unmountAll();
}

main();

// Export for external usage
export { cleanup };
