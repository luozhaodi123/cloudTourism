// 创建store仓库

export const state = () => ({
    userInfo: {
        token: "",
        user: {}
    }
})

// mutations规定了对数据进行修改的方法
export const mutations = {
    setUser(state, data) {
        // state 表示 state本身
        // data 表示外面调用时要传入的数据
        state.userInfo = data;
    }
}