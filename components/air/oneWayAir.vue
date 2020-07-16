<template>
  <el-form ref="form" label-width="80px">
    <div class="switchWay">
      <span @click="switchWay">换</span>
    </div>
    <el-form-item label="出发城市">
      <!-- fetch-suggestions 返回输入建议的方法 -->
      <!-- select 点击选中建议项时触发 -->
      <!-- :trigger-on-focus="false" 输入后在激活输入建议 -->
      <!-- :highlight-first-item ="true" 自动高亮第一个选项 -->
      <el-autocomplete
        v-model="form.departCity"
        :trigger-on-focus="false"
        :highlight-first-item="true"
        :fetch-suggestions="queryDepartSearch"
        placeholder="请搜索出发城市"
        @select="handleDepartSelect"
        class="el-autocomplete"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item label="到达城市">
      <el-autocomplete
        v-model="form.destCity"
        :trigger-on-focus="false"
        :highlight-first-item="true"
        :fetch-suggestions="queryDestSearch"
        placeholder="请搜索到达城市"
        @select="handleDestSelect"
        class="el-autocomplete"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item label="出发时间">
      <el-col>
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="选择出发日期"
          style="width: 100%;"
          @change="changeDate"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item class="btnWrapper">
      <el-button type="primary" @click="searchBtn">
        <i class="el-icon-search"></i>搜索
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // 封装获取城市的函数
    getCity(value) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res.data);
        const suggestions = res.data.data.map(item => {
          return {
            // 城市名称不应该有市字,使用字符串中replace方法替换掉name中最后一个市字
            value: item.name.replace(/市$/, ""),
            code: item.sort
          };
        });
        // 后台给的数据中有些城市缺失代码，需要将没有代码的城市过滤掉
        const sugItem = suggestions.filter(item => {
          return item.code;
        });
        console.log(sugItem);
        return sugItem;
      });
    },
    queryDepartSearch(value, showList) {
      // 在拉取建议列表前，发送请求获取建议的数据
      if (value) {
        this.getCity(value).then(res => {
          // console.log(res);
          if (res.length > 0) {
            showList(res);
            //搜索得出建议选项的时候,默认将列表的第一项数据放入 form
            this.form.departCode = res[0].code;
          } else {
            showList([{ value: "没有找到该城市" }]);
          }
        });
      }
    },
    queryDestSearch(value, showList) {
      if (value) {
        this.getCity(value).then(res => {
          // console.log(res);
          if (res.length > 0) {
            showList(res);
            //搜索得出建议选项的时候,默认将列表的第一项数据放入 form
            this.form.destCode = res[0].code;
          } else {
            showList([{ value: "没有找到该城市" }]);
          }
        });
      }
    },
    // select事件主要是当用户选择城市时触发的函数
    // 选择出发城市
    handleDepartSelect(item) {
      // console.log(item);
      this.form.departCode = item.code;
    },
    // 到达城市
    handleDestSelect(item) {
      this.form.destCode = item.code;
    },
    // 在每次用户修改日期的时候触发,需要将日期对象转换成发送给后台需要的数据格式
    changeDate(value) {
      console.log(value); //Thu Jul 16 2020 00:00:00 GMT+0800 (中国标准时间)
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    // 点击搜索，发送数据
    searchBtn() {
      // 判断用户是否已经输入数据了
      for (var key in this.form) {
        let item = this.form[key];
        if (!item) {
          this.$message.error("亲，你的出行线路不完整，请输入");
          return;
        }
      }
      // 处理用户不按常理输入的值
      // 第一种方式
      /* const form = {};
      for (var key in this.form) {
        let item = this.form[key];
        if (key == "departCity" && item.includes("市")) {
          form[key] = item.replace(/市$/, "");
          console.log(form[key]);
        } else if (key == "destCity" && item.includes("市")) {
          form[key] = item.replace(/市$/, "");
          console.log(form[key]);
        } else {
          form[key] = this.form[key];
        }
      }
      console.log(form); */
      // 第二种方式
      this.form = {
        departCity: this.form.departCity.replace(/市$/, ""),
        departCode: this.form.departCode,
        destCity: this.form.destCity.replace(/市$/, ""),
        destCode: this.form.destCode,
        departDate: this.form.departDate
      };
      this.$router.push({
        path: "/air/flights",
        // query: form
        query: this.form
      });
    },
    // 切换线路
    switchWay() {
      let modeilCity = "";
      let modeilCode = "";
      modeilCity = this.form.departCity;
      modeilCode = this.form.departCode;

      this.form.departCity = this.form.destCity;
      this.form.departCode = this.form.destCode;

      this.form.destCity = modeilCity;
      this.form.destCode = modeilCode;
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  position: relative;
  padding: 15px 50px 15px 15px;
  .el-autocomplete {
    width: 100%;
  }
  .switchWay {
    position: absolute;
    top: 34px;
    right: 26px;
    width: 25px;
    height: 60px;
    border: 1px solid #ccc;
    border-left: 0;
    border-radius: 4px;
    span {
      position: absolute;
      top: 50%;
      right: 0;
      font-size: 12px;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 2px;
      background-color: #999;
      transform: translate(50%, -50%);
      cursor: pointer;
    }
  }
  /deep/.btnWrapper {
    .el-button {
      width: 213px;
      .el-icon-search {
        margin-right: 10px;
      }
    }
  }
}
</style>