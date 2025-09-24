import { cn } from '@/lib/utils';
import { useRef, useState, useEffect } from 'react';

interface SvgProps {
  iconName: string;
  className?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
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

function SvgIcon(props: SvgProps) {
  const { iconName, className, svgProp } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading ? (
        <span
          className={cn(
            'bg-muted-foreground inline-block h-4 w-4 animate-pulse rounded',
            className,
          )}
        />
      ) : SvgIcon ? (
        <span className={cn('inline-block', className)}>
          <SvgIcon {...svgProp} />
        </span>
      ) : null}
    </>
  );
}

export { SvgIcon };
