module.exports = {
    someSidebar: {
        Docusaurus: ['doc1'],
        Snippets: ['casting_datetime'],
        Modules: [
            {
                type: 'category',
                label: 'PS.Tools.DataSet',
                items: [
                    'PS.Tools.DataSet/Add-DataSetRelation',
                    'PS.Tools.DataSet/Add-DataSetTable',
                    'PS.Tools.DataSet/Add-DataTableColumn',
                    'PS.Tools.DataSet/Add-DataTableRow',
                    'PS.Tools.DataSet/Get-DataTableRow',
                    'PS.Tools.DataSet/New-DataSet',
                    'PS.Tools.DataSet/New-DataTable'
                ]
            }
        ],
    }
};
