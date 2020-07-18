<template>
  <div class="ticket">
    <!-- <div class="list" @click="handleClick(index)"> -->
    <div class="list">
      <div class="list-item" @click="isShow=!isShow">
        <el-row type="flex" class="message">
          <el-col :span="6" class="tipOne">
            <span>{{lists.airline_name}} {{lists.flight_no}}</span>
          </el-col>
          <el-col :span="12" class="tipTwo">
            <el-row type="flex" justify="space-between">
              <el-col :span="8">
                <span class="time">{{lists.dep_time}}</span>
                <div class="dress">{{lists.org_airport_name}} {{lists.org_airport_quay}}</div>
              </el-col>
              <el-col :span="8" class="tipThree">
                <span>{{dealTime}}</span>
              </el-col>
              <el-col :span="8">
                <span class="time">{{lists.arr_time}}</span>
                <div class="dress">{{lists.dst_airport_name}} {{lists.dst_airport_quay}}</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="tipFive">
            <span>
              ￥
              <i>{{lists.base_price}}</i>起
            </span>
          </el-col>
        </el-row>
      </div>
      <!-- 设置element中默认的过渡动画标签 el-collapse-transition -->
      <el-collapse-transition>
        <!-- <el-row type="flex" class="recommend" v-if="index == currentIndex && isShow"> -->
        <el-row type="flex" class="recommend" v-if="isShow">
          <el-col :span="4" class="recom-left">低价推荐</el-col>
          <el-col :span="20">
            <el-row
              type="flex"
              class="recom-right"
              v-for="(item,index) in lists.seat_infos"
              :key="index"
            >
              <el-col :span="16">
                <span class="model">{{item.group_name}}</span>
                <span>|</span>
                {{item.supplierName}}
              </el-col>
              <el-col :span="4">
                <span class="price">￥ {{item.org_settle_price}}</span>
              </el-col>
              <el-col :span="4">
                <div class="selectBtn" @click="selectBtn({id:lists.id,seat_xid:item.seat_xid})">选定</div>
                <p class="number" v-if="item.nums !='A'">剩余: {{item.nums}}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lists", "index"],
  data() {
    return {
      dealList: [],
      recomList: [],
      currentIndex: "",
      isShow: false
    };
  },
  computed: {
    // 处理时间格式
    dealTime() {
      let arrTime = this.lists.arr_time.split(":");
      let depTime = this.lists.dep_time.split(":");

      // 第一种方式 小时减小时 分钟减分钟
      /* let arrHour = arrTime[0];
      let arrMine = arrTime[1];
      let depHour = depTime[0];
      let depMine = depTime[1];
      // 到达时间 00   到达分钟大于开始分钟
      if (arrHour == "00" && arrMine > depMine) {
        arrHour = 24;
        // 到达时间 00   到达分钟小于开始分钟
      } else if (arrHour == "00" && arrMine < depMine) {
        arrHour = 24;
        arrHour -= 1;
        // arrMine += 60;
        arrMine = parseInt(arrMine) + 60;
        // 到达时间不等于 00   到达分钟小于开始分钟
      } else if (arrHour != "00" && arrMine < depMine) {
        arrHour -= 1;
        // arrMine += 60;  注: 这个+的话，话自动拼接成字符串，所以问题在这
        arrMine = parseInt(arrMine) + 60;
        console.log(arrHour, arrMine);
      }
      const resultHour = arrHour - depHour;
      const resultMine = arrMine - depMine;
      return resultHour + "小时" + resultMine + "分"; */

      //第二种方式 转换成分钟进行计算
      let arrMine = Number(arrTime[0] * 60) + Number(arrTime[1]);
      let depMine = Number(depTime[0] * 60) + Number(depTime[1]);
      let time = arrMine - depMine;
      if (time < 0) {
        time = arrMine + 24 * 60 - depMine;
      }
      return Math.floor(time / 60) + "小时" + (time % 60) + "分";
    }
  },
  methods: {
    // 实现点击对应的机票列表的显示与隐藏
    /* handleClick(index) {
      console.log(index);
      if (this.isShow && this.currentIndex == index) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      this.currentIndex = index;
    } */

    // 选定机票
    selectBtn(item) {
      // console.log("选定机票事件触发");
      console.log(item);
      this.$router.push({
        path: "/air/order",
        query: {
          id: item.id,
          seat_xid: item.seat_xid
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ticket {
  width: 745px;
  margin-right: 12px;
  .list {
    margin: 10px 0;
    border: 1px solid #ccc;
    .message {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      text-align: center;
      padding: 15px;
      cursor: pointer;
      .tipOne {
        font-size: 14px;
        color: #000;
      }
      .tipTwo {
        padding: 0 30px;
        .time {
          font-size: 24px;
          color: #000;
        }
        .dress {
          font-size: 12px;
          color: #999;
        }
      }
      .tipThree {
        font-size: 14px;
        color: #999;
        padding-top: 5px;
        span {
          padding: 10px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #ccc;
        }
      }
      .tipFive {
        font-size: 14px;
        i {
          font-size: 24px;
          color: orange;
          margin: 0 6px 0 2px;
        }
      }
    }
    .recommend {
      // align-items: center;
      padding: 0 20px;
      background-color: #f6f6f6;
      .recom-left {
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
      }
      .recom-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border-bottom: none;
        }
        .model {
          color: #008000;
        }
        .price {
          font-size: 20px;
          color: #ffa500;
        }
        .selectBtn {
          text-align: center;
          padding: 7px 15px;
          margin-bottom: 5px;
          background-color: #ffa500;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
        }
        .number {
          font-size: 14px;
          color: #333;
          text-align: center;
        }
      }
    }
  }
}
</style>