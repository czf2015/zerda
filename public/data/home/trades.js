module.exports = {
    id: '5',
    type: 'Container',
    usage: 'Trades',
    effect: '/images/home/trades.png',
    title: '我们的行业平台',
    desc: "提供一站式服务平台，跨界支持行业发展",
    background: "https://yun.ccb.com/common/images/index/business/hangye-bg-gq.png",
    content: [
        {
            "title": "区块链贸易融资平台",
            "desc": "区块链技术助力金融业务，全面提升交易时效性、安全性、便捷性",
            "link": "https://yun.ccb.com/industryPlatform/detail/blockchain.html",
            "iconURL": "https://yun.ccb.com/common/images/index/solution/qukuailian.png"
        },
        {
            "title": "住房租赁服务平台",
            "desc": "要租房，到建行。提供全场景住房租赁综合服务平台",
            "link": "https://yun.ccb.com/industryPlatform/detail/zhufangzulin.html",
            "iconURL": "https://yun.ccb.com/common/images/index/solution/zhufang.png"
        },
        {
            "title": "安心养老云平台",
            "desc": "利用平台专业性，提升政府相关部门、机构、服务商的运营效率",
            "link": "https://yun.ccb.com/industryPlatform/detail/yanglao.html",
            "iconURL": "https://yun.ccb.com/common/images/index/solution/yanglao.png"
        },
        {
            "title": "智慧政务服务综合平台",
            "desc": "智慧政务服务综合平台是全事项、全流程、全覆盖、全场景",
            "link": "https://yun.ccb.com/industryPlatform/detail/smartmunicipality.html",
            "iconURL": "https://yun.ccb.com/common/images/index/solution/zhengwu.png"
        },
        {
            "title": "党群综合服务平台",
            "desc": "全面覆盖党建工会团青各项工作和使用量管理，以“互联网+",
            "link": "https://yun.ccb.com/industryPlatform/detail/dangqun.html",
            "iconURL": "https://yun.ccb.com/common/images/index/solution/zongjiao.png"
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
                field: 'desc',
                label: '描述',
                required: true,
                validation: {
                    type: 'textarea',
                    minLength: 10,
                    maxLength: 30,
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
                field: 'iconURL',
                label: '图标',
                required: true,
                validation: {
                    type: 'image',
                    minSize: 0,
                    maxSize: 1028,
                    trigger: "blur"
                }
            },
        ],
        operations: [
            {
                field: 'edit',
                label: '编辑'
            },
            {
                field: 'del',
                label: '删除'
            }
        ]
    }
}