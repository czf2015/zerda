module.exports = {
    id: '6',
    type: 'Container',
    usage: 'Certification',
    effect: '/images/home/certification.png',
    title: '合规认证',
    desc: '建设安全可靠的云生态环境，提供值得依赖的优质云服务',
    content: [
        {
            "title": "ISO 20000",
            "iconURL": "//yun.ccb.com/myNatural/img/iso20000_v2.png"
        },
        {
            "title": "可信云",
            "iconURL": "//yun.ccb.com/myNatural/img/可信云.png"
        },
        {
            "title": "ISO 27001",
            "iconURL": "//yun.ccb.com/myNatural/img/iso27001_v2.png"
        },
        {
            "title": "网络安全等级保护",
            "iconURL": "//yun.ccb.com/myNatural/img/DJCP.png"
        }
    ],
    extra: {
        columns: [
            {
                field: 'iconURL',
                label: '图标',
                required: true,
                validation: {
                    type: 'image',
                    minSize: 0,
                    maxSize: 1024,//kb
                    trigger: "blur"
                }
            },
            {
                field: 'title',
                label: '标题',
                required: false,
                validation: {
                    type: 'text',
                    minLength: 5,
                    maxLength: 10,
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
            },
            {
                field: 'up',
                label: '上移'
            },
            {
                field: 'down',
                label: '下移'
            }
        ],
    },
}