<template>
  <div v-if="commentsInfo.length !== 0" class="comments-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <!-- @click="getComments" -->
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentsInfo[0].user.avatar" alt="" />
      <span>{{ commentsInfo[0].user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentsInfo[0].content }}</p>
      <div class="info-other">
        <span class="date">{{ commentsInfo[0].created | dataFormat }}</span>
        <span>{{ commentsInfo[0].style }}</span>
      </div>
      <div class="info-imgs">
        <img
          :src="item"
          v-for="(item, index) in commentsInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentsInfo: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  methods: {
    //跳转至评论页面
    getComments() {
      let iid = this.$route.params.iid;
      // this.$router.push(`/detail/${this.$route.params.iid}/comments`)
      this.$router.push("/comments/" + iid);
    },
  },
};
</script>

<style lang="scss">
// 评论
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
      .info-imgs {
    margin-top: 10px;
    img {
      width: 70px;
      height: 70px;
      margin-right: 5px;
    }
  }
  }
}
</style>
