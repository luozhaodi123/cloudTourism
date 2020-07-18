<template>
  <div class="specialTicket">
    <div class="air-sale" v-for="(item,index) in sales" :key="index">
      <nuxt-link
        :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
      >
        <img :src="$axios.defaults.baseURL+item.cover" alt />
        <div class="layer-bar">
          <span class="loadBar">{{item.departCity}}-{{item.destCity}}</span>
          <span class="price">${{item.price}}</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sales: []
    };
  },
  created() {
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      console.log(res.data);
      this.sales = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.specialTicket {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  .air-sale {
    a {
      position: relative;
      display: flex;
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
}
</style>