export const columns = [
    {
        field: 'title',
        label: '页面标题',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "change"
        }
    },
    {
        field: 'keywords',
        label: 'SEO关键字',
        // required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 0,
            maxLength: 50,
            trigger: "change"
        }
    },
    {
        field: 'description',
        label: 'SEO描述',
        // required: true,
        validation: {
            type: 'textarea',
            valid: true,
            message: '',
            minLength: 0,
            maxLength: 200,
            trigger: "change"
        }
    },
    // {
    //     field: 'css',
    //     label: '自定义css',
    //     // required: true,
    //     validation: {
    //         type: 'image',
    //         valid: true,
    //         message: '',
    //         minLength: 3,
    //         maxLength: 5,
    //         trigger: "change"
    //     }
    // },
    // {
    //     field: 'js',
    //     label: '自定义js',
    //     // required: true,
    //     validation: {
    //         type: 'image',
    //         valid: true,
    //         message: '',
    //         minLength: 3,
    //         maxLength: 5,
    //         trigger: "change"
    //     }
    // },
]

export const convertToFormData = (raw) => {
    if (raw) {
        return columns.map(item => {
            return {
                ...item,
                value: raw[item.field]
            }
        })
    } else {
        return {}
    }
}