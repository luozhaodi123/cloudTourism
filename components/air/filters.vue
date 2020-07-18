<template>
  <!-- 筛选 -->
  <div class="filters">
    <!-- 单程 -->
    <div class="oneWay">
      <div class="wayLeft">
        <span class="label">单程:</span>
        <span class="load">{{depCity}}</span>
        <span>-</span>
        <span class="load">{{arrCity}}</span>
        <span>/</span>
        <span class="load date">{{time}}</span>
      </div>
      <div class="wayRight">
        <el-select v-model="placeValue" placeholder="起飞机场" @change="setTotalFilter">
          <el-option v-for="item in options.airport" :key="item.value" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-model="dateValue" placeholder="起飞时间" @change="setTotalFilter">
          <el-option
            v-for="(item,index) in options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
        <el-select v-model="companyValue" placeholder="航空公司" @change="setTotalFilter">
          <el-option
            v-for="(item,index) in options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select v-model="moduleValue" placeholder="机型" @change="setTotalFilter">
          <el-option
            v-for="(item,index) in module"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 筛选 -->
    <div class="select">
      <span class="label">筛选:</span>
      <button class="btnCancel" @click="cacelClick">撤销</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Object,
    flights: Array
  },
  data() {
    return {
      module: [
        {
          label: "大",
          value: "L"
        },
        {
          label: "中",
          value: "M"
        },
        {
          label: "小",
          value: "S"
        }
      ],
      placeValue: "",
      dateValue: "",
      companyValue: "",
      moduleValue: "",
      depCity: "",
      arrCity: "",
      time: ""
    };
  },
  created() {
    this.depCity = this.$route.query.departCity;
    this.arrCity = this.$route.query.destCity;
    this.time = this.$route.query.departDate;
  },
  methods: {
    // 总的筛选过滤器，主要是为了让多个过滤器都应该能够协同作用
    setTotalFilter() {
      let newList = [...this.flights];
      if (this.placeValue) {
        newList = newList.filter(item => {
          return item.org_airport_name == this.placeValue;
        });
      }
      if (this.dateValue) {
        newList = newList.filter(item => {
          const depTime = Number(this.dateValue.split(",")[0]);
          const arrTime = Number(this.dateValue.split(",")[1]);
          const moduleTime = Number(item.dep_time.split(":")[0]);
          return moduleTime > depTime && moduleTime < arrTime;
        });
      }
      if (this.companyValue) {
        newList = newList.filter(item => {
          return item.airline_name == this.companyValue;
        });
      }
      if (this.moduleValue) {
        newList = newList.filter(item => {
          return item.plane_size == this.moduleValue;
        });
      }
      this.$emit("clicked", newList);
    },
    // 撤销按钮
    cacelClick() {
      this.placeValue = "";
      this.dateValue = "";
      this.companyValue = "";
      this.moduleValue = "";
      this.setTotalFilter();
    },
    // 单个过滤器只能是筛选操作自己的数据，所以有问题
    //筛选起飞机场
    handleAirport(value) {
      const newList = this.flights.filter(item => {
        return item.org_airport_name == value;
      });
      this.$emit("clicked", newList);
    },
    // 筛选起飞时间
    handleTime(value) {
      console.log(value);
      const newList = this.flights.filter(item => {
        const depTime = Number(value.split(",")[0]);
        const arrTime = Number(value.split(",")[1]);
        const moduleTime = Number(item.dep_time.split(":")[0]);
        return moduleTime > depTime && moduleTime < arrTime;
      });
      this.$emit("clicked", newList);
    },
    // 筛选航空公司
    handleCompany(value) {
      const newList = this.flights.filter(item => {
        return item.airline_name == value;
      });
      this.$emit("clicked", newList);
    },
    // 筛选飞机模型
    handleModule(value) {
      const newList = this.flights.filter(item => {
        return item.plane_size == value;
      });
      this.$emit("clicked", newList);
    }
  }
};
</script>

<style lang="less" scoped>
.filters {
  width: 745px;
  margin-bottom: 18px;
  font-size: 14px;
  .oneWay {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .wayLeft {
      .load {
        margin: 0 2px;
      }
    }
    .wayRight {
      margin-left: 54px;
      .el-select {
        width: 115px;
        height: 28px;
        /deep/.el-input {
          height: 28px;
          /deep/.el-input__inner {
            height: 28px !important;
            line-height: 28px;
            font-size: 12px;
          }
          .el-select__caret {
            line-height: 28px;
          }
        }
      }
    }
  }
  .select {
    .btnCancel {
      width: 56px;
      height: 28px;
      font-size: 12px;
      background-color: #ecf5ff;
      color: #669eff;
      border-radius: 14px;
      border: 1px solid #b3d8ff;
      &:hover {
        background-color: #669eff;
        color: #fff;
      }
    }
  }
  .label {
    margin-right: 10px;
  }
}
</style>