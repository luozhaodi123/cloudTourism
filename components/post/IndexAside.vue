<template>
  <div class="post">
    <div class="post-aside" @mouseleave="isHide">
      <div class="aside-main">
        <div
          class="main-item"
          ref="recomDom"
          @mouseenter="isShow(index)"
          v-for="(item,index) in recomData"
          :key="index"
          :class="{
            active: currentIndex===index
          }"
        >
          {{item.type}}
          <span>></span>
        </div>
      </div>
      <div class="aside-recom" v-show="isflag">
        <div class="items" v-for="(item,index) in recomData[current].children" :key="index">
          <a href="#">
            <span>
              <i>{{index+1}}</i>
              <span class="cities undeline">{{item.city}}</span>
            </span>
            <span class="meta undeline">{{item.desc}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="recom-city">
      <h2>推荐城市</h2>
      <div class="cityImg">
        <a href="#">
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recomData: Array,
  },
  data() {
    return {
      current: 0,
      currentIndex: null,
      isflag: false,
    };
  },
  methods: {
    isShow(index) {
      // console.log(index);
      // 第一种方式实现显示与隐藏
      /* const recomDom = this.$refs.recomDom;
      for (var i = 0; i < recomDom.length; i++) {
        recomDom[i].style.color = "#000";
        recomDom[i].style.borderRight = "1px solid #ccc";
      }
      recomDom[index].style.color = "#ffa500";
      recomDom[index].style.borderRightColor = "#fff"; */
      // 第二种方式实现显示与隐藏
      this.currentIndex = index;
      this.current = index;
      this.isflag = true;
    },
    isHide() {
      /* const recomDom = this.$refs.recomDom;
      for (var i = 0; i < recomDom.length; i++) {
        recomDom[i].style.color = "#000";
        recomDom[i].style.borderRight = "1px solid #ccc";
      } */
      this.currentIndex = null;
      this.current = 0;
      this.isflag = false;
    },
  },
};
</script>

<style lang="less" scoped>
.post {
  .post-aside {
    position: relative;
    width: 260px;
    height: 160px;
    .aside-main {
      position: absolute;
      width: 260px;
      height: 160px;
      border: 1px solid #ccc;
      border-right: 0;
      border-bottom: 0;
      z-index: 2;
      .main-item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        span {
          float: right;
          font-size: 20px;
          font-family: serif;
        }
      }
      .active {
        color: #ffa500;
        border-right-color: #fff;
      }
    }
    .aside-recom {
      position: absolute;
      top: 0;
      left: 260px;
      width: 350px;
      padding: 10px 20px;
      border: 1px solid #ccc;
      background-color: #fff;
      z-index: 1;
      .items {
        height: 40px;
        font-size: 14px;
        span {
          color: #ffa500;
          i {
            font-style: italic;
            font-size: 20px;
          }
          .cities {
            margin: 0 5px;
          }
        }
        .meta {
          color: #666;
        }
        .undeline:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .recom-city {
    h2 {
      font-size: 16px;
      font-weight: normal;
      margin: 20px 0 10px;
      padding: 0 0 10px;
      border-bottom: 1px solid #ccc;
    }
    .cityImg {
      img {
        display: block;
        width: 260px;
        height: 175px;
      }
    }
  }
}
</style>