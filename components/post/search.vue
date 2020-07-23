 <template>
  <div class="search">
    <!-- 搜索框 -->
    <el-row type="flex" class="search-input">
      <input type="text" v-model="searchValue" placeholder="请输入想去的地方，比如: '广州' " />
      <i class="el-icon-search"></i>
    </el-row>
    <!-- 推荐城市 -->
    <el-row type="flex" class="recom-city">
      推荐:
      <span class="recom">广州</span>
      <span class="recom">上海</span>
      <span class="recom">北京</span>
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
      <!-- 单图片 -->
      <el-row class="oneArticle" type="flex">
        <img
          src="https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90"
          alt
        />
        <div>
          <h2 class="title">
            <a href="#">远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</a>
          </h2>
          <div
            class="content"
          >想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲 却能感受到十足的欧陆风情——欧式建筑和街道，金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，有直飞航班，低廉的物价，且尚未有太多的游客涉足还保留着原汁原味的传统风情！</div>
          <div class="footer">
            <div class="user">
              <i class="el-icon-location-outline"></i>
              青岛市
              by
              <img src="#" alt />地球发动机
              <i class="el-icon-view"></i> 2098
            </div>
            <div class="good">20 赞</div>
          </div>
        </div>
      </el-row>
      <!-- 多图片 -->
      <el-row class="MoreArticle">
        <h2 class="title">
          <a href="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a>
        </h2>
        <div
          class="content"
        >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。1.怎样订机票+酒店性价比最高？机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。怎样在机票酒店上获得最高性价比的体验？ 直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。</div>
        <el-row type="flex" justify="space-between" class="imgBox">
          <el-col :span="7">
            <img
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              alt
            />
          </el-col>
          <el-col :span="7">
            <img src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png" alt />
          </el-col>
          <el-col :span="7">
            <img
              src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              alt
            />
          </el-col>
        </el-row>
        <div class="footer">
          <div class="user">
            <i class="el-icon-location-outline"></i>
            青岛市
            by
            <img src="#" alt />地球发动机
            <i class="el-icon-view"></i> 2098
          </div>
          <div class="good">20 赞</div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
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
          }
        }
        .good {
          font-size: 16px;
          color: orange;
        }
      }
    }
  }
}
</style>