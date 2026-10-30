import React from 'react';
import Head from '@docusaurus/Head';

export default function Root({ children }) {
    return (
        <>
            <Head>
                <html data-theme="dark" data-theme-choice="dark" />
                <meta name="color-scheme" content="dark" />
            </Head>
            {children}
        </>
    );
}
