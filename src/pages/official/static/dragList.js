export default [
    {
        "id": "1",
        "type": "Container",
        "usage": "Banner",
        "effect": "/images/home/banner.png",
        "title": "Banner配置",
        "content": [
            {
                "imgURL": "https://imagecachexxfb.yun.ccb.com/raw/cba6793909136cf277c94951b5b73d27.png",
                "title": "对象存储",
                "desc": "安全、稳定、海量、便捷、低延迟、低成本的云端存储服务",
                "link": "https://yun.ccb.com/product/productcos"
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
                        "field": "imgURL",
                        "label": "背景图",
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
                        "field": "desc",
                        "label": "描述",
                        "mode": "single",
                        "required": false,
                        "validation": {
                            "type": "text",
                            "minLength": 0,
                            "maxLength": 20,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "link",
                        "label": "链接",
                        "mode": "single",
                        "required": false,
                        "validation": {
                            "type": "link",
                            "pattern": "^\/\/yun.ccb.com",
                            "trigger": "change"
                        }
                    }
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
                    {
                        "field": "up",
                        "label": "上移"
                    },
                    {
                        "field": "down",
                        "label": "下移"
                    }
                ]
            }
        ]
    },
    {
        "id": "2",
        "type": "Container",
        "usage": "Recommend",
        "effect": "/images/home/recommend.png",
        "title": "HTML内容",
        "content": "",
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
                "field": "desc",
                "label": "描述",
                "mode": "single",
                "required": true,
                "validation": {
                    "type": "text",
                    "minLength": 0,
                    "maxLength": 20,
                    "trigger": "input"
                }
            },
            {
                "field": "content",
                "label": "内容",
                "mode": "single",
                "required": true,
                "validation": {
                    "type": "textarea",
                    "minLength": 0,
                    "maxLength": 2000000,
                    "trigger": "input"
                }
            }
        ]
    }
]