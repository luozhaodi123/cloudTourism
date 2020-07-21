<template>
  <div>
    <!-- 乘机人组件 -->
    <div class="passengers">
      <h2 class="order-title">乘机人</h2>
      <!-- :rules="rulesUser" -->
      <el-form ref="formUsers" :model="{user}">
        <div v-for="(item,index) in user" :key="index" class="pessItem">
          <el-form-item
            label="乘机人"
            :prop="`user[${index}].username`"
            :rules="[
            {required:true, message: '请输入乘机人', trigger: 'blur'},
            {
            pattern: /^[\u2E80-\u9FFF]+$/,
            message: '亲，你输入的乘机人名称不合法，请重新输入',
            trigger: 'blur'
          }
            ]"
          >
            <el-input
              placeholder="姓名"
              v-model="item.username"
              @focus="clearMsg(`user[${index}].username`)"
            >
              <el-select slot="prepend" v-model="valueOne" placeholder="请选择" class="select">
                <el-option label="成人" value="1"></el-option>
                <el-option label="儿童" value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item
            label="证件类型"
            :prop="`user[${index}].id`"
            :rules="[
            { required: true, message: '请输入证件号码', trigger: 'blur' },
            {
              pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/,
              message: '亲，你输入的证件号码不合法，请检查输入是否有误',
              trigger: 'blur'
            }]"
          >
            <el-row>
              <div class="delPerson" @click="delBtn(index)">-</div>
            </el-row>
            <el-row type="flex">
              <el-input placeholder="证件号码" v-model="item.id" @focus="clearMsg(`user[${index}].id`)">
                <el-select slot="prepend" v-model="valueTwo" placeholder="请选择" class="select">
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="护照" value="2"></el-option>
                </el-select>
              </el-input>
            </el-row>
          </el-form-item>
        </div>
      </el-form>
      <el-row>
        <el-button type="primary" class="addPerson" @click="addBtn">添加乘机人</el-button>
      </el-row>
    </div>
    <!-- 保险组件 -->
    <div class="insurance" v-if="orderData.insurances">
      <h2 class="order-title">保险</h2>
      <el-checkbox-group v-model="insurance">
        <div v-for="(item,index) in orderData.insurances" :key="index">
          <el-checkbox
            class="insurItem"
            :label="item.id"
            border
          >{{`${item.type}：￥${item.price}/份×${user.length} 最高赔付${item.compensation}`}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <!-- 联系人组件 -->
    <div class="contact">
      <h2 class="order-title">联系人</h2>
      <el-form
        class="contactForm"
        label-width="80px"
        :model="contact"
        ref="formContact"
        :rules="rulesContact"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="contact.name" @focus="clearMsg('name')"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="number">
          <el-input placeholder="请输入手机号" v-model="contact.number" @focus="clearMsg('number')">
            <template slot="append">
              <el-button @click="sendCaptcha">发送验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input placeholder="请输入验证码" v-model="contact.captcha" @focus="clearMsg('captcha')"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-row type="flex" justify="center">
      <el-button type="warning" class="submitFrom" @click="submitForm">提交订单</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["orderData"],
  data() {
    return {
      valueOne: "1",
      valueTwo: "1",
      user: [
        {
          username: "小彬彬",
          id: "440983118870701243"
        }
      ],
      insurance: [],
      rulesUser: {
        username: [
          { required: true, message: "请输入乘机人", trigger: "blur" },
          {
            pattern: /^[\u2E80-\u9FFF]+$/,
            message: "亲，你输入的乘机人名称不合法，请重新输入",
            trigger: "blur"
          }
        ],
        id: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          {
            pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/,
            message: "亲，你输入的证件号码不合法，请检查输入是否有误",
            trigger: "blur"
          }
        ]
      },
      contact: {
        name: "小花",
        number: "13728829920",
        captcha: "000000"
      },
      rulesContact: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            pattern: /^[\u2E80-\u9FFF]+$/,
            message: "亲，你输入的姓名不合法，请重新输入",
            trigger: "blur"
          }
        ],
        number: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度为 6 到 11 个字符",
            trigger: "blur"
          },
          { pattern: /^\d+$/, message: "手机号只能输入数字", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getTotalMoney();
  },
  watch: {
    // 监听user和insurance的变化，改变时通过子传父，父传子的方式改变右侧订单价格
    user() {
      console.log("user发生了变化");
      this.getTotalMoney();
    },
    insurance() {
      console.log("insurance发生了变化");
      this.getTotalMoney();
    }
  },
  methods: {
    // 再次聚焦时，清除错误提示
    clearMsg(msg) {
      // 乘机人清除的话，这里是有问题的
      // console.log(this.$refs.formUsers);
      this.$refs.formUsers.clearValidate(msg);
      this.$refs.formContact.clearValidate(msg);
    },
    getTotalMoney() {
      // console.log(this.orderData.seat_infos.org_settle_price);
      const price = this.orderData.seat_infos.org_settle_price;
      let totalMoney = 0;
      //  先算出有几个人的钱
      totalMoney += price * this.user.length;
      totalMoney += this.orderData.airport_tax_audlet * this.user.length;
      //  再加上保险的钱
      this.orderData.insurances.forEach(item => {
        if (this.insurance.indexOf(item.id) >= 0) {
          totalMoney += item.price * this.user.length;
        }
      });
      this.$emit("handleMoney", totalMoney);
    },
    addBtn() {
      this.user.push({
        username: "",
        id: ""
      });
    },
    delBtn(index) {
      this.user.splice(index, 1);
    },
    sendCaptcha() {
      this.$axios({
        url: "/captchas",
        method: "post",
        data: {
          tel: this.contact.number
        }
      }).then(res => {
        console.log(res.data);
        const { code } = res.data;
        if (code) {
          this.$confirm(`模拟手机验证码: ${code}`, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      });
    },
    // 提交订单数据
    async submitForm() {
      console.log(this.user);
      let data = {
        users: this.user,
        insurances: this.insurance,
        contactName: this.contact.name,
        contactPhone: this.contact.number,
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id,
        captcha: this.contact.captcha
      };
      // console.log(data);
      // 发送提交订单请求前，对表单数据进行校验
      const isValiUser = await this.$refs.formUsers.validate().catch(err => {});
      const isValiContact = await this.$refs.formContact
        .validate()
        .catch(err => {});
      if (isValiUser && isValiContact) {
        this.$axios({
          url: "/airorders",
          method: "post",
          data: data,
          headers: {
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          }
        }).then(res => {
          console.log(res.data);
          if (res.data.message == "订单提交成功") {
            this.$message.success("订单提交成功");
            this.$router.push({
              path: "/air/pay",
              query: {
                id: res.data.data.id
              }
            });
          }
        });
      } else {
        this.$message.error("提交订单失败，内容有误");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.order-title {
  width: 100%;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
  color: #000;
}
.passengers {
  margin-bottom: 20px;
  border-bottom: 1px dashed #ccc;
  .el-form .pessItem:nth-of-type(1) .delPerson {
    display: none;
  }
  .el-form-item {
    position: relative;
    margin-bottom: 10px;
    &:nth-of-type(2) {
      padding-bottom: 20px;
      border-bottom: 1px dashed #ccc;
    }
    .delPerson {
      position: absolute;
      top: 50%;
      right: -30px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      background-color: #ddd;
      color: #fff;
      font-size: 14px;
      border-radius: 50%;
      cursor: pointer;
      transform: translate(-50%, -50%);
    }
    /deep/ .el-select .el-input {
      width: 130px;
    }
    /deep/.el-form-item__error {
      margin-left: 130px;
    }
  }
  .addPerson {
    margin: 20px 0;
  }
}
.insurance {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ccc;
  .insurItem {
    margin: 0 0 20px !important;
  }
}
.contact {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ccc;
  .contactForm {
    width: 350px;
  }
}
.submitFrom {
  width: 250px;
  margin: 50px 0;
}
</style>