<template>
  <el-form label-width="85px" ref="form" :model="form" :rules="rules">
    <el-form-item label="手机号:" prop="username">
      <el-input v-model="form.username" @focus="clearMsg('username')"></el-input>
    </el-form-item>
    <el-form-item label="验证码:" class="captcheItem" prop="captcha">
      <div class="content">
        <div class="input">
          <el-input v-model="form.captcha" @focus="clearMsg('captcha')"></el-input>
        </div>
        <div class="captche" @click="sendCaptche">{{sendText}}</div>
      </div>
    </el-form-item>
    <el-form-item label="昵称:" prop="nickname">
      <el-input v-model="form.nickname" @focus="clearMsg('nickname')"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="form.password" @focus="clearMsg('password')"></el-input>
    </el-form-item>
    <el-form-item label="确认密码:" prop="twicePwd">
      <el-input v-model="form.twicePwd" @focus="clearMsg('twicePwd')"></el-input>
    </el-form-item>
    <el-form-item class="btnWrapper">
      <el-button type="primary" @click="register">注册</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.twicePwd !== "") {
          this.$refs.form.validateField("twicePwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        console.log(value);
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "14715906749",
        nickname: "小白",
        captcha: "000000",
        password: "123456",
        twicePwd: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度为 6 到 11 个字符",
            trigger: "blur"
          },
          { pattern: /^\d+$/, message: "手机号只能输入数字", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度为 3 到 11 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        twicePwd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度为 3 到 11 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      twicePwd: "",
      sendText: "发送验证码"
    };
  },
  methods: {
    // 再次聚焦时，清除错误提示
    clearMsg(propName) {
      this.$refs.form.clearValidate(propName);
    },
    // 发送验证码
    sendCaptche() {
      this.$message.success("验证码已发送，请收到信息后输入!");
      this.$axios({
        //   http://157.122.54.189:9095 线上服务器
        url: "/captchas",
        method: "post",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res);
      });
    },
    register() {
      // 发送注册请求前，先整体校验一下注册表单
      this.$refs.form.validate((isValid, objNotValid) => {
        if (isValid) {
          let form = {};
          for (var key in this.form) {
            if (key !== "twicePwd") {
              form[key] = this.form[key];
            }
          }
          console.log(form);
          this.$axios({
            url: "accounts/register",
            method: "post",
            data: form
          }).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success("注册成功");
              this.form = {
                username: "",
                nickname: "",
                captcha: "",
                password: "",
                twicePwd: ""
              };
            }
          });
        } else {
          console.log(objNotValid);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.captcheItem {
  .content {
    display: flex;
    .input {
      width: 65%;
    }
    .captche {
      width: 35%;
      text-align: center;
      font-size: 12px;
      background-color: #ccc;
      cursor: pointer;
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
</style>