module.exports = {
    title: 'GetPS.dev',
    tagline: 'Powershell scripts, modules, blog, knowledge base, tips and tricks',
    //url: 'https://pensive-darwin-90a9ff.netlify.app',
    url: 'https://getps.dev',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/powershell_orange2.ico',
    organizationName: 'hanpq', // Usually your GitHub org/user name.
    projectName: 'getps.dev', // Usually your repo name.
    themeConfig: {
        googleAnalytics: {
            trackingID: 'G-MYR3KXGL15',
            // Optional fields.
            anonymizeIP: true, // Should IPs be anonymized?
        },
        gtag: {
            trackingID: 'G-MYR3KXGL15',
            // Optional fields.
            anonymizeIP: true, // Should IPs be anonymized?
        },
        hideableSidebar: true,
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
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Knowledge Base',
                    position: 'left',
                },
                {
                    to: 'modules/',
                    activeBasePath: 'modules',
                    label: 'Modules',
                    position: 'left',
                },
                {
                    to: 'blog',
                    label: 'Blog',
                    position: 'left'
                },
                {
                    to: 'downloads',
                    label: 'Downloads',
                    position: 'left'
                }, {
                    to: 'about',
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
                            to: 'docs/',
                        },
                        {
                            label: 'Module documentation',
                            to: 'modules/',
                        },
                        {
                            label: 'Blog',
                            to: 'blog/',
                        },
                        {
                            label: 'Downloads',
                            to: 'downloads/',
                        },
                    ],
                },
                {
                    title: 'Contact',
                    items: [
                        {
                            label: 'About',
                            to: 'about/',
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
                    // Please change this to your repo.
                    editUrl: 'https://github.com/hanpq/getps.dev/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/hanpq/getps.dev/tree/main/',
                    feedOptions: {
                        type: 'all',
                        copyright: `Copyright © ${new Date().getFullYear()} Hannes Palmquist`,
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
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
        ]
    ],
};
