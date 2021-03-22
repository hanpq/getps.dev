const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'pstools.dataset/quickstart',
            'pstools.dataset/installation',
            'pstools.dataset/devstatus',
            'pstools.dataset/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Usage',
        collapsed: false,
        items: [
            'pstools.dataset/usage_getstarted',
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];


