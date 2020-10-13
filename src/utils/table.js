import { base64 } from '@/utils/basic.js'

export const convertToTableData = (jsonData, relation) => {
    if (typeof relation == 'undefined') {
        relation = {}
        Object.keys(jsonData[0]).forEach(key => {
            relation[key] = key
        })
    }
    const labels = Object.values(relation)
    const fields = Object.keys(relation)
    const records = jsonData.map(item => fields.map(field => item[field]))
    return [labels, ...records]
}

export const convertToJsonData = (tableData, fields = tableData[0], retain = false) => {
    return (retain ? tableData : tableData.slice(1)).map(cells => {
        const item = {}
        fields.forEach((field, idx) => {
            item[field] = cells[idx]
        })
        return item
    })
}

export const tableToExcel = (tableData, worksheet = 'sheet1') => {
    const tableContent = tableData.map(cells => {
        const tds = cells.map(cell => `<td>${cell}</td>`).join('')
        return `<tr>${tds}</tr>`
    }).join('')

    const template = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <!--[if gte mso 9]>
        <xml>
            <x:ExcelWorkbook>
                <x:ExcelWorksheets>
                    <x:ExcelWorksheet>
                    <x:Name>${worksheet}</x:Name>
                    <x:WorksheetOptions>
                        <x:DisplayGridline s/>
                    </x:WorksheetOptions>
                </x:ExcelWorksheet>
        </x:ExcelWorksheets>
    </x:ExcelWorkbook>
    </xml>
        <![endif]-->
</head>

<body>
    <table>${tableContent}</table>
</body>
</html>
`

    const uri = 'data:application/vnd.ms-excel;base64,';
    window.location.href = uri + base64(template)
}

export const jsonToExcel = (jsonData, worksheet) => {
    const tableData = convertToTableData(jsonData)
    tableToExcel(tableData, worksheet)
}