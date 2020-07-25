<template>
  <div class="related">
    <h2 class="related-title">相关攻略</h2>
    <div class="listBox" v-if="related">
      <div class="itemsList" v-for="item in related" :key="item.id">
        <nuxt-link class="items" :to="`/post/detail?id=${item.id}`">
          <el-row>
            <img class="logo" v-if="item.images.length>0" :src="item.images[0]" alt />
            <img class="logo" v-else src="@/assets/view.jpg" alt />
          </el-row>
          <el-row class="aside">
            <h4 class="title">{{item.title}}</h4>
            <div class="footer">
              <span class="time">{{item.updated_at}}</span>
              <span class="watch">阅读 {{item.watch?item.watch:0}}</span>
            </div>
          </el-row>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      related: [],
    };
  },
  created() {
    this.$axios({
      url: "/posts/recommend",
    }).then((res) => {
      console.log(res.data);
      const newRelated = res.data.data.map((item) => {
        const newItem = {
          ...item,
          updated_at: moment(item.updated_at).format("YYYY-MM-DD HH:MM"),
        };
        return newItem;
      });
      this.related = newRelated;
    });
  },
};
</script>

<style lang="less" scoped>
.related {
  .related-title {
    font-size: 18px;
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .items {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .logo {
      width: 100px;
      height: 80px;
      object-fit: cover;
      margin-right: 5px;
    }
    .aside {
      position: relative;
      width: 140px;
      height: 80px;
      .title {
        font-size: 14px;
        font-weight: normal;
      }
      .footer {
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}
</style>