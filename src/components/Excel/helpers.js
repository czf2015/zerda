export const set = ({ data, columns, colHeaders, rowHeaders = true }) => {
    return {
        data,
        columns,
        rowHeaders,
        colHeaders,
        filters: true,
        width: 806,
        height: 487,
        stretchH: 'all',
        autoWrapRow: true,
        maxRows: 22,
        manualRowResize: true,
        manualColumnResize: true,
        manualRowMove: true,
        manualColumnMove: true,
        contextMenu: true,
        dropdownMenu: true,
        language: 'en-US'
    }
}

export const render = (instance, td, row, col, prop, value, cellProperties) => {
    // 
}