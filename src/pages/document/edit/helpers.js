export const platforms = [
    {
        value: "1",
        label: "租户端",
    },
    {
        value: "2",
        label: "运营端",
    },
]

export const treeData = [
    {
        label: "一级 1",
        children: [
            {
                label: "二级 1-1",
                children: [
                    {
                        label: "三级 1-1-1",
                        type: "document",
                    },
                ],
            },
        ],
    },
    {
        label: "一级 2",
        children: [
            {
                label: "二级 2-1",
                children: [
                    {
                        label: "三级 2-1-1",
                    },
                ],
            },
            {
                label: "二级 2-2",
                children: [
                    {
                        label: "三级 2-2-1",
                    },
                ],
            },
        ],
    },
    {
        label: "一级 3",
        children: [
            {
                label: "二级 3-1",
                children: [
                    {
                        label: "三级 3-1-1",
                    },
                ],
            },
            {
                label: "二级 3-2",
                children: [
                    {
                        label: "三级 3-2-1",
                    },
                ],
            },
        ],
    },
]

export const convertToOptions = (raws) => {
    return raws.map(item => {
        return {
            label: item.cnName,
            value: item.catalogId,
        }
    })
}

export const convertToTree = (raw) => {
    const ret = []
    raw.forEach(item => {
        item.label = item.title
        // 是否为文件夹
        if (item.nodeType == '0') {
            item.children = convertToTree(item.children)
        } else {
            item.type = 'document'
            // delete item.children
        }
        ret.push(item)
    })
    return ret
}