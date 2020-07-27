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
        <!-- 详情内容 -->
        <div class="main-content" v-for="(item,index) in details" :key="index">
          <!-- 标题 -->
          <h2 class="title">{{item.title}}</h2>
          <div class="detail-info">
            <span class="time">攻略：{{item.updated_at}}</span>
            <span class="watch">阅读：{{item.watch?item.watch:0}}</span>
          </div>
          <!-- 内容 -->
          <div class="detail-content" v-html="item.content"></div>
        </div>
        <!-- 详情攻略文章评论 -->
        <div class="comments">
          <!-- 评论发表组件 -->
          <DetailPublishCom :user="user" @reflashComList="reflashList" />
          <!-- 评论组件 -->
          <DetailComReply :comList="comList" @replyMain="replyMain" @replyParent="replyParent" />
        </div>
        <!-- 分页组件 -->
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
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
import DetailPublishCom from "@/components/post/detailPublishCom";
import DetailComReply from "@/components/post/detailComReply";
export default {
  components: {
    DetailAside,
    DetailPublishCom,
    DetailComReply,
  },
  data() {
    return {
      details: [],
      total: 0,
      user: {},
      comList: [],
      pageIndex: 0,
      pageSize: 5,
    };
  },
  watch: {
    // 检测路由变化，并且发送请求
    "$route.query.id": {
      handler() {
        // console.log("路由发送变化了");
        this.getDetails();
        this.getComList();
      },
      immediate: true,
    },
  },
  created() {
    this.getDetails();
  },
  methods: {
    // 获取攻略文章详情数据并渲染
    getDetails() {
      this.$axios({
        url: "/posts",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        // console.log(res.data.data);
        const newDetails = [];
        const itemList = {
          ...res.data.data[0],
          updated_at: moment(res.data.data[0].updated_at).format(
            "YYYY-MM-DD HH:MM"
          ),
        };
        newDetails.push(itemList);
        this.details = newDetails;
      });
    },
    // 回复主评论
    replyMain(user) {
      this.user = user;
    },
    // 回复父评论
    replyParent(user) {
      this.user = user;
    },
    // 获取评论数据
    getComList() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _start: this.pageIndex,
          _limit: this.pageSize,
        },
      }).then((res) => {
        console.log(res.data);
        const newComList = res.data.data.filter((item) => {
          return item.account.nickname && item.account.defaultAvatar;
        });
        this.comList = newComList;
        this.total = res.data.total;
      });
    },
    // 回复评论成功刷新评论组件
    reflashList() {
      this.getComList();
    },
    // 改变当前页时
    currentChange(index) {
      this.pageIndex = index;
      this.getComList();
    },
    // 改变当前页显示的评论条数
    sizeChange(size) {
      this.pageSize = size;
      this.getComList();
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
          img {
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
      .el-pagination {
        text-align: center;
        margin: 20px 0;
      }
    }
    .aside {
      width: 260px;
    }
  }
}
</style>