export const convertToFormData = (tableColumns, data = {}) => {
    return tableColumns
        .filter(item => item.mode == 'single')
        .map(item => {
            return {
                ...item,
                value: data[item.field]
            }
        })
}