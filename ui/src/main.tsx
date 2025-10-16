import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  Button,
  ContentText,
  DisplayText,
  FlagIcon,
  NavActions,
  OptOutBanner,
  SvgIcon,
} from '@/components';
import { getCurrentUser, patchRolloutConsent, userLogin } from '@/lib/api';
import { initOneTrust } from '@/lib/one-trust';
import { initRootStore } from './stores';

async function main() {
  window.addEventListener('adu:storeReady', () => {
    console.log('RootStore initialized');
  });

  await initRootStore();

  initOneTrust();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <OptOutBanner
          onOptOut={async () => {
            await patchRolloutConsent({ choice: 'opt_out' });
            window.heap.track('docs-v2:opt_out');
            window.location.reload();
          }}
        />
        <div className="adu:flex adu:flex-col adu:items-start adu:gap-8 adu:bg-page adu:p-4">
          <Button
            onClick={() => {
              document.body.classList.toggle('dark');
              window.heap.track('theme:toggle', {
                theme: document.body.classList.contains('dark')
                  ? 'dark'
                  : 'light',
              });
            }}
          >
            Toggle Theme
          </Button>

          <div className="adu:flex adu:gap-2">
            <Button
              variant="link"
              onClick={() => {
                userLogin(window.location.href);
              }}
            >
              Log In
            </Button>
            <Button variant="default">Sign Up</Button>
            <Button
              variant="default"
              onClick={async () => {
                const session = await getCurrentUser();
                console.log({ session });
              }}
            >
              Fetch Current User
            </Button>
            <Button variant="outline">Contact Us</Button>
          </div>

          <div className="adu:flex adu:gap-2">
            <SvgIcon iconName="check" />
            <FlagIcon country="australia" />
            <FlagIcon country="canada" />
            <FlagIcon country="india" />
            <FlagIcon country="japan" />
            <FlagIcon country="uk" />
            <FlagIcon country="us" />
          </div>

          <div className="adu:flex adu:flex-col adu:gap-2">
            <DisplayText variant="heading-sm">Profile Menu</DisplayText>
            <div className="adu:flex adu:gap-4">
              <div className="adu:flex adu:flex-col adu:gap-2">
                <ContentText variant="caption-sm">
                  With tenants menu's height smaller
                </ContentText>
                <NavActions className="adu:static" />
              </div>
              <div className="adu:flex adu:flex-col adu:gap-2">
                <ContentText variant="caption-sm">
                  With tenants menu's height larger
                </ContentText>
                <NavActions className="adu:static" />
              </div>
            </div>
          </div>

          <div className="adu:flex adu:flex-col adu:gap-2">
            <DisplayText variant="heading-sm">Nav Actions</DisplayText>
            <div className="adu:flex adu:gap-4">
              <div className="adu:flex adu:flex-col adu:gap-2">
                <ContentText variant="caption-sm">Without login</ContentText>

                <NavActions className="adu:static" />
                <Button
                  variant="default"
                  onClick={async () => {
                    const session = await getCurrentUser();
                    console.log({ session });
                  }}
                >
                  Fetch Current User
                </Button>
              </div>
              <div className="adu:flex adu:flex-col adu:gap-2">
                <ContentText variant="caption-sm">
                  With tenants menu's height larger
                </ContentText>
                <NavActions
                  className="adu:static"
                  // user={mockUser}
                  // tenants={mockTenants}
                />
              </div>
            </div>
          </div>

          <div className="adu:flex adu:flex-col adu:gap-2">
            <DisplayText variant="heading-lg">
              Display Heading Large
            </DisplayText>
            <DisplayText variant="heading-regular">
              Display Heading Regular
            </DisplayText>
            <DisplayText variant="heading-sm">
              Display Heading Small
            </DisplayText>
            <DisplayText variant="subtitle-regular">
              Display Subtitle Regular
            </DisplayText>
            <DisplayText variant="subtitle-sm">
              Display Subtitle Small
            </DisplayText>
            <DisplayText variant="link-regular">
              Display Link Regular
            </DisplayText>
            <DisplayText variant="link-sm">Display Link Small</DisplayText>
            <DisplayText variant="link-sm-bold">
              Display Link Small Bold
            </DisplayText>
          </div>

          <div className="adu:flex adu:flex-col adu:gap-2">
            <ContentText variant="heading-lg">
              Content Heading Large
            </ContentText>
            <ContentText variant="heading-regular">
              Content Heading Regular
            </ContentText>
            <ContentText variant="heading-sm">
              Content Heading Small
            </ContentText>
            <ContentText variant="heading-overline">
              Content Heading Overline
            </ContentText>
            <ContentText variant="subtitle-regular">
              Content Subtitle Regular
            </ContentText>
            <ContentText variant="subtitle-sm">
              Content Subtitle Small
            </ContentText>
            <ContentText variant="text-regular">
              Content Text Regular
            </ContentText>
            <ContentText variant="text-bold">Content Text Bold</ContentText>
            <ContentText variant="text-sm">Content Text Small</ContentText>
            <ContentText variant="text-sm-bold">
              Content Text Small Bold
            </ContentText>
            <ContentText variant="text-xs">
              Content Text Extra Small
            </ContentText>
            <ContentText variant="caption-lg">
              Content Caption Large
            </ContentText>
            <ContentText variant="caption-sm">
              Content Caption Small
            </ContentText>
            <ContentText variant="list" asChild>
              <ul>
                <li>List Item 1</li>
                <li>List Item 2</li>
                <li>List Item 3</li>
              </ul>
            </ContentText>
            <ContentText variant="button" asChild>
              <button type="button">Content Button</button>
            </ContentText>
            <ContentText variant="link-regular" asChild>
              <a href="#">Content Link Regular</a>
            </ContentText>
            <ContentText variant="link-sm" asChild>
              <a href="#">Content Link Small</a>
            </ContentText>
            <ContentText variant="code" asChild>
              <pre>
                {`function helloWorld() {
  console.log("Hello, world!");
}`}
              </pre>
            </ContentText>
            <ContentText variant="code-sm" asChild>
              <code>{`const x = 10;`}</code>
            </ContentText>
          </div>
        </div>
    </StrictMode>,
  );
}

main();
