module.exports = {
    id: '3',
    type: 'Products',
    usage: 'Products',
    effect: '/images/home/products.png',
    title: '我们的云产品',
    desc: '计算、存储、网络、安全、数据库等全栈式产品，助您顺利上云',
    content: [{
        "category": "计算",
        "iconURL": "//yun.ccb.com/common/images/index/midIcon/icon_%E8%AE%A1%E7%AE%97_normal.png",
        "iconHoverURL": "//yun.ccb.com/common/images/index/midIcon/icon_blue_%E8%AE%A1%E7%AE%97.png",
        children: [
            {
                "name": "云服务器",
                "desc": "稳定、安全、弹性、高性能的云端计算服务，实时满足您的多样性业务需求",
                "link": "//yun.ccb.com/product/cvm"
            },
            {
                "name": "容器服务",
                "desc": "稳定、安全、高效、灵活扩展、简单易用的企业级Kubernetes 容器管理平台",
                "link": "//yun.ccb.com/product/tke"
            },
            {
                "name": "裸金属服务器",
                "desc": "提供云端独享的高性能、无虚拟化的物理服务器，更适合性能敏感型业务需求",
                "link": "//yun.ccb.com/product/productbms"
            },
            {
                "name": "裸金属服务器",
                "desc": "提供云端独享的高性能、无虚拟化的物理服务器，更适合性能敏感型业务需求",
                "link": "//yun.ccb.com/product/productbms"
            }
        ]
    }, {
        "category": "网络",
        "iconURL": "//yun.ccb.com/common/images/index/midIcon/icon_%E7%BD%91%E7%BB%9C_normal.png",
        "iconHoverURL": "//yun.ccb.com/common/images/index/midIcon/icon_blue_%E7%BD%91%E7%BB%9C.png",
        "children": [
            {
                "name": "云服务器",
                "desc": "稳定、安全、弹性、高性能的云端计算服务，实时满足您的多样性业务需求",
                "link": "//yun.ccb.com/product/cvm"
            },
            {
                "name": "容器服务",
                "desc": "稳定、安全、高效、灵活扩展、简单易用的企业级Kubernetes 容器管理平台",
                "link": "//yun.ccb.com/product/tke"
            },
            {
                "name": "裸金属服务器",
                "desc": "提供云端独享的高性能、无虚拟化的物理服务器，更适合性能敏感型业务需求",
                "link": "//yun.ccb.com/product/productbms"
            }
        ]
    }, {
        "category": "存储",
        "iconURL": "//yun.ccb.com/common/images/index/midIcon/icon_%E5%AD%98%E5%82%A8_normal.png",
        "iconHoverURL": "//yun.ccb.com/common/images/index/midIcon/icon_blue_%E5%AD%98%E5%82%A8.png",
        "children": [
            {
                "name": "云服务器",
                "desc": "稳定、安全、弹性、高性能的云端计算服务，实时满足您的多样性业务需求",
                "link": "//yun.ccb.com/product/cvm"
            },
            {
                "name": "容器服务",
                "desc": "稳定、安全、高效、灵活扩展、简单易用的企业级Kubernetes 容器管理平台",
                "link": "//yun.ccb.com/product/tke"
            },
            {
                "name": "裸金属服务器",
                "desc": "提供云端独享的高性能、无虚拟化的物理服务器，更适合性能敏感型业务需求",
                "link": "//yun.ccb.com/product/productbms"
            }
        ]
    }],
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
            },
            {
                field: 'iconURL',
                label: '默认图标',
                required: true,
                validation: {
                    type: 'image',
                    minSize: 0,
                    maxSize: 1024,//kb
                }
            },
            {
                field: 'iconHoverURL',
                label: '选中图标',
                required: true,
                validation: {
                    type: 'image',
                    minSize: 0,
                    maxSize: 1024,//kb
                }
            },
        ],
        operations: [
            // {
            //     field: 'view',
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
                field: 'delete',
                label: '删除'
            }
        ],
        children: {
            columns: [
                {
                    field: 'name',
                    label: '名称',
                    required: true,
                    validation: {
                        type: 'text',
                        minLength: 5,
                        maxLength: 10,
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
                    }
                },
                {
                    field: 'link',
                    label: '链接',
                    required: false,
                    validation: {
                        type: 'link',
                        pattern: '//yun.ccb.com/'
                    }
                },
            ],
            operations: [
                // {
                //     field: 'view',
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
                    field: 'delete',
                    label: '删除'
                }
            ],
        }
    }
}