const Utils = {
    reflex: any => any,
    mixin: (...object[]) => object, // 对象
    isEqual: (any, any) => boolean, // 比较任意类型
    isNull: (any) => boolean, // 空值
    compare: (T, T) => boolean, // Number | Date | String
    diff: (string, string) => object, // 找出字符串差异
    validate: ({ value: T, validation: object }) => ({ valid: boolean, message: string | T })T<any>, // 校验
    traverse: (tree, function) => void, // 遍历树
    pick: (object) => object, // 筛选key-value
    extract: (object, array, boolean) => object, // 格式化
    adapt: (object, object) => object, // 更改key名称
    convert: (object, array, function) => object, // 更改value形式
}