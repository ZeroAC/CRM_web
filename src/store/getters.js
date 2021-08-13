// 全局变量 通过store.getter.xxx获取
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  guid: state => state.user.guid
}
export default getters
