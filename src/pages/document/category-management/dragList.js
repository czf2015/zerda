export default [
    {
        "id": "1",
        "type": "Container",
        "usage": "Banner",
        "effect": "/images/home/banner.png",
        "title": "类别管理",
        "content": [
            {
                "icon_url": "https://imagecachexxfb.yun.ccb.com/raw/cba6793909136cf277c94951b5b73d27.png",
                "cn_name": "对象存储",
                "en_name": "storage",
                "weight": 1,
                "forward": "https://yun.ccb.com/product/productcos"
            }
        ],
        "extra": [
            {
                "field": "title",
                "label": "标题",
                "mode": "single",
                "required": true,
                "validation": {
                    "type": "text",
                    "minLength": 0,
                    "maxLength": 10,
                    "trigger": "input"
                }
            },
            {
                "field": "content",
                "label": "内容",
                "mode": "multiple",
                "children": [
                    {
                        "field": "icon_url",
                        "label": "图标",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "image",
                            "minSize": 0,
                            "maxSize": 1024,
                            "trigger": "blur"
                        }
                    },
                    {
                        "field": "cn_name",
                        "label": "中文名称",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "text",
                            "minLength": 0,
                            "maxLength": 10,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "en_name",
                        "label": "英文名称",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "text",
                            "minLength": 0,
                            "maxLength": 10,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "forward",
                        "label": "链接",
                        "mode": "single",
                        "required": false,
                        "validation": {
                            "type": "link",
                            "pattern": "^\/\/yun.ccb.com",
                            "trigger": "change"
                        }
                    },
                    {
                        "field": "weight",
                        "label": "权重",
                        "mode": "single",
                        "required": false,
                        "validation": {
                            "type": "number",
                            "min": 0,
                            "max": 100000,
                            "trigger": "input"
                        }
                    },
                ],
                "operations": [
                    {
                        "field": "edit",
                        "label": "编辑"
                    },
                    {
                        "field": "del",
                        "label": "删除"
                    },
                    // {
                    //     "field": "up",
                    //     "label": "上移"
                    // },
                    // {
                    //     "field": "down",
                    //     "label": "下移"
                    // }
                ]
            }
        ]
    },
]
