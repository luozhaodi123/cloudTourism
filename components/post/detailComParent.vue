<template>
  <div>
    <Parent :parentData="parentData.parent" v-if="parentData.parent" />
    <div class="sonItem">
      <div class="users">
        <div class="user">
          <span class="name">{{parentData.account.nickname}}</span>
          <span class="time">{{moment(parentData.updated_at).format("YYYY-MM-DD HH:MM")}}</span>
        </div>
        <div class="level">楼层{{parentData.level}}</div>
      </div>
      <div class="content">{{parentData.content}}</div>
      <div class="replyBtn">
        <span @click="reply(parentData.id)">回复</span>
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
  .replyBtn {
    text-align: right;
    font-size: 12px;
  }
}
</style>