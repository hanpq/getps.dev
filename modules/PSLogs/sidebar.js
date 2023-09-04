const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'PSLogs/getstarted',
            'PSLogs/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];

