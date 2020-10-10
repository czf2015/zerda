export const themes = [
    "默认皮肤",
    "浅色皮肤",
    "深色皮肤",
    "喜庆皮肤",
    "悲恸皮肤",
]

export const convertSelectOptions = (themes) => themes.map((theme) => {
    return {
        label: theme,
        value: theme,
    };
});


export const convertTableFormData = (themes) => {
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
                field: 'template',
                label: '数据模板',
                required: false,
                options: themes,
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
        datasource: themes.map((theme) => {
            return { theme, template: theme };
        }),
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