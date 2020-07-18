<template>
  <div class="container">
    <div class="main">
      <!-- 头部部分 -->
      <div class="main-left">
        <!-- 筛选组件 -->
        <Filters :options="options" :flights="cacheFlightsList" @clicked="setFlightsList" />
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
          <!-- <AirTicket :lists="item" :index="index" v-for="(item,index) in flightList.flights" :key="index" /> -->
          <div v-if="flightList.flights">
            <AirTicket :lists="item" v-for="item in dataList" :key="item.id" />
          </div>
          <div
            class="tips"
            v-if="flightList.flights && flightList.flights.length == 0"
          >暂时无符合的机票信息，请重新搜索</div>
        </div>
        <!-- 分页组件 -->
        <div class="pagination">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
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
import Filters from "@/components/air/filters";
export default {
  components: {
    AirTicket,
    SearchRecord,
    Filters
  },
  data() {
    return {
      // 搜索回来的飞机票
      flightList: {},
      // 总的条数
      total: 0,
      // 存储页码发生改变时的变量
      // dataList: [],
      pageIndex: 1,
      pageSize: 10,
      // 筛选
      options: {},
      // 缓存原始数据
      cacheFlightsList: [],
      // 历史记录
      history: []
    };
  },
  computed: {
    // 使用计算属性监听dataList的变化
    dataList() {
      if (!this.flightList.flights) {
        return [];
      }
      const first = (this.pageIndex - 1) * this.pageSize;
      const last = first + this.pageSize;
      return this.flightList.flights.slice(first, last);
    }
  },
  watch: {
    // 监听路由的变化，同时发送请求获取机票数据
    $route() {
      console.log("路由发生变化");
      this.loadFlightList();
    }
  },
  mounted() {
    // 获取搜索的机票列表
    this.loadFlightList();
  },
  methods: {
    // 封装加载获取机票列表的请求函数
    loadFlightList() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
        this.total = res.data.total;
        this.flightList = res.data;
        this.options = res.data.options;
        this.cacheFlightsList = res.data.flights;
      });
    },
    // 当前页码发生改变时，同时改变机票列表的数量
    currentChange(index) {
      // console.log(index);
      // 初始值 = pageIndex - 1 * pageSize
      // 结束值 = 初始值 + pageSize(不包含)
      this.pageIndex = index;
    },
    // 当前页显示机票的size发生改变时，同时改变机票列表的数量
    sizeChange(size) {
      // console.log(size);
      this.pageSize = size;
    },
    // 筛选事件
    setFlightsList(newList) {
      // console.log("父组件筛选事件触发");
      console.log(newList);
      this.flightList.flights = newList;
      // 联动翻页数据实时更新
      this.total = this.flightList.flights.length;
    }
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
        .tips {
          margin: 10px 0;
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