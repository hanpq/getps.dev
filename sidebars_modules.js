// Start of file
const PSLogs = require('./modules/PSMQTT/sidebar.js');
const PSLogs = require('./modules/PSLogs/sidebar.js');
const PSPortainer = require('./modules/PSPortainer/sidebar.js');
const PSDev = require('./modules/PSDev/sidebar.js');
const PSDaikin = require('./modules/PSDaikin/sidebar.js');
const PSSort = require('./modules/PSSort/sidebar.js');
const PSDataSet = require('./modules/PSDataSet/sidebar.js');
const PSScriptInfo = require('./modules/PSScriptInfo/sidebar.js');
const PSQueue = require('./modules/PSQueue/sidebar.js');
module.exports = {
    modulessidebar: {
        Introduction: ['Inventory'],
        Modules: [
            {
                type: 'category',
                label: 'PSMQTT',
                collapsed: true,
                items: PSMQTT
            },
            {
                type: 'category',
                label: 'PSLogs',
                collapsed: true,
                items: PSLogs
            },
            {
                type: 'category',
                label: 'PSPortainer',
                collapsed: true,
                items: PSPortainer
            },
            {
                type: 'category',
                label: 'PSDev',
                collapsed: true,
                items: PSDev
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
                label: 'PSQueue',
                collapsed: true,
                items: PSQueue
            },
        ],
    },
};
