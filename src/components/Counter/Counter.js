export default class Counter {
    constructor({ count = 0, step = 1, min, max } = {}) {
        this.count = count
        this.step = step
        this.min = min
        this.max = max
    }
    add(handle, warn) {
        const count = this.count + this.step
        if (this.max && count > this.max) {
            typeof warn === 'function' && warn(`最高值为${this.max}`)
        } else {
            this.count = count
            typeof handle === 'function' && handle({ type: 'add', message: count })
        }
        return this
    }
    sub(handle, warn) {
        const count = this.count - this.step
        if (this.min && count < this.min) {
            typeof warn === 'function' && warn(`最低值为${this.min}`)
        } else {
            this.count = count
            typeof handle === 'function' && handle({ type: 'sub', message: count })
        }
        return this
    }
}