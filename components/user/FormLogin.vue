<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="60px">
    <el-form-item label="账号:" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机" @focus="clearMsg('username')"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="密码"
        @focus="clearMsg('password')"
      ></el-input>
    </el-form-item>
    <el-form-item class="btnWrapper">
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <el-button @click="handleResetOne">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 11, message: "长度为 6 到 11 个字符" },
          { pattern: /^\d+$/, message: "用户名只能输入数字" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 11, message: "长度为 3 到 11 个字符" }
        ]
      }
    };
  },
  methods: {
    // 再次聚焦时，清除错误提示
    clearMsg(propName) {
      this.$refs.form.clearValidate(propName);
    },
    handleLogin() {
      // 表单中validate方法 在发送请求前进行表单的统一的校验
      this.$refs.form.validate((isValidate, objNotValid) => {
        // 第一个参数表示是否都通过校验
        // 第二个参数表示未通过校验哪一个的错误信息，对象来的
        if (isValidate) {
          this.$axios({
            url: "/accounts/login",
            method: "post",
            data: this.form
          })
            .then(res => {
              console.log(res.data);
              if (res.status == 200) {
                this.$message.success("登录成功");
                // 把登录成功返回的数据通过vuex，存起来
                setTimeout(() => {
                  // 需要调用 mutation 使用 $store.commit 方法
                  // 传入两个参数, 第一个是仓库名/mutation 函数名的字符串, 第二个是额外数据
                  this.$store.commit("user/setUser", res.data);
                  console.log("token:" + this.$store.state.user.userInfo);
                }, 1000);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("登录失败，用户名或者密码无效");
            });
        } else {
          console.log(objNotValid);
        }
      });

      // 没有给validate传参数的话，可以使用.then的方式来处理逻辑。这是因为element框架已经封装好了的
      /* this.$refs.form
        .validate()
        .then(isValidate => {
          if (isValidate) {
            this.$axios({
              url: "/accounts/login",
              method: "post",
              data: this.form
            })
              .then(res => {
                console.log(res.data);
                if (res.status == 200) {
                  this.$message.success("登录成功");
                }
              })
              .catch(err => {
                console.log(err);
                this.$message.error("登录失败，用户名或者密码无效");
              });
          }
        })
        .catch(error => {
          console.log(error);
        }); */
    },
    handleResetOne() {}
  }
};
</script>

<style lang="less" scoped>
.btnWrapper {
  display: flex;
  justify-content: space-between;
  /deep/.el-form-item__content {
    margin-left: 0 !important;
    .el-button--primary {
      margin-right: 10px;
    }
  }
}
</style>