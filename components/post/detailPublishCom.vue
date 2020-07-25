<template>
  <div class="publish">
    <!-- comment评论头部 -->
    <el-row type="flex" justify="center" align="middle" class="header">
      <div class="com-logo com">
        <div class="iconfont iconpinglun"></div>
        <div class="cont">评论({{total}})</div>
      </div>
      <div class="com-share com" @click="tipShare">
        <div class="iconfont iconfenxiang"></div>
        <div class="cont">分享</div>
      </div>
    </el-row>
    <h2 class="title">评论</h2>
    <el-tag closable :disable-transitions="false" @close="handleClose">{{`回复@管理员`}}</el-tag>
    <!-- 发布的内容 -->
    <el-input type="textarea" :rows="2" placeholder="说点什么吧..." v-model="form.content"></el-input>
    <div class="uploadBox">
      <!-- 上传的图片 -->
      <!-- 
        action: 指的是上传的地址，必传参数
        headers: 设置上传的请求头部
        on-success: 文件上传成功时的回调函数
        on-remove: 文件删除时的回调函数
        file-list 绑定图片数据form.cover在文件列表上显示
        name: 上传的文件字段名
      -->
      <div class="upload">
        <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
        <el-upload
          :action="$axios.defaults.baseURL+'/upload'"
          name="files"
          :on-success="coverUploaded"
          :on-remove="coverRemoved"
          :file-list="form.pics"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div class="btnWrapper">
        <el-button type="primary" size="small" @click="submitComment">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 评论内容
        content: "",
        //回复id
        follow: "",
        //图片数据
        pics: [],
        //文章id
        post: "",
      },
      total: 0,
      isflag: false,
    };
  },
  watch: {
    // 使用监听器监听是否提交了评论，重新渲染评论条数
    isflag: {
      handler() {
        this.getComTotal();
        this.isflag = true;
      },
    },
  },
  created() {
    this.getComTotal();
  },
  methods: {
    handleClose() {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 获取评论总条数
    getComTotal() {
      this.$axios({
        url: "/posts/comments",
      }).then((res) => {
        // console.log(res.data);
        this.total = res.data.total;
      });
    },
    // 提示暂不支持分享功能
    tipShare() {
      console.log(123);
      this.$message.error("暂不支持分享功能");
    },
    // 上传图片
    coverUploaded(res, file) {
      file.id = res[0].id;
      file.url = this.$axios.defaults.baseURL + res[0].url;
      this.form.pics.push(file);
    },
    // 删除图片
    coverRemoved(file, fileList) {
      // fileList是删除后的数据
      console.log(fileList);
      this.form.pics = fileList;
    },
    // 提交评论
    submitComment() {
      // 发送评论前校验数据
      for (var key in this.form) {
        if (!this.form[key] && key == "content") {
          this.$message.error("评论内容不能为空，请输入");
          return;
        }
      }
      const newForm = {
        ...this.form,
        post: this.$route.query.id,
      };
      // 发送请求
      this.$axios({
        url: "/comments",
        method: "post",
        data: newForm,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.message == "提交成功") {
          this.isflag = true;
          this.$message.success("评论发表成功");
          this.form = {
            content: "",
            follow: "",
            pics: [],
            post: "",
          };
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.publish {
  .title {
    font-size: 18px;
    font-weight: normal;
    color: #000;
    margin-bottom: 20px;
  }
  .header {
    padding: 30px 0;
    .com {
      margin: 0 30px;
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 28px;
        color: orange;
        margin-bottom: 5px;
      }
      .cont {
        font-size: 14px;
        color: #666;
      }
    }
  }
  /deep/.el-textarea__inner {
    margin-top: 10px;
    resize: none;
  }
  .uploadBox {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    .upload {
      width: 640px;
    }
  }
}
</style>