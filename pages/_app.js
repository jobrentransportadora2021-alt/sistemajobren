// pages/_app.js
import '../styles/globals.css' // Alterado de '@/styles/...' para '../styles/...'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
