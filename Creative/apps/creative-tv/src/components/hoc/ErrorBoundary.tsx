import React from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
}
interface Props {
  children: React.ReactNode;
  fallback: (error: Error | null) => React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an error reporting service
    logErrorToService(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // You could render any custom fallback UI
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}

function logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
  // Log the error to a service or console
  console.error('Logging to the service:', error, errorInfo);
}