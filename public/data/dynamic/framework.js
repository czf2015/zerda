export default {
    "id": "w1j227jj1n",
    "type": "TabsIndustry",
    "data": {
        "mod": "tabsIndustry",
        "tabs": [
            {
                "parentId": "default_root",
                "title": "小型网站",
                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_tabsarchitecture10.png",
                "scene_title": "",
                "scene_desc": "",
                "id": "xevxirza2om",
                "key": "xevxirza2om",
                "parentTitle": "空"
            },
            {
                "parentId": "default_root",
                "title": "中型网站",
                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_tabsarchitecture11.png",
                "scene_title": "",
                "scene_desc": "",
                "id": "ob0chg0uzsa",
                "key": "ob0chg0uzsa",
                "parentTitle": "空"
            },
            {
                "parentId": "default_root",
                "title": "大型网站",
                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_tabsarchitecture12.png",
                "scene_title": "",
                "scene_desc": "",
                "id": "ygnz895fue",
                "key": "ygnz895fue",
                "parentTitle": "空"
            }
        ],
        "title": "方案架构",
        "desc": "",
        "theme": "TabsIndustry"
    },
    "childBlocks": [
        {
            "id": "ygnz895fue",
            "type": "Container",
            "data": {},
            "childBlocks": [
                {
                    "id": "7pc23f6obz",
                    "type": "FrameWorkIntro",
                    "data": {
                        "title": "架构介绍",
                        "content": "日均访问量高于10万 大量图片、视频类资源，动态和静态数据分离"
                    }
                },
                {
                    "id": "m79chmguvfk",
                    "type": "FrameWorkCloud",
                    "data": {
                        "column": null,
                        "title": "产品推荐",
                        "desc": null,
                        "list": [
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_selfNet.png",
                                "title": "私有网络",
                                "moreUrl": "//yun.ccb.com/product/vpc1"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/product/product_yfwq.png",
                                "title": "云服务器",
                                "moreUrl": "//yun.ccb.com/product/cvm"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/product_memory4.png",
                                "title": "文件存储",
                                "moreUrl": "//yun.ccb.com/product/productcfs"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_cloud.png",
                                "title": "云硬盘",
                                "moreUrl": "//yun.ccb.com/product/productcbs"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct4.png",
                                "title": "云数据库Mysql",
                                "moreUrl": "//yun.ccb.com/product/productmysql"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_long.png",
                                "title": "龙御",
                                "moreUrl": "//yun.ccb.com/product/productwaf"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_long1.png",
                                "title": "龙卫士",
                                "moreUrl": "//yun.ccb.com/product/producthids"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_balance.png",
                                "title": "弹性负载均衡",
                                "moreUrl": "//yun.ccb.com/product/elb"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_NAT.png",
                                "title": "NAT网关",
                                "moreUrl": "//yun.ccb.com/product/nat"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct4.png",
                                "title": "云数据库Redis",
                                "moreUrl": "//yun.ccb.com/product/productredis"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_object.png",
                                "title": "对象存储",
                                "moreUrl": "//yun.ccb.com/product/productcos"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_CDN.png",
                                "title": "CDN服务",
                                "moreUrl": "//yun.ccb.com/product/cdn"
                            }
                        ]
                    }
                },
                {
                    "id": "1ly5rrr8s29",
                    "type": "FrameWorkConfig",
                    "data": {
                        "column": null,
                        "title": "推荐配置",
                        "desc": null,
                        "list": [
                            {
                                "title": "云服务器16台",
                                "desc": "4C8G，100G系统盘，500G数据盘"
                            },
                            {
                                "title": "云数据库3套",
                                "desc": "MYSQL 4C16G 500G数据空间\nRedis 4C16G 48G数据空间"
                            },
                            {
                                "title": "其他配置",
                                "desc": "  公网IP2个，ELB2台，NAT网关1台，VPN网关1台，专线网关1台，文件存储1T，对象存储5T，50M公网带宽，200Mb CDN带宽"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "id": "xevxirza2om",
            "type": "Container",
            "data": {},
            "childBlocks": [
                {
                    "id": "hnibitlca3b",
                    "type": "FrameWorkIntro",
                    "data": {
                        "title": "架构介绍",
                        "content": "日均访问量低于1万 需要一定的安全防护措施"
                    }
                },
                {
                    "id": "o09ai8d3ipa",
                    "type": "FrameWorkCloud",
                    "data": {
                        "column": null,
                        "title": "产品推荐",
                        "desc": null,
                        "list": [
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_selfNet.png",
                                "title": "私有网络",
                                "moreUrl": "//yun.ccb.com/product/vpc1"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/product/product_yfwq.png",
                                "title": "云服务器",
                                "moreUrl": "//yun.ccb.com/product/cvm"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_cloud.png",
                                "title": "云硬盘",
                                "moreUrl": "//yun.ccb.com/product/productcbs"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/product_ysjkM.png",
                                "title": " 云数据库mysql",
                                "moreUrl": "//yun.ccb.com/product/productmysql"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_long.png",
                                "title": "龙御",
                                "moreUrl": "//yun.ccb.com/product/productwaf"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_long1.png",
                                "title": "龙卫士",
                                "moreUrl": "//yun.ccb.com/product/producthids"
                            }
                        ]
                    }
                },
                {
                    "id": "97ws3ch2ntk",
                    "type": "FrameWorkConfig",
                    "data": {
                        "column": null,
                        "title": "推荐配置",
                        "desc": null,
                        "list": [
                            {
                                "title": "云服务器3台",
                                "desc": "\n1C2G，100G系统盘，200G数据盘"
                            },
                            {
                                "title": "云数据库1套",
                                "desc": "\nMySQL 2C4G 100G数据空间"
                            },
                            {
                                "title": "公网IP 3个，1M公网带宽",
                                "desc": " "
                            }
                        ]
                    }
                }
            ]
        },
        {
            "id": "ob0chg0uzsa",
            "type": "Container",
            "data": {},
            "childBlocks": [
                {
                    "id": "k8edv6q0tnc",
                    "type": "FrameWorkIntro",
                    "data": {
                        "title": "架构介绍",
                        "content": "日均访问量低于10万 前端引入弹性负载均衡，并引入分布式缓存应对高并发"
                    }
                },
                {
                    "id": "oln5pocet9c",
                    "type": "FrameWorkCloud",
                    "data": {
                        "column": null,
                        "title": "产品推荐",
                        "desc": null,
                        "list": [
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_selfNet.png",
                                "title": "私有网络",
                                "moreUrl": "//yun.ccb.com/product/vpc1"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/product/product_yfwq.png",
                                "title": "云服务器",
                                "moreUrl": "//yun.ccb.com/product/cvm"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_cloud.png",
                                "title": "云硬盘",
                                "moreUrl": "//yun.ccb.com/product/productcbs"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/product_ysjkM.png",
                                "title": "云数据库Mysql",
                                "moreUrl": "//yun.ccb.com/product/productmysql"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_long.png",
                                "title": "龙御",
                                "moreUrl": "//yun.ccb.com/product/productwaf"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/solution_long1.png",
                                "title": "龙卫士",
                                "moreUrl": "//yun.ccb.com/product/producthids"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/product_wl_txfzjh.png",
                                "title": "弹性负载均衡",
                                "moreUrl": "//yun.ccb.com/product/elb"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct_NAT.png",
                                "title": " NAT网关",
                                "moreUrl": "//yun.ccb.com/product/nat"
                            },
                            {
                                "iconUrl": "//imagecachexxfb.yun.ccb.com/static/solution/aboutproduct4.png",
                                "title": "云数据库Redis",
                                "moreUrl": "//yun.ccb.com/product/productredis"
                            }
                        ]
                    }
                },
                {
                    "id": "7dju3bvohks",
                    "type": "FrameWorkConfig",
                    "data": {
                        "column": null,
                        "title": "推荐配置",
                        "desc": null,
                        "list": [
                            {
                                "title": "云服务器8台",
                                "desc": "\n2C4G，100G系统盘，200G数据盘"
                            },
                            {
                                "title": "云数据库2套",
                                "desc": "\nMySQL 4C8G 200G数据空间\nRedis 2C8G 24G数据空间"
                            },
                            {
                                "title": "文件存储1T",
                                "desc": " "
                            },
                            {
                                "title": "其他配置",
                                "desc": "公网IP 2个，ELB 2台，NAT网关1台，5M公网带宽"
                            }
                        ]
                    }
                }
            ]
        }
    ]
}