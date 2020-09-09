// TODO 见《深入理解ES6》(迭代器和生成器--p179)
export default class Task {
    constructor(name) {
        this.name = name
        this.status = 'undo' // 'pendding' | 'suspend' | 'done'
    }

    // run() {
    //     this.status = 'done'
    // }
    static run(taskDef) {
        const task = taskDef()
        let result = task.next()

        const step = () => {
            if (!result.done) {
                if (typeof result.value == 'function') {
                    result.value((err, data) => {
                        if (err) {
                            result = task.throw(err)
                            return
                        }

                        result = task.next(data)
                        step()
                    })
                } else {
                    result = task.next(result.value)
                    step()
                }
            }
        }

        step()
    }
}

// 示例：
// const fs = require('fs')

// function readFile(filename) {
//     return (cb) => {
//         fs.readFile(filename, cb)
//     }
// }

// run (function *() {
//     const content = yield readFile('config.json')
//     doSomethingWith(content)
//     console.log('done')
// })