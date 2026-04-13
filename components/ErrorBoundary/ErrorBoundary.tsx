'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  componentName?: string;
  resetKeys?: unknown[];
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo.componentStack);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.hasError && this.props.resetKeys) {
      const hasResetKeysChanged = !this.props.resetKeys.every(
        (key, index) => key === prevProps.resetKeys?.[index]
      );
      
      if (hasResetKeysChanged) {
        this.reset();
      }
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-fallback">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            minHeight: '200px',
            backgroundColor: '#1C1A17',
            color: '#8B7355',
            textAlign: 'center',
            fontFamily: "'Cinzel', serif",
          }}>
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              style={{ marginBottom: '16px', opacity: 0.6 }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 8h8M8 12h8M8 16h2" />
            </svg>
            <p style={{ margin: 0, fontSize: '14px' }}>
              {this.props.componentName 
                ? `Unable to load ${this.props.componentName}`
                : 'Something went wrong'}
            </p>
            <button
              onClick={this.reset}
              style={{
                marginTop: '16px',
                padding: '8px 24px',
                background: 'transparent',
                border: '1px solid #8B7355',
                color: '#8B7355',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                fontSize: '12px',
                letterSpacing: '0.1em',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  loading?: ReactNode;
}

interface AsyncErrorBoundaryState {
  hasError: boolean;
  isLoading: boolean;
}

export class AsyncErrorBoundary extends Component<AsyncErrorBoundaryProps, AsyncErrorBoundaryState> {
  constructor(props: AsyncErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, isLoading: false };
  }

  static getDerivedStateFromError(): AsyncErrorBoundaryState {
    return { hasError: true, isLoading: false };
  }

  retry = (): void => {
    this.setState({ hasError: false, isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 100);
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          minHeight: '100px',
          backgroundColor: '#1C1A17',
          color: '#8B7355',
          textAlign: 'center',
        }}>
          <p style={{ margin: '0 0 12px', fontSize: '13px' }}>Failed to load content</p>
          <button
            onClick={this.retry}
            style={{
              padding: '6px 16px',
              background: 'transparent',
              border: '1px solid #8B7355',
              color: '#8B7355',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    if (this.state.isLoading && this.props.loading) {
      return this.props.loading;
    }

    return this.props.children;
  }
}