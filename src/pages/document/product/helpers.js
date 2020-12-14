export const columns = [
    {
        field: 'iconUrl',
        label: '图标',
        mode: 'single',
        required: true,
        validation: {
            type: 'image',
            minSize: 0,
            maxSize: 1024,//kb
            trigger: "blur"
        }
    },
    {
        field: 'weight',
        label: '权重',
        mode: 'single',
        required: true,
        validation: {
            type: 'number',
            valid: true,
            message: '',
            min: 0,
            max: 1000,
            trigger: "blur"
        },
    },
    {
        field: 'cnName',
        label: '类别名称',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "blur"
        },
    },
    {
        field: 'enName',
        label: '类别名称(英文)',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            valid: true,
            message: '',
            minLength: 3,
            maxLength: 5,
            trigger: "blur"
        },
    },
]

// export const datasource = [
//     {
//         "catalogId": "1322065852312322050",   //目录ID
//         "platform": "2",                         //平台类型
//         "cnName": "运维下的666",              //中文名称
//         "enName": "Operation66",              //英文名称
//         "weight": 110,                         //权重
//         "iconUrl": 'https://element.eleme.cn/static/guide.0a8462c.png',                     //图标URL
//         "forward": "http://6666666"         //跳转链接
//     },
//     {
//         "catalogId": "1322067396575363073",
//         "platform": "2",
//         "cnName": "运维下的777",
//         "enName": "Operation77",
//         "weight": 110,
//         "iconUrl": 'https://element.eleme.cn/static/guide.0a8462c.png',
//         "forward": "http://777777"
//     }
// ]


export const operations = [
    {
        field: 'edit',
        label: '编辑'
    },
    {
        field: 'del',
        label: '删除'
    },
]

// export const convertFormData = (columns, rowData) => {
//     const _convert = (columns) => {
//         const ret = []
//         columns.forEach(({ field, label, options, required, validation, children }) => {
//             if (children && children.length > 0) {
//                 ret.push(..._convert(children))
//             } else {
//                 const value = (validation.type == 'date' || validation.type == 'dateTime') ? new Date(rowData[field]) : rowData[field]
//                 ret.push({ field, label, value, options, required, validation })
//             }
//         })
//         return ret
//     }
//     return _convert(columns)
// }

export const extract = (formData) => {
    const retVal = {}
    formData.forEach(({ field, value }) => {
        retVal[field] = value
    })
    return retVal
}


export const platforms = [
    {
        value: "1",
        label: "租户端",
    },
    {
        value: "2",
        label: "运营端",
    },
]