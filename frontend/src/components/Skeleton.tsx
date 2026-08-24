interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  style?: React.CSSProperties;
}

function Skeleton({ width = '100%', height = 16, borderRadius = 6, style }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, var(--line) 25%, #EDEEF2 50%, var(--line) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-pulse 1.4s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

export default Skeleton;