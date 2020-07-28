<template>
  <div class="filterHotel">
    <div class="price">
      <p>价格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0--{{this.form.price}}</p>
      <div class="block">
        <el-slider v-model="form.price" :max="4000"></el-slider>
      </div>
    </div>
    <div class="level item">
      <p>住宿等级</p>
      <el-select
        v-model="level"
        multiple
        collapse-tags
        style="margin-left: 2px;"
        placeholder="请选择"
        @change="filterHotel"
      >
        <el-option
          v-for="(item ,index) in options.levels"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="star item">
      <p>住宿类型</p>
      <el-select
        v-model="type"
        multiple
        collapse-tags
        style="margin-left: 2px;"
        placeholder="请选择"
        @change="filterHotel"
      >
        <el-option
          v-for="(item ,index) in options.types"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="type item">
      <p>酒店设施</p>
      <el-select
        v-model="asset"
        multiple
        collapse-tags
        style="margin-left: 2px;"
        placeholder="请选择"
        @change="filterHotel"
      >
        <el-option
          v-for="(item ,index) in options.assets"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="brand item">
      <p>酒店品牌</p>
      <el-select v-model="brand" multiple collapse-tags style="margin-left: 2px;" placeholder="请选择">
        <el-option
          v-for="(item ,index) in options.brands"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="unBtn item">
      <p>撤销条件</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hoteDdata"],
  data() {
    return {
      type: null,
      asset: null,
      level: null,
      brand: null,
      form: {
        price: null
      },
      options: {
        types: [],
        levels: [],
        assets: [],
        brands: []
      }
    };
  },
  methods: {
    //   获取酒店选项
    getOptions() {
      this.$axios({
        url: "/hotels/options"
      }).then(res => {
        this.options.types = res.data.data.types.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        this.options.levels = res.data.data.levels.map(item => {
          return {
            value: item.level,
            label: item.name
          };
        });
        this.options.assets = res.data.data.assets.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        this.options.brands = res.data.data.brands.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
      });
    },
    // 过滤函数
    filterHotel() {
      let newList = [...this.hoteDdata];
      //   console.log(newList[0]);

      //   if (this.type) {
      //     newList.filter(item => {
      //       return item.hoteltype.id == this.type;
      //     });
      //   }
      //   console.log(newList);

      //   if (this.level) {
      //     newList.filter(item => {
      //       return item.hotellevel || item.hotellevel.id == this.level;
      //     });
      //   }
      console.log(newList);
    }
  },
  mounted() {
    this.getOptions();
  }
};
</script>

<style lang="less" scoped>
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
    /deep/ .el-input__inner {
      border: none;
    }
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
</style>