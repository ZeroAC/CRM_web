import md5 from 'md5'
import store from '@/store'
import { defaultGuid, defaultToken, defaultVersion, commonApi, hashRule } from '@/utils/constant'

function checkApi(config) {
  let guid = defaultGuid // 默认guid
  let token = defaultToken // 默认token
  const time = Date.parse(new Date()) / 1000
  const path = config.url
  let signature = ''

  // post方式传data，get方式传params
  const paramsType = config.method === 'post' ? 'data' : 'params'
  const params = JSON.stringify(config[paramsType])
  // 如果不是通用接口，就使用用户的guid和token
  if (commonApi.indexOf(path) === -1) {
    guid = store.getters.guid
    token = store.getters.token

    // 生成签名
    const hashStr = token.charAt(1) + token.charAt(5) + token.charAt(6)
    const hashKind = parseInt(hashStr, 16) % 8
    const hashArrays = hashRule[hashKind]
    let cryptToken = ''
    hashArrays.map(function(n) {
      cryptToken += token.charAt(n)
    })
    signature = md5(guid + params + time + cryptToken + path)
    // console.log(path + '----' + time + '----' + guid + '----' + params + '----' + cryptToken)
    // console.log(signature + '-----')
  } else {
    signature = md5(guid + params + time + token + path)
    // console.log(path + '----' + time + '----' + guid + '----' + params + '----' + token)
    // console.log(signature + '-----')
  }

  // 重组参数
  config[paramsType] = {}
  config[paramsType].time = time
  config[paramsType].guid = guid
  config[paramsType].param = params
  config[paramsType].signatures = signature
  config[paramsType].version = defaultVersion
  return config
}

export default checkApi
