export const columns = [
    {
        "field": "iconUrl",
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
        "field": "cnName",
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
        "field": "enName",
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
]

export const operations = [
    {
        "field": "edit",
        "label": "编辑"
    },
    {
        "field": "del",
        "label": "删除"
    },
]

export const skins = [
    {
        id: 0,
        theme: "租户端",
        slug: "ower",
    },
    {
        id: 1,
        theme: "用户端",
        slug: "user",
    },
]

export const bars = [
    {
        icon: "/svg/view.svg",
        text: "预览",
        operate: "preview",
    },
    {
        icon: "/svg/publish.svg",
        text: "发布",
        operate: "publish",
    },
]

export const extract = (formData) => {
    const retVal = {}
    formData.forEach(({ field, value }) => {
        retVal[field] = value
    })
    return retVal
}