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
                field: 'title',
                label: '名称',
                mode: 'single',
                required: true,
                validation: {
                    type: 'text',
                    minLength: 3,
                    maxLength: 5,
                    trigger: "blur"
                }
            },
            {
                field: 'imgURL',
                label: '图片',
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
                field: 'link',
                label: '链接',
                mode: 'single',
                required: true,
                validation: {
                    type: 'link',
                    pattern: '/^\/\/yun.ccb.com/',
                    trigger: "blur"
                }
            },
            {
                field: 'button',
                label: '按钮',
                mode: 'single',
                // required: true,
                validation: {
                    type: 'link',
                    pattern: '/^\/\/yun.ccb.com/',
                    trigger: "blur"
                }
            },
            {
                field: 'desc',
                label: '描述',
                mode: 'single',
                // required: true,
                validation: {
                    type: 'text',
                    minLength: 10,
                    maxLength: 20,
                    trigger: "blur"
                }
            },
        ],
        operations,
    }
]


module.exports = {
    "id": "2",
    type: 'Container',
    usage: 'Recommend',
    effect: '/images/home/recommend.png',
    "title": "我们的推荐",
    "desc": "建行云产品系列，祝你上云无忧，轻松运行",
    "content": [
        {
            "title": "云服务器",
            "imgURL": "//yun.ccb.com/common/images/recommend_products1.png",
            "link": "//yun.ccb.com/product/cvm",
            "button": "",
            "desc": "立即申请"
        },
        {
            "title": "弹性负载均衡",
            "imgURL": "//yun.ccb.com/common/images/recommend_products2.png",
            "link": "//yun.ccb.com/product/elb",
            "button": "",
            "desc": "立即申请"
        },
        {
            "title": "龙卫士",
            "imgURL": "//yun.ccb.com/common/images/recommend_products3.png",
            "link": "//yun.ccb.com/product/producthids",
            "button": "",
            "desc": "立即申请"
        },
        {
            "title": "MPP云数据",
            "imgURL": "//yun.ccb.com/common/images/recommend_products4.png",
            "link": "//yun.ccb.com/product/productmpp",
            "button": "",
            "desc": "立即申请"
        }
    ],
    extra
}