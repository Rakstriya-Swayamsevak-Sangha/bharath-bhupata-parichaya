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
        <div className="error-boundary-fallback animate-fade-in">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="text-primary/60 text-[10px] font-cinzel mb-2 uppercase tracking-[0.2em]">
              अपूर्णता (Incomplete)
            </div>
            <p className="text-textSecondary text-xs leading-relaxed max-w-[200px]">
              {this.props.componentName 
                ? `The ${this.props.componentName} module is temporarily unavailable.`
                : 'This section could not be loaded.'}
            </p>
            <button
              onClick={this.reset}
              className="mt-6 px-4 py-1.5 text-[10px] border border-primary/30 text-primary/70 hover:bg-primary/10 transition-all uppercase tracking-widest font-cinzel"
            >
              Retry Journey
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