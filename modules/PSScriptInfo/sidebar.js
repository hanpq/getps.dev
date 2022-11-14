const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'PSScriptInfo/getstarted',
            'PSScriptInfo/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];

