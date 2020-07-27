<template>
  <div class="hotelPage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <search />
    <hotelItem />
  </div>
</template>

<script>
import search from "@/components/hotel/search";
import hotelItem from "@/components/hotel/hotelItem";
export default {
  components: {
    search,
    hotelItem
  }
};
</script>

<style lang="less" scoped>
.hotelPage {
  width: 1000px;
  margin: 0 auto;
  .crumbs {
    height: 60px;
    padding-top: 20px;
    box-sizing: border-box;
  }
}
</style>