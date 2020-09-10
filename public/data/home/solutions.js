module.exports = {
    id: '4',
    type: 'Solutions',
    usage: 'Solutions',
    effect: '/images/home/solutions.png',
    title: '我们的解决方案',
    desc: '为您量身定制“科技+服务”的个性话化解决方案',
    content: [{
        "category": "云网络",
        children: [
            {
                "iconURL": "//yun.ccb.com/common/images/index/solution/云网络1.png",
                "name": "云网络",
                "desc": "提供一站式服务平台，跨界支持行业发展",
                "hover": false
            }
        ],
    },],
    extra: {
        columns: [
            {
                field: 'category',
                label: '类别',
                required: true,
                validation: {
                    type: 'text',
                    minLength: 0,
                    maxLength: 5
                }
            }
        ],
        operations: [
            // {
            //     field: 'check',
            //     label: '查看'
            // },
            {
                field: 'edit',
                label: '编辑'
            },
            // {
            //     field: 'add',
            //     label: '添加'
            // },
            {
                field: 'del',
                label: '删除'
            }
        ],
        children: {
            columns: [
                {
                    field: 'iconURL',
                    label: '图标',
                    required: true,
                    validation: {
                        type: 'image',
                        minSize: 0,
                        maxSize: 1024,
                        trigger: "blur"
                    }
                },
                {
                    field: 'name',
                    label: '标题',
                    required: true,
                    validation: {
                        type: 'text',
                        minLength: 0,
                        maxLength: 5,
                        trigger: "blur"
                    }
                },
                {
                    field: 'desc',
                    label: '描述',
                    required: true,
                    validation: {
                        type: 'text',
                        minLength: 5,
                        maxLength: 10,
                        trigger: "blur"
                    }
                },
                {
                    field: 'hovering',
                    label: 'hover状态',
                    required: true,
                    validation: {
                        type: 'boolean',
                        trigger: "blur"
                    }
                },
            ],
            operations: [
                // {
                //     field: 'check',
                //     label: '查看'
                // },
                {
                    field: 'edit',
                    label: '编辑'
                },
                // {
                //     field: 'add',
                //     label: '添加'
                // },
                {
                    field: 'del',
                    label: '删除'
                }
            ],
        }
    }
}