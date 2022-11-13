// Start of file
const PSPortainer = require('./modules/PSPortainer/sidebar.js');
const PSDaikin = require('./modules/PSDaikin/sidebar.js');
const PSSort = require('./modules/PSSort/sidebar.js');
const pstoolsdataset = require('./modules/pstools.dataset/sidebar.js');
const pstoolspsscriptinfo = require('./modules/pstools.psscriptinfo/sidebar.js');
const pstoolsqueue = require('./modules/pstools.queue/sidebar.js');
module.exports = {
    modulessidebar: {
        Introduction: ['Inventory'],
        Modules: [
            {
                type: 'category',
                label: 'PSPortainer',
                collapsed: true,
                items: PSPortainer
            },
            {
                type: 'category',
                label: 'PSDaikin',
                collapsed: true,
                items: PSDaikin
            },
            {
                type: 'category',
                label: 'PSSort',
                collapsed: true,
                items: PSSort
            },
            {
                type: 'category',
                label: 'pstools.dataset',
                collapsed: true,
                items: pstoolsdataset
            },
            {
                type: 'category',
                label: 'pstools.psscriptinfo',
                collapsed: true,
                items: pstoolspsscriptinfo
            },
            {
                type: 'category',
                label: 'pstools.queue',
                collapsed: true,
                items: pstoolsqueue
            },
        ],
    },
};
