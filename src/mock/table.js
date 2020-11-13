export const columns = [
    {
        field: 'date',
        label: '日期',
        required: true,
        validation: {
            type: 'date',
            valid: true,
            message: '',
            startTime: new Date('2020-09-01'),
            endTime: new Date('2020-10-01'),
            trigger: "change"
        },
        // width: 100,
        fixed: true,
    },
    {
        // field: 'date',
        // field: 'info',
        label: '配送信息',
        // width: 600,
        children: [
            {
                field: 'name',
                label: '姓名',
                required: true,
                validation: {
                    type: 'text',
                    valid: true,
                    message: '',
                    minLength: 3,
                    maxLength: 5,
                    trigger: "blur"
                },
                // width: 120
            },
            {
                field: 'province',
                label: '省份',
                required: true,
                validation: {
                    type: 'text',
                    valid: true,
                    message: '',
                    minLength: 3,
                    maxLength: 5,
                    trigger: "blur"
                },
                // width: 120
            },
            {
                field: 'city',
                label: '市区',
                required: true,
                validation: {
                    type: 'text',
                    valid: true,
                    message: '',
                    minLength: 3,
                    maxLength: 5,
                    trigger: "blur"
                },
                // width: 120
            },
            {
                field: 'address',
                label: '地址',
                required: true,
                validation: {
                    type: 'text',
                    valid: true,
                    message: '',
                    minLength: 3,
                    maxLength: 5,
                    trigger: "blur"
                },
                // width: 120
            },
            {
                field: 'zip',
                label: '编码',
                required: true,
                validation: {
                    type: 'number',
                    valid: true,
                    message: '',
                    min: 100000,
                    max: 999999,
                    trigger: "blur"
                },
                // width: 120
            },
        ]
    },
]

export const datasource = [{
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
}, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
}, {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
}, {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
}, {
    date: '2016-05-08',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
}, {
    date: '2016-05-06',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
}, {
    date: '2016-05-07',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
}]


export const operations = [
    {
        field: 'edit',
        label: '编辑'
    },
    {
        field: 'del',
        label: '删除'
    },
    {
        field: 'up',
        label: '上移'
    },
    {
        field: 'down',
        label: '下移'
    },
]

export const convertFormData = (columns, rowData) => {
    const _convert = (columns) => {
        const ret = []
        columns.forEach(({ field, label, options, required, validation, children }) => {
            if (children && children.length > 0) {
                ret.push(..._convert(children))
            } else {
                const value = (validation.type == 'date' || validation.type == 'dateTime') ? new Date(rowData[field]) : rowData[field]
                ret.push({ field, label, value, options, required, validation })
            }   
        })
        return ret
    }
    return _convert(columns)
}