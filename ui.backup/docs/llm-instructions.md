# Auth0 Docs UI Library

This library is the used to customize and fill the gaps in Mintlify UI components for Auth0 Docs.

It does the following:

1. Provides a AuthStore to manage authentication state using mobx.
2. Few custom components like UserProfileDropdown to handle user profile and tenant switching.
3. Utility functions for components.
4. Storybook stories for components to facilitate testing and documentation.

We use internal `npm` registry so to authenticate, always run following command after starting a new terminal:

```
nvm use v24 && eval "$(ocm handler init)"
```

## Architecture

Since there are many moving parts, here is a high level overview of the architecture:

- `/main`: The main auth0 docs' content which is consumed by the Mintlify to render the docs. To run it locally, we use `mint` cli and run `mint dev`.
- `/ui`: The UI library which contains the components, stores, utils and stories. This is a standalone React library which is consumed by the main docs.
- `docs-backend`: The backend service which handles authentication and tenant management.

To integrate the UI library with the main docs, we create a umd bundle of the library and copy the bundle to the `/main/ui` directory. Any `.js` or `.css` files in this directory are automatically included by Mintlify.

It will have an entry point `index.ts` which will wait for the ready event and then render the components in the appropriate places. For example, to customize the navbar, we will query an element with selector `.topbar-right-container` and poll for it to be available. Once available, we will render the `TopRightContainer` component using react-dom's `createRoot` method.

For some reference, here is the html structure of the navbar from Mintlify:

<description>
  <summary>Navbar HTML structure</summary>

```html
<div
  id="navbar"
  class="peer is-custom peer is-not-center peer is-not-wide peer is-not-frame fixed top-0 z-30 w-full lg:sticky"
>
  <div
    class="absolute z-10 h-full w-full border-b border-gray-100 dark:border-gray-800"
  ></div>
  <div
    class="bg-background-light dark:bg-background-dark absolute inset-0 z-0"
  ></div>
  <div class="max-w-8xl relative z-10 mx-auto px-0 lg:px-5">
    <div class="relative">
      <div class="mx-4 flex h-14 min-w-0 items-center lg:mx-0 lg:px-4">
        <div class="relative flex h-full min-w-0 flex-1 items-center gap-x-4">
          <div class="flex flex-1 items-center gap-x-4">
            <a href="https://auth0-migration.mintlify.app/"
              ><span class="sr-only"
                >Auth0 Docs<!-- -->
                home page</span
              ><img
                class="nav-logo relative block h-6 w-auto object-contain dark:hidden"
                src="https://mintlify.s3.us-west-1.amazonaws.com/auth0/logo/light.svg"
                alt="light logo" /><img
                class="nav-logo relative hidden h-6 w-auto object-contain dark:block"
                src="https://mintlify.s3.us-west-1.amazonaws.com/auth0/logo/dark.svg"
                alt="dark logo"
            /></a>
            <div class="hidden items-center gap-x-2 lg:flex"></div>
          </div>
          <div
            class="relative hidden flex-1 items-center justify-center lg:flex"
          >
            <button
              type="button"
              class="focus:outline-primary pointer-events-auto flex h-9 w-full max-w-sm min-w-[43px] items-center justify-between gap-2 truncate rounded-full border-none bg-gray-950/[0.03] pr-3 pl-3.5 text-sm leading-6 text-gray-500 shadow-none ring-0 ring-gray-400/20 hover:bg-gray-950/10 hover:ring-gray-600/25 dark:bg-white/[0.03] dark:text-white/50 dark:ring-0 dark:ring-gray-600/30 dark:brightness-[1.1] dark:hover:bg-white/10 dark:hover:ring-gray-500/30 dark:hover:brightness-[1.25]"
              id="search-bar-entry"
            >
              <div class="flex min-w-[42px] items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-search min-w-4 flex-none text-gray-700 hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-200"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <div class="min-w-0 truncate">Search...</div>
              </div>
              <span class="flex-none text-xs font-semibold">⌘<!-- -->K</span>
            </button>
          </div>
          <div
            class="topbar-right-container ml-auto hidden flex-1 items-center justify-end gap-2 lg:flex"
          >
            <div class="relative flex items-center justify-end space-x-4">
              <nav class="text-sm">
                <ul class="flex items-center gap-2">
                  <li class="navbar-link">
                    <a
                      href="https://auth0.auth0.com/u/login/"
                      class="flex items-center gap-2 rounded-full bg-gray-950/[0.03] px-[14px] py-2 font-medium whitespace-nowrap text-gray-800 hover:bg-gray-950/10 dark:bg-white/[0.03] dark:text-gray-50 dark:hover:bg-white/10"
                      target="_blank"
                      >Log In</a
                    >
                  </li>
                  <li class="navbar-link">
                    <a
                      href="https://auth0.com/get-started?place=header&amp;type=button&amp;text=talk%20to%20sales"
                      class="flex items-center gap-2 rounded-full bg-gray-950/[0.03] px-[14px] py-2 font-medium whitespace-nowrap text-gray-800 hover:bg-gray-950/10 dark:bg-white/[0.03] dark:text-gray-50 dark:hover:bg-white/10"
                      target="_blank"
                      >Contact Sales</a
                    >
                  </li>
                  <li class="block lg:hidden">
                    <a
                      class="flex items-center gap-2 rounded-full bg-gray-950/[0.03] px-[14px] py-2 font-medium whitespace-nowrap text-gray-800 hover:bg-gray-950/10 dark:bg-white/[0.03] dark:text-gray-50 dark:hover:bg-white/10"
                      href="https://auth0.com/signup"
                      >Sign Up</a
                    >
                  </li>
                  <li
                    class="hidden whitespace-nowrap lg:flex"
                    id="topbar-cta-button"
                  >
                    <a
                      target="_blank"
                      class="group relative inline-flex items-center px-4 py-1.5 text-sm font-medium"
                      href="https://auth0.com/signup"
                      ><span
                        class="bg-primary-dark absolute inset-0 rounded-full group-hover:opacity-[0.9]"
                      ></span>
                      <div class="mr-0.5 flex items-center space-x-2.5">
                        <span class="z-10 text-white">Sign Up</span
                        ><svg
                          width="3"
                          height="24"
                          viewBox="0 -9 3 24"
                          class="h-5 rotate-0 overflow-visible text-white/90"
                        >
                          <path
                            d="M0 0L3 3L0 6"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>
                        </svg></div
                    ></a>
                  </li>
                </ul>
              </nav>
            </div>
            <button
              class="group flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-800/[0.04] p-2 dark:bg-white/10"
              aria-label="Toggle dark mode"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="block h-4 w-4 text-gray-600 group-hover:text-gray-800 dark:hidden"
              >
                <g clip-path="url(#clip0_2880_7340)">
                  <path
                    d="M8 1.11133V2.00022"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12.8711 3.12891L12.2427 3.75735"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M14.8889 8H14"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12.8711 12.8711L12.2427 12.2427"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M8 14.8889V14"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M3.12891 12.8711L3.75735 12.2427"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M1.11133 8H2.00022"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M3.12891 3.12891L3.75735 3.75735"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M8.00043 11.7782C10.0868 11.7782 11.7782 10.0868 11.7782 8.00043C11.7782 5.91402 10.0868 4.22266 8.00043 4.22266C5.91402 4.22266 4.22266 5.91402 4.22266 8.00043C4.22266 10.0868 5.91402 11.7782 8.00043 11.7782Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_2880_7340">
                    <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
                </defs></svg
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-moon hidden h-4 w-4 text-gray-300 dark:block dark:group-hover:text-gray-100"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              id="search-bar-entry-mobile"
            >
              <span class="sr-only">Search...</span
              ><svg
                class="h-4 w-4 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300"
                style="-webkit-mask-image:url(https://d3gk2c5xim1je2.cloudfront.net/v6.6.0/solid/magnifying-glass.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;mask-image:url(https://d3gk2c5xim1je2.cloudfront.net/v6.6.0/solid/magnifying-glass.svg);mask-repeat:no-repeat;mask-position:center"
              ></svg></button
            ><button
              aria-label="More actions"
              class="flex h-7 w-5 items-center justify-end"
            >
              <svg
                class="h-4 w-4 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300"
                style="-webkit-mask-image:url(https://d3gk2c5xim1je2.cloudfront.net/v6.6.0/solid/ellipsis-vertical.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;mask-image:url(https://d3gk2c5xim1je2.cloudfront.net/v6.6.0/solid/ellipsis-vertical.svg);mask-repeat:no-repeat;mask-position:center"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="flex h-14 w-full items-center px-5 py-4 text-left focus:outline-none lg:hidden"
      >
        <div
          class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span class="sr-only">Navigation</span
          ><svg
            class="h-4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
    <div class="hidden h-10 px-4 lg:flex">
      <div class="nav-tabs flex h-full gap-x-6 text-sm">
        <a
          class="link nav-tabs-item group text-primary dark:text-primary-light hover:text-primary dark:hover:text-primary-light relative flex h-full items-center gap-2 font-semibold"
          href="/"
          >Home
          <div
            class="bg-primary dark:bg-primary-light absolute bottom-0 h-px w-full"
          ></div></a
        ><a
          class="link nav-tabs-item group relative flex h-full items-center gap-2 font-medium text-gray-800 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300"
          href="/docs/get-started"
          >Documentation
          <div
            class="absolute bottom-0 h-px w-full group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
          ></div></a
        ><a
          class="link nav-tabs-item group relative flex h-full items-center gap-2 font-medium text-gray-800 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300"
          href="/docs/quickstarts"
          >Quickstarts
          <div
            class="absolute bottom-0 h-px w-full group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
          ></div></a
        ><a
          class="link nav-tabs-item group relative flex h-full items-center gap-2 font-medium text-gray-800 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300"
          href="/api"
          >API Reference
          <div
            class="absolute bottom-0 h-px w-full group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
          ></div></a
        ><a
          class="link nav-tabs-item group relative flex h-full items-center gap-2 font-medium text-gray-800 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300"
          href="/docs/libraries"
          >SDKs
          <div
            class="absolute bottom-0 h-px w-full group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
          ></div
        ></a>
      </div>
    </div>
  </div>
</div>
```

</description>

To keep the css scoped to the library, we use css modules and prefix all classes with `adu-` (Auth0 Docs UI).

The library is built using `vite`.

### Principles

- Use mobx for state management.
- Use sadhcn/ui (a headless component library built on radix-ui) and tailwindcss for building components.
- Use `clsx` for conditional class names.
- Keep all components deboupled from global state as much as possible.
- The AuthStore is a singleton is exposed via a React context to be used by components. A hook `useAuthStore` is provided to access the store.
- Use functional components and hooks.
- Use TypeScript for type safety.
- Use Storybook for component development and testing.
- Follow presentational and container component pattern.
  - All the business logic should be in a custom hook or the store.
  - Presentational components should receive all data and callbacks via props exposed by custom hooks.
  - A higher order component (HOC) to connect all custom hooks and presentational components.
  - Example:
    ```jsx
    const useForm = () => {
      const [name, setName] = useState('');
      const onChange = (e) => setName(e.target.value);
      return { name, onChange };
    };
    // Other props (in this case `icon`) can be passed in separately
    const FormView = ({ form: { name, onChange }, icon }) => (
      <div className="App">
        <div>{icon}</div>
        <h1>Hello, {name}!</h1>
        <input value={name} onChange={onChange} />
      </div>
    );
    export const Form = composeHooks({ form: useForm })(FormView);
    ```
  - The `composeHooks` can be implemented as:
    ```jsx
    const composeHooks = (hooks) => (Component) => (props) => {
      const hookedProps = Object.fromEntries(
        Object.entries(hooks).map(([key, useHook]) => [key, useHook()]),
      );
      return <Component {...hookedProps} {...props} />;
    };
    ```
  - Use theme tokens instead of using tailwind classes directly in components for colors.
  - Make sure to add dark mode support for all components.

## Components

- `TopRightContainer`: The top right container in the navbar which contains the login, sign button when user is unauthenticated and user profile dropdown when user is authenticated. A contact us button is always shown.
- `UserProfileDropdown`: It shows current selected tenant name and an avatar for the user. On clicking, it shows a dropdown menu with following details:
  - Tenant name
  - Contry flag for the locality of the tenant followed by the locality name (e.g. US-4)
  - Open dashboard button which opens the auth0 dashboard in a new tab.
  - A switch tenant expandable list which shows all the tenants user has access to. On clicking a tenant, it switches to that tenant and triggers a redirect for tenant authentication.
  - User Avatar, name and view profile button which opens the auth0 dashboard in a new tab.
  - Logout button which logs out the user.
- `Avatar`: Shows the user avatar. If picture is not available, shows the initials of the user.
- `TenantList`: Shows the list of tenants in the switch tenant expandable list. It has a default max height and scrolls if the number of tenants exceed that height.
- `TenantListItem`: Shows a single tenant item in the tenant list with the tenant name and locality flag.
