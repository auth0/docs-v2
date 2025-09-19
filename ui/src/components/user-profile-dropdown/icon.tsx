import React from 'react';

interface IconProps {
  name: 'dashboard' | 'refresh' | 'logout' | 'chevron-down' | 'check';
  className?: string;
  style?: React.CSSProperties;
}

const ICON_URLS = {
  dashboard: 'https://mintlify.b-cdn.net/v6.6.0/lucide/layout-grid.svg',
  refresh: 'https://mintlify.b-cdn.net/v6.6.0/lucide/refresh-ccw.svg',
  logout: 'https://mintlify.b-cdn.net/v6.6.0/lucide/log-out.svg',
  'chevron-down': 'https://mintlify.b-cdn.net/v6.6.0/lucide/chevron-down.svg',
  check: 'https://mintlify.b-cdn.net/v6.6.0/lucide/check.svg',
};

export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  style = {},
}) => {
  const iconUrl = ICON_URLS[name];

  return (
    <div
      className={`w-4 h-4 bg-adu-popover-foreground/60 ${className}`}
      style={{
        maskImage: `url(${iconUrl})`,
        WebkitMaskImage: `url(${iconUrl})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: '100%',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: '100%',
        ...style,
      }}
    />
  );
};
