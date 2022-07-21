import '../styles/globals.css'
import { SSRProvider } from '@react-aria/ssr'
import { OverlayProvider } from '@react-aria/overlays'
import { globalCss } from 'stitches.config';
import { SessionProvider } from "next-auth/react"
import { ToastProvider } from 'components/Toast';





const globalStyles = globalCss({
  '*': { fontFamily: "'Quicksand', sans-serif", boxSizing: "border-box" },
  'html, body': {
    margin: 0, padding: 0,
  }

});
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)
  globalStyles()
  return <SessionProvider session={session} >
    <SSRProvider>
      {getLayout(
        <OverlayProvider>
          <ToastProvider>

            <Component {...pageProps} />

          </ToastProvider>
        </OverlayProvider>
      )}
    </SSRProvider>
  </SessionProvider>
}

export default MyApp
