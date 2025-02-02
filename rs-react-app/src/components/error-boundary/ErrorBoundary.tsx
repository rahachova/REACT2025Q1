import { Component, ErrorInfo } from 'react';

interface IState {
  hasError: boolean;
}

interface IProps {
  children: JSX.Element;
}

export class ErrorBoundary extends Component<IProps, IState> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong...</div>;
    }

    return this.props.children;
  }
}
