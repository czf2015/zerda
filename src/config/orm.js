export default (raws) => {
    return raws.map(({ usage, title, desc, content }) => {
        const extract = (content) => {
            return content.map(({ summary = [], details = [] }) => {
                const ret = {}
                summary.map(({ field, value }) => {
                    ret[field] = value
                })
                if (details.length > 0) {
                    ret.children = extract(details)
                }
                return ret
            })
        }
        return {
            usage,
            data: {
                title,
                desc,
                content: extract(content)
            }
        }
    })
}