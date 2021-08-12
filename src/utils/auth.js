import Cookies from 'js-cookie'

const TokenKey = 'admin-token'
const GuidKey = 'admin-guid'
const CookieTime = 30

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getGuid() {
  return Cookies.get(GuidKey)
}

export function setGuid(guid) {
  return Cookies.set(GuidKey, guid, { expires: CookieTime })
}

export function removeData() {
  Cookies.remove(TokenKey)
  Cookies.remove(GuidKey)
}
