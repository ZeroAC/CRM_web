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
        username: username.trim(),
        password: password,
        method: 2,
        captcha,
        number
      }).then(response => {
        const { ResultData } = response
        commit('SET_TOKEN', ResultData.token)
        commit('SET_GUID', ResultData.guid)
        setToken(ResultData.token)
        setGuid(ResultData.guid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      adminInfo(state.token).then(response => {
        const { ResultData } = response

        if (!ResultData) {
          return reject('验证失败，请重新登录')
        }

        const { nick_name, avatar } = ResultData

        commit('SET_NAME', nick_name)
        commit('SET_AVATAR', avatar)
        resolve(ResultData)
      }).catch(error => {
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

