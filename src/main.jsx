import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
          <ToastContainer position="top-center" autoClose={3000} />
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </Provider>
    </HelmetProvider>
  </StrictMode>
)
