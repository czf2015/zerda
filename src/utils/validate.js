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
            return required && isNull(value)
                ? { valid: false, message: '必选项' }
                : { valid: true, message: '' }
        case 'link':
            return required && !new RegExp(validation.pattern).test(value)
                ? { valid: false, message: `格式不符合规则：${validation.pattern}` }
                : { valid: true, message: '' }
        // case 'image':
        //     return required && isNull(value)
        //         ? { valid: false, message: '必选项' }
        //         : { valid: true, message: '' }
        // case 'single':
        //     return required && isNull(value)
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

//链接校验
const strRegex = "^((https|http|ftp|rtsp|mms)?://)"  
 5        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
 6        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
 7        + "|" // 允许IP和DOMAIN（域名） 
 8        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
 9        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
10        + "[a-z]{2,6})" // first level domain- .com or .museum  
11        + "(:[0-9]{1,4})?" // 端口- :80  
12        + "((/?)|" // a slash isn't required if there is no file name  
13        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
export const urlValidate = new RegExp(strRegex);

//数字校验
export const numberValidate = /^[0-9]*$/