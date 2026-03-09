interface Props {
  size?: 'banner' | 'rectangle' | 'leaderboard';
  className?: string;
}

const SIZES = {
  banner: { width: '100%', height: 90 },
  rectangle: { width: '100%', height: 250 },
  leaderboard: { width: '100%', height: 90 },
};

export default function AdBanner({ size = 'banner', className = '' }: Props) {
  const style = SIZES[size];
  return (
    <div className={`ad-placeholder ${className}`} style={{ ...style, minHeight: style.height }}>
      {/* Insertar código AdSense aquí */}
      {/* <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-XXXXXXXX" data-ad-slot="XXXXXXXX" data-ad-format="auto"></ins> */}
      <span>Publicidad</span>
    </div>
  );
}
