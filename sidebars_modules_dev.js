// Start of file
const pstoolsdaikin = require('./modules/pstools.daikin/sidebar.js');
const pstoolsdataset = require('./modules/pstools.dataset/sidebar.js');
const pstoolsqueue = require('./modules/pstools.queue/sidebar.js');
const pstoolssortlibrary = require('./modules/pstools.sortlibrary/sidebar.js');
module.exports = {
    modulessidebar: {
        Introduction: ['Inventory'],
        Modules: [
            {
                type: 'category',
                label: 'pstools.daikin',
                collapsed: true,
                items: pstoolsdaikin
            },
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

