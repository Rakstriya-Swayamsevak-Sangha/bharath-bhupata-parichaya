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

const DEFAULT_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%233A2F24' width='400' height='300'/%3E%3Ctext fill='%238B7355' font-family='serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage unavailable%3C/text%3E%3C/svg%3E";

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
    
    // Try variants if provided
    if (variants && variantIndex.current < variants.length - 1 && !isRetrying.current) {
      isRetrying.current = true;
      variantIndex.current++;
      target.src = variants[variantIndex.current];
      return;
    }
    
    // Already tried all variants or no variants
    if (hasError) return;
    
    // Last attempt - try simple variations
    if (currentSrc && currentSrc.includes('/place-images/')) {
      const name = currentSrc.split('/place-images/').pop()?.split('.')[0];
      const dir = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1);
      if (name) {
        const tries = [
          dir + name + '.webp',
          dir + name + '.WEBP',
          dir + name.charAt(0).toUpperCase() + name.slice(1) + '.jpg',
        ];
        for (const t of tries) {
          if (t !== currentSrc) {
            variantIndex.current = 0;
            isRetrying.current = false;
            target.src = t;
            return;
          }
        }
      }
    }
    
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