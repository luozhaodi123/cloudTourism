<template>
  <div class="tabLogRe">
    <div class="main tabList">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">登录</span>
          <div class="formWrapper">
            <el-form ref="form" :model="formLogin" label-width="60px">
              <el-form-item label="账号:">
                <el-input v-model="formLogin.username"></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input type="password" v-model="formLogin.password"></el-input>
              </el-form-item>

              <el-form-item class="btnWrapper">
                <el-button type="primary">登录</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="注册">
          <el-form label-width="80px">
            <el-form-item label="手机号:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="验证码:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="昵称:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="确认密码:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item class="btnWrapper">
              <el-button type="primary">注册</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLogin: {
        username: "",
        password: ""
      }
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.tabLogRe {
  background-color: skyblue;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
  .tabList {
    height: 600px;
    display: flex;
    align-items: center;
    .el-tabs {
      width: 400px;
      margin: 0 auto;
      border-radius: 10px;
      overflow: hidden;
      /deep/.el-tabs__nav {
        width: 100%;
        .el-tabs__item {
          width: 50%;
          text-align: center;
        }
      }
    }
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
  }
}
</style>