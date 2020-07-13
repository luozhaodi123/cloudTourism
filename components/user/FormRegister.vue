<template>
  <el-form label-width="80px" ref="form" :model="form" :rules="rules">
    <el-form-item label="手机号:" prop="username">
      <el-input v-model="form.username" placeholder="手机号" @focus="clearMsg('username')"></el-input>
    </el-form-item>
    <el-form-item label="验证码:" class="captcheItem" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码" @focus="clearMsg('captcha')">
        <template slot="append">
          <el-button @click="sendCaptche">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="昵称:" prop="nickname">
      <el-input v-model="form.nickname" placeholder="昵称" @focus="clearMsg('nickname')"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="form.password" placeholder="密码" @focus="clearMsg('password')"></el-input>
    </el-form-item>
    <el-form-item label="确认密码:" prop="twicePwd">
      <el-input v-model="form.twicePwd" placeholder="确认密码" @focus="clearMsg('twicePwd')"></el-input>
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
    var checkPassword = (rule, value, callback) => {
      /* 
        在这个校验函数内部，可以接收三个参数
        1、规则对象本身
        2、当前输入的值
        3、放行的回调函数
      */
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
        username: "14315506049",
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
          { min: 3, max: 11, message: "长度为 3 到 11 个字符", trigger: "blur" }
        ],
        twicePwd: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 再次聚焦时，清除错误提示
    clearMsg(propName) {
      this.$refs.form.clearValidate(propName);
    },
    // 发送验证码
    sendCaptche() {
      if (!this.form.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        //   http://157.122.54.189:9095 线上服务器
        url: "/captchas",
        method: "post",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res);
        const { code } = res.data;
        this.$confirm(`模拟手机验证码:${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    register() {
      // 发送注册请求前，先整体校验一下注册表单
      this.$refs.form.validate((isValid, objNotValid) => {
        if (isValid) {
          // 方式一
          /* let form = {};
          for (var key in this.form) {
            if (key !== "twicePwd") {
              form[key] = this.form[key];
            }
          } */
          // console.log(form);
          const { twicePwd, ...props } = this.form;
          this.$store.dispatch("user/register", props).then(res => {
            if (res && res.status === 200) {
              this.$message.success("注册成功");
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