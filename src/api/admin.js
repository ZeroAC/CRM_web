import request from '@/utils/request'

export function adminCreate(data) {
  return request({
    url: '/api/admin/create',
    method: 'post',
    data
  })
}

/**
 * 管理员列表
 * @param {*} data
 * @returns
 */
export function adminList(data) {
  return request({ url: '/api/admin/list', method: 'post', data })
}

/**
 * 全部管理员
 * @param {*} data
 * @returns
 */
export function adminAll(data) {
  return request({ url: '/api/admin/all', method: 'post', data })
}

/**
 * 管理员详情
 * @param {*} data
 * @returns
 */
export function adminDetail(data) {
  return request({ url: '/api/admin/info', method: 'post', data })
}

/**
 * 修改管理员
 * @param {*} data
 * @returns
 */
export function adminUpdate(data) {
  return request({ url: `/api/admin/update`, method: 'post', data })
}

/**
 * 修改管理员密码
 * @param {*} data
 * @returns
 */
export function updatePassword(data) {
  return request({ url: `/api/admin/password`, method: 'post', data })
}

/**
 * 删除管理员
 * @param {*} data
 * @returns
 */
export function adminDelete(data) {
  return request({ url: `/api/admin/delete`, method: 'post', data })
}

/**
 * 禁用或启用管理员
 * @param {*} data
 * @returns
 */
export function updateStatus(data) {
  return request({ url: `/api/admin/update/status`, method: 'post', data })
}

/**
 * 管理员登录
 * @param {*} data
 * @returns
 */
export function adminLogin(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

/**
 * 管理员信息
 * @param {*} data
 * @returns
 */
export function adminInfo(data) {
  return request({
    url: '/api/admin/info',
    method: 'post',
    data
  })
}

/**
 * 管理员退出登录
 * @param {*} data
 * @returns
 */
export function adminLogout(data) {
  return request({
    url: '/api/admin/logout',
    method: 'post',
    data
  })
}
