<template>
  <div class="hotelPage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索酒店部分，包括地图 -->
    <search @getHotel="setHotel" />
    <!-- 过滤筛选组件 -->
    <hotelFilter :hoteDdata="hotelInfo" />
    <div v-if="hotelInfo">
      <hotelItem v-for="(item,index) in hotelInfo" :key="index" :data="item" />
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="hotelData.length"
          @current-change="changeIndex"
          :page-size="pageSize"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/hotel/search";
import hotelItem from "@/components/hotel/hotelItem";
import hotelFilter from "@/components/hotel/hotelFilter";
export default {
  components: {
    search,
    hotelItem,
    hotelFilter
  },
  data() {
    return {
      // 渲染的酒店信息
      hotelInfo: [],
      // 备份获取到的所有酒店信息
      hotelData: [],
      pageSize: 5,
      pageIndex: 3
    };
  },
  computed: {},
  methods: {
    setHotel(hotelInfo) {
      this.hotelData = [...hotelInfo];
      console.log(hotelInfo);
    },
    showHotel() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = this.pageSize * this.pageIndex - 1;
      this.hotelInfo = this.hotelData.slice(start, end + 1);
    },
    changeIndex(index) {
      this.pageIndex = index;
      this.showHotel();
    }
  },
  watch: {
    hotelData() {
      this.showHotel();
    }
  },
  mounted() {}
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
  .page {
    padding: 20px;
    text-align: center;
  }
}
</style>