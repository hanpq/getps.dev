const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'pstools.sortlibrary/quickstart',
            'pstools.sortlibrary/installation',
            'pstools.sortlibrary/devstatus',
            'pstools.sortlibrary/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Usage',
        collapsed: false,
        items: [
            'pstools.sortlibrary/usage_getstarted',
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];


