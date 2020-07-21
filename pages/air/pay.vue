<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price" v-if="orderData">￥ {{orderData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 生成二维码的包
import QRCode from "qrcode";
export default {
  data() {
    return {
      orderData: null,
      time: null
    };
  },
  watch: {
    "$store.state.user.userInfo.token": {
      // 1. 如果是别的页面进来, vuex 本来就有, 第一次执行就得出结果
      // 2. 如果是刷新, 一进来会执行一次, 发现没数据, 不会执行
      // 等到 vuex 被本地储存恢复, 发生变化,再次执行, 出现数据
      handler() {
        if (this.$store.state.user.userInfo.token) {
          this.$axios({
            url: "/airorders/" + this.$route.query.id,
            headers: {
              Authorization: "Bearer " + this.$store.state.user.userInfo.token
            }
          }).then(res => {
            // console.log(res.data);
            this.orderData = res.data;
            // 生成二维码到canvas
            const stage = document.querySelector("#qrcode-stage");
            QRCode.toCanvas(stage, res.data.payInfo.code_url, {
              width: 200
            });
            // 开启定时器
            this.time = setInterval(async () => {
              const isResolve = await this.isPay();
              if (isResolve) {
                clearInterval(this.time);
                return;
              }
            }, 3000);
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    isPay() {
      return this.$axios({
        url: "/airorders/checkpay",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        method: "post",
        data: {
          id: this.$route.query.id,
          nonce_str: this.orderData.price,
          out_trade_no: this.orderData.orderNo
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data.statusTxt == "支付完成") {
          this.$message.success("订单支付成功");
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      });
    }
  },
  destroyed() {
    clearInterval(this.time);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>