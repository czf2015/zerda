import { generate, convert, revert } from '@/utils/tree.js'


export default class Tree {
    constructor(data, mode) {
        switch (mode) {
            case 'nodes':
                this.tree = convert(data)
                break
            case 'levels':
                this.tree = convert(genertate(data))
                break
            default:
                this.tree = data
                break
        }
    }

    static generate(levels) {
        return generate(levels)
    }

    static convert(nodes, parent) {
        return convert(nodes, parent)
    }

    revert() {
        return revert(this.tree)
    }
}
