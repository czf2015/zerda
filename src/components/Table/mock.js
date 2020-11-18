export const tableColumns = [
    {
        field: 'title',
        label: '标题',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            minLength: 0,
            maxLength: 20,
            valid: true,
            message: '',
            trigger: "input"
        }
    },
    {
        field: 'slug',
        label: '标识',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            minLength: 0,
            maxLength: 20,
            valid: true,
            message: '',
            trigger: "input"
        }
    },
    {
        field: 'children',
        label: '子级',
        mode: 'multiple',
        children: [
            {
                field: 'title',
                label: '标题',
                mode: 'single',
                required: true,
                validation: {
                    type: 'text',
                    minLength: 0,
                    maxLength: 20,
                    valid: true,
                    message: '',
                    trigger: "input"
                }
            },
            {
                field: 'slug',
                label: '标识',
                mode: 'single',
                required: true,
                validation: {
                    type: 'text',
                    minLength: 0,
                    maxLength: 20,
                    valid: true,
                    message: '',
                    trigger: "input"
                }
            },
            {
                field: 'link',
                label: '链接',
                mode: 'single',
                required: true,
                validation: {
                    type: 'link',
                    pattern: /.*/,
                    valid: true,
                    message: '',
                    trigger: "input"
                }
            },

        ]
    },
]


export const tableColumns_1 = [
    {
        field: 'title',
        label: '标题',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            minLength: 0,
            maxLength: 20,
            valid: true,
            message: '',
            trigger: "input"
        }
    },
    {
        field: 'slug',
        label: '标识',
        mode: 'single',
        required: true,
        validation: {
            type: 'text',
            minLength: 0,
            maxLength: 20,
            valid: true,
            message: '',
            trigger: "input"
        }
    },
    {
        field: 'link',
        label: '链接',
        mode: 'single',
        required: true,
        validation: {
            type: 'link',
            pattern: /.*/,
            valid: true,
            message: '',
            trigger: "input"
        }
    },
    {
        field: 'icon_link',
        label: '图片链接',
        mode: 'single',
        required: true,
        validation: {
            type: 'link',
            pattern: /.*/,
            valid: true,
            message: '',
            trigger: "input"
        }
    },
]   

export const tableData = [
    {
        id: 1,
        title: "2016-05-01",
        slug: "王小虎1",
        children: []
    },
    {
        id: 2,
        title: "2016-05-02",
        slug: "王小虎2",
        children: []
    },
    {
        id: 3,
        title: "2016-05-03",
        slug: "王小虎3",
        children: [
            {
                id: 31,
                title: "2016-05-03",
                slug: "王小虎3-1",
                link: "上海市普陀区金沙江路 1519 弄",
            },
            {
                id: 32,
                title: "2016-05-03",
                slug: "王小虎3-2",
                link: "上海市普陀区金沙江路 1519 弄",
            },
        ],
    },
    {
        id: 4,
        title: "2016-05-04",
        slug: "王小虎4",
        children: []
    },
]

// export const convert = (columns) => {
//     return columns
// }


export const operations = [
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
    },
]