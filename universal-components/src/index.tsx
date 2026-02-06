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
import { detectColorScheme, setupPopperFix } from "./helpers/util";

// ==================== State & Cache ====================
let cachedModule: any = null;
const mountedRoots = new Map<HTMLElement, Root>();
let isScanning = false;
let routeChangeHandler: (() => void) | null = null;
let popperObserver: MutationObserver | null = null;
let themeObserver: MutationObserver | null = null;
let currentColorScheme: string | null = null;

// ==================== Helper Functions ====================
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

async function getWrapper(
  componentName: string,
): Promise<React.ComponentType<any> | null> {
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
    const mode = detectColorScheme();

    return (
      <Auth0ComponentProvider
        authDetails={{
          skipApiClients: true,
          domain: "example.auth0.com",
        }}
        themeSettings={{ theme: "default", mode }}
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

  return Wrapper;
}

// ==================== Mount/Unmount Functions ====================
function unmountAll() {
  mountedRoots.forEach((root) => {
    root.unmount();
  });
  mountedRoots.clear();
}

async function mountComponent(
  componentName: string,
  container: HTMLElement,
  props?: Record<string, unknown>,
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
    </StrictMode>,
  );
  mountedRoots.set(container, root);
}

async function scanAndMount() {
  if (isScanning) return;
  isScanning = true;

  // Unmount components that are no longer in DOM
  mountedRoots.forEach((root, container) => {
    if (!document.body.contains(container)) {
      root.unmount();
      mountedRoots.delete(container);
    }
  });

  // Mount new components
  const elements = document.querySelectorAll<HTMLElement>(
    "[data-uc-component]",
  );

  for (const el of elements) {
    if (mountedRoots.has(el)) continue;

    const name = el.dataset.ucComponent;
    if (!name) continue;

    let props = {};
    try {
      props = el.dataset.ucProps ? JSON.parse(el.dataset.ucProps) : {};
    } catch (e) {
      console.error("Failed to parse props:", e);
    }

    await mountComponent(name, el, props);
  }

  isScanning = false;
}

// ==================== Lifecycle Functions ====================
function cleanup() {
  if (routeChangeHandler) {
    removeRouteChangeListener(routeChangeHandler);
    routeChangeHandler = null;
  }
  if (popperObserver) {
    popperObserver.disconnect();
    popperObserver = null;
  }
  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
  unmountAll();
}

function setupThemeWatcher() {
  currentColorScheme = detectColorScheme();

  themeObserver = new MutationObserver(() => {
    const newColorScheme = detectColorScheme();

    // Check if color scheme actually changed
    if (currentColorScheme !== newColorScheme) {
      console.log(
        "Theme changed from",
        currentColorScheme,
        "to",
        newColorScheme,
      );
      currentColorScheme = newColorScheme;

      // Remount all components with new theme
      unmountAll();
      setTimeout(scanAndMount, 100);
    }
  });

  // Observe HTML element for style and class changes
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style", "class", "data-theme"],
  });
}

function main() {
  overrideHistoryMethods();

  // Setup popper fix
  popperObserver = setupPopperFix();

  // Scan on route change
  routeChangeHandler = () => {
    setTimeout(scanAndMount, 200);
  };
  addRouteChangeListener(routeChangeHandler);

  // Watch for theme changes
  setupThemeWatcher();

  // Initial scan
  if (document.readyState === "complete") {
    setTimeout(scanAndMount, 200);
  } else {
    window.addEventListener("load", () => setTimeout(scanAndMount, 200));
  }
}

// ==================== Setup cleanup handlers ====================
window.addEventListener("beforeunload", cleanup);
window.addEventListener("unload", cleanup);

// Start the application
main();
