<template>
  <div class="container">
    <div class="main">
      <!-- 左侧侧边栏 -->
      <div class="aside">
        <Aside v-if="data" :recomData="data" />
      </div>
      <!-- 右侧搜索栏已经攻略组件 -->
      <div class="search">
        <Search />
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/post/aside";
import Search from "@/components/post/search";
export default {
  components: {
    Aside,
    Search
  },
  data() {
    return {
      data: null
    };
  },
  created() {
    // 获取推荐城市列表
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  .main {
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }
  .aside {
    widows: 260px;
  }
  .search {
    width: 700px;
  }
}
</style>