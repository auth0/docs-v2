import { type MouseEventHandler, useEffect, useRef } from 'react';

import {
  addRouteChangeListener,
  removeRouteChangeListener,
} from '@/lib/history';

import { DisplayText } from './display-text';

interface OptOutBannerProps {
  onOptOut: MouseEventHandler<HTMLButtonElement>;
}

function OptOutBanner({ onOptOut }: OptOutBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const updateBodyPadding = () => {
      const timerId = setInterval(() => {
        if (!isMounted) {
          clearInterval(timerId);
          return;
        }

        if (bannerRef.current) {
          clearInterval(timerId);
          const height = bannerRef.current.offsetHeight;
          document.body.style.paddingTop = `${height}px`;
          // Update CSS custom property for other components that might need it
          document.documentElement.style.setProperty(
            '--opt-out-banner-height',
            `${height}px`,
          );

          // fix navbar top positioning
          const navbar = document.getElementById('navbar');
          if (navbar) {
            navbar.style.top = `var(--opt-out-banner-height, 0)`;
          }
        }
      }, 100);
    };

    // Initial setup
    updateBodyPadding();

    window.addEventListener('resize', updateBodyPadding);
    addRouteChangeListener(updateBodyPadding);

    // Use ResizeObserver for more precise height changes
    const resizeObserver = new ResizeObserver(() => {
      updateBodyPadding();
    });

    if (bannerRef.current) {
      resizeObserver.observe(bannerRef.current);
    }

    return () => {
      // Cleanup
      isMounted = false;
      document.body.style.paddingTop = '';
      document.documentElement.style.removeProperty('--opt-out-banner-height');
      window.removeEventListener('resize', updateBodyPadding);
      removeRouteChangeListener(updateBodyPadding);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="adu:top-banner adu:fixed adu:top-0 adu:right-0 adu:left-0 adu:z-[39] adu:flex adu:flex-wrap adu:items-center adu:justify-center adu:gap-1 adu:bg-[#232220] adu:p-2.5 adu:text-center"
    >
      <DisplayText
        asChild
        variant="link-sm-bold"
        className="adu:banner-text adu:text-[#f4f4f4]"
      >
        <p>
          🚀 We've rolled out a new docs experience - faster, cleaner, and a
          better developer experience.
        </p>
      </DisplayText>
      <DisplayText
        asChild
        variant="link-sm-bold"
        className="adu:text-sm! adu:text-[#f4f4f4]! adu:underline adu:underline-offset-auto"
        style={{ textUnderlinePosition: 'from-font' }}
      >
        <button onClick={onOptOut}>Switch to old version</button>
      </DisplayText>
    </div>
  );
}

export { OptOutBanner };
