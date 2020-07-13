<template>
  <header class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 导航 -->
      <el-row type="flex" class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录或注册 -->
      <el-row type="flex" class="validation">
        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" />
              {{$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 不存在用户信息就展示登录注册链接 -->
        <nuxt-link to="/user/login" v-else class="current-link">登录/注册</nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$store.commit("user/setUser", {});
      this.$message.success("退出成功");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  box-shadow: 0 3px 0 #f5f5f5;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  .main {
    width: 1000px;
    margin: 0 auto;
    .logo {
      width: 156px;
      height: 60px;
      img {
        width: 156px;
        margin: 9px 0;
        object-fit: cover;
      }
    }
    .nav {
      flex: 1;
      margin: 0 20px;
      a {
        display: block;
        height: 60px;
        padding: 0 20px;
        font-size: 16px;
        box-sizing: border-box;
        &:hover,
        &:active,
        &:focus {
          border-bottom: 4px solid #409eff;
          color: #409eff;
        }
      }
      .nuxt-link-exact-active {
        background-color: #409eff;
        color: white !important;
      }
    }
    .validation {
      .current-link {
        font-size: 14px;
        color: #666;
        &:hover {
          color: #409eff;
          text-decoration: underline;
        }
      }
      .el-dropdown-link {
        margin-left: 20px;

        &:hover {
          img {
            border-color: #409eff;
          }
        }

        a {
          display: block;
        }

        img {
          width: 32px;
          height: 32px;
          vertical-align: middle;
          border: 2px #fff solid;
          border-radius: 50px;
        }
      }
    }
  }
}
</style>