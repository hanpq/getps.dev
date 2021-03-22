module.exports = {
    modulessidebar: {
        Introduction: ['Inventory'],
        Modules: [
            {
                type: 'category',
                label: 'PS.Tools.Daikin',
                collapsed: true,
                items: [
                    {
                        type: 'category',
                        label: 'Introduction',
                        collapsed: false,
                        items: [
                            'PS.Tools.Daikin/quickstart',
                            'PS.Tools.Daikin/installation',
                            'PS.Tools.Daikin/devstatus',
                            'PS.Tools.Daikin/changelog'
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Usage',
                        collapsed: false,
                        items: [
                            'PS.Tools.Daikin/usage_getstarted',
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Command Reference',
                        collapsed: true,
                        items: [
                            'PS.Tools.Daikin/commands/Get-DaikinStatus',
                            'PS.Tools.Daikin/commands/Set-DaikinAirCon'
                        ]
                    },
                ]
            },
            {
                type: 'category',
                label: 'PS.Tools.DataSet',
                collapsed: true,
                items: [
                    {
                        type: 'category',
                        label: 'Introduction',
                        collapsed: false,
                        items: [
                            'PS.Tools.DataSet/quickstart',
                            'PS.Tools.DataSet/installation',
                            'PS.Tools.DataSet/devstatus',
                            'PS.Tools.DataSet/changelog'
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Usage',
                        collapsed: false,
                        items: [
                            'PS.Tools.DataSet/usage_getstarted',
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Command Reference',
                        collapsed: true,
                        items: [
                            'PS.Tools.DataSet/commands/Add-DataSetRelation',
                            'PS.Tools.DataSet/commands/Add-DataSetTable',
                            'PS.Tools.DataSet/commands/Add-DataTableColumn',
                            'PS.Tools.DataSet/commands/Add-DataTableRow',
                            'PS.Tools.DataSet/commands/Get-DataTableRow',
                            'PS.Tools.DataSet/commands/New-DataSet',
                            'PS.Tools.DataSet/commands/New-DataTable'
                        ]
                    },
                ]
            },
            {
                type: 'category',
                label: 'PS.Tools.SortLibrary',
                collapsed: true,
                items: [
                    {
                        type: 'category',
                        label: 'Introduction',
                        collapsed: false,
                        items: [
                            'PS.Tools.SortLibrary/quickstart',
                            'PS.Tools.SortLibrary/installation',
                            'PS.Tools.SortLibrary/devstatus',
                            'PS.Tools.SortLibrary/changelog'
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Usage',
                        collapsed: false,
                        items: [
                            'PS.Tools.SortLibrary/usage_getstarted',
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Command Reference',
                        collapsed: true,
                        items: [
                            'PS.Tools.SortLibrary/commands/Sort-UsingQuickSort',
                            'PS.Tools.SortLibrary/commands/Test-SortingAlgorithms'
                        ]
                    },
                ]
            },
            {
                type: 'category',
                label: 'PS.Tools.Queue',
                collapsed: true,
                items: [
                    {
                        type: 'category',
                        label: 'Introduction',
                        collapsed: false,
                        items: [
                            'PS.Tools.Queue/quickstart',
                            'PS.Tools.Queue/installation',
                            'PS.Tools.Queue/devstatus',
                            'PS.Tools.Queue/changelog'
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Usage',
                        collapsed: false,
                        items: [
                            'PS.Tools.Queue/usage_getstarted',
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Command Reference',
                        collapsed: true,
                        items: [
                            'PS.Tools.Queue/commands/Add-QueueItem',
                            'PS.Tools.Queue/commands/Clear-AllQueueItems',
                            'PS.Tools.Queue/commands/Get-AllQueueItems',
                            'PS.Tools.Queue/commands/Get-NextQueueItem',
                            'PS.Tools.Queue/commands/Initialize-Queue',
                            'PS.Tools.Queue/commands/Measure-Queue',
                            'PS.Tools.Queue/commands/Show-NextQueueItem',
                        ]
                    },
                ]
            },
            {
                type: 'category',
                label: 'PS.Tools.Utility',
                collapsed: true,
                items: [
                    {
                        type: 'category',
                        label: 'Introduction',
                        collapsed: false,
                        items: [
                            'PS.Tools.Utility/quickstart',
                            'PS.Tools.Utility/installation',
                            'PS.Tools.Utility/devstatus',
                            'PS.Tools.Utility/changelog'
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Usage',
                        collapsed: false,
                        items: [
                            'PS.Tools.Utility/usage_getstarted',
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Command Reference',
                        collapsed: true,
                        items: [
                            'PS.Tools.Utility/commands/Out-Animate',
                        ]
                    },
                ]
            },
            {
                type: 'category',
                label: 'PS.Tools.WinUtility',
                collapsed: true,
                items: [
                    {
                        type: 'category',
                        label: 'Introduction',
                        collapsed: false,
                        items: [
                            'PS.Tools.WinUtility/quickstart',
                            'PS.Tools.WinUtility/installation',
                            'PS.Tools.WinUtility/devstatus',
                            'PS.Tools.WinUtility/changelog'
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Usage',
                        collapsed: false,
                        items: [
                            'PS.Tools.WinUtility/usage_getstarted',
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Command Reference',
                        collapsed: true,
                        items: [
                            'PS.Tools.WinUtility/commands/Add-Shortcut',
                        ]
                    },
                ]
            },

        ],
    },
};
