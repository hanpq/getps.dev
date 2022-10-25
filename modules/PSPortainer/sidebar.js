const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'PSPortainer/quickstart',
            'PSPortainer/installation',
            'PSPortainer/devstatus',
            'PSPortainer/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Usage',
        collapsed: false,
        items: [
            'PSPortainer/usage_getstarted',
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];


