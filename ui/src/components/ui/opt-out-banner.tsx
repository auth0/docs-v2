import { useEffect, useRef } from "react";
import { Button } from "./button";
import { config } from '../../lib/config';

function OptOutBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBodyPadding = () => {
      if (bannerRef.current) {
        const height = bannerRef.current.offsetHeight;
        document.body.style.paddingTop = `${height}px`;
        // Update CSS custom property for other components that might need it
        document.documentElement.style.setProperty('--opt-out-banner-height', `${height}px`);
      }
    };

    // Initial setup
    updateBodyPadding();

    // Update on window resize
    const handleResize = () => {
      updateBodyPadding();
    };

    window.addEventListener('resize', handleResize);

    // Use ResizeObserver for more precise height changes
    const resizeObserver = new ResizeObserver(() => {
      updateBodyPadding();
    });

    if (bannerRef.current) {
      resizeObserver.observe(bannerRef.current);
    }

    return () => {
      // Cleanup
      document.body.style.paddingTop = '';
      document.documentElement.style.removeProperty('--opt-out-banner-height');
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="adu:top-banner adu:font-aeonik adu:text-xs adu:fixed adu:top-0 adu:left-0 adu:right-0 adu:z-[9999] adu:bg-black adu:text-white adu:p-2"
    >
      <p className="adu:banner-text adu:text-center adu:flex adu:flex-wrap adu:items-center adu:justify-center adu:gap-2">
        🚀 We've rolled out a new docs experience - faster, cleaner, and a better developer experience.
        <Button variant="secondary" onClick={() => setCookieAndRefresh()}>
          Switch to old version
        </Button>
      </p>
    </div>
  );
}

async function setCookieAndRefresh() {
  console.log('Setting cookie and refreshing');
   try {
    // Make API call to set the UI preference
    const response = await fetch(`${config.apiBaseUrl}/rollout/consent`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ choice: 'opt_out' }),
      credentials: 'include', // Important for cookies
    });

    if (response.ok) {
      // Refresh the page to apply the new UI
      window.location.reload();
    } else {
      console.error('Failed to update consent');
    }
  } catch (error) {
    console.error('Error!', error);
}
}

export { OptOutBanner };
