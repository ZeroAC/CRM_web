/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
 export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
      return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
      date = time
  } else {
      if ((typeof time === 'string')) {
          if ((/^[0-9]+$/.test(time))) {
              // support "1548221490638"
              time = parseInt(time)
          } else {
              // support safari
              // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
              time = time.replace(new RegExp(/-/gm), '/')
          }
      }

      if ((typeof time === 'number') && (time.toString().length === 10)) {
          time = time * 1000
      }
      date = new Date(time)
  }
  const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
* @param {number} time
* @param {string} option
* @returns {string}
*/
export function formatTime(time, option) {
  if (('' + time).length === 10) {
      time = parseInt(time) * 1000
  } else {
      time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
      return '刚刚'
  } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
      return '1天前'
  }
  if (option) {
      return parseTime(time, option)
  } else {
      return (
          d.getMonth() +
          1 +
          '月' +
          d.getDate() +
          '日' +
          d.getHours() +
          '时' +
          d.getMinutes() +
          '分'
      )
  }
}

/**
* @param {string} url
* @returns {Object}
*/
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
      return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
      const index = v.indexOf('=')
      if (index !== -1) {
          const name = v.substring(0, index)
          const val = v.substring(index + 1, v.length)
          obj[name] = val
      }
  })
  return obj
}

/**
* 生成n~m之间的随机数
*/
export function randomNum(minNum = 1000, maxNum = 9999) {
  switch (arguments.length) {
      case 1:
          return parseInt(Math.random() * minNum + 1, 10)
      case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      default:
          return 0
  }
}

/**
* 获取子栏目所有父级元素的id 按层级排序
* @param {*} value {}
* @param {*} data {}
*/
export function parentColumn(value, data) {
  const arr = []

  const recursion = (guid) => {
      const info = data[guid]

      if (info) {
          arr.unshift(info.guid)
          recursion(info.p_id)
      }
  }

  recursion(value)
  return arr
}

/**
* 递归获取栏目分类 配合组件Cascader使用
* @param {*} data []
* @param disabledList
* @param type
*/
export function columnOptions(data, disabledList = [], type = '') {
  const recursion = (pid = 0, disabled = false) => data.filter(val => val.p_id == pid).map(v => {
      if (recursion(v.guid).length > 0) {
          return {
              label: v.title,
              value: v.guid,
              disabled: disabledList.includes(v.guid) || disabled,
              children: recursion(v.guid, disabledList.includes(v.guid))
          }
      } else {
          return {
              label: v.title,
              value: v.guid,
              disabled: disabledList.includes(v.guid) || disabled
          }
      }
  })

  return recursion(0)
}

/**
* 栏目格式整理 数组转对象
* @param ColumnData
* @param {*} data []
* @param {*} type str
*/
export function columnObj(ColumnData, data, type = undefined) {
  data.map(val => ColumnData[val.guid] = { ...val, text: val.title })

  return ColumnData
}
