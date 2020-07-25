<template>
  <div class="object">
    <div class="item">
      <div class="img">
        <img src="#" alt />
      </div>
      <div class="info"></div>
      <div class="price"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.object {
  .item {
    display: flex;
    height: 266px;
    padding: 26px 0;
    border-bottom: 1px solid #e4e4e4;
    .img {
      width: 340px;
    }
    .info {
      flex: 1;
    }
    .price {
      width: 258px;
    }
  }
}
</style>