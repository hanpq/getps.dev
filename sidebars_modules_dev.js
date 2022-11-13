// Start of file
const pstoolsdataset = require('./modules/pstools.dataset/sidebar.js');
const pstoolsqueue = require('./modules/pstools.queue/sidebar.js');
module.exports = {
    modulessidebar: {
        Introduction: ['Inventory'],
        Modules: [
            {
                type: 'category',
                label: 'pstools.dataset',
                collapsed: true,
                items: pstoolsdataset
            },
            {
                type: 'category',
                label: 'pstools.queue',
                collapsed: true,
                items: pstoolsqueue
            },
            {
                type: 'category',
                label: 'pstools.sortlibrary',
                collapsed: true,
                items: pstoolssortlibrary
            },
        ],
    },
};
