<template>
  <div class="container">
    <!-- 首页轮播图 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="search-content">
      <div class="search-bar">
        <!-- tab -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item,index) in options"
            :key="index"
            @click="handleClickTab(index)"
            :class="{currentTab:index===currentTabIndex}"
          >{{item.name}}</span>
        </el-row>
        <!-- 搜索框 -->
        <el-row type="flex" class="search-input">
          <input
            type="text"
            v-model="searchValue"
            :placeholder="options[currentTabIndex].placeholder"
          />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [],
      options: [
        // 搜索框tab选项
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      currentTabIndex: 0,
      searchValue: ""
    };
  },
  created() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      console.log(res.data);
      const newBanner = res.data.data.map(item => {
        return {
          ...item,
          url: this.$axios.defaults.baseURL + item.url
        };
      });
      this.banners = newBanner;
    });
  },
  methods: {
    handleClickTab(index) {
      this.currentTabIndex = index;
      if (this.currentTabIndex == 2) {
        this.$router.push("/hotel");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
  .search-content {
    z-index: 9999;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%);
    .search-bar {
      width: 550px;
      .search-tab {
        span {
          position: relative;
          width: 82px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0.2);
          color: #fff;
          margin-right: 12px;
          cursor: pointer;
          &::after {
            position: absolute;
            top: 0;
            right: -12px;
            content: "";
            width: 12px;
            height: 40px;
            border-top: 40px solid transparent;
            border-left: 12px solid rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            z-index: 1000;
          }
        }
        // tab栏被激活的样式
        .currentTab {
          background-color: #ccc;
          color: #333;
          &::after {
            border-left-color: #ccc;
          }
        }
      }
      .search-input {
        display: flex;
        height: 46px;
        align-items: center;
        background-color: #fff;
        input {
          flex: 1;
          height: 46px;
          border: 0;
          outline: none;
          padding: 0 15px;
          &::placeholder {
            font-size: 16px;
            color: #757575;
          }
        }
        i {
          width: 42px;
          font-size: 22px;
          text-align: center;
          color: #333;
        }
      }
    }
  }
}
</style>
