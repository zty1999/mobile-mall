# mobile-mall
better-scroll会造成绝对定位失效

点击推荐商品进入详情页，路由改变，页面不刷新
## 方法 1：
### 商品组件内
监听路由变化，路由跳转到空页面刷新
  watch: {
    $route(to, from) {
      if (this.$route.params) {
        this.$router.go(0)
      }
    },
  },
  ## 方法 2： 点击按钮时所有页面重新渲染
  ### Main.vue: 
  
  <router-view v-if="isRouterAlive"></router-view>
  <script>
export default {
  provide() { // 注册一个方法
  return {
   reload: this.reload
  }
 },
  data() {
    return {
      isRouterAlive: true,
    };
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

### 商品组件
<script>
export default {
  inject: ['reload'], // 引入方法
  methods: {
    goToDetail() {
        this.$router.push(`/detail/${this.good.iid}`);
        this.reload() // 调用方法

    },
  },
};
</script>
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
