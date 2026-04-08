// pages/_app.js
import '@/styles/globals.css' // Esta linha é crucial!

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
