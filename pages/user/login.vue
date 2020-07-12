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
          <FormLogin />
        </el-tab-pane>

        <el-tab-pane label="注册">
          <FormRegister />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import FormLogin from "@/components/user/FormLogin";
import FormRegister from "@/components/user/FormRegister";
export default {
  components: {
    FormLogin,
    FormRegister
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
    }
  }
}
</style>