<template>
  <div>
    <Parent :parentData="parentData.parent" v-if="parentData.parent" @replyParent="nextReply" />
    <div class="sonItem">
      <div class="users">
        <div class="user">
          <span class="name">{{parentData.account.nickname}}</span>
          <span class="time">{{moment(parentData.updated_at).format("YYYY-MM-DD HH:MM")}}</span>
        </div>
        <div class="level">楼层{{parentData.level}}</div>
      </div>
      <div class="content">{{parentData.content}}</div>
      <div class="imgBox">
        <div class="images" v-for="(imgItem,index) in parentData.pics" :key="index">
          <img :src="$axios.defaults.baseURL+imgItem.url" alt />
        </div>
      </div>
      <div class="replyBtn">
        <span @click="replyParent({nickname:parentData.account.nickname,id:parentData.id})">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Parent",
  props: {
    parentData: Object,
  },
  data() {
    return {
      moment: moment,
    };
  },
  methods: {
    // 递归组件发送回复功能
    replyParent(user) {
      // console.log(user);
      this.$emit("replyParent", user);
    },
    nextReply(user) {
      // console.log(user);
      this.$emit("replyParent", user);
    },
  },
};
</script>

<style lang="less" scoped>
.sonItem {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: -1px;
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
    margin: 10px 20px 0;
    font-size: 14px;
    color: #000;
  }
  .imgBox {
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
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
    text-align: right;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>