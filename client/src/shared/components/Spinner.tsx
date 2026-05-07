interface SpinnerProps {
  size?: 'sm' | 'default';
}

export function Spinner({ size = 'default' }: SpinnerProps) {
  if (size === 'sm') {
    return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />;
  }
  return (
    <div className="flex justify-center py-12">
      <div className="w-8 h-8 border-4 border-primary-muted border-t-primary rounded-full animate-spin" />
    </div>
  );
}
