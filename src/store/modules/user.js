import { adminLogin, adminInfo, adminLogout } from '@/api/admin'
import { getToken, setToken, getGuid, setGuid, removeData } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    guid: getGuid(),
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = { // 必须是同步函数
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_GUID: (state, guid) => {
    state.guid = guid
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = { // vuex 中默认定义 可以包含任意异步操作。
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha, number } = userInfo
    return new Promise((resolve, reject) => {
      adminLogin({
        user_name: username.trim(),
        password: password,
        method: 2,
        captcha,
        number
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_GUID', data.guid)
        setToken(data.token)
        setGuid(data.guid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log(state) 测试vuex里的值
      adminInfo({}).then(response => { // 待解决 即便接口是200 也一致报错
        const { data } = response
        if (!data) {
          return reject('验证失败，请重新登录')
        }
        const { nick_name, avatar } = data
        console.log(nick_name, avatar)
        commit('SET_NAME', nick_name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => { // 待解决 始终执行这句
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      adminLogout(state.token).then(() => {
        removeData() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeData() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

