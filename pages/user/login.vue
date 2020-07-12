<template>
  <div
    class="tabLogRe"
    :style="
  `background: url(${$axios.defaults.baseURL+'/assets/images/th03.jfif'}) center center no-repeat;
  background-size: contain contain;`"
  >
    <div class="main tabList">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">登录</span>
          <div class="formWrapper">
            <el-form ref="form" :model="formLogin" label-width="60px">
              <el-form-item label="账号:">
                <el-input
                  v-model="formLogin.username"
                  @input="checkUser"
                  placeholder="用户名/手机"
                  :class="{
                   error:!userStatus
                }"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  type="password"
                  v-model="formLogin.password"
                  @input="checkPwd"
                  placeholder="密码"
                  :class="{
                    error:!pwdStatus
                  }"
                ></el-input>
              </el-form-item>
              <el-form-item class="btnWrapper">
                <el-button type="primary" @click="handleLogin">登录</el-button>
                <el-button @click="handleResetOne">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="注册">
          <el-form label-width="80px" :model="formRegister">
            <el-form-item label="手机号:">
              <el-input
                v-model="formRegister.username"
                @input="checkMobeil"
                :class="{
                   error:!mobeilStatus
                }"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码:" class="captcheItem">
              <div class="content">
                <div class="input">
                  <el-input
                    v-model="formRegister.captche"
                    @blur="checkDeptche"
                    :class="{
                   error:!captcheStatus
                }"
                  ></el-input>
                </div>
                <div class="captche">
                  <span class="number">{{captcheNumber}}</span>
                  <span class="send" @click="sendCaptche">{{sendText}}</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="昵称:">
              <el-input v-model="formRegister.nickname" @blur="checkNick"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input
                v-model="formRegister.password"
                @input="checkPwdOne"
                :class="{
                    error:!pwdStatusOne
                  }"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:">
              <el-input
                v-model="twicePwd"
                @blur="checkPwdTwice"
                :class="{
                    error:!pwdStatusTwo
                  }"
              ></el-input>
            </el-form-item>
            <el-form-item class="btnWrapper">
              <el-button type="primary" @click="register">注册</el-button>
              <el-button @click="handleResetTwo">重置</el-button>
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
      },
      formRegister: {
        username: "13728826629",
        nickname: "",
        captche: "",
        password: ""
      },
      userStatus: true,
      mobeilStatus: true,
      pwdStatus: true,
      pwdStatusOne: true,
      pwdStatusTwo: true,
      captcheStatus: true,
      twicePwd: "",
      captcheNumber: "0000",
      sendText: "发送",
      userReg: "^[A-Za-z0-9]{3,11}$",
      userMobeil: "^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))\\d{8}$",
      pwdReg: "^[A-Za-z0-9]{3,11}$"
    };
  },
  methods: {
    // 校验用户输入的内容是否符合要求
    // 校验用户名/手机号
    checkUser() {
      const user = this.formLogin.username;
      const userReg = new RegExp(this.userReg);
      console.log(userReg.test(user));
      const userMobeil = new RegExp(this.userMobeil);
      // console.log(userMobeil.test(user));
      if (userReg.test(user) || userMobeil.test(user)) {
        this.userStatus = true;
      } else {
        this.userStatus = false;
      }
    },
    // 封装校验密码
    check(pwd, reg, status) {
      let pwdReg = new RegExp(reg);
      if (pwdReg.test(pwd)) {
        return (status = true);
      } else {
        return (status = false);
      }
    },
    // 校验登录密码
    checkPwd() {
      const pwd = this.formLogin.password;
      this.pwdStatus = this.check(pwd, this.pwdReg, this.pwdStatus);
    },
    // 校验注册密码
    checkPwdOne() {
      const pwd = this.formRegister.password;
      this.pwdStatusOne = this.check(pwd, this.pwdReg, this.pwdStatusOne);
    },
    // 第二次校验密码
    checkPwdTwice() {
      const pwd = this.twicePwd;
      this.pwdStatusTwo = this.check(pwd, this.pwdReg, this.pwdStatusTwo);
      if (this.formRegister.password !== this.twicePwd) {
        this.$message.error("两次输入密码不一致");
      }
    },
    // 登录
    handleLogin() {
      console.log(this.formLogin.username);
      if (!this.formLogin.username && !this.formLogin.password) {
        this.$message.error("用户名和密码不能为空，请输入");
        return;
      }
      this.$axios({
        url: "/accounts/login",
        method: "post",
        data: this.formLogin
      })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success("登录成功");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.user);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("登录失败，用户名或者密码无效");
        });
    },
    // 重置登录页输入的内容
    handleResetOne() {
      this.formLogin = {
        username: "",
        password: ""
      };
      this.userStatus = true;
      this.pwdStatus = true;
    },
    // 校验注册页手机号
    checkMobeil() {
      const user = this.formRegister.username;
      const userMobeil = new RegExp(this.userMobeil);
      if (userMobeil.test(user)) {
        this.mobeilStatus = true;
      } else {
        this.mobeilStatus = false;
      }
    },
    // 发送验证码
    sendCaptche() {
      if (!this.formRegister.username && this.mobeilStatus) {
        this.$message.error("发送验证码失败，请检查手机号格式是否正确！");
        return;
      }
      this.sendText = "重新发送";
      this.$message.success("验证码正在发送中");
      setTimeout(() => {
        let count = 0;
        let number = "";
        let randomNumber = Math.ceil(Math.random() * 5);
        while (count < 4) {
          number += randomNumber;
          randomNumber = Math.ceil(Math.random() * 5);
          count += 1;
        }
        this.captcheNumber = number;
        // console.log(this.captcheNumber);
      }, 3000);
    },
    // 校验验证码
    checkDeptche() {
      if (this.formRegister.captche != this.captcheNumber) {
        this.captcheStatus = false;
      } else {
        this.captcheStatus = true;
      }
    },
    // 校验昵称
    checkNick() {
      if (!this.formRegister.nickname) {
        this.$message.error("昵称不能为空");
      }
    },
    // 重置注册表单内容
    handleResetTwo() {
      this.formRegister = {
        username: "14715906749",
        nickname: "",
        captche: "",
        password: ""
      };
      this.mobeilStatus = true;
      this.pwdStatusOne = true;
      this.pwdStatusTwo = true;
      this.captcheStatus = true;
      this.twicePwd = "";
      this.captcheNumber = "0000";
      this.sendText = "发送";
    },
    // 注册用户
    register() {}
  }
};
</script>

<style lang="less" scoped>
.tabLogRe {
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
      .captcheItem {
        .content {
          display: flex;
          .input {
            width: 60%;
          }
          .captche {
            width: 40%;
            text-align: center;
            font-size: 12px;
            background-color: #ccc;
            .number {
              width: 42px;
              height: 24px;
              padding: 4px 8px;
              background-color: #fff;
              border-radius: 2px;
              margin: 0 4px;
            }
            .send {
              padding: 4px;
              cursor: pointer;
            }
          }
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
    .error {
      border: 1px solid red;
    }
  }
}
</style>