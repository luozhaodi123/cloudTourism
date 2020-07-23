 <template>
  <div class="search">
    <!-- 搜索框 -->
    <el-row type="flex" class="search-input">
      <input type="text" v-model="searchValue" placeholder="请输入想去的地方，比如: '广州' " />
      <i class="el-icon-search" @click="searchArticle"></i>
    </el-row>
    <!-- 推荐城市 -->
    <el-row type="flex" class="recom-city">
      推荐:
      <span class="recom" @click="searchRecom('广州')">广州</span>
      <span class="recom" @click="searchRecom('上海')">上海</span>
      <span class="recom" @click="searchRecom('北京')">北京</span>
    </el-row>
    <!-- 写游记标题 -->
    <el-row type="flex" justify="space-between" align="middle" class="strategy">
      <h2>推荐攻略</h2>
      <el-button type="primary">
        <i class="el-icon-edit"></i>
        写游记
      </el-button>
    </el-row>
    <!-- 游记文章 -->
    <div class="travelArticle">
      <div v-if="articles.length>0">
        <div class="article" v-for="item in articles" :key="item.id">
          <!-- 单图片 -->
          <el-row v-if="item.images.length<3" class="oneArticle" type="flex">
            <div class="imgBox">
              <img :src="item.images[0]" alt />
            </div>
            <div>
              <h2 class="title">
                <a href="#">{{item.title}}</a>
              </h2>
              <div class="content">{{item.summary}}</div>
              <div class="footer">
                <div class="user">
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                  by
                  <img
                    :src="$axios.defaults.baseURL+item.account.defaultAvatar"
                    alt
                  />
                  {{item.account.nickname}}
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </div>
                <div class="good">{{item.like>0?item.like:0}} 赞</div>
              </div>
            </div>
          </el-row>
          <!-- 多图片 -->
          <el-row v-if="item.images.length>=3" class="MoreArticle">
            <h2 class="title">
              <a href="#">{{item.title}}</a>
            </h2>
            <div class="content">{{item.summary}}</div>
            <el-row type="flex" justify="space-between" class="imgBox">
              <el-col :span="7">
                <img :src="item.images[0]" alt />
              </el-col>
              <el-col :span="7">
                <img :src="item.images[1]" alt />
              </el-col>
              <el-col :span="7">
                <img :src="item.images[2]" alt />
              </el-col>
            </el-row>
            <div class="footer">
              <div class="user">
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}
                by
                <img
                  :src="$axios.defaults.baseURL+item.account.defaultAvatar"
                  alt
                />
                {{item.account.nickname}}
                <i class="el-icon-view"></i>
                {{item.watch}}
              </div>
              <div class="good">{{item.like>0?item.like:0}} 赞</div>
            </div>
          </el-row>
        </div>
      </div>
      <div v-else class="tips">暂时还没有该城市的游玩攻略哦</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      articles: []
    };
  },
  created() {
    this.$axios({
      url: "/posts",
      query: {
        star: 0,
        limit: 3
      }
    }).then(res => {
      // console.log(res.data);
      this.articles = res.data.data;
    });
  },
  watch: {
    "this.articles": {
      handler() {
        console.log("获取回来的文章数据发生变化了");
      },
      immediate: true
    }
  },
  methods: {
    searchArticle() {
      if(!this.searchValue) {
        this.$message("搜索游玩攻略关键词不能为空，请输入");
        return
      }
      this.$axios({
        url: "/posts",
        params: {
          city: this.searchValue
        }
      }).then(res => {
        console.log(res.data);
        this.articles = res.data.data;
      });
    },
    searchRecom(value) {
      this.searchValue = value;
      this.searchArticle();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .search-input {
    border: 4px solid orange;
    input {
      width: 660px;
      height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
      border: 0;
      outline: none;
    }
    .el-icon-search {
      line-height: 40px;
      font-size: 24px;
      font-weight: 700;
      color: orange;
    }
  }
  .recom-city {
    padding: 10px 0;
    font-size: 12px;
    .recom {
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: orange;
        text-decoration: underline;
      }
    }
  }
  .strategy {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    h2 {
      position: relative;
      font-weight: normal;
      font-size: 18px;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -18px;
        width: 100%;
        height: 2px;
        background-color: orange;
      }
    }
  }
  .travelArticle {
    .oneArticle {
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      img {
        width: 220px;
        height: 150px;
        margin-right: 10px;
        cursor: pointer;
      }
      .title a {
        display: block;
        font-size: 18px;
        font-weight: normal;
        &:hover {
          color: orange;
        }
      }
      .content {
        display: -webkit-box;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 10px 0;
        font-size: 14px;
        color: #666;
        cursor: pointer;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        .user {
          font-size: 12px;
          img {
            width: 16px;
            height: 16px;
            margin: 5px;
            vertical-align: middle;
          }
        }
        .good {
          font-size: 16px;
          color: orange;
        }
      }
    }
    .MoreArticle {
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .title a {
        display: block;
        font-size: 18px;
        font-weight: normal;
        &:hover {
          color: orange;
        }
      }
      .content {
        display: -webkit-box;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 10px 0;
        font-size: 14px;
        color: #666;
        cursor: pointer;
      }
      .imgBox {
        margin: 15px 0;
        img {
          width: 220px;
          height: 150px;
          object-fit: cover;
          cursor: pointer;
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        .user {
          font-size: 12px;
          img {
            width: 16px;
            height: 16px;
            margin: 5px;
            vertical-align: middle;
          }
        }
        .good {
          font-size: 16px;
          color: orange;
        }
      }
    }
    .tips {
      padding: 10px 0;
    }
  }
}
</style>