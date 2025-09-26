import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { Suspense } from 'react'
import React from 'react'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() { }
  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}


function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App