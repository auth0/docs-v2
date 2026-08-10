import { useRef, useState, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

interface SvgProps {
  iconName: string;
  className?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
  asChild?: boolean;
}

export function useDynamicSvgImport(iconName: string) {
  const importedIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);
    // dynamically import the mentioned svg icon name in props
    const importSvgIcon = async (): Promise<void> => {
      // please make sure all your svg icons are placed in the same directory
      try {
        // With vite-plugin-svgr, we can import SVG files directly as React components
        // by appending ?react to the import path
        const svgModule = await import(
          `../../assets/icons/${iconName}.svg?react`
        );
        importedIconRef.current = svgModule.default;
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
}

function SvgIcon({
  iconName,
  className,
  svgProp,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & SvgProps) {
  const { loading, SvgIcon: DynamicSvgIcon } = useDynamicSvgImport(iconName);
  const Comp = asChild ? Slot : 'span';

  return (
    <>
      {loading ? (
        <Comp
          data-slot="svg-icon"
          className={cn(
            'adu:inline-block adu:h-4 adu:w-4 adu:animate-pulse adu:rounded adu:bg-surface-muted',
            className,
          )}
          {...props}
        />
      ) : DynamicSvgIcon ? (
        <Comp
          data-slot="svg-icon"
          className={cn('adu:inline-block adu:text-foreground-icon', className)}
          {...props}
        >
          <DynamicSvgIcon {...svgProp} />
        </Comp>
      ) : null}
    </>
  );
}

export { SvgIcon };
