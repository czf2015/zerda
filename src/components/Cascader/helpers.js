export const contextmenu = [
    {
        title: '更新',
        value: 'update'
    },
    {
        title: '删除',
        value: 'delete'
    }
]

export const formData = [
    {
        field: 'title',
        label: '标题',
        value: '',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "blur"
        }
    },
    {
        field: 'id',
        label: '标识',
        value: '',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "blur"
        }
    }, {
        field: 'type',
        label: '类型',
        value: '',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "blur"
        }
    }, {
        field: 'link',
        label: '链接',
        value: '',
        required: true,
        validation: {
            type: 'link',
            valid: true,
            message: '',
            pattern: '',
            trigger: "blur"
        }
    }, {
        field: 'open',
        label: '链接打开方式',
        value: '',
        required: true,
        options: ['当前页跳转', '新窗口打开'],
        validation: {
            type: 'select',
            valid: true,
            message: '',
            // minLength: 3,
            // maxLength: 5,
            trigger: "change"
        }
    }, {
        field: 'tag',
        label: '标签',
        value: '',
        required: true,
        options: ['1', '2'],
        validation: {
            type: 'select',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "change"
        }
    }, {
        field: 'weight',
        label: '权重',
        value: '',
        required: true,
        validation: {
            type: 'number',
            valid: true,
            message: '',
            min: 0,
            max: 1000,
            trigger: "blur"
        }
    },
]