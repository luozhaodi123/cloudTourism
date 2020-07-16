<template>
  <div class="container">
    <div class="main">
      <!-- 头部部分 -->
      <div class="main-left">
        <!-- 筛选 -->
        <div class="filters">
          <!-- 单程 -->
          <div class="oneWay">
            <div class="wayLeft">
              <span class="label">单程:</span>
              <span class="load">上海</span>
              <span>-</span>
              <span class="load">广州</span>
              <span>/</span>
              <span class="load date">2020-07-25</span>
            </div>
            <div class="wayRight">
              <el-select v-model="placeValue" placeholder="起飞机场">
                <el-option
                  v-for="item in placeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="dateValue" placeholder="起飞时间">
                <el-option
                  v-for="item in dateOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="companyValue" placeholder="航空公司">
                <el-option
                  v-for="item in companyOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="moduleValue" placeholder="机型">
                <el-option
                  v-for="item in moduleOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 筛选 -->
          <div class="select">
            <span class="label">筛选:</span>
            <button class="btnCancel">撤销</button>
          </div>
        </div>
        <!-- 机票组件 -->
        <div class="ticketList">
          <!-- 标题 -->
          <el-row type="flex" class="stateMent">
            <el-col :span="8">
              <span>航空信息</span>
            </el-col>
            <el-col :span="8">
              <span>起飞时间</span>
            </el-col>
            <el-col :span="8">
              <span>到达时间</span>
            </el-col>
            <el-col :span="8">
              <span>价格</span>
            </el-col>
          </el-row>
          <!-- 列表 -->
          <AirTicket :lists="item" :index="index" v-for="(item,index) in flightList" :key="index" />
        </div>
        <!-- 分页组件 -->
        <!-- <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>-->
      </div>
      <!-- 组件 -->
      <div class="main-right">
        <!-- 客服 -->
        <div class="statement">
          <div class="state">
            <div class="icon">
              <div class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></div>
              <div>航协认证</div>
            </div>
            <div class="icon">
              <div class="iconfont iconbaozheng" style="color:green;"></div>
              <div>出行保证</div>
            </div>
            <div class="icon">
              <div class="iconfont icondianhua" style="color:#409EFF;"></div>
              <div>7x24</div>
            </div>
          </div>
          <div class="stateNumber">免费客服电话: 4006345678转2</div>
        </div>
        <!-- 搜索记录组件 -->
        <SearchRecord />
      </div>
    </div>
  </div>
</template>

<script>
import AirTicket from "@/components/air/airTicket";
import SearchRecord from "@/components/air/searchRecord";
export default {
  components: {
    AirTicket,
    SearchRecord
  },
  data() {
    return {
      placeOpt: [
        {
          value: "选项1",
          label: "浦东机场"
        },
        {
          value: "选项2",
          label: "虹桥机场"
        }
      ],
      dateOpt: [
        {
          value: "选项1",
          label: "0:00 - 06:00"
        },
        {
          value: "选项2",
          label: "06:00 - 12:00"
        },
        {
          value: "选项3",
          label: "12:00 - 13:00"
        },
        {
          value: "选项4",
          label: "13:00 - 19:00"
        },
        {
          value: "选项5",
          label: "19:00 - 24:00"
        }
      ],
      companyOpt: [
        {
          value: "选项1",
          label: "南航"
        },
        {
          value: "选项2",
          label: "上航"
        },
        {
          value: "选项3",
          label: "海航"
        },
        {
          value: "选项4",
          label: "东航"
        },
        {
          value: "选项5",
          label: "国航"
        },
        {
          value: "选项6",
          label: "吉祥"
        }
      ],
      moduleOpt: [
        {
          value: "选项1",
          label: "大"
        },
        {
          value: "选项2",
          label: "中"
        },
        {
          value: "选项3",
          label: "小"
        }
      ],
      placeValue: "",
      dateValue: "",
      companyValue: "",
      moduleValue: "",
      // 搜索回来的飞机票
      flightList: [],
      // 总的条数
      total: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res.data);
      this.flightList = res.data.flights;
      this.total = res.data.total;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  .main {
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .main-left {
      position: relative;
      width: 745px;
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
      .ticketList {
        .stateMent {
          height: 32px;
          line-height: 32px;
          text-align: center;
          padding: 0 15px;
          border: 1px solid #ccc;
          background-color: #f6f6f6;
          color: #666;
          font-size: 12px;
        }
      }
    }
    .main-right {
      width: 240px;
      .statement {
        width: 240px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        .state {
          display: flex;
          padding: 10px 0;
          .icon {
            flex: 1;
            text-align: center;
            font-size: 12px;
            .iconfont {
              font-size: 40px;
              margin-bottom: 4px;
            }
          }
        }
        .stateNumber {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          padding: 0 10px;
          background-color: #f6f6f6;
          color: #333;
        }
      }
    }
  }
}
</style>