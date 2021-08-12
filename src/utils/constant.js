export const hostUrl = 'https://csdn-exam-admin.oss-cn-hangzhou.aliyuncs.com'
export const defaultGuid = 'CRM2021080808'
export const defaultToken = 'CRMPublicToken2021'
export const defaultVersion = 1
export const hashRule = [
  [0, 6, 9, 15, 22, 28],
  [2, 8, 17, 25, 30, 31],
  [20, 28, 31, 3, 4, 8],
  [25, 31, 4, 9, 13, 17],
  [29, 2, 11, 27, 21, 26],
  [10, 15, 18, 21, 2, 3],
  [5, 10, 15, 17, 11, 22],
  [8, 20, 22, 27, 19, 27]
]

// 需要自定义的提示
export const diyMsg = [
  '操作失败'
]

// 通用接口使用默认token和guid
export const commonApi = [
  '/api/admin/login'
]

// 不需要验证签名的接口
export const noCheckApi = [
  '/oss/getsign'
]
