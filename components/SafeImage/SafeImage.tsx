'use client';

import React, { useState, useCallback, useRef, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  fallbackSrc?: string;
  fallbackColor?: string;
  hideOnError?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  onError?: (error: Error) => void;
}

const DEFAULT_FALLBACK = '/fallback.svg';

/**
 * SafeImage — Deterministic image component.
 * 
 * NO retries. NO extension guessing. NO casing hacks.
 * If the provided src fails, it shows the fallback immediately.
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
  ...props
}: SafeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (hasError) return;

    setHasError(true);
    setIsLoaded(true);
    
    if (onError) onError(new Error(`Failed to load image: ${src}`));
    
    if (fallbackSrc && !hideOnError) {
      e.currentTarget.src = fallbackSrc;
    }
  }, [src, fallbackSrc, hideOnError, onError, hasError]);

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