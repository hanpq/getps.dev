const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'pstools.queue/quickstart',
            'pstools.queue/installation',
            'pstools.queue/devstatus',
            'pstools.queue/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Usage',
        collapsed: false,
        items: [
            'pstools.queue/usage_getstarted',
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];


