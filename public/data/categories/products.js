const operations = [
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
        required: false,
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
                    minLength: 5,
                    maxLength: 10,
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
                field: 'iconURL',
                label: '默认图标',
                mode: 'single',
                required: true,
                validation: {
                    type: 'image',
                    minSize: 0,
                    maxSize: 1024,//kb
                    trigger: "blur"
                }
            },
        ],
        operations
    }
]


module.exports = {
    id: '2',
    type: 'Container',
    usage: 'Products',
    effect: '/images/home/products.png',
    title: '推荐产品',
    desc: '',
    content: [
        {
            "title": "云监控",
            "link": "//yun.ccb.com/solution/monitoring",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_yjk.png",
        },
        {
            "title": "云硬盘",
            "link": "//yun.ccb.com/product/productcbs",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/product/product_memory5.png",
        },
        {
            "title": "虚拟私有网络",
            "link": "//yun.ccb.com/product/vpc1",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_wl_xnsywl.png",
        },
        {
            "title": "云服务器",
            "link": "//yun.ccb.com/product/cvm",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_yfwq.png",
        },
        {
            "title": "容器服务",
            "link": "//yun.ccb.com/product/tke",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_yfwq.png",
        },
        {
            "title": "容器服务",
            "link": "//yun.ccb.com/product/tke",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_yfwq.png",
        },
        {
            "title": "容器服务",
            "link": "//yun.ccb.com/product/tke",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_yfwq.png",
        },
        {
            "title": "容器服务",
            "link": "//yun.ccb.com/product/tke",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_yfwq.png",
        },
        {
            "title": "容器服务",
            "link": "//yun.ccb.com/product/tke",
            "iconURL": "//imagecachexxfb.yun.ccb.com/static/solution/product_yfwq.png",
        }
    ],
    extra
}