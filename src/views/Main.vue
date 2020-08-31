<template>
  <div class="main">
    <keep-alive exclude="Detail">
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    <van-tabbar
      v-model="active"
      route
      active-color="var(--color-tint)"
      inactive-color="#000"
    >
      <van-tabbar-item
        replace
        :to="item.path"
        v-for="(item, index) in tabs"
        :key="index" :badge="index === 2 ? cartCount:''"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  provide() {
    // 注册一个方法
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      active: 0,
      isRouterAlive: true,
      tabs: [
        {
          path: "/home",
          title: "首页",
          icon: {
            inactive: require("@/assets/img/tabbar/home.svg"),
            active: require("@/assets/img/tabbar/home_active.svg"),
          },
        },
        {
          path: "/cate",
          title: "分类",
          icon: {
            inactive: require("@/assets/img/tabbar/category.svg"),
            active: require("@/assets/img/tabbar/category_active.svg"),
          },
        },
        {
          path: "/cart",
          title: "购物车",
          icon: {
            inactive: require("@/assets/img/tabbar/shopcart.svg"),
            active: require("@/assets/img/tabbar/shopcart_active.svg"),
          },
        },
        {
          path: "/profile",
          title: "我的",
          icon: {
            inactive: require("@/assets/img/tabbar/profile.svg"),
            active: require("@/assets/img/tabbar/profile_active.svg"),
          },
        },
      ],
      flag: false,
    };
  },
  created() {
    
  },
  computed: {
    //购物车徽标
    cartCount() {
      return this.$store.getters.cartCount;
    },

  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
        console.log("reload");
      });
    },
  },
};
</script>

<style>
.van-info {
  background-color: var(--color-tint);
}
</style>
