import { routes } from './breadcrumb'
import * as formProps from './form'
import * as tableProps from "./table";
import * as menuProps from "./menu";
import * as treeProps from './tree'
import * as cascaderProps from './cascader'
import { framesUrl } from './framesUrl'

export default {
    Breadcrumb: {
        props: {
            current: ["other", "activity", "list", "details"],
            routes,
        },
    },

    CustomForm: {
        props: formProps
    },

    CustomTable: {
        props: tableProps
    },

    TableForm: {
        props: tableProps,
    },

    TableTree: {
        props: tableProps,
    },

    Menu: {
        props: menuProps,
    },

    Upload: {
        props: {
            uploadAPI: "https://jsonplaceholder.typicode.com/posts/",
            drag: true,
            listType: 'picture'
        }
    },

    Rate: {
        props: {
            value: 3,
            // showScore: true,
            // showText: true,
            // colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            'icon-classes': ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
        },
        listeners: {
            change(msg) {
                console.log(msg)
            }
        }
    },

    Card: {},

    Tag: {
        props: {
            name: 'tagName',
            closable: true,
        },
        listeners: {
            close(msg) {
                console.log(msg)
            }
        }
    },

    Icon: {
        props: {
            src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            shape: 'circle'
        }
    },

    Badge: {
        props: {
            // type: 'primary',
            value: '1',
            html: '<button>badge</button>'
        },
        listeners: {
            click(msg) {
                console.log(msg)
            }
        }
    },

    Tree: {
        props: {
            ...treeProps,
            nodeKey: 'tree1',
            expand: true,
            accordion: true,
            draggable: true,
            filter: true,
        },
        listeners: {
            add(msg) {
                console.log(msg)
            },
            del(msg) {
                console.log(msg)
            }
        }
    },

    Pagination: {
        props: {
            total: 1000,
            pageSize: 100,
            currentPage: 1
        }
    },

    FrameAnimation: {
        props: {
            framesUrl,
            canvasTargetId: 'frames',
            width: 263,
            height: 264,
            scale: 3,
            frequency: .5,
        }
    },

    Collapse: {
        props: {
            list: [
                {
                    summary: 'summary',
                    content: 'content',
                }
            ]
        }
    },

    Counter: {
        props: {
            count: 0,
            min: 0,
            max: 10,
            step: 1,
            current: 2,
        },
        listeners: {
            error(err) {
                console.log(err)
            }
        }
    },

    Columns: {
        // props: {}
    },

    Timeline: {
        props: {
            sequences: [
                {
                    content: "支持使用图标",
                    timestamp: "2018-04-12 20:46",
                    size: "large",
                    type: "primary",
                    icon: "el-icon-more",
                },
                {
                    content: "支持自定义颜色",
                    timestamp: "2018-04-03 20:46",
                    color: "#0bbd87",
                },
                {
                    content: "支持自定义尺寸",
                    timestamp: "2018-04-03 20:46",
                    size: "large",
                },
                {
                    content: "默认样式的节点",
                    timestamp: "2018-04-03 20:46",
                },
            ],
        }
    },

    Cascader: {
        props: {
            ...cascaderProps,
            filterable: true,
            clearable: true,
        },
        listeners: {
            change(msg) {
                console.log(msg)
            }
        }
    },

    Tooltip: {
        props: {
            content: 'Bottom center'
        }
    },

    Alert: {
        props: {
            type: "error",
            title: "消息提示的文案",
            description: "文字说明文字说明文字说明文字说明文字说明文字说明",
        },
        listeners: {
            close() {
                console.log('closed')
            }
        }
    },

    SideBar: {
        props: {
            list: [
                {
                    link: 'wwww.baidu.com',
                    icon: 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3997521572,425720479&fm=74&app=80&f=JPEG&size=f121,90?sec=1880279984&t=24d78aa497d23ca09084ff40ac52bde0',
                    text: '保存',
                },
                {
                    link: 'wwww.baidu.com',
                    icon: 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3997521572,425720479&fm=74&app=80&f=JPEG&size=f121,90?sec=1880279984&t=24d78aa497d23ca09084ff40ac52bde0',
                    text: '预览',
                },
                {
                    link: 'wwww.baidu.com',
                    icon: 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3997521572,425720479&fm=74&app=80&f=JPEG&size=f121,90?sec=1880279984&t=24d78aa497d23ca09084ff40ac52bde0',
                    text: '发布',
                }
            ]
        },
        listeners: {
            click(msg) {
                console.log(msg)
            }
        }
    },

    Affix: {
        props: {
            pos: {
                top: '40px'
            }
        }
    },

    Modal: {
        props: {
            show: true
        },
        listeners: {
            close() {
                console.log('close')
            },
            operate({ name, message }) {
                // console.log('cancel')
                switch (name) {
                    case 'save':
                        console.log(message)
                        break
                    case 'cancel':
                        console.log('cancel')
                        break
                    default:
                        break
                }
            }
        }
    },

    Steps: {
        props: {
            steppers: [1, 2, 3],
        },
        listeners: {
            change(msg) {
                console.log(msg)
            }
        }
    },

    Drawer: {
        props: {
            initial: {
                title: '我是外面的 Drawer'
            }
        }
    },

    Tabs: {
        props: {
            initial: {
                editableTabsValue: "1",
                editableTabs: [
                    {
                        name: "1",
                        label: "Tab 1",
                        content: "Tab 1 content",
                    },
                    {
                        name: "2",
                        label: "Tab 2",
                        content: "Tab 2 content",
                    },
                ],
            }
        }
    },

    Carousel: {
        props: {
            list: [1, 2, 3, 4]
        }
    },

    Dnd: {},

    Loading: {},

    Search: {},
    Excel: {
        props: {
            initData: [
                ["", "Tesla", "Mercedes", "Toyota", "Volvo"],
                ["2019", 10, 11, 12, 13],
                ["2020", 20, 11, 14, 13],
                ["2021", 30, 15, 12, 13],
            ]
        }
    },

}
