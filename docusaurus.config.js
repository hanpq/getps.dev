module.exports = {
    title: 'GetPS.dev',
    tagline: 'Getps.dev provides a portal of powershell scripts, modules, blog, knowledge base, tutorials, guides, tips and tricks',
    //url: 'https://pensive-darwin-90a9ff.netlify.app',
    url: 'https://getps.dev',
    baseUrl: '/',
    future: {
        experimental_faster: true,
    },
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/powershell_orange2.ico',
    organizationName: 'hanpq', // Usually your GitHub org/user name.
    projectName: 'getps.dev', // Usually your repo name.
    themeConfig: {
        algolia: {
            indexName: 'getps',
            appId: 'JW8FXUKUSV',
            apiKey: '5f1b4925f6675a91a4e7ddcefb438b9b',
        },
        sidebar: {
            hideable: true,
        },
        //announcementBar: {
        //    id: 'underdev', // Any value that will identify this message.
        //    content:
        //        'This site is still under development',
        //    backgroundColor: '#ffdab3', // Defaults to `#fff`.
        //    textColor: '#000', // Defaults to `#000`.
        //    isCloseable: true, // Defaults to `true`.
        //},
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: true,
        },
        prism: {
            additionalLanguages: ['powershell'],
        },
        navbar: {
            title: 'getps.dev',
            logo: {
                alt: 'My Site Logo',
                src: 'img/powershell_orange.png',
            },
            items: [
                {
                    to: 'docs',
                    activeBasePath: 'docs',
                    label: 'Knowledge Base',
                    position: 'left',
                },
                {
                    to: 'milestones',
                    activeBasePath: 'milestones',
                    label: 'Milestones',
                    position: 'left',
                },
                {
                    to: 'modules',
                    activeBasePath: 'modules',
                    label: 'Modules',
                    position: 'left',
                },
                {
                    to: 'blog',
                    activeBasePath: 'blog',
                    label: 'Blog',
                    position: 'left'
                },
                {
                    to: 'exchangeversions',
                    activeBasePath: 'exchangeversions',
                    label: 'Exchange Versions',
                    position: 'left'
                },
                {
                    to: 'about',
                    activeBasePath: 'about',
                    label: 'About',
                    position: 'left'
                },
                {
                    href: 'https://github.com/hanpq',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Shortcuts',
                    items: [
                        {
                            label: 'Knowledge Base',
                            activeBasePath: 'docs',
                            to: 'docs',
                        },
                        {
                            label: 'Module documentation',
                            activeBasePath: 'modules',
                            to: 'modules',
                        },
                        {
                            label: 'Blog',
                            activeBasePath: 'blog',
                            to: 'blog',
                        },
                    ],
                },
                {
                    title: 'Contact',
                    items: [
                        {
                            label: 'About',
                            activeBasePath: 'about',
                            to: 'about',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/hanpq',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} GetPS.dev`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/hanpq/getps.dev/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    editUrl:
                        'https://github.com/hanpq/getps.dev/tree/main/',
                    feedOptions: {
                        type: 'all',
                        copyright: `Copyright © ${new Date().getFullYear()} Hannes Palmquist`,
                    },
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All our posts',
                    onUntruncatedBlogPosts: 'ignore',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                gtag: {
                    trackingID: 'G-MYR3KXGL15',
                    // Optional fields.
                    anonymizeIP: true, // Should IPs be anonymized?
                },
                googleTagManager: {
                    containerId: 'G-MYR3KXGL15',
                },
                googleAnalytics: {
                    trackingID: 'G-MYR3KXGL15',
                    // Optional fields.
                    anonymizeIP: true, // Should IPs be anonymized?
                },
            },
        ],
    ],
    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'modules_docs',
                path: './modules',
                routeBasePath: 'modules',
                sidebarPath: './sidebars_modules.js',
            }
        ],
    ],
    scripts: [
        {
            src:
                'https://connect.facebook.net/sv_SE/sdk.js#xfbml=1&version=v9.0',
            async: true,
        },
    ],
};
