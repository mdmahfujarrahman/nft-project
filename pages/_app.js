// import components from next
import { ThemeProvider } from "next-themes";
import Script from "next/script";

// Import components
import { Footer, Navbar } from "../components";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
    return (
        <ThemeProvider attribute="class">
            <div className="dark:bg-nft-dark bg-white min-h-screen ">
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </div>
            <Script
                src="https://kit.fontawesome.com/aa323ad745.js"
                crossOrigin="anonymous"
            />
        </ThemeProvider>
    );
};
export default MyApp;
