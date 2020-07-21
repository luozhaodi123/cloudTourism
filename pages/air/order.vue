<template>
  <div class="order">
    <div class="main">
      <div class="orderForm">
        <!-- 订单表单组件 -->
        <OrderForm
          v-if="orderList.seat_infos"
          :orderData="orderList"
          @handleMoney="sendTotalMoney"
        />
      </div>
      <!-- 订单机票信息组件 -->
      <div class="flightList">
        <OrderAside v-if="orderList" :list="orderList" :totalMoney="totalMoney" />
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      orderList: {},
      totalMoney: 0
    };
  },
  created() {
    // 获取订单信息
    const order = this.$route.query;
    this.$axios({
      url: "/airs/" + order.id,
      params: {
        seat_xid: order.seat_xid
      }
    }).then(res => {
      console.log(res.data);
      this.orderList = res.data;
    });
  },
  methods: {
    sendTotalMoney(totalMoney) {
      // console.log(totalMoney);
      this.totalMoney = totalMoney;
    }
  },
  mounted() {
    // 进入订单页时，先校验用户是否登录
    setTimeout(() => {
      const userState = this.$store.state.user.userInfo.token;
      if (!userState) {
        this.$confirm("未登录，点击确定跳转到登录页，登录成功后返回", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/user/login");
            this.$store.commit("user/setTag", true);
          })
          .catch(err => {
            this.$router.back();
          });
      }
    }, 500);
  }
};
</script>

<style lang="less" scoped>
.order {
  .main {
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .orderForm {
      width: 590px;
    }
  }
}
</style>