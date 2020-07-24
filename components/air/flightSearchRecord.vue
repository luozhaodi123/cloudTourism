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
      history: [],
    };
  },
  watch: {
    "$store.state.history.historyList": {
      handler() {
        this.history = this.$store.state.history.historyList;
      },
      immediate: true,
    },
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
    // 1. 如果是别的页面进来, vuex 本来就有, 第一次执行就得出结果
    // 2. 如果是刷新, 一进来会执行一次, 发现没数据, 不会执行
    // 等到 vuex 被本地储存恢复, 发生变化,再次执行, 出现数据
    // this.history = this.$store.state.history.historyList;
  },
  methods: {
    select(item) {
      // console.log(item);
      this.$router.push({
        path: "/air/flights",
        query: item,
      });
    },
  },
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