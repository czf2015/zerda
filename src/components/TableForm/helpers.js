export const convert = ({ id, type, usage, title, desc, background, content, extra, effect }) => {
    const formData = [
       /*  {
            field: "title",
            label: "标题",
            required: true,
            value: title || "",
            validation: {
                type: "text",
                minLength: 5,
                maxLength: 10,
            },
        }, {
            field: "usage",
            label: "用途",
            required: false,
            value: usage || "",
            validation: {
                type: "text",
                minLength: 5,
                maxLength: 10,
            },
        } */]
    if (typeof desc !== 'undefined') {
        formData.push({
            field: "desc",
            label: "描述",
            required: false,
            value: desc || "",
            validation: {
                type: "text",
                minLength: 10,
                maxLength: 20,
            },
        })
    }
    if (typeof background !== 'undefined') {
        formData.push({
            field: "background",
            label: "背景",
            required: false,
            value: background || "",
            validation: {
                type: "image",
                minSize: 5,
                maxSize: 10,
            },
        })
    }
    return {
        id,
        type,
        effect,
        table: {
            content,
            ...extra,
        },
        formData,
    }
}

export const convertFormData = (columns, rowData) => {
    const _convert = (columns) => {
        const ret = []
        columns.forEach(({ field, label, options, required, validation, children }) => {
            if (children && children.length > 0) {
                ret.push(..._convert(children))
            } else {
                const value = (validation.type == 'date' || validation.type == 'dateTime') ? new Date(rowData[field]) : rowData[field]
                ret.push({ field, label, value, options, required, validation })
            }   
        })
        return ret
    }
    return _convert(columns)
}