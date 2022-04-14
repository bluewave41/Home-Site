import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Drawer from 'components/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const drawerWidth = 240;
    const username = props.pageProps.username;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Drawer width={drawerWidth} username={username} />
                <Box sx={{ marginLeft: drawerWidth + 10 + 'px' }}>
                    <Toolbar />
                    <Component {...pageProps} />
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const { ctx } = appContext;
    let props = {}
    if(ctx.req) {
        const { getSession } = await import("lib/get-session");
        const session = await getSession(ctx.req, ctx.res);
        props.username = session.user?.username;
    }
    console.log('CALLED');

    // calls page's `getInitialProps` and fills `appProps.pageProps`
    //const appProps = await App.getInitialProps(appContext);

    return {
        pageProps: props
    }
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};