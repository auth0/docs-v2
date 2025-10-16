import { cn } from '@/lib/utils';
import { SvgIcon } from './svg-icon';

interface FlagIconProps {
  className?: string;
  country: 'australia' | 'canada' | 'india' | 'japan' | 'uk' | 'us';
}

function FlagIcon(props: FlagIconProps) {
  const { className, country } = props;

  return (
    <SvgIcon
      iconName={`flag-${country}`}
      className={cn('adu:h-[18px] adu:w-[24px]', className)}
    />
  );
}

export { FlagIcon, type FlagIconProps };
