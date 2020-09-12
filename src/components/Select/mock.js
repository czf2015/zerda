export const defaultOptions = () => [
    {
        value: "default",
        label: "默认皮肤",
    },
    {
        value: "light",
        label: "浅色皮肤",
    },
    {
        value: "dark",
        label: "深色皮肤",
    },
    {
        value: "happy",
        label: "欢庆皮肤",
    },
    {
        value: "grief",
        label: "悲恸皮肤",
    },
]

export const tableProps = {
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
                trigger: "change"
            },
        },
    ],
    datasource: [
        {
            theme: '默认皮肤'
        },
        {
            theme: '浅色皮肤'
        },
        {
            theme: '深色皮肤'
        },
        {
            theme: '欢庆皮肤'
        },
        {
            theme: '悲恸皮肤'
        },
    ],
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
    transform: 'translate(-80%, -80%)'
}