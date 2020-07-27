<template>
  <div class="related">
    <h2 class="related-title">相关攻略</h2>
    <div class="listBox" v-if="related.length>0">
      <div class="itemsList" v-for="item in related" :key="item.id">
        <nuxt-link class="items" :to="`/post/detail?id=${item.id}`">
          <el-row>
            <img class="logo" v-if="item.images.length>0" :src="item.images[0]" alt />
            <!-- <img class="logo" v-else src="@/assets/view.jpg" alt /> -->
          </el-row>
          <el-row class="aside">
            <h4 class="title">{{item.title}}</h4>
            <div class="footer">
              <!-- <span class="time">{{item.updated_at}}</span> -->
              <span class="time">{{moment(item.updated_at).format("YYYY-MM-DD HH:MM")}}</span>
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
      moment: moment,
    };
  },
  watch: {
    "$route.query.id": {
      handler() {
        this.getAsideList();
      },
      immediate: true,
    },
  },
  methods: {
    getAsideList() {
      // 获取侧边栏相关攻略
      this.$axios({
        url: "/posts/recommend",
      }).then((res) => {
        console.log(res.data.data);
        const newRelated = res.data.data.filter((item) => {
          return item.images.length > 0 && item.content;
        });
        // this.related = res.data.data;
        this.related = newRelated;
      });
    },
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
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .logo {
      width: 100px;
      height: 80px;
      object-fit: cover;
      margin-right: 10px;
    }
    .aside {
      position: relative;
      width: 100%;
      height: 80px;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
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