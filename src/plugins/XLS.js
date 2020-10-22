#!node
import xlsx from 'xlsx'

export default class XLS {
    constructor(file) {
        this.file = file
    }

    toJSON(sheet) {
        const workbook = xlsx.readFile(this.file)
        const worksheet = workbook.Sheets[workbook.SheetNames[sheet]]
        return xlsx.utils.sheet_to_json(worksheet)
    }

    toCSV(sheet, opts) {
        const workbook = xlsx.readFile(this.file)
        const worksheet = workbook.Sheets[workbook.SheetNames[sheet]]
        return xlsx.utils.sheet_to_csv(worksheet, opts)
    }

    parse(sheet) {
        let tmp = ''
        const table = this.toCSV(sheet, { FS: ',,,,,', RS: '\n' })
            .split('\n')
            .map(line => {
                return line.split(',,,,,').map(item => {
                    if (item) {
                        tmp = trim(item).replace(/\"/g, '')
                    }
                    return tmp
                })
            })
        return table
    }

    // 单一表
    read(sheet) {
        const res = {}
        const data = this.toJSON(sheet)
        const header = data[0] // 提取表格头
        const convert = record => {
            const keyMap = {}
            let _key
            for (let key in header) {
                if (record[key]) {
                    if (key.match(/__EMPTY/)) {
                        // console.log('-----__EMPTY------')
                        keyMap[_key][header[key]] = record[key]
                    } else {
                        _key = key
                        keyMap[key] = {
                            [header[key]]: record[key]
                        }
                    }
                }
            }
            return keyMap
        }
        data.slice(1).map(convert).forEach(record => {
            Object.keys(record).forEach(key => {
                if (res[key]) {
                    res[key].push(record[key])
                } else {
                    res[key] = [record[key]]
                }
            })
        })
        return res
    }

    // 多联表
    join(sheet) {
        const res = {}
        const sheets = []
        let sheetsIdx = -1
        let name = ''
        this.toJSON(sheet)
            .forEach(row => {
                let col = 0
                for (let key in row) {
                    if (col == 0) {
                        name = row[key]
                    }
                    if (row[key]) {
                        col++
                    } else {
                        break
                    }
                }
                if (col > 1) {
                    sheets[sheetsIdx].data.push(row)
                }
                if (col === 1) {
                    sheets.push({ name, data: [] })
                    sheetsIdx++
                }
            })
        sheets.forEach(({ name, data }) => {
            const header = data[0]
            const convert = record => {
                const keyMap = {
                    name: '',
                    entries: [],
                }
                let col = 0
                for (let key in header) {
                    if (record[key]) {
                        if (col == 0) {
                            keyMap.name = record[key]
                        } else {
                            keyMap.entries.push({
                                name: header[key],
                                value: record[key]
                            })
                        }
                    }
                    col++
                }
                return keyMap
            }
            res[name] = data.slice(1).map(convert)
        })
        return res
    }
}
