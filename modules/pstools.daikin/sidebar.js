const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'pstools.daikin/quickstart',
            'pstools.daikin/installation',
            'pstools.daikin/devstatus',
            'pstools.daikin/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Usage',
        collapsed: false,
        items: [
            'pstools.daikin/usage_getstarted',
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];


