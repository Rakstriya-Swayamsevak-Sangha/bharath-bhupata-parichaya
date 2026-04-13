'use client';

import React, { useState, useCallback, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  fallbackSrc?: string;
  fallbackColor?: string;
  hideOnError?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  onError?: (error: Error) => void;
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
  ...props
}: SafeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    setIsLoaded(true);
    
    if (onError) {
      onError(new Error(`Failed to load image: ${src}`));
    }

    const target = e.currentTarget;
    if (fallbackSrc && !hideOnError) {
      target.src = fallbackSrc;
    }
  }, [src, fallbackSrc, hideOnError, onError]);

  if (hideOnError && hasError) {
    return null;
  }

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

interface SafeBackgroundImageProps {
  src?: string;
  alt?: string;
  fallbackColor?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SafeBackgroundImage({
  src,
  alt,
  fallbackColor = '#3A2F24',
  children,
  className,
  style,
}: SafeBackgroundImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: fallbackColor,
    ...style,
  };

  const bgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: !hasError && src ? `url(${src})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
    zIndex: 0,
  };

  return (
    <div style={containerStyle} className={className}>
      {src && !hasError && (
        <img
          src={src}
          alt={alt || ''}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      <div style={bgStyle} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

interface LazyImageProps extends SafeImageProps {
  placeholder?: React.ReactNode;
}

export function LazyImage({
  placeholder,
  ...props
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setIsInView(true)}
      onFocus={() => setIsInView(true)}
    >
      {!isInView && placeholder ? (
        placeholder
      ) : (
        <SafeImage {...props} />
      )}
    </div>
  );
}