<template>
  <div id="comments-container">
    <nav-bar>
      <div slot="left">
        <img
          class="back-icon"
          src="~/assets/img/common/back.svg"
          alt=""
          @click="back"
        />
      </div>
      <div slot="center" class="title">用户评价</div>

    </nav-bar>
    <div class="comments-header">
      <!-- {{commentsiid.id}} -->
    </div>
    <div v-if="commentsInfo.length !== 0">
      <div ref="comments" class="comments-info" v-for="(i,index) in commentsInfo" :key="index">
        <div class="info-user">
          <img :src="i.user.avatar" alt="" />
          <span>{{ i.user.uname }}</span>
        </div>
        <div class="info-detail">
          <p>{{ i.content }}</p>
          <div class="info-other">
            <span class="date">{{ i.created | dataFormat }}</span>
            <span>{{ i.style }}</span>
          </div>
          <div class="info-imgs">
            <img v-show="comments.images"
              :src="item"
              v-for="(item, index) in commentsInfo.images"
              :key="index"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      commentsInfo: [],
      id: this.$route.params.iid
    }
  },
  created() {
    this.getCommentsData()
  },
  methods: {
    //请求商品详情数据
    async getCommentsData() {
     
      console.log(this.id);

      const { data: res } = await this.$axios.get("detail", {
        params: { iid: this.id },
      });
      console.log(res);

      //总数据
      this.totalData = res.result;
      this.commentsInfo = this.totalData.rate.list;
      console.log(this.commentsInfo);
    },
    back() {
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="scss" scoped>
.back-icon {
    margin-top: 11px;
  }

  .comments-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
    .info-header {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .header-title {
        float: left;
        font-size: 15px;
      }
      .header-more {
        float: right;
        margin-right: 10px;
        font-size: 13px;
      }
    }
    .info-user {
      padding: 10px 0 5px;
      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
      span {
        position: relative;
        font-size: 15px;
        top: -15px;
        margin-left: 10px;
      }
    }

    .info-detail {
      padding: 0 5px 15px;
      p {
        font-size: 14px;
        color: #777;
        line-height: 1.5;
      }
      .info-other {
        font-size: 12px;
        color: #999;
        margin-top: 10px;
      }
      .date {
        margin-right: 8px;
      }
    }
  }

  .info-imgs {
    margin-top: 10px;
    img {
      width: 70px;
      height: 70px;
      margin-right: 5px;
    }
  }
  </style>
