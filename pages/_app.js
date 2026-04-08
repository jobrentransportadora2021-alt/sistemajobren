"use client";
import '../styles/globals.css'; // Se você não tiver esse arquivo, crie um vazio em styles/globals.css

function MyApp({ Component, pageProps }) {
  return (
    <main className="font-sans">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
