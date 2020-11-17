module.exports = {
    modulessidebar: {
        Introduction: ['GetStarted'],
        Modules: [
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
                        ]
                    },
                    {
                        type: 'category',
                        label: 'Usage',
                        collapsed: false,
                        items: [
                            'PS.Tools.DataSet/usage_setup',
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
        ],        
    },
};
