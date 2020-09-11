export const convert = ({ id, type, usage, title, desc, background, content, extra, effect }) => {
    return {
        id,
        type,
        effect,
        table: {
            content,
            ...extra,
        },
        formData: [
            // {
            //     field: "title",
            //     label: "标题",
            //     required: true,
            //     value: title || "",
            //     validation: {
            //         type: "text",
            //         minLength: 5,
            //         maxLength: 10,
            //     },
            // },
            {
                field: "desc",
                label: "描述",
                required: false,
                value: desc || "",
                validation: {
                    type: "text",
                    minLength: 10,
                    maxLength: 20,
                },
            },
            {
                field: "background",
                label: "背景",
                required: false,
                value: background || "",
                validation: {
                    type: "image",
                    minSize: 5,
                    maxSize: 10,
                },
            },
            // {
            //     field: "usage",
            //     label: "用途",
            //     required: false,
            //     value: usage || "",
            //     validation: {
            //         type: "text",
            //         minLength: 5,
            //         maxLength: 10,
            //     },
            // },
        ]
    }
}