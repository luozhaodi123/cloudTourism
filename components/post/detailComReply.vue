<template>
  <div class="reply">
    <div class="reply-item" v-for="item in comList" :key="item.id">
      <!-- 子组件 -->
      <div class="sonItem">
        <div class="users">
          <div class="user">
            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
            <span class="name">{{item.account.nickname}}</span>
            <span class="time">{{moment(item.updated_at).format("YYYY-MM-DD HH:MM")}}</span>
          </div>
          <div class="level">楼层{{item.level}}</div>
        </div>
        <!-- 父组件 -->
        <DetailComParent :parentData="item.parent" v-if="item.parent" class="parent" />
        <div class="content">{{item.content}}</div>
        <div class="replyBtn">
          <span @click="reply(item.id)">回复</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DetailComParent from "@/components/post/detailComParent";
export default {
  components: {
    DetailComParent,
  },
  data() {
    return {
      comList: [],
      moment: moment,
    };
  },
  created() {
    this.$axios({
      url: "/posts/comments",
    }).then((res) => {
      console.log(res.data);
      const newComList = res.data.data.filter((item) => {
        return item.account.nickname && item.account.defaultAvatar;
      });
      this.comList = newComList;
    });
  },
  methods: {
    reply(id) {},
  },
};
</script>

<style lang="less" scoped>
.reply {
  border: 1px solid #ccc;
  .reply-item {
    padding: 20px 20px 5px;
    border-bottom: 1px dashed #ccc;
    .sonItem {
      .parent {
        margin: 10px;
      }
      .users {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .user {
          display: flex;
          align-content: center;
          img {
            width: 16px;
          }
          .name {
            margin: 0 8px;
            color: #666;
          }
          .time {
            color: #999;
          }
        }
      }
      .content {
        margin: 10px 15px 0;
        font-size: 14px;
        color: #000;
      }
      .replyBtn {
        padding: 10px 0;
        text-align: right;
        font-size: 12px;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>