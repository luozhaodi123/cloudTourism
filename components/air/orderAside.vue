<template>
  <div class="list">
    <div class="head">
      <el-row type="flex" justify="space-between">
        <el-col :span="8">{{list.arr_date}}</el-col>
        <el-col :span="6" class="load">{{list.org_city_name}} - {{list.dst_city_name}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="6">
          <div class="time cent">{{list.dep_time}}</div>
          <el-row class="cent">{{list.org_airport_name}}{{list.org_airport_quay}}</el-row>
        </el-col>
        <el-col :span="6" type="flex">
          <div class="cent">---{{totalTime}}---</div>
          <el-row class="cent">{{list.airline_name}}{{list.flight_no}}</el-row>
        </el-col>
        <el-col :span="6">
          <div class="time cent">{{list.arr_time}}</div>
          <el-row class="cent">{{list.dst_airport_name}}{{list.dst_airport_quay}}</el-row>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="list-item">
      <el-col :span="6">订单总价</el-col>
      <el-col :span="6" class="listCenter">金额</el-col>
      <el-col :span="6" class="listRight">数量</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="list-item">
      <el-col :span="6">成人机票</el-col>
      <el-col
        :span="6"
        class="listCenter"
        v-if="list.seat_infos"
      >￥{{list.seat_infos.org_settle_price}}</el-col>
      <el-col :span="6" class="listRight">x1</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="list-item">
      <el-col :span="6">机建+燃油</el-col>
      <el-col :span="8" class="listCenter">￥{{list.airport_tax_audlet}}/人/单程</el-col>
      <el-col :span="6" class="listRight">x1</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="list-item">
      <el-col :span="6">应付金额:</el-col>
      <el-col :span="10" class="price listRight">￥{{totalMoney}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["list", "totalMoney"],
  computed: {
    totalTime() {
      if (this.list.arr_time && this.list.dep_time) {
        let arrTime = this.list.arr_time.split(":");
        let depTime = this.list.dep_time.split(":");
        let arrMine = Number(arrTime[0] * 60) + Number(arrTime[1]);
        let depMine = Number(depTime[0] * 60) + Number(depTime[1]);
        let time = arrMine - depMine;
        if (time < 0) {
          time = arrMine + 24 * 60 - depMine;
        }
        return Math.floor(time / 60) + "时" + (time % 60) + "分";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
  .head {
    padding: 15px;
    border-bottom: 1px dashed #ccc;
    .el-row:first-child {
      margin-bottom: 10px;
      .load {
        text-align: right;
        font-size: 14px;
      }
    }
    .el-row:last-child {
      font-size: 12px;
      color: #999;
      .time {
        font-size: 22px;
        color: #000;
      }
      .cent {
        text-align: center;
      }
    }
  }
  .list-item {
    padding: 10px 15px;
    border-bottom: 1px dashed #ccc;
    font-size: 14px;
    color: #666;
    &:last-child {
      border-bottom: 0;
    }
    .price {
      font-size: 28px;
      font-weight: normal;
      color: #ffa500;
    }
    .listCenter {
      text-align: center;
    }
    .listRight {
      text-align: right;
    }
  }
}
</style>