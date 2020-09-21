import { dateCompare, dateFormat } from './time.js'
import { isNull } from './basic.js'

// Todo:
export const validate = ({ value, validation, required }) => {
    if (required && isNull(value)) {
        return { valid: false, message: '必填项' }
    }
    switch (validation.type) {
        case 'text':
        case 'textarea':
            return (validation.maxLength && value.length > validation.maxLength)
                ? { valid: false, message: `字符数至多${validation.maxLength}个` }
                : (validation.minLength && value.length < validation.minLength)
                    ? { valid: false, message: `字符数至少${validation.minLength}个` }
                    : { valid: true, message: '' }
        case 'number':
            return (validation.max && value > validation.max)
                ? { valid: false, message: `最大值为${validation.max}` }
                : (validation.min && value < validation.min)
                    ? { valid: false, message: `最小值为${validation.min}` }
                    : { valid: true, message: '' }
        case 'dateTime':
            return (validation.endTime && dateCompare(value, validation.endTime))
                ? { valid: false, message: `截止时间为${dateFormat(value)}` }
                : (validation.startTime && !dateCompare(value, validation.startTime))
                    ? { valid: false, message: `起始时间为${dateFormat(value)}` }
                    : { valid: true, message: '' }
        case 'boolean':
            return validation.required && isNull(value)
                ? { valid: false, message: '必选项' }
                : { valid: true, message: '' }
        // case 'link':
        //     return validation.required && isNull(value)
        //         ? { valid: false, message: '必选项' }
        //         : { valid: true, message: '' }
        // case 'image':
        //     return validation.required && isNull(value)
        //         ? { valid: false, message: '必选项' }
        //         : { valid: true, message: '' }
        // case 'single':
        //     return validation.required && isNull(value)
        //         ? { valid: false, message: '必选项' }
        //         : { valid: true, message: '' }
        case 'checkbox':
            return (validation.most && value.length > validation.most)
                ? { valid: false, message: `选项数至多为${validation.most}` }
                : (validation.least && value.length < validation.least)
                    ? { valid: false, message: `选项数至少为${validation.least}` }
                    : { valid: true, message: '' }
        default:
            return { valid: true, message: '' }
    }
}