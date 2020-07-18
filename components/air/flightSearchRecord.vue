<template>
  <div class="history">
    <h5 class="hisTitle">历史查询</h5>
    <div>
      <el-row
        type="flex"
        justify="space-between"
        class="statement"
        v-for="(item,index) in history"
        :key="index"
      >
        <div class="info">
          <div class="load">
            {{item.departCity}}
            <span>-</span>
            {{item.destCity}}
          </div>
          <div class="hisDate">{{item.departDate}}</div>
        </div>
        <div class="select" @click="select(item)">选择</div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: []
    };
  },
  mounted() {
    // 第一种方式 本地存储
    /* const history = JSON.parse(localStorage.getItem("history"));
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    this.history = history;
    console.log(this.history); */

    // 第二种方式 vuex 中的仓库
    this.history = this.$store.state.history.historyList;
  },
  methods: {
    select(item) {
      // console.log(item);
      this.$router.push({
        path: "/air/flights",
        query: item
      });
    }
  }
};
</script>

<style lang="less" scoped>
.history {
  width: 240px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  .hisTitle {
    font-size: 16px;
    color: #000;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .statement {
    display: flex;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
    .info {
      .load {
        margin-bottom: 4px;
        font-size: 14px;
      }
      .hisDate {
        font-size: 12px;
        color: #666;
      }
    }
    .select {
      width: 42px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      background-color: #ffa500;
      color: #fff;
      font-size: 12px;
      border-radius: 4px;
    }
  }
}
</style>