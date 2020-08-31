import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

// 解决tabbar中的vue-router重复点击报错问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {requireAuth: true}
  },
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/Home.vue"),
      },
      {
        path: "/detail/:iid",
        name: "Detail",
        component: () => import("@/views/detail/Detail.vue"),
      },
      {
        path: "/cate",
        name: "Cate",
        component: () => import("@/views/cate/Cate.vue"),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("@/views/cart/Cart.vue"),
        meta: {requireAuth: false}
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/profile/Profile.vue"),
        meta: {requireAuth: false}
      },
      {
        path: "/order",
        name: "Order",
        component: () => import("@/views/order/Order.vue"),
        meta: {requireAuth: false}
      },
      {
        path: "/addressList",
      name: "AddressList",
      component: () => import("@/views/order/child/AddressList.vue"),
      meta: {requireAuth: false}
      },
      {
        path: "/addressEdit",
      name: "AddressEdit",
      component: () => import("@/views/order/child/AddressEdit.vue"),
      meta: {requireAuth: false}
      }
    ],
  },
  {
    path: "/comments/:iid",
    name: "Comments",
    component: () => import("@/views/detail/child/Comments.vue"),
  },
];

const router = new VueRouter({
  routes,
});

//全局前置守卫
router.beforeEach((to,from,next) => {
  //token为0表示未登陆  为1表示已登录
  let res = JSON.parse(localStorage.getItem('token'));
  if(to.meta.requireAuth === false && res === 0) {
    window.console.log('need login');
    return next('/login')
  }
  next()
});

export default router;
