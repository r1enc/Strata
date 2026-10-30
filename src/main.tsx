import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'

/**
 * Temporary root entry point — replaced by extension-specific pages in Phase 1.
 * (popup, options, background service worker, content scripts)
 */
// eslint-disable-next-line react-refresh/only-export-components -- Phase 0 stub; replaced in Phase 1
function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-semibold">Strata — Phase 0 ✅</h1>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
