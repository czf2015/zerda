export const convert = (raw) => {
    const ret = []
    raw.forEach(item => {
        item.label = item.categoryName || 'test'
        item.value = item.categoryId || 'test'
        if (item.categoryType == 'directory') {
            item.children = convert(item.subCategoryList) || []
        }
        ret.push(item)
    })
    return ret
}

export const revert = (raw) => {

}

export const columns = [
    {
        field: 'categoryName',
        label: '名称',
        value: '',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "input"
        }
    },
    {
        field: 'categoryKeywords',
        label: '关键字',
        value: '',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "input"
        }
    }, {
        field: 'categoryType',
        label: '类型',
        value: '',
        required: true,
        options: ['菜单组', '菜单链接'],
        validation: {
            type: 'select',
            valid: true,
            message: '',
            // minLength: 3,
            // maxLength: 5,
            trigger: "change"
        }
    }
]