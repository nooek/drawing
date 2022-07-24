import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider from "../contexts/AuthContext"
import { CanvasProvider } from '../contexts/CanvasContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CanvasProvider>
        <Component {...pageProps} />
      </CanvasProvider>
    </AuthProvider>
  )
}

export default MyApp
