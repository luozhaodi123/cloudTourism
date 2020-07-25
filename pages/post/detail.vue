<template>
  <div class="container">
    <div class="main">
      <!-- 右侧详情 -->
      <div class="detail" v-if="details.length>0">
        <!-- 面包屑导航 -->
        <div class="detail-link">
          <nuxt-link to="/post" class="travel">旅游攻略</nuxt-link>
          <span class="divider">/</span>
          <span class="self">攻略详情</span>
        </div>
        <div class="main-content" v-for="(item,index) in details" :key="index">
          <!-- 标题 -->
          <h2 class="title">{{item.title}}</h2>
          <div class="detail-info">
            <span class="time">攻略：{{item.create_at}}</span>
            <span class="watch">阅读：{{item.watch?item.watch:0}}</span>
          </div>
          <!-- 内容 -->
          <div class="detail-content" v-html="item.content"></div>
        </div>
      </div>
      <!-- 左侧侧边栏 -->
      <div class="aside">
        <DetailAside />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DetailAside from "@/components/post/detailAside";
export default {
  components: {
    DetailAside,
  },
  data() {
    return {
      details: [],
    };
  },
  watch: {
    "$route.query.id": {
      handler() {
        console.log("路由发送变化了");
        this.getDetails();
      },
      immediate: true,
    },
  },
  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      // 获取攻略文章详情数据并渲染
      this.$axios({
        url: "/posts",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        console.log(res.data.data);
        const itemList = {
          ...res.data.data[0],
          create_at: moment(res.data.data[0].updated_at).format(
            "YYYY-MM-DD HH:MM"
          ),
        };
        this.details.push(itemList);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .main {
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .detail {
      width: 700px;
      .detail-link {
        font-size: 14px;
        color: #000;
        .travel {
          font-weight: 700;
          &:hover {
            color: #409eff;
          }
        }
        .divider {
          margin: 0 2px;
        }
        .self {
          color: #606266;
        }
      }
      .title {
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
      }
      .detail-info {
        text-align: right;
        font-size: 16px;
        color: #999;
        padding: 20px;
        .watch {
          margin-left: 20px;
        }
      }
      .detail-content {
        line-height: 25px;
        font-size: 16px;
        color: #000;
        /deep/p {
          width: 700px;
          margin: 5px 0;
          & > img {
            max-width: 700px;
          }
          span {
            /deep/img {
              width: 700px;
              height: 340px;
              object-fit: cover;
              margin: 5px 0;
            }
          }
        }
      }
    }
    .aside {
      width: 250px;
    }
  }
}
</style>