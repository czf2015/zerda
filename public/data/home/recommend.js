module.exports = {
    "id": "2",
    type: 'Recommand',
    usage: 'Recommand',
    effect: '/images/home/recommend.png',
    "title": "我们的推荐",
    "desc": "建行云产品系列，祝你上云无忧，轻松运行",
    "content": [
        {
            "title": "云服务器",
            "iconURL": "//yun.ccb.com/common/images/recommend_products1.png",
            "cardURL": "//yun.ccb.com/product/cvm",
            "button": "",
            "desc": ""
        },
        {
            "title": "弹性负载均衡",
            "iconURL": "//yun.ccb.com/common/images/recommend_products2.png",
            "cardURL": "//yun.ccb.com/product/elb",
            "button": "",
            "desc": ""
        },
        {
            "title": "龙卫士",
            "iconURL": "//yun.ccb.com/common/images/recommend_products3.png",
            "cardURL": "//yun.ccb.com/product/producthids",
            "button": "",
            "desc": ""
        },
        {
            "title": "MPP云数据",
            "iconURL": "//yun.ccb.com/common/images/recommend_products4.png",
            "cardURL": "//yun.ccb.com/product/productmpp",
            "button": "",
            "desc": ""
        }
    ],
    extra: {
        columns: [
            {
                filed: 'title',
                label: '名称',
                required: true,
                validation: {
                    type: 'text',
                    minLength: 3,
                    maxLength: 5,
                }
            },
            {
                filed: 'iconURL',
                label: '图标',
                required: true,
                validation: {
                    type: 'link',
                    pattern: /^\/\/yun.ccb.com/
                }
            },
            {
                filed: 'cardURL',
                label: '卡片',
                required: true,
                validation: {
                    type: 'link',
                    pattern: /^\/\/yun.ccb.com/
                }
            },
            {
                filed: 'button',
                label: '按钮',
                // required: true,
                validation: {
                    type: 'link',
                    pattern: /^\/\/yun.ccb.com/
                }
            },
            {
                filed: 'desc',
                label: '描述',
                // required: true,
                validation: {
                    type: 'text',
                    minLength: 10,
                    maxLength: 20,
                }
            },
        ],
        operations: [{
            label: 'edit',
            field: '编辑'
        }, {
            label: 'del',
            field: '删除'
        }]
    }
}