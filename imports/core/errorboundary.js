import React from 'react';
import { NotificationManager } from 'react-notifications';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    this.error = error;
    // You can also log the error to an error reporting service
    console.error(error, info);
    NotificationManager.error('An error occurred');
  }

  render() {
    if (this.state && this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;