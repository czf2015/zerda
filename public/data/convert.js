const fs = require('fs')

const convert = (raws) => {
    return raws.map(({ id, type, usage, title, desc, content }) => {
        const extract = (raw) => {
            if (Array.isArray(raw)) {
                return raw.map(extract)
            } else {
                const { data, children } = raw
                return Array.isArray(data) ? data : { ...data, children: children && extract(children) }
            }
        }
        return {
            id,
            type,
            usage,
            data: {
                title,
                desc,
                content: extract(content)
            }
        }
    })
}


const execute = (page) => {
    const raws = require(`${__dirname}/${page}/index.js`)
    fs.writeFile(`${__dirname}/${page}/index.json`, JSON.stringify(convert(raws), null, 2), (err) => {
        if (err) {
            console.error(err)
        }
    })
}

const run = () => {
    const tasks = process.argv.slice(2)
    tasks.forEach(execute)
}

run()