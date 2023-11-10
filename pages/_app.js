import { createGlobalStyle , ThemeProvider} from "styled-components"
import '../GlobalStyles.css';
import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from 'next-auth/react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false; 


const theme = {
  colors: {
    primary: '#FF0000',
    secondary: '#00FF00',
    text: '#000000',
  },
  fontSizes: {
    small: '12px',
    medium: '16px',
    large: '24px',
  },
};

export default function App({  Component, pageProps }) {


  return (
    <>
     <ThemeProvider theme={theme}>
        <CartContextProvider>
          <SessionProvider session={pageProps.session}> 
            <Component {...pageProps} />
          </SessionProvider>
        </CartContextProvider>
      </ThemeProvider>
    

    
    </>
  )
    
}
