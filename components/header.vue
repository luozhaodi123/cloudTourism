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
        <nuxt-link to="/user/login">登录或注册</nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {};
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
      a {
        font-size: 14px;
        color: #666;
        &:hover {
          color: #409eff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>