<template>
  <div class="gooods-list-item" @click="goToDetail">
    <img  v-lazy="getImg"  :key="getImg"  @load="imageLoad" />
    <div class="goods-info">
      <!-- width="170" height="200" -->
      <p>{{ good.title }}</p>
      <span class="goods-price">{{ good.price }}</span>
      <span class="goods-collect">{{ good.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'], // 引入方法
  props: {
    good: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // watch: {
  //   // 方法1
  //   $route(to, from) {
  //     //监听路由是否变化
  //     if (this.$route.params) {
  //       // 判断条件1  判断传递值的变化
  //       //获取文章数据
  //       this.$router.go(0)
  //     }
  //   },
  // },
  computed: {
    getImg() {
      return this.good.img || this.good.image || this.good.show.img;
    },
  },
  methods: {
    imageLoad() {
            this.$bus.$emit('itemImageLoad')//事件总线发射事件
        },
    goToDetail() {
        this.$router.push(`/detail/${this.good.iid}`);
        console.log(this.good.iid);
        this.reload() // 调用方法

    },
  },
};
</script>

<style lang="scss">
.gooods-list-item {
  position: relative;
  width: 44%;
  // height: 290px;
  margin-left: 4%;
  padding: 8px 0 30px;
  // padding: 6px 0 40px 11.7px;
  img {
    width: 100%;
    // height: 250px;
    border-radius: 3%;
    /* box-shadow: 0 0 1px 1px; */
  }
  .goods-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .goods-price {
      color: var(--color-high-text);
      margin-right: 20px;
    }
    .goods-collect {
      position: relative;
    }
    .goods-collect::before {
      content: "";
      position: absolute;
      left: -15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
    }
  }
}
</style>
