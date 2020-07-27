<template>
  <!-- 酒店详情 -->
  <section class="hotel-content">
    <!-- 头部 -->
    <header v-if="HotelData">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span>
          <nuxt-link to="/hotel">酒店</nuxt-link>
        </span>
        <i>&gt;</i>
        <span>{{ HotelData.real_city }}酒店</span>
        <i>&gt;</i>
        <span class="font-Weight400">{{ HotelData.name }}</span>
      </div>
      <!-- 酒店简介 -->
      <div class="hotel-Title conventionFont">
        <div class="name">{{ HotelData.name }}</div>
        <div class="spell-name">{{ HotelData.alias }}</div>
        <div class="site">
          <i class="el-icon-location"></i>
          {{ HotelData.address }}
        </div>
      </div>
    </header>
    <div class="photo-view">
      <div class="left-imgList">
        <img src="@/assets/images/001.jpg" alt />
      </div>
      <div class="right-imgList">
        <div class="img-min">
          <img src="@/assets/images/001.jpg" alt />
        </div>
        <div class="img-min">
          <img src="@/assets/images/002.jpg" alt />
        </div>
        <div class="img-min">
          <img src="@/assets/images/003.jpg" alt />
        </div>
        <div class="img-min">
          <img src="@/assets/images/004.jpg" alt />
        </div>
        <div class="img-min">
          <img src="@/assets/images/002.jpg" alt />
        </div>
        <div class="img-min">
          <img src="@/assets/images/003.jpg" alt />
        </div>
      </div>
    </div>
    <div class="room-type" v-if="HotelData">
      <el-table :data="HotelData.products" style="width: 100%">
        <el-table-column prop="name" label="价格来源" align="left"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" align="center"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚" align="right">
          <template slot-scope="scope">
            <div class="price">
              <span class="colorDarkorange">￥{{ scope.row.price }}</span>起
              <i class="colorDarkorange">&gt;</i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="GaoDe-MapApi">
      <div class="Map-box">
        <client-only>
          <div id="MapContainer"></div>
        </client-only>
      </div>
      <div class="poi-list">
        <el-tabs v-model="activeName" @tab-click="cutSearch">
          <el-tab-pane label="风景" name="scenery">
            <div class="poi-list">
              <ul v-if="sceneryData">
                <li v-for="(item,ind) in sceneryData" :key="ind">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="traffic">
            <div class="poi-list">
              <ul v-if="trafficData">
                <li v-for="(item,ind) in trafficData" :key="ind">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="hotel-data" v-if="HotelData">
      <el-row type="flex" class="tier">
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20">
          <el-row type="flex">
            <el-col :span="6">入住时间：14:00 之后</el-col>
            <el-col :span="6">离店时间：12:00 之前</el-col>
            <el-col :span="6">{{ HotelData.creation_time }}/{{ HotelData.hours }}</el-col>
            <el-col :span="6">
              酒店规模：
              {{ HotelData.roomCount }}
              间客房
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="tier">
        <el-col :span="4">交通线路</el-col>
        <el-col :span="20">{{HotelData.traffic}}</el-col>
      </el-row>
    </div>
    <div class="comment" v-if="HotelData">
      <h4>用户体验评价</h4>
      <el-row type="flex" justify="left" align="middle">
        <el-col :span="4" class="conventionFont comment-data">
          <div>总评数：{{ HotelData.all_remarks }}</div>
          <div>好评数：{{ HotelData.good_remarks }}</div>
          <div>差评数：{{ HotelData.bad_remarks }}</div>
        </el-col>
        <el-col :span="5" class="comment-position">
          <el-rate
            v-model="HotelData.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="recommend">推荐</div>
        </el-col>
        <el-col :span="4" class="comment-position">
          <el-progress
            type="circle"
            :percentage="HotelData.scores.environment*10"
            :color="'rgb(255,153,0)'"
            :show-text="false"
            :width="80"
            :stroke-width="2"
          ></el-progress>
          <div class="detail">
            <span>环境</span>
            <span>{{ HotelData.scores.environment }}</span>
          </div>
        </el-col>
        <el-col :span="4" class="comment-position">
          <el-progress
            type="circle"
            :percentage="HotelData.scores.product*10"
            :color="'rgb(255,153,0)'"
            :show-text="false"
            :width="80"
            :stroke-width="2"
          ></el-progress>
          <div class="detail">
            <span>产品</span>
            <span>{{ HotelData.scores.product }}</span>
          </div>
        </el-col>
        <el-col :span="4" class="comment-position">
          <el-progress
            type="circle"
            :percentage="HotelData.scores.service*10"
            :color="'rgb(255,153,0)'"
            :show-text="false"
            :width="80"
            :stroke-width="2"
          ></el-progress>
          <div class="detail">
            <span>服务</span>
            <span>{{ HotelData.scores.service }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      HotelData: "",
      // 房间类型数据
      roomTypeData: [
        {
          date: "携程",
          name: "高级大床房",
          address: "￥236起"
        },
        {
          date: "2016-05-04",
          name: "高级大床房",
          address: "￥236起"
        },
        {
          date: "2016-05-01",
          name: "高级大床房",
          address: "￥236起"
        }
      ],
      // 房间内饰的图片组
      activeName: "scenery",
      // 评价
      rateValue: 3.6,
      thiaaa: "广州塔",
      // 搜索配置
      // 兴趣类别
      type: "",
      // 搜索城市
      city: "",
      // 搜索关键字
      SearchVal: "",
      // 搜索目标的维度
      cpoint: [],
      // 风景名胜数据
      sceneryData: "",
      // 交通信息数据
      trafficData: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios({
        url: "/hotels",
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        const { data } = res.data;
        // console.log('data"', res);
        this.HotelData = data[0];
        console.log(this.HotelData);
        this.city = this.HotelData.real_city;
        this.SearchVal = this.HotelData.name;

        this.MapApi({
          that: this,
          KeyStr: "风景名胜",
          KeyType: "sceneryData"
        });
      });
    },

    MapApi(option) {
      let that = option.that;
      window.onLoad = function() {
        let map = new AMap.Map("MapContainer", {
          zoom: 12,
          resizeEnable: true
        });

        AMap.plugin(["AMap.ToolBar", "AMap.PlaceSearch"], function() {
          //异步加载插件
          let toolbar = new AMap.ToolBar();
          map.addControl(toolbar);

          // 根据关键字查询
          // console.log(that.city);

          let placeSearch = new AMap.PlaceSearch({
            type: "",
            city: that.city,
            map: map
          });
          placeSearch.search(that.SearchVal, function(status, result) {
            const { pois } = result.poiList;
            // console.log("届到了：", pois);
            if (pois.length > 0) {
              that.cpoint[0] = pois[0].location.lng;
              that.cpoint[1] = pois[1].location.lat;
            }
            // console.log("维度：", cpoint);

            // 查找附近的风景名胜

            placeSearch.searchNearBy(option.KeyStr, that.cpoint, 5000, function(
              status,
              result
            ) {
              // console.log("ni:", result);
              if (option.KeyType) {
                that[option.KeyType] = result.poiList.pois;
              }
            });
          });
        });
      };
      const key = "3559b089b57c0ac8c52de6ebae6aae9a"; // 你的key
      const url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad&plugin=AMap.ToolBar,AMap.Autocomplete,AMap.PlaceSearch`;
      const jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    },

    cutSearch(tab, event) {
      if (tab.name === "scenery") {
        this.MapApi({
          that: this,
          KeyStr: "风景名胜",
          KeyType: "sceneryData"
        });
      }
      if (tab.name === "traffic") {
        this.MapApi({
          that: this,
          KeyStr: "交通",
          KeyType: "trafficData"
        });
      }
    }
  }
};
</script>

<style lang='less' scoped>
// 公共样式
.colorGray {
  color: #808080;
}
.colorDarkorange {
  color: rgb(254, 158, 0);
}
.font-Weight400 {
  font-weight: 400;
}
.conventionFont {
  color: rgb(102, 102, 102);
  font-size: 14px;
  font-weight: 400;
}

// -------
.hotel-content {
  width: 1000px;
  margin: 0 auto;
}
header {
  font-size: 14px;
  line-height: 1.2;
  .breadcrumb {
    margin: 20px 0;
    font-weight: 550;
    i {
      margin: 0 6px;
      color: rgb(169, 169, 169);
      font-weight: 400;
    }
  }
  .hotel-Title {
    margin: 0 0 20px 0;
    .name {
      font-size: 24px;
      color: #000000;
    }
    > div {
      margin: 3px 0;
    }
  }
}

// 房间内饰一览
.photo-view {
  height: 360px;
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
  .left-imgList {
    background: rgb(238, 238, 238);
    width: 640px;
    height: 100%;
    margin-right: 30px;
  }
  .right-imgList {
    flex: 1;
    height: 370px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .img-min {
      background: rgb(238, 238, 238);
      box-sizing: border-box;
      width: 50%;
      padding: 0 10px 10px;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

// 房间类型
.room-type {
  margin: 0 0 20px 0;
  .price {
    font-size: 16px;
    span {
      margin-right: 4px;
    }
    i {
      margin-left: 4px;
    }
  }
}

// 高德地图插件
.GaoDe-MapApi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 360px;
  margin: 0 0 20px 0;
  .Map-box {
    width: 650px;
    height: 360px;
  }
  .poi-list {
    width: 330px;
    height: 360px;
  }
  #MapContainer {
    width: 100%;
    height: 100%;
  }
}
.poi-list {
  height: 300px;
  overflow: hidden;
  font-size: 14px;
  color: #666;
  ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
  }
}
// 酒店资料
.hotel-data {
  margin-bottom: 20px;
  font-size: 16px;
  .tier {
    padding: 20px 0;
    border-bottom: 1px solid rgb(231, 231, 231);
  }
}
// 评价
.comment {
  margin: 0 0 40px 0;
  .comment-position {
    position: relative;
  }
  .comment-data {
    font-size: 16px;
  }
  .recommend {
    position: absolute;
    top: -20px;
    left: 20px;
    transform: rotate(-30deg);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid rgba(255, 153, 0, 0.4);
    line-height: 80px;
    text-align: center;
    font-size: 26px;
    color: rgba(255, 153, 0, 0.4);
  }
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    font-size: 16px;
    color: rgb(255, 153, 0);
  }
}
</style>