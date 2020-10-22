// export const themes = [
//     "默认皮肤",
//     "浅色皮肤",
//     "深色皮肤",
//     "喜庆皮肤",
//     "悲恸皮肤",
// ]

export const convertSelectOptions = (list) => list.map(({theme}) => {
    return {
        label: theme,
        value: theme,
    };
});


export const convertTableFormData = (list) => {
    return {
        columns: [
            {
                field: 'theme',
                label: '皮肤主题',
                required: true,
                validation: {
                    type: 'text',
                    valid: true,
                    message: '',
                    minLength: 2,
                    maxLength: 10,
                    trigger: "input"
                },
            },
            {
                field: 'slug',
                label: '英文标识',
                required: false,
                validation: {
                    type: 'text',
                    valid: true,
                    message: '',
                    minLength: 2,
                    maxLength: 10,
                    trigger: "input"
                },
            },
            {
                field: 'template',
                label: '数据模板',
                required: false,
                options: list.map(item => item.theme),
                width: '0',
                validation: {
                    type: 'select',
                    valid: true,
                    message: '',
                    minLength: 2,
                    maxLength: 10,
                    trigger: "input"
                },
            },
        ],
        datasource: list.map(({ theme, slug }) => {
            return { theme, slug, template: theme };
        }),
        filter(item) {
            return item.field !== 'template'
        },
        operations: [
            {
                field: 'edit',
                label: '编辑'
            },
            {
                field: 'del',
                label: '删除'
            }
        ],
        transform: 'translate(-80%, -180%)'
    }
}

export const combine = (columns, rawData) => columns.map(item => {
    return { ...item, value: rawData[item.field] }
})