// Start of file
const PSPortainer = require('./modules/PSPortainer/sidebar.js');
const PSDaikin = require('./modules/PSDaikin/sidebar.js');
const PSSort = require('./modules/PSSort/sidebar.js');
const PSDataSet = require('./modules/PSDataSet/sidebar.js');
const PSScriptInfo = require('./modules/PSScriptInfo/sidebar.js');
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
                label: 'PSDataSet',
                collapsed: true,
                items: PSDataSet
            },
            {
                type: 'category',
                label: 'PSScriptInfo',
                collapsed: true,
                items: PSScriptInfo
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
