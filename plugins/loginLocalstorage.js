import createPersistedState from 'vuex-persistedstate'

// 所有插件的本身都可以接收到nuxt实例
export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}