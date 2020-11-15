module.exports = {
    title: 'GetPS.dev',
    tagline: 'Powershell scripts and modules',
    url: 'https://pensive-darwin-90a9ff.netlify.app',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/powershell_orange.ico',
    organizationName: 'hanpq', // Usually your GitHub org/user name.
    projectName: 'getps.dev', // Usually your repo name.
    themeConfig: {
        announcementBar: {
            id: 'underdev', // Any value that will identify this message.
            content:
                'This site is still under development',
            backgroundColor: '#ffdab3', // Defaults to `#fff`.
            textColor: '#000', // Defaults to `#000`.
            isCloseable: true, // Defaults to `true`.
        },
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
                    label: 'Docs',
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
                    to: 'about',
                    label: 'About',
                    position: 'left'
                },
                {
                    href: 'https://github.com/hanpq/getps.dev',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Style Guide',
                            to: 'docs/',
                        },
                        {
                            label: 'Second Doc',
                            to: 'docs/doc2/',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/docusaurus',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/docusaurus',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/facebook/docusaurus',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/hanpq/getps.dev/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/hanpq/getps.dev/tree/main/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                path: 'modules',
                editUrl: 'https://github.com/hanpq/getps.dev/tree/main/',
                routeBasePath: 'modules',
                include: ['**/*.md', '**/*.mdx'],
                sidebarPath: ''
            }
        ],
    ],
};
