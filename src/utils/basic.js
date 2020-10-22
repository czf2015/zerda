export const reflex = x => x

export const compare = (a, b) => a > b

export const isEqual = (a, b) => {
    if (a === b) return true

    if (a instanceof Date && b instanceof Date) {
        if (a.getTime() !== b.getTime()) return false
    }

    if (a !== Object(a) || b !== Object(b)) {
        return false
    }

    if (Object.keys(a).length !== Object.keys(b).length) {
        return false
    }

    return Object.keys(a).every(key => isEqual(a[key], b[key]))
}

export const isNull = (val) => {
    return typeof val === 'undefined'
        || val === ''
        || val === null
        || (Array.isArray(val) && val.length === 0)
        || (typeof val === 'object' && Object.keys(val).length === 0)
}

export const mixin = (...mixins) => {
    const base = function () { }
    Object.assign(base.prototype, ...mixins)
    return base
}
/*test
    const mixin1 = {
        a1: 1,
        methodA() {
            console.log(this.a1)
        },
    }
    const mixin2 = {
        a2: 2,
        methodB() {
            console.log(this.a2)
        },
    }
    const mixin3 = {
        a2: 3,
        c3: 3,
        methodC() {
            console.log(this.a2)
            console.log(this.a3)
        },
    }
    const Mixin = mixin(mixin1, mixin2, mixin3)
    console.log(Mixin.prototype)
*/


export const curry = (fn, ...predeterParams) => (...undeterParams) => fn(...predeterParams, ...undeterParams)

export const memoizer = (memo, formula) => {
    const recur = (n) => {
        if (typeof memo[n] === 'undefined') {
            memo[n] = formula(recur, n)
        }
        return memo[n]
    }
    return recur
}

export function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)))
}