export const datasource = [
    {
        field: 'name',
        label: '活动名称',
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
        field: 'region',
        label: '活动区域',
        value: '',
        required: true,
        options: ['区域一', '区域二'],
        validation: {
            type: 'select',
            valid: true,
            message: '',
            trigger: "change"
        }
    },
    {
        field: 'time',
        label: '活动时间',
        value: new Date(),
        required: true,
        validation: {
            type: 'dateTime',
            valid: true,
            message: '',
            startTime: new Date('2020-09-01'),
            endTime: new Date('2020-10-01'),
            trigger: "change"
        }
    },
    {
        field: 'delivery',
        label: '即时配送',
        value: false,
        // required: true,
        validation: {
            type: 'switch',
            valid: true,
            message: '',
            trigger: "change"
        }
    },
    {
        field: 'nature',
        label: '活动性质',
        value: [],
        required: true,
        options: ['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光'],
        validation: {
            type: 'checkbox',
            valid: true,
            message: '',
            least: 1,
            most: 4,
            trigger: "change"
        }
    },
    {
        field: 'resource',
        label: '特殊资源',
        value: '',
        required: true,
        options: ['线上品牌商赞助', '线下场地免费'],
        validation: {
            type: 'radio',
            valid: true,
            message: '',
            trigger: "change"
        }
    },
    {
        field: 'content',
        label: '活动形式',
        value: '',
        required: true,
        validation: {
            type: 'textarea',
            minLength: 10,
            maxLength: 100,
            valid: true,
            message: '',
            trigger: "blur"
        }
    },
]

export const operations = [
    {
        field: 'create',
        label: '创建'
    },
    {
        field: 'reset',
        label: '重置'
    },
]