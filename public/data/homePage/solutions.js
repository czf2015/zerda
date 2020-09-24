const operations = [
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
    },
    {
        field: 'up',
        label: '上移'
    },
    {
        field: 'down',
        label: '下移'
    }
]

const extra = [
    {
        field: 'title',
        label: '标题',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            minLength: 0,
            maxLength: 10,
            trigger: 'change'
        }
    },
    {
        field: 'desc',
        label: '描述',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            minLength: 0,
            maxLength: 20,
            trigger: 'change'
        }
    },
    {
        field: 'content',
        label: '内容',
        mode: 'multiple',
        children: [
            {
                field: 'category',
                label: '类别',
                mode: 'single',
                required: true,
                validation: {
                    type: 'text',
                    minLength: 0,
                    maxLength: 5,
                    trigger: 'change'
                }
            },
            {
                field: 'children',
                label: '子项',
                mode: 'multiple',
                children: [
                    {
                        field: 'iconURL',
                        label: '图标',
                        mode: 'single',
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
                        mode: 'single',
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
                        mode: 'single',
                        required: true,
                        validation: {
                            type: 'textarea',
                            minLength: 10,
                            maxLength: 30,
                            trigger: "blur"
                        }
                    },
                    {
                        field: 'hover',
                        label: 'hover状态',
                        mode: 'single',
                        required: true,
                        validation: {
                            type: 'boolean',
                            trigger: "blur"
                        }
                    },
                ],
                operations,
            }
        ]
    }
]

module.exports = {
    id: '4',
    type: 'Panel',
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
                "hover": false,
            }
        ],
    }],
    extra,
}