'use client';

import React, { useState, useCallback, useRef, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  fallbackSrc?: string;
  fallbackColor?: string;
  hideOnError?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  onError?: (error: Error) => void;
  variants?: string[];
}

const DEFAULT_FALLBACK = '/fallback.svg';

/**
 * SafeImage — Production-grade image component with multi-layer fallback:
 * 1. Try variants if provided (e.g., .webp, .avif, .jpg)
 * 2. Try case-corrected extensions
 * 3. Return fallback SVG (never shows broken image icon)
 *
 * CRITICAL: This component MUST handle ALL errors gracefully.
 * Console must NEVER show unhandled image failures.
 */
export function SafeImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  fallbackColor = '#3A2F24',
  hideOnError = false,
  aspectRatio,
  objectFit = 'cover',
  onError,
  style,
  className,
  variants,
  ...props
}: SafeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const variantIndex = useRef(0);
  const isRetrying = useRef(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;

    // Layer 1: Try provided variants (e.g., webp → avif → jpg)
    if (variants && variantIndex.current < variants.length - 1 && !isRetrying.current) {
      isRetrying.current = true;
      variantIndex.current++;
      target.src = variants[variantIndex.current];
      return;
    }

    // Layer 2: Try common case/extension variations for place-images
    if (currentSrc && currentSrc.includes('/place-images/') && !isRetrying.current) {
      isRetrying.current = true;
      const name = currentSrc.split('/place-images/').pop()?.split('.')[0];
      const dir = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1);
      if (name) {
        const tries = [
          dir + name + '.webp',
          dir + name + '.WEBP',
          dir + name + '.jpg',
          dir + name + '.JPG',
          dir + name + '.png',
          dir + name + '.avif',
          dir + name + '.AVIF',
          // Case variations for mixed-case filenames like Mahanadi, Godavari, Narmada
          dir + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + '.jpg',
          dir + name.charAt(0).toUpperCase() + name.slice(1) + '.jpg',
          dir + name.toUpperCase() + '.jpg',
        ];
        for (const t of tries) {
          if (t !== currentSrc) {
            variantIndex.current = 0;
            target.src = t;
            return;
          }
        }
      }
    }

    // Layer 3: FINAL fallback — NEVER fail visibly
    if (hasError) return;

    setHasError(true);
    setIsLoaded(true);
    if (onError) onError(new Error(`Failed to load image: ${src}`));
    if (fallbackSrc && !hideOnError) target.src = fallbackSrc;
  }, [src, fallbackSrc, hideOnError, onError, hasError, variants]);

  if (hideOnError && hasError) return null;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    backgroundColor: fallbackColor,
    overflow: 'hidden',
    ...(aspectRatio && { aspectRatio }),
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  return (
    <div style={containerStyle} className={className}>
      <img
        src={src}
        alt={alt || ''}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}