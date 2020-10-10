// 类型检查
export default function Check (type) {
    return function (target, name, descriptor) {
        if (descriptor.initializer) {
            descriptor.initializer.call(this);
        }
        /**
         * 将属性名字以及需要的类型的对应关系记录到类的原型上
         */
        if (!target.constructor.__checkers__) {
            // 将这个隐藏属性定义成 not enumerable，遍历的时候是取不到的。
            Object.defineProperty(target.constructor, "__checkers__", {
                value: {},
                enumerable: false,
                writeable: true,
                configurable: true
            });
        }
        target.constructor.__checkers__[name] = {
            type: type
        };
        return descriptor
    }
}

// 作者：小芋头君43
// 链接：https://juejin.im/post/6844903506562777101
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。