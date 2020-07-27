<template>
  <div class="reply">
    <div class="replyBox" v-if="comList.length>0">
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
          <DetailComParent
            @replyParent="replyParent"
            :parentData="item.parent"
            v-if="item.parent"
            class="parent"
          />
          <div class="content">{{item.content}}</div>
          <div class="imgBox">
            <div class="images" v-for="(imgItem,index) in item.pics" :key="index">
              <img :src="$axios.defaults.baseURL+imgItem.url" alt />
            </div>
          </div>
          <div class="replyBtn">
            <span @click="reply({nickname:item.account.nickname,id:item.id})">回复</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tipsList" v-else>暂无评论，赶紧抢占沙发!</div>
  </div>
</template>

<script>
import moment from "moment";
import DetailComParent from "@/components/post/detailComParent";
export default {
  components: {
    DetailComParent,
  },
  props: ["comList"],
  data() {
    return {
      moment: moment,
    };
  },
  methods: {
    // 回复主评论
    reply(user) {
      // console.log(user);
      this.$emit("replyMain", user);
    },
    // 回复父评论
    replyParent(user) {
      console.log(user);
      this.$emit("replyParent", user);
    },
  },
};
</script>

<style lang="less" scoped>
.reply {
  margin-top: 30px;
  .replyBox {
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
        .imgBox {
          display: flex;
          margin-left: 15px;
          flex-wrap: wrap;
          .images {
            margin: 10px 10px 0 0;
            padding: 5px 5px 2px;
            border: 1px dashed #ccc;
            background-color: #fff;
            &:last-child {
              margin-right: 0;
            }
            img {
              width: 80px;
              height: 80px;
              object-fit: cover;
            }
          }
        }
        .replyBtn {
          padding: 10px 0;
          text-align: right;
          font-size: 12px;
          cursor: pointer;
        }
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
  .tipsList {
    font-size: 14px;
    color: #999;
    text-align: center;
    padding: 30px 0;
    border: 1px dashed #ccc;
  }
}
</style>