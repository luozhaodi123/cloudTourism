<template>
  <div class="specialTicket">
    <nuxt-link to="#">
      <img src="http://157.122.54.189:9095/assets/images/tj01.jpg" alt />
      <div class="layer-bar">
        <span class="loadBar">广州-上海</span>
        <span class="price">$760</span>
      </div>
    </nuxt-link>
    <nuxt-link to="#">
      <img src="http://157.122.54.189:9095/assets/images/tj02.jpg" alt />
      <div class="layer-bar">
        <span class="loadBar">广州-上海</span>
        <span class="price">$760</span>
      </div>
    </nuxt-link>
    <nuxt-link to="#">
      <img src="http://157.122.54.189:9095/assets/images/tj03.jpg" alt />
      <div class="layer-bar">
        <span class="loadBar">广州-上海</span>
        <span class="price">$760</span>
      </div>
    </nuxt-link>
    <nuxt-link to="#">
      <img src="http://157.122.54.189:9095/assets/images/tj04.jpg" alt />
      <div class="layer-bar">
        <span class="loadBar">广州-上海</span>
        <span class="price">$760</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.specialTicket {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  box-sizing: border-box;
  a {
    position: relative;
    img {
      display: block;
      width: 225px;
      height: 150px;
      border: 1px solid #ccc;
    }
    .layer-bar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      .loadBar {
        float: left;
      }
      .price {
        float: right;
      }
    }
  }
}
</style>