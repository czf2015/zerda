export const pick = (obj, ...keys) => {
    const ret = {}
    keys.forEach(key => {
        ret[key] = obj[key]
    })
    return ret
}
/*test
    const obj = {
        a: 1,
        b: 2,
        c: 3,
        c: {
            a: 1
        }
    }

    pick(obj, 'c', 'a')
*/

export function convert(raw, fields, transform) {
    const list = {}

    return function _convert(raw, fields, transform) {
        fields.forEach(field => {
            if (typeof list[field] === 'undefined') {
                list[field] = [raw]
            } else {
                list[field].push(raw)
            }
            for (const key in raw) {
                if (typeof raw[key] === 'object') {
                    if (Array.isArray(raw[key])) {
                        raw[key].forEach(item => item = _convert(item, [field], transform))
                    } else {
                        if (list[field].includes(raw[key])) {
                            console.log(`{ ${key}: [Circular] }`)
                        } else {
                            raw[key] = _convert(raw[key], [field], transform)
                        }
                    }
                } else {
                    if (key === field) {
                        raw[key] = transform(raw[key])
                    }
                }
            }
        })

        return raw
    }(raw, fields, transform)
}


export function adapt(raw, associate) {
    const list = []

    return function _adapt(raw, associate) {
        list.push(raw)

        if (Array.isArray(raw)) {
            raw.forEach(item => item = _adapt(item, associate))
        } else {
            Object.keys(raw).forEach(oldKey => {
                const newKey = associate[oldKey] || oldKey

                if (newKey !== oldKey) {
                    raw[newKey] = raw[oldKey]
                    delete raw[oldKey]
                }

                if (typeof raw[newKey] === 'object') {
                    if (list.includes(raw[newKey])) {
                        console.log(`{ ${newKey}: [Circular] }`)
                    } else {
                        raw[newKey] = _adapt(raw[newKey], associate)
                    }
                }
            })
        }

        return raw
    }(raw, associate)
}
/*test
    const raw = {
        a_b_1: {
            a_b_1: '1',
            a1_b_2: 2,
            a_b2_1: 3,
        },
        a1_b_2: 2,
        a_b2_1: 3,
        b1_a2_3: 4
    }

    adapt(raw, { a1_b_2: 'a_b_c', a_b2_1: 'a1_b1_c1' })
*/


export function extract(raw, pattern, isNested = false) {
    const list = []

    return function _extract(raw, pattern, isNested) {
        list.push(raw)

        const result = {}

        for (const key in raw) {
            if (key.match(pattern)) {
                result[key] = raw[key]
            } else {
                if (typeof raw[key] === 'object') {
                    if (Array.isArray(raw[key])) {
                        continue
                    } else {
                        if (list.includes(raw[key])) {
                            console.log(`{ ${key}: [Circluar] }`)
                        } else {
                            if (isNested) {
                                Object.assign(result, { [key]: _extract(raw[key], pattern, isNested) })
                            } else {
                                Object.assign(result, _extract(raw[key], pattern, isNested))
                            }
                        }
                    }
                }
            }
        }

        return result
    }(raw, pattern, isNested)
}
/*test
    const raw = {
        a_b_1: {
            a_b_1: '1',
            a1_b_2: 2,
            a_b2_1: 3,
        },
        a1_b_2: 2,
        a_b2_1: 3,
        b1_a2_3: 4
    }

    extract(raw, /^[a-z][0-9]_[a-z]_/, false)
*/


export function filter(origin, entries) {
    const r = {}
    for (let key in origin) {
        const entry = entries[key] // boolean | string
        if (typeof entry === 'string') {
            if (origin[key][entry]) {
                Object.assign(r, origin[key][entry])
            }
        } else {
            if (entry) {
                Object.assign(r, origin[key])
            }
        }
    }
    return r
}