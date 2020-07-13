<template>
  <el-form ref="form" label-width="80px">
    <div class="switchWay">
      <span>换</span>
    </div>
    <el-form-item label="出发城市">
      <el-input placeholder="请搜索出发城市"></el-input>
    </el-form-item>
    <el-form-item label="到达城市">
      <el-input placeholder="请搜索到达城市"></el-input>
    </el-form-item>
    <el-form-item label="出发时间">
      <el-col>
        <el-date-picker type="date" placeholder="选择出发日期" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item class="btnWrapper">
      <el-button type="primary">
        <i class="el-icon-search"></i>搜索
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  }
};
</script>

<style lang="less" scoped>
.el-form {
  position: relative;
  padding: 15px 50px 15px 15px;
  .switchWay {
    position: absolute;
    top: 34px;
    right: 26px;
    width: 25px;
    height: 60px;
    border: 1px solid #ccc;
    border-left: 0;
    border-radius: 4px;
    span {
      position: absolute;
      top: 50%;
      right: 0;
      font-size: 12px;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 2px;
      background-color: #999;
      transform: translate(50%, -50%);
      cursor: pointer;
    }
  }
  /deep/.btnWrapper {
    .el-button {
      width: 213px;
      .el-icon-search {
        margin-right: 10px;
      }
    }
  }
}
</style>