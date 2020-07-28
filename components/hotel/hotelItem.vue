<template>
  <div>
    <a :href="`/hotel/${data.id}.html`">
      <div class="object">
        <div class="img">
          <img :src="data.photos" alt />
        </div>
        <div class="info">
          <div class="title">{{data.name}}</div>
          <div class="english">{{data.alias}}</div>
          <div class="details">
            <el-rate
              :value="data.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
            <div>
              <span>{{data.all_remarks}}</span> 条评论
            </div>
            <div>
              <span>{{data.price}}</span> 篇游记
            </div>
          </div>
          <div class="place">
            <span class="el-icon-location"></span>
            位于：吉珠路37号
          </div>
        </div>
        <div class="price">
          <div
            class="item"
            v-for="(item,index) in data.products"
            :key="index"
            @mouseenter="active(index)"
            @mouseleave="flage =null"
            :class="{active:flage==index}"
          >
            <div class="name">{{item.name}}</div>
            <div class="price">
              <span>￥{{item.price}}</span> 起
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      flage: null,
      value: 3.7
    };
  },
  mounted() {
    // console.log(this.data);
  },
  methods: {
    active(index) {
      this.flage = index;
    }
  }
};
</script>

<style lang="less" scoped>
.object {
  display: flex;
  height: 266px;
  padding: 26px 0;
  border-bottom: 1px solid #e4e4e4;
  .img {
    width: 340px;
    padding-right: 10px;
    img {
      width: 330px;
      height: 240px;
      object-fit: cover;
    }
  }
  .info {
    flex: 1;
    padding-right: 40px;
    .title {
      font-size: 28px;
    }
    .english {
      color: #bbb;
      font-size: 10px;
      margin: 6px 0;
    }
    .details {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      span {
        color: orange;
      }
    }
    .place {
      padding: 6px 0;
      color: #bbb;
    }
  }
  .price {
    width: 258px;
    .item {
      display: flex;
      width: 234px;
      height: 50px;
      line-height: 50px;
      margin: 0 auto;
      padding: 0 20px;
      border-bottom: 1px solid #e4e4e4;
      transition: 0.5s;
      .name {
        flex: 1;
      }
      .price {
        width: 80px;
        span {
          color: orange;
        }
      }
      &.active {
        background-color: rgba(187, 187, 187, 0.1);
      }
    }
  }
}
</style>