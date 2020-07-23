<template>
  <div class="post">
    <div class="post-aside">
      <div class="aside-main">
        <div class="main-item" v-for="(item,index) in recomData" :key="index">
          {{item.type}}
          <span>></span>
        </div>
      </div>
      <div class="aside-recom">
        <div class="recom-item" v-for="(childs,index) in recomData" :key="index">
          <div class="items" v-for="(item,index) in childs.children" :key="index">
            <span>
              <i>{{index+1}}</i>
              <a href="#">{{item.city}}</a>
            </span>
            <a href="#" class="meta">{{item.desc}}</a>
          </div>
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
    recomData: Array
  }
};
</script>

<style lang="less" scoped>
.post {
  .post-aside {
    position: relative;
    width: 260px;
    border: 1px solid #ccc;
    // box-sizing: border-box;
    .aside-main {
      .main-item {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        &:last-child {
          border-bottom: 0;
        }
        span {
          float: right;
          font-size: 20px;
          font-family: serif;
        }
      }
    }
    .aside-recom {
      display: none;
      position: absolute;
      top: -1px;
      left: 260px;
      z-index: 999px;
      width: 350px;
      padding: 10px 20px;
      border: 1px solid #ccc;
      background-color: #fff;
      .recom-item {
        .items {
          height: 40px;
          font-size: 14px;
          color: #666;
          span {
            color: #ffa500;
            i {
              font-style: italic;
              font-size: 20px;
            }
            a {
              margin: 0 10px;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          & > a:hover {
            text-decoration: underline;
          }
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