<template>
  <div id="profile">
    <nav-bar class="home-nav"><div slot="center">个人中心</div></nav-bar>
    <div class="wrapper">
      <userInfo></userInfo>
      <van-grid :column-num="3">
        <van-grid-item>
          <div>
            <span class="grid-count">{{ balance.count }}</span
            >元
          </div>
          <div class="grid-title">{{ balance.title }}</div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <span class="grid-count">{{ discounts.count }}</span
            >个
          </div>
          <div class="grid-title">{{ discounts.title }}</div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <span class="grid-count">{{ score.count }}</span
            >分
          </div>
          <div class="grid-title">{{ score.title }}</div>
        </van-grid-item>
      </van-grid>
      <list-view :list-data="orderList" class="order-list"></list-view>
      <list-view :list-data="serviceList" class="service-list"></list-view>
      <div class="login-out">
        <van-button @click="logOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";

import UserInfo from "./child/UserInfo";
import ListView from "./child/ListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView,
  },
  data() {
    return {
      balance: { count: "0.00", title: "我的余额" },

      discounts: { count: "0", title: "我的优惠" },

      score: { count: "0", title: "我的积分" },
      orderList: [
        { icon: require("@/assets/img/profile/message.svg"), iconColor: "#ff8198", info: "我的消息", path: '' },
        { icon: require("@/assets/img/profile/pointer.svg"), iconColor: "#fc7b53", info: "积分商城", path: '' },
        { icon: require("@/assets/img/profile/vip.svg"), iconColor: "#ffc636", info: "会员卡", path: '' },
      ],
      serviceList: [
        { icon: require("@/assets/img/profile/cart.svg"), iconColor: "#ff8198", info: "我的购物车", path: '/cart'},
        { icon: require("@/assets/img/profile/shopping.svg"), iconColor: "#ff8198", info: "下载购物APP", path: '' },
      ],
    };
  },
  methods: {
    logOut() {
      this.$store.commit('CHANGE_TOKEN',0)
      console.log(this.$store.state.token)
      this.$router.replace('/login')
    }
  }
};
</script>
<style lang="scss" scoped>
#profile {
  position: relative;
  height: 100vh;
  .home-nav {
    background: var(--color-tint);
    color: #fff;
  }
  .wrapper {
    position: absolute;
    overflow: hidden;
    top: 44px;
    // bottom: 50px;
    left: 0;
    right: 0;
    background-color: #f2f2f2;
    .grid-count {
      font-size: 28px;
      // font-weight: 700;
      color: var(--color-tint);
    }
    .grid-title {
      padding-top: 6px;
      font-size: 14px;
    }
    .order-list,
    .service-list {
      margin-top: 12px;
    }
    .login-out {
      display: flex;
      justify-content: center;
      padding: 5px;
    }
  }
}
</style>
