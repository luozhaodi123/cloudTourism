<template>
  <div class="container">
    <div class="main">
      <div class="create-article">
        <h2 class="title">发表新攻略</h2>
        <p class="meta">分享你的个人游记，让更多人看到哦！</p>
        <el-form>
          <!-- 标题 -->
          <el-form-item>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <!-- 内容 -->
          <el-form-item>
            <client-only>
              <!-- :editorToolBar="customToolbar" 使用自定义的方式设置富文本的样式 -->
              <VueEditor v-model="form.content" :editorToolbar="customToolbar" />
            </client-only>
          </el-form-item>
          <!-- 选择城市 -->
          <el-form-item label="选择城市">
            <!-- fetch-suggestions 返回输入建议的方法 -->
            <!-- select 点击选中建议项时触发 -->
            <!-- :trigger-on-focus="false" 输入后在激活输入建议 -->
            <!-- :highlight-first-item ="true" 自动高亮第一个选项 -->
            <el-autocomplete
              v-model="form.city"
              :trigger-on-focus="false"
              :highlight-first-item="true"
              :fetch-suggestions="querySearch"
              placeholder="请搜索游玩城市"
              @select="handleSelect"
              class="el-autocomplete"
            ></el-autocomplete>
          </el-form-item>
          <!-- 发布或者保存到草稿箱 -->
          <el-form-item>
            <el-button type="primary" size="small" @click="sendArticle">发布</el-button>
            <span class="submit-side">
              或者
              <span class="draft" @click="sendDraft">保存到草稿</span>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-aside">
        <div class="aside">
          <div class="aside-title">草稿箱 ({{drafts.length}})</div>
          <div class="itemBox" v-if="drafts.length>0">
            <div class="item" v-for="(item,index) in drafts" :key="index">
              <p class="title">{{item.title}}</p>
              <div class="botBox">
                <span class="time">{{item.time}}</span>
                <span class="button">
                  <i class="iconfont el-icon-edit" @click="editorDrafts(index)"></i>
                  <i class="iconfont el-icon-delete" @click="deleteDrafts(index)"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        city: "",
        time: "",
      },
      drafts: [],
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        ["image", "code-block"],
        ["clean"],
      ],
    };
  },
  watch: {
    "$store.state.drafts.drafts": {
      handler() {
        if (this.$store.state.drafts.drafts) {
          this.drafts = this.$store.state.drafts.drafts;
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 拉取建议列表前，发送请求获取建议的数据
    querySearch(value, showList) {
      if (value) {
        this.$axios({
          url: "/airs/city",
          params: {
            name: this.form.city,
          },
        }).then((res) => {
          console.log(res.data);
          if (res.data.data.length > 0) {
            const suggestions = res.data.data.map((item) => {
              return {
                id: item.id,
                value: item.name,
              };
            });
            showList(suggestions);
          } else {
            showList([{ value: "没有找到该城市" }]);
          }
        });
      }
    },
    // 点击选中建议项时触发，把选中的city值存在this.form.city中
    handleSelect(item) {
      console.log(item);
      this.form.city = item.value;
    },
    // 发表攻略文章
    sendArticle() {
      // 判断是否为空
      let isSend = true;
      for (var key in this.form) {
        if (!this.form[key] && key == "title") {
          this.$message.error("标题为空，请输入");
          isSend = false;
          return;
        } else if (!this.form[key] && key == "content") {
          this.$message.error("内容为空，请输入");
          isSend = false;
          return;
        } else if (!this.form[key] && key == "city") {
          this.$message.error("城市为空，请输入");
          isSend = false;
          return;
        }
      }
      console.log(isSend);
      // 发送请求发表攻略文章
      const { title, content, city } = this.form;
      if (isSend) {
        this.$axios({
          url: "/posts",
          method: "post",
          headers: {
            Authorization: "Bearer " + this.$store.state.user.userInfo.token,
          },
          data: { title, content, city },
        }).then((res) => {
          console.log(res.data);
          if (res.data.message == "新增成功") {
            this.$message.success("游玩攻略文章发布成功");
            this.form = {
              title: "",
              content: "",
              city: "",
            };
          }
        });
      }
    },
    // 保存到草稿
    sendDraft() {
      // 保存到草稿中先判断起码有没有标题
      if (!this.form.title) {
        this.$message.error("标题不能为空，请输入");
        return;
      }
      // 将数据存储到drafts和vuex中
      const newScordList = this.$store.state.drafts.drafts;
      // console.log(newScordList);
      // 对数据进行处理
      const date = new Date();
      // date.getHours()
      const scord = {
        ...this.form,
        time:
          date.getFullYear() +
          "-" +
          `${
            date.getMonth() + 1 >= 10
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1)
          }` +
          "-" +
          `${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}` +
          " " +
          `${date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()}` +
          ":" +
          `${
            date.getMinutes() >= 10
              ? date.getMinutes()
              : "0" + date.getMinutes()
          }` +
          ":" +
          `${
            date.getSeconds() >= 10
              ? date.getSeconds()
              : "0" + date.getSeconds()
          }`,
      };
      console.log(scord);
      if (newScordList.length > 0) {
        let isFlag = true;
        newScordList.forEach((item, index) => {
          // 若vuex中数据tagId与回显数据id相同，说明正在编辑未发布的数据
          if (item.time == this.form.time) {
            isFlag = false;
            this.$message("已保存到草稿中");
            this.$store.commit("drafts/removeDrafts", index);
            this.$store.commit("drafts/setDrafts", scord);
            this.form = {
              title: "",
              content: "",
              city: "",
              time: "",
            };
          }
        });
        if (isFlag) {
          this.$message("已保存到草稿中");
          this.$store.commit("drafts/setDrafts", scord);
          this.form = {
            title: "",
            content: "",
            city: "",
            time: "",
          };
        }
      } else {
        this.$message("已保存到草稿中");
        this.$store.commit("drafts/setDrafts", scord);
        this.form = {
          title: "",
          content: "",
          city: "",
          time: "",
        };
      }
    },
    // 删除草稿中数据
    deleteDrafts(index) {
      this.$confirm("该操作将永久删除该记录，是否继续？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit("drafts/removeDrafts", index);
        this.$message.success("删除成功");
      });
    },
    // 编辑草稿中数据
    editorDrafts(index) {
      const { title, content, city, time } = this.drafts[index];
      this.form = { title, content, city, time };
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .main {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: 20px auto;
    .create-article {
      width: 750px;
      .title {
        font-size: 22px;
        font-weight: normal;
        color: #000;
        margin-bottom: 10px;
      }
      .meta {
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
      }
      .submit-side {
        font-size: 14px;
        margin-left: 10px;
        .draft {
          color: orange;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .create-aside {
      .aside {
        width: 200px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        .aside-title {
          font-size: 16px;
          color: #666;
          margin-bottom: 10px;
        }
        .item {
          font-size: 14px;
          margin: 4px 0;
          .title {
            color: #000;
          }
          .botBox {
            display: flex;
            justify-content: space-between;
            .time {
              color: #999;
            }
            i {
              color: #000;
              margin: 0 1px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>