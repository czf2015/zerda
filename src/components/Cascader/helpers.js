export const contextmenu = [
    {
        title: '编辑',
        value: 'update'
    },
    {
        title: '删除',
        value: 'delete'
    }
]


export const convertToFormData = (formData, data) => {
    return formData.map(item => {
        return {
            ...item,
            value: data[item.field]
        }
    })
}