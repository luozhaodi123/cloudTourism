// 创建store仓库

export const state = () => ({
    userInfo: {
        token: "",
        user: {}
    },
    // 标记
    tags: {
        flag: false
    }
})

// mutations规定了对数据进行修改的方法
// 注:mutations不能使用异步操作的函数，必须是同步函数
export const mutations = {
    setUser(state, data) {
        // state 表示 state本身
        // data 表示外面调用时要传入的数据
        state.userInfo = data;
    },
    setTag(state, data) {
        state.tags.flag = data;
    }
}

// vuex中的actions可以执行异步操作的函数，可以在里面执行完异步操作后,调用 mutation 
// 在这里我们希望将登陆这个异步请求, 封装到 vuex 里面
export const actions = {
    login({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "post",
            // data: this.form
            data: data
        }).then(res => {
            // console.log(res.data);
            if (res.status == 200) {
                // 把登录成功返回的数据通过vuex，存起来
                setTimeout(() => {
                    // 需要调用 mutation 使用 $store.commit 方法
                    // 传入两个参数, 第一个是仓库名/mutation 函数名的字符串, 第二个是额外数据
                    // this.$store.commit("user/setUser", res.data);
                    commit("setUser", res.data);
                }, 1000);
                return res
            }
        }).catch(err => {
            console.log(err);
        });
    },
    register({ commit }, data) {
        return this.$axios({
            url: "accounts/register",
            method: "post",
            // data: form
            data: data
        }).then(res => {
            // console.log(res);
            if (res.status === 200) {
                data = {
                    username: "",
                    nickname: "",
                    captcha: "",
                    password: "",
                    twicePwd: ""
                };
                return res;
            }
        }).catch(err => {
            console.log(err);
        })
    }
}