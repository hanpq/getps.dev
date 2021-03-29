const commands = require('./commands/docusaurus.sidebar.js');
module.exports = [
    {
        type: 'category',
        label: 'Introduction',
        collapsed: false,
        items: [
            'pstools.psscriptinfo/quickstart',
            'pstools.psscriptinfo/installation',
            'pstools.psscriptinfo/devstatus',
            'pstools.psscriptinfo/changelog'
        ]
    },
    {
        type: 'category',
        label: 'Usage',
        collapsed: false,
        items: [
            'pstools.psscriptinfo/usage_getstarted',
        ]
    },
    {
        type: 'category',
        label: 'Command Reference',
        collapsed: true,
        items: commands
    },
];


