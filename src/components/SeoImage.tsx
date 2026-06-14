type SeoImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  onError?: () => void;
};

export default function SeoImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  onError,
}: SeoImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      onError={onError}
    />
  );
}
