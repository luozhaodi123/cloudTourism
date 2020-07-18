<template>
  <div class="order">
    <div class="main">
      <!-- 订单表单 -->
      <div class="orderForm">
        <!-- 乘机人组件 -->
        <div class="passengers">
          <h2 class="order-title">乘机人</h2>
          <el-form v-for="(item,index) in users" :key="index">
            <el-form-item label="乘机人">
              <el-row>
                <el-input placeholder="姓名"></el-input>
              </el-row>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-row>
                <div class="delPerson">-</div>
              </el-row>
              <el-row type="flex">
                <el-select v-model="value" placeholder="请选择" class="select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input placeholder="证件号码"></el-input>
              </el-row>
            </el-form-item>
          </el-form>
          <el-row>
            <el-button type="primary" class="addPerson">添加乘机人</el-button>
          </el-row>
        </div>
        <!-- 保险组件 -->
        <div class="insurance">
          <h2 class="order-title">保险</h2>
          <el-checkbox-group v-model="insurance">
            <el-checkbox class="insurItem" label="航空意外险：￥30/份×1  最高赔付260万" border></el-checkbox>
            <el-checkbox class="insurItem" label="航空延误险：￥30/份×1  最高赔付300元" border></el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- 联系人组件 -->
        <div class="contact">
          <h2 class="order-title">联系人</h2>
          <el-form class="contactForm">
            <el-form-item label="姓名" label-width="80px">
              <el-input placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="80px">
              <el-input placeholder="请输入手机号">
                <template slot="append">
                  <el-button>发送验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" label-width="80px">
              <el-input placeholder="请输入验证码"></el-input>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="warning" class="submitFrom">提交订单</el-button>
          </el-row>
        </div>
      </div>
      <!-- 订单机票信息组件 -->
      <div class="flightList">
        <div class="list">
          <div class="head">
            <el-row type="flex" justify="space-between">
              <el-col :span="8">2019-04-15</el-col>
              <el-col :span="6" class="load">广州 - 上海</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="6">
                <div class="time cent">20:30</div>
                <el-row class="cent">白云机场T1</el-row>
              </el-col>
              <el-col :span="6" type="flex">
                <div class="cent">---2时20分---</div>
                <el-row class="cent">东航MU5316</el-row>
              </el-col>
              <el-col :span="6">
                <div class="time cent">22:50</div>
                <el-row class="cent">浦东机场T2</el-row>
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
            <el-col :span="6" class="listCenter">￥1345</el-col>
            <el-col :span="6" class="listRight">x1</el-col>
          </el-row>
          <el-row type="flex" justify="space-between" class="list-item">
            <el-col :span="6">机建+燃油</el-col>
            <el-col :span="8" class="listCenter">￥50/人/单程</el-col>
            <el-col :span="6" class="listRight">x1</el-col>
          </el-row>
          <el-row type="flex" justify="space-between" align="middle" class="list-item">
            <el-col :span="6">应付金额:</el-col>
            <el-col :span="10" class="price listRight">￥1395.00</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          name: "",
          id: ""
        }
      ],
      options: [
        {
          label: "身份证",
          value: "身份证"
        },
        {
          label: "护照",
          value: "护照"
        }
      ],
      insurance: [],
      value: ""
    };
  },
  created() {
    const order = this.$route.query;
    this.$axios({
      url: "/airs/" + order.id
    }).then(res => {
      console.log(res.data);
    });
  }
};
</script>

<style lang="less" scoped>
.order {
  .main {
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .orderForm {
      width: 590px;
      .order-title {
        width: 100%;
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
        color: #000;
      }
      .passengers {
        margin-bottom: 20px;
        border-bottom: 1px dashed #ccc;
        .el-form:nth-of-type(1) .delPerson {
          display: none;
        }
        .el-form-item {
          position: relative;
          margin-bottom: 0;
          &:nth-of-type(2) {
            padding-bottom: 20px;
            border-bottom: 1px dashed #ccc;
          }
          .delPerson {
            position: absolute;
            top: 50%;
            right: -30px;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            background-color: #ddd;
            color: #fff;
            font-size: 14px;
            border-radius: 50%;
            cursor: pointer;
            transform: translate(-50%, -50%);
          }
          .select {
            .el-input__inner {
              border-radius: 0;
              border-right: 0;
              outline: none;
            }
          }
        }
        .addPerson {
          margin: 20px 0;
        }
      }
      .insurance {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dashed #ccc;
        .insurItem {
          margin: 0 0 20px;
        }
      }
      .contact {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dashed #ccc;
        .contactForm {
          width: 350px;
        }
        .submitFrom {
          width: 250px;
          margin: 50px 0;
        }
      }
    }
    .flightList {
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
    }
  }
}
</style>