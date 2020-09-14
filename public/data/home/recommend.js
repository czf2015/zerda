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
    extra: {
        columns: [
            {
                field: 'title',
                label: '名称',
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
                // required: true,
                validation: {
                    type: 'text',
                    minLength: 10,
                    maxLength: 20,
                    trigger: "blur"
                }
            },
        ],
        operations: [
            {
                field: 'edit',
                label: '编辑'
            }, {
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
    }
}