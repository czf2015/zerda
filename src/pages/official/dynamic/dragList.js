export default [
    {
        "id": "1",
        "type": "Container",
        "usage": "Banner",
        "effect": "/images/home/banner.png",
        "title": "Banner配置",
        "content": [],
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
        "title": "我们的推荐",
        "desc": "",
        "content": [],
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
                "mode": "multiple",
                "children": [
                    {
                        "field": "title",
                        "label": "名称",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "text",
                            "minLength": 3,
                            "maxLength": 5,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "imgURL",
                        "label": "图片",
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
                        "field": "link",
                        "label": "链接",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "link",
                            "pattern": "^\/\/yun.ccb.com",
                            "trigger": "blur"
                        }
                    },
                    {
                        "field": "button",
                        "label": "按钮",
                        "mode": "single",
                        "validation": {
                            "type": "link",
                            "pattern": "^\/\/yun.ccb.com",
                            "trigger": "blur"
                        }
                    },
                    {
                        "field": "desc",
                        "label": "描述",
                        "mode": "single",
                        "validation": {
                            "type": "text",
                            "minLength": 10,
                            "maxLength": 20,
                            "trigger": "input"
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
        "id": "3",
        "type": "Panel",
        "usage": "Products",
        "effect": "/images/home/products.png",
        "title": "我们的云产品",
        "desc": "计算、存储、网络、安全、数据库等全栈式产品，助您顺利上云",
        "content": [
            {
                "category": "tab1",
                "iconURL": "",
                "iconHoverURL": "",
                "children": [
                ]
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
                "mode": "multiple",
                "children": [
                    {
                        "field": "category",
                        "label": "类别",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "text",
                            "minLength": 0,
                            "maxLength": 5,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "iconURL",
                        "label": "默认图标",
                        "required": true,
                        "mode": "single",
                        "validation": {
                            "type": "image",
                            "minSize": 0,
                            "maxSize": 1024,
                            "trigger": "blur"
                        }
                    },
                    {
                        "field": "iconHoverURL",
                        "label": "选中图标",
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
                        "field": "children",
                        "label": "子项",
                        "mode": "multiple",
                        "children": [
                            {
                                "field": "name",
                                "label": "名称",
                                "mode": "single",
                                "required": true,
                                "validation": {
                                    "type": "text",
                                    "minLength": 5,
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
                                    "minLength": 5,
                                    "maxLength": 10,
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
                                    "trigger": "blur"
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
            }
        ]
    },
    {
        "id": "4",
        "type": "Panel",
        "usage": "Solutions",
        "effect": "/images/home/solutions.png",
        "title": "我们的解决方案",
        "desc": "",
        "content": [
            {
                "category": "tab1",
                "children": [
                ]
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
                "mode": "multiple",
                "children": [
                    {
                        "field": "category",
                        "label": "类别",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "text",
                            "minLength": 0,
                            "maxLength": 5,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "children",
                        "label": "子项",
                        "mode": "multiple",
                        "children": [
                            {
                                "field": "iconURL",
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
                                "field": "name",
                                "label": "标题",
                                "mode": "single",
                                "required": true,
                                "validation": {
                                    "type": "text",
                                    "minLength": 0,
                                    "maxLength": 5,
                                    "trigger": "input"
                                }
                            },
                            {
                                "field": "desc",
                                "label": "描述",
                                "mode": "single",
                                "required": true,
                                "validation": {
                                    "type": "textarea",
                                    "minLength": 10,
                                    "maxLength": 30,
                                    "trigger": "input"
                                }
                            },
                            {
                                "field": "hover",
                                "label": "hover状态",
                                "mode": "single",
                                "required": true,
                                "validation": {
                                    "type": "boolean",
                                    "trigger": "blur"
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
            }
        ]
    },
    {
        "id": "5",
        "type": "Container",
        "usage": "Trades",
        "effect": "/images/home/trades.png",
        "title": "我们的行业平台",
        "desc": "提供一站式服务平台，跨界支持行业发展",
        "background": "https://yun.ccb.com/common/images/index/business/hangye-bg-gq.png",
        "content": [],
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
                "mode": "multiple",
                "children": [
                    {
                        "field": "title",
                        "label": "名称",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "text",
                            "minLength": 3,
                            "maxLength": 5,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "desc",
                        "label": "描述",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "textarea",
                            "minLength": 10,
                            "maxLength": 30,
                            "trigger": "input"
                        }
                    },
                    {
                        "field": "link",
                        "label": "链接",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "link",
                            "pattern": "^\/\/yun.ccb.com",
                            "trigger": "blur"
                        }
                    },
                    {
                        "field": "iconURL",
                        "label": "图标",
                        "mode": "single",
                        "required": true,
                        "validation": {
                            "type": "image",
                            "minSize": 0,
                            "maxSize": 1028,
                            "trigger": "blur"
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
        "id": "6",
        "type": "Container",
        "usage": "Certification",
        "effect": "/images/home/certification.png",
        "title": "合规认证",
        "desc": "建设安全可靠的云生态环境，提供值得依赖的优质云服务",
        "content": [],
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
                "mode": "multiple",
                "children": [
                    {
                        "field": "iconURL",
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
                        "field": "title",
                        "label": "标题",
                        "mode": "single",
                        "required": false,
                        "validation": {
                            "type": "text",
                            "minLength": 5,
                            "maxLength": 10,
                            "trigger": "input"
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
    }
]
