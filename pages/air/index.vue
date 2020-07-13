<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索栏 -->
      <div class="air-search">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active: currentTab === index}"
            v-for="(item, index) in [`单程`, `往返`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>

        <!-- 显示单程的 -->
        <OneWay v-if="currentTab == 0" />
        <!-- 显示往返的 -->
        <div v-else>往返</div>
      </div>
      <!-- banner广告 -->
      <div class="air-banner">
        <!-- <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" /> -->
        <img src="http://img9.51tietu.net/pic/2019-090810/mfksvklqtnamfksvklqtna.jpg" alt />
      </div>
    </el-row>
    <!-- 广告位 -->
    <el-row type="flex" justify="space-between" class="stateMent">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8" class="borSolid">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>
    <h2 class="air-title air-ticket">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>
    <!-- 特价机票 -->
    <div class="air-sale">
      <SpecialTicket />
    </div>
  </section>
</template>

<script>
import OneWay from "@/components/air/oneWayAir";
import SpecialTicket from "@/components/air/specialTicket";
export default {
  components: {
    OneWay,
    SpecialTicket
  },
  data() {
    return {
      currentTab: 0
    };
  },
  methods: {
    handleChangeTab(index) {
      // this.currentTab = index;
      if (index === 1) {
        this.$alert("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .air-title {
    margin: 17px 0;
    font-size: 20px;
    color: #ffa500;
    vertical-align: middle;
    font-weight: normal;
    .iconfont {
      font-size: 20px;
    }
  }
  .air-ticket {
    color: #409eff;
  }
  .air-search {
    width: 360px;
    height: 350px;
    border: 1px solid #ccc;
    .tabs {
      span {
        display: block;
        width: 50%;
        height: 50px;
        box-sizing: border-box;
        border-top: 2px #eee solid;
        background: #eee;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        color: #333;

        &.active {
          border-top-color: orange;
          background: #fff;
        }
      }
    }
  }
  .air-banner {
    img {
      display: block;
      width: 620px;
      height: 350px;
      object-fit: cover;
    }
  }
  .stateMent {
    display: flex;
    align-items: center;
    height: 58px;
    margin: 15px 0;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    .el-col {
      height: 36px;
      line-height: 36px;
      text-align: center;
      .iconfont {
        font-size: 32px;
        vertical-align: middle;
      }
    }
    .borSolid {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
  }
  .air-sale {
    margin-bottom: 50px;
  }
}
</style>