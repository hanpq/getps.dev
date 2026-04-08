module.exports = {
    title: 'GetPS.dev',
    tagline: 'Getps.dev provides a portal of powershell scripts, modules, blog, knowledge base, tutorials, guides, tips and tricks',
    //url: 'https://pensive-darwin-90a9ff.netlify.app',
    url: 'https://www.getps.dev',
    baseUrl: '/',
    trailingSlash: false,
    future: {
        faster: {
            rspackBundler: true,
            rspackPersistentCache: true,
            ssgWorkerThreads: true,
        },
        v4: {
            removeLegacyPostBuildHeadAttribute: true,
        }
    },
    onBrokenLinks: 'warn',
    favicon: 'img/powershell_orange2.ico',
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
    },
    organizationName: 'hanpq', // Usually your GitHub org/user name.
    projectName: 'getps.dev', // Usually your repo name.

    // SEO and social media metadata
    //metadata: [
    //    {name: 'keywords', content: 'PowerShell, PowerShell modules, Exchange Server, PowerShell scripts, PowerShell automation, system administration, DevOps, Microsoft Exchange, PowerShell Gallery, open source PowerShell'},
    //    {name: 'author', content: 'Hannes Palmquist'},
    //    {property: 'og:type', content: 'website'},
    //    {property: 'og:image', content: 'https://www.getps.dev/img/powershell_orange.png'},
    //    {name: 'twitter:card', content: 'summary_large_image'},
    //    {name: 'twitter:creator', content: '@PalmquistHannes'},
    //    {name: 'twitter:image', content: 'https://www.getps.dev/img/powershell_orange.png'},
    //],

    themeConfig: {
        // Default SEO image for social sharing
        image: 'img/powershell_orange.png',

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
                    admonitions: {
                        keywords: ['note', 'tip', 'info', 'caution', 'danger', 'warning', 'MSnote', 'MStip', 'MSwarning', 'MSimportant', 'MScaution'],
                        extendDefaults: true,
                    },
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
                    admonitions: {
                        keywords: ['note', 'tip', 'info', 'caution', 'danger', 'warning', 'MSnote', 'MStip', 'MSwarning', 'MSimportant', 'MScaution'],
                        extendDefaults: true,
                    },
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
                //sidebarPath: './sidebars_modules.js',
                admonitions: {
                    keywords: ['note', 'tip', 'info', 'caution', 'danger', 'warning', 'MSnote', 'MStip', 'MSwarning', 'MSimportant', 'MScaution'],
                    extendDefaults: true,
                },
            }
        ],
        [
            "@gracefullight/docusaurus-plugin-microsoft-clarity",
            { projectId: "w3qj0g5l7g" },
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
