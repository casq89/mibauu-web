import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
const fallbackImage = `/fallback.webp`;

export const ImageUI = ({ src, ...imageProps }: ImageProps) => {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src || fallbackImage);

  React.useEffect(() => {
    setImageSrc(src || fallbackImage);
  }, [src]);

  return (
    <Image
      className="mx-auto"
      width={200}
      height={0}
      src={loading ? fallbackImage : imageSrc}
      onError={() => setImageSrc(fallbackImage)}
      onLoad={() => setLoading(false)}
      {...imageProps}
    />
  );
};
