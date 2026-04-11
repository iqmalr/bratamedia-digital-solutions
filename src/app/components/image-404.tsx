'use client'
import { useState } from 'react';
import Image from 'next/image';

/**
 * Image component with a fallback source on load error.
 *
 * When the `src` prop changes, pass a new `key` to this component from the
 * parent to reset internal state (e.g. key={src}). This avoids a useEffect
 * that would call setState synchronously and trigger cascading renders.
 */
export function FallbackImage({
    src,
    alt,
    width,
    height,
    className,
    fallbackSrc,
    priority,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    fallbackSrc: string;
    priority?: boolean;
}) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            onError={() => setImgSrc(fallbackSrc)}
        />
    );
}
