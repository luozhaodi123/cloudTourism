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
    this.history = JSON.parse(localStorage.getItem("history"));
    console.log(this.history);
  },
  methods: {
    select(item) {
      // console.log(item);
      this.$router.push({
        path: "/air/flights",
        query: item
      });
      this.$emit("handleSearch", item);
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