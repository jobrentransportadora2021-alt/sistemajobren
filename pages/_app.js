import '../styles/globals.css' // Esta linha "liga" o visual em todas as páginas

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
