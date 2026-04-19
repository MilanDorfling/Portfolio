"use client";

import React from "react";
import DotBackground from "./DotBackground";

class BackgroundErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    const { children, fallback } = this.props;

    if (this.state.hasError) {
      return fallback;
    }

    return children;
  }
}

export default function SectionBackground({ background, fallback, children }) {
  const fallbackBackground = fallback ?? <DotBackground />;

  return (
    <>
      <BackgroundErrorBoundary fallback={fallbackBackground}>
        {background ?? fallbackBackground}
      </BackgroundErrorBoundary>
      {children}
    </>
  );
}