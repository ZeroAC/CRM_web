import md5 from 'md5'
import store from '@/store'
import CryptoJS from 'crypto-js'
import { defaultGuid, defaultToken, defaultVersion, commonApi, hashRule } from '@/utils/constant'

function checkApi(config) {
  let guid = defaultGuid // 默认guid
  let token = defaultToken // 默认token
  const time = Date.parse(new Date()) / 1000
  const path = config.url
  let signature = ''

  // post方式传data，get方式传params
  const paramsType = config.method === 'post' ? 'data' : 'params'
  let params = JSON.stringify(config[paramsType])
  // 如果不是通用接口，就使用用户的guid和token
  if (commonApi.indexOf(path) === -1) {
    guid = store.getters.guid
    token = store.getters.token

    // 生成签名
    const hashStr = token.charAt(1) + token.charAt(4) + token.charAt(7)
    const hashKind = parseInt(hashStr, 16) % 8
    const hashArrays = hashRule[hashKind]
    let cryptToken = ''
    hashArrays.map(function(n) {
      cryptToken += token.charAt(n)
    })

    signature = md5(path + time + guid + params + cryptToken)
    // console.log(path + '----' + time + '----' + guid + '----' + params + '----' + cryptToken);
    // console.log(signature + '-----');
  } else {
    signature = md5(path + time + guid + params + token)
    // console.log(path + '----' + time + '----' + guid + '----' + params + '----' + token);
    // console.log(signature + '-----');
  }

  // params AES(生产环境加密)
  // if (process.env.NODE_ENV === 'production') {
    // let key = signature
    // let iv = time.toString() + guid.substr(0, 6)
    // key = CryptoJS.enc.Utf8.parse(key)
    // iv = CryptoJS.enc.Utf8.parse(iv)
    // params = CryptoJS.AES.encrypt(params, key, {
    //   iv: iv,
    //   mode: CryptoJS.mode.CBC,
    //   adding: CryptoJS.pad.ZeroPadding
    // }).toString()
  // }

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
