import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './app/layout.tsx'

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {path: "/", element: <App />}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
