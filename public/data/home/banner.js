module.exports = {
    id: '1',
    type: 'Banner',
    usage: 'Banner',
    effect: '/images/home/banner.png',
    title: 'Banner配置',
    desc: '',
    content: [
        {
            "imgURL": "https://imagecachexxfb.yun.ccb.com/raw/cba6793909136cf277c94951b5b73d27.png",
            "title": "对象存储",
            "desc": "安全、稳定、海量、便捷、低延迟、低成本的云端存储服务",
            "link": "https://yun.ccb.com/product/productcos"
        }
    ],
    extra: {
        columns: [
            {
                field: 'imgURL',
                label: '背景图',
                required: true,
                validation: {
                    type: 'image',
                    minSize: 0,
                    maxSize: 1024,//kb
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
                }
            },
            {
                field: 'desc',
                label: '描述',
                required: false,
                validation: {
                    type: 'text',
                    minLength: 5,
                    maxLength: 10,
                }
            },
            {
                field: 'link',
                label: '卡片链接',
                required: false,
                validation: {
                    type: 'link',
                    pattern: '//yun.ccb.com/'
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
                field: 'delete',
                label: '删除'
            }
        ],
    },
}