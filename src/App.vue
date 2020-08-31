<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.storage();
    this.token();
    // console.log(this.$store.state.token)
  },
  methods: {
    //保存购物车数据
    storage() {
      if (localStorage.getItem("cartList")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(localStorage.getItem("cartList"))
          )
        );
      }
      window.addEventListener("pagehide", () => {
        localStorage.setItem("cartList", JSON.stringify(this.$store.state));
      });
    },
    token() {
      // console.log(this.$store.state.token);
       return  this.$store.state.token = JSON.parse(localStorage.getItem('token'));
       
    }
    //  isLogin(state) {
    //   if (state.token === 0) {
    //     state.token = localStorage.getItem("token");
    //   }
    //   return state.token;
    // },
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
