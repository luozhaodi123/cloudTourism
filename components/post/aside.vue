<template>
  <div class="right">
    <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
      <el-button>热门城市</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
      <el-button>推荐城市</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
      <el-button>奔向海岛</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
      <el-button>主题推荐</el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.right {
  width: 260px;
  height: 165px;
  display: flex;
  flex-direction: column;
  .el-button {
    margin: 0;
  }
}
</style>