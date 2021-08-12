/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 *  验证密码
 * @returns {Boolean}
 * @param rule
 * @param value
 * @param callback
 */
export const validatePass = (rule, value, callback) => {
    if (value) {
        const reg = /^[A-Za-z0-9]+$/
        value = reg.test(value)
        if (value) {
            callback()
        } else {
            callback(new Error('需要由字母和数字组成'))
        }
    } else {
        callback()
    }
}

/**
 *  验证是否是纯空格
 * @returns {Boolean}
 * @param rule
 * @param value
 * @param callback
 */
export const validateTrim = (rule, value, callback) => {
    if (value) {
        if (typeof value === 'string') {
            if (value.trim() === '') {
                callback(new Error('不能为纯空格'))
            } else {
                callback()
            }
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 *  验证是否是数字字母和特殊符号
 * @returns {Boolean}
 * @param rule
 * @param value
 * @param callback
 */
export const validateUrl = (rule, value, callback) => {
    if (value) {
        const reg = /^[a-zA-Z0-9\t\n ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\-,~]+$/
        value = reg.test(value)
        if (value) {
            callback()
        } else {
            callback(new Error('请输入数字字母和特殊符号'))
        }
    } else {
        callback()
    }
}

/**
 *  验证是否是数字类型
 * @returns {Boolean}
 * @param rule
 * @param value
 * @param callback
 */
export const validateNumber = (rule, value, callback) => {
    if (value) {
        const reg = /^[0-9]+$/
        value = reg.test(value)
        if (value) {
            callback()
        } else {
            callback(new Error('请输入数字'))
        }
    } else {
        callback()
    }
}

/**
 * 验证是否是手机号
 * @returns {Boolean}
 * @param rule
 * @param value
 * @param callback
 */
export const validatePhone = (rule, value, callback) => {
    if (value) {
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        value = reg.test(value)
        if (value) {
            callback()
        } else {
            callback(new Error('请正确填写您的手机号码！'))
        }
    } else {
        callback()
    }
}

