interface SpinnerProps {
  size?: 'sm' | 'default';
}

export function Spinner({ size = 'default' }: SpinnerProps) {
  if (size === 'sm') {
    return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />;
  }
  return (
    <div className="spinner-wrapper">
      <div className="spinner-track" />
    </div>
  );
}
