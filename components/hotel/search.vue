<template>
  <div class="searchPage">
    <div class="searchForm">
      <div class="left">
        <el-autocomplete
          class="inline-input"
          v-model="form.city"
          :fetch-suggestions="querySearchcity"
          placeholder="城市名"
          @select="handleSelect"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </div>
      <div class="center">
        <el-date-picker
          type="daterange"
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="setDate"
        ></el-date-picker>
      </div>
      <div class="right">
        <el-input v-model="form.input" placeholder="请输入内容" :readonly="true" @focus="focus"></el-input>
        <div class="peopleFrom" v-if="form.flage">
          <div class="size">
            <div class="title">每间</div>
            <div class="adult item">
              <el-autocomplete
                class="inline-input"
                v-model="form.adult"
                :fetch-suggestions="querySearch"
                placeholder="成人人数"
                @select="handleSelectadult"
              ></el-autocomplete>
            </div>
            <div class="child item">
              <el-autocomplete
                class="inline-input"
                v-model="form.child"
                :fetch-suggestions="querySearch"
                placeholder="儿童人数"
                @select="handleSelectchild"
              ></el-autocomplete>
            </div>
          </div>
          <div class="btns">
            <div class="btn" @click="sure">确定</div>
            <div class="btn" @click="form.flage=false">取消</div>
          </div>
        </div>
      </div>
      <div class="searchBtn" @click="conditionSearch">查看价格</div>
    </div>
    <div class="site">
      <div class="info"></div>
      <div class="map" id="container"></div>
    </div>
    <div class="filterHotel">
      <div class="price">
        <p>价格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0-4000</p>
        <div class="block">
          <el-slider v-model="form.price"></el-slider>
        </div>
      </div>
      <div class="star item">
        <p>住宿等级</p>
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="type item">
        <p>住宿等级</p>
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="brand item">
        <p>住宿等级</p>
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="unBtn item">
        <p>撤销条件</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      cityList: [],
      hotelInfo: [],
      form: {
        price: null,
        city: null,
        cityCode: null,
        adult: "",
        child: "",
        input: null,
        date: null,
        // 总人数
        number: 0,
        // 控制人数选择框的显示和隐藏
        flage: false,
        // 人数推荐
        suggest: [
          {
            value: "1"
          },
          {
            value: "2"
          },
          {
            value: "3"
          },
          {
            value: "4"
          }
        ],
        enterTime: null,
        leftTime: null
      }
    };
  },
  methods: {
    focus() {
      this.form.flage = true;
      this.form.number = 0;
      console.log(this.form.date);
    },
    //   显示儿童成人人数推荐
    querySearch(str, cb) {
      cb(this.form.suggest);
    },
    // 选择成人触发
    handleSelectadult(item) {
      this.form.adult = item.value + " 成人";
      this.form.number += +item.value;
    },
    // 选择儿童触发
    handleSelectchild(item) {
      this.form.child = item.value + " 儿童";
      this.form.number += +item.value;
    },
    // 确定总人数触发
    sure() {
      this.form.input = (this.form.adult + this.form.child).trim();
      this.form.flage = false;
      console.log(this.form.number);
    },
    // 显示城市推荐
    querySearchcity(str, cd) {
      this.getCity(str).then(res => {
        if (res.length > 0) {
          this.cityList = [...res];
          cd(this.cityList);
        } else {
          cd([{ value: "暂时没有数据" }]);
        }
      });
    },
    // 选择城市触发
    handleSelect(item) {
      this.form.city = item.value;
      this.form.cityCode = item.id;
      console.log(this.form.cityCode);
    },
    // 查看价格
    conditionSearch() {
      this.getHotel();
    },
    // 获取城市列表
    getCity(value) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res);
        const data = res.data.data.map(item => {
          return {
            value: item.name.replace(/市/g, ""),
            id: item.id
          };
        });
        return data;
      });
    },
    // 获取酒店
    getHotel() {
      this.$axios({
        url: "/hotels",
        params: {
          enterTime: this.form.enterTime,
          leftTime: this.form.leftTime,
          city: Number(this.form.cityCode)
        }
      }).then(res => {
        console.log(res.data);

        this.hotelInfo = res.data;
      });
    },
    // 获取时间
    setDate(value) {
      const enter = value[0];
      const left = value[1];
      const enterTime = moment(enter).format("YYYY-MM-DD");
      const leftTime = moment(left).format("YYYY-MM-DD");
      this.form.enterTime = enterTime;
      this.form.leftTime = leftTime;
      console.log(this.form.enterTime);
    },
    //加载地图
    lodingMap() {
      var map = new AMap.Map("container");
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.searchPage {
  margin: 0 auto;
  .searchForm {
    display: flex;
    justify-content: space-between;
    height: 64px;
    text-align: center;
    .left {
      width: 240px;
    }
    .center {
      width: 400px;
    }
    .right {
      position: relative;
      width: 240px;
      .peopleFrom {
        position: absolute;
        width: 340px;
        height: 100px;
        background-color: #fff;
        border-radius: 12px;
        z-index: 9;
        color: #888;
        padding: 10px;
        margin-top: 10px;
        box-shadow: 0 0 20px rgb(220, 223, 230);
        .size {
          display: flex;
          width: 340px;
          height: 50px;
          border-bottom: 1px solid #e4e4e4;
          .title {
            flex: 1;
            text-align: left;
            height: 42px;
            line-height: 42px;
            padding-left: 10px;
          }

          .item {
            width: 120px;
            height: 24px;
          }
          .adult {
            margin-right: 6px;
          }
        }
        .btns {
          display: flex;
          margin-left: 150px;
          .btn {
            width: 80px;
            height: 30px;
            line-height: 30px;
            background-color: rgb(64, 158, 255);
            color: white;
            border-radius: 5px;
            margin: 20px 10px 0 0;
            cursor: pointer;
          }
        }
      }
    }
    .searchBtn {
      width: 140px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: rgb(64, 158, 255);
      color: white;
      border-radius: 5px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .site {
    display: flex;
    height: 230px;
    padding-bottom: 10px;
    .info {
      flex: 1;
      padding-right: 20px;
      background-color: orange;
    }
    .map {
      width: 420px;
      background-color: red;
    }
  }
  .filterHotel {
    display: flex;
    height: 80px;
    text-align: center;
    border: 1px solid #e4e4e4;
    padding: 8px 0;
    box-sizing: border-box;
    p {
      margin-bottom: 8px;
    }
    .price {
      width: 196px;
      .block {
        width: 150px;
        margin: 0 auto;
      }
    }
    .item {
      flex: 1;
      border-left: 1px solid #e4e4e4;
    }
    .unBtn {
      p {
        width: 60%;
        height: 80%;
        margin: auto;
        margin-top: 6px;
        color: white;
        line-height: 3;
        background-color: rgb(102, 177, 255);
        border-radius: 5px;
      }
    }
  }
}
</style>