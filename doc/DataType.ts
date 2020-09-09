// 后台数据结构
type DataType = [
    {
        id: String, // 唯一标识，自动生成
        type: String, // 标识后台component
        usage: String, // 标识前台component
        title?: String, // 
        desc?: String,
        content?: [{
            columns: [
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
            ],
            // 对象或数组
            datasource: [{
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
            }],
            operations: [
                {
                    field: 'check',
                    label: '查看'
                },
                {
                    field: 'edit',
                    label: '编辑'
                },
                {
                    field: 'add',
                    label: '添加'
                },
                {
                    field: 'delete',
                    label: '删除'
                }
            ]
            // summary: [
            //     {
            //         field: String,
            //         label: String,
            //         required: true,
            //         // value: String,
            //         validation: {
            //             type: 'text',
            //             valid: true,
            //             message: '',
            //             minLength?: 0,
            //             maxLength?: 10,
            //             remains?: '...'
            //         }
            //     },
            // ],
            // details: [                         
            //     {
            //         summary: [
            //             {
            //                 field: String,
            //                 label: String,
            //                 required: true,
            //                 value: String,
            //                 validation: {
            //                     type: 'text',
            //                     valid: true,
            //                     message: '',
            //                     minLength?: 0,
            //                     maxLength?: 10,
            //                     remains?: '...'
            //                 }
            //             },
            //             {
            //                 field: String,
            //                 label: String,
            //                 required: false,
            //                 value: Number,
            //                 validation: {
            //                     type: 'number',
            //                     valid: true,
            //                     message: '',
            //                     min: 0,
            //                     max: 10,
            //                     step?: 1,
            //                 }
            //             },
            //             {
            //                 field: String,
            //                 label: String,
            //                 required: false,
            //                 value: Date,
            //                 validation: {
            //                     type: 'dateTime',
            //                     valid: true,
            //                     message: '',
            //                     startTime: new Date('2020-08-07'),
            //                     endTime: new Date('2020-09-07'),
            //                 }
            //             },
            //             {
            //                 field: String,
            //                 label: String,
            //                 required: false,
            //                 value: any,
            //                 options: any[],
            //                 validation: {
            //                     type: 'radio',
            //                     valid: true,
            //                     message: '',
            //                     // required: false
            //                 }
            //             },
            //             {
            //                 field: String,
            //                 label: String,
            //                 required: false,
            //                 value: any[],
            //                 options: any[],
            //                 validation: {
            //                     type: 'checkbox',
            //                     valid: true,
            //                     message: '',
            //                     least: 1,
            //                     most: 3
            //                 }
            //             },
            //             {
            //                 field: String,
            //                 label: String,
            //                 required: false,
            //                 value: any,
            //                 options: any[],
            //                 validation: {
            //                     type: 'select',
            //                     valid: true,
            //                     message: '',
            //                     least: 1,
            //                     most: 3
            //                 }
            //             },
            //         ]
            //     }
            // ]
        }],
        children?: DataType[]
    }
]




