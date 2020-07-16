<template>
  <div class="history">
    <h5 class="hisTitle">历史查询</h5>
    <el-row type="flex" justify="space-between" class="statement">
      <div class="info">
        <div class="load">
          上海
          <span>-</span>
          北京
        </div>
        <div class="hisDate">2020-07-24</div>
      </div>
      <div class="select">选择</div>
    </el-row>
  </div>
</template>

<script>
export default {};
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