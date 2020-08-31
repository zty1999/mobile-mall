<template>
  <div  ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <!-- 组件用法:  例:上拉加载 注册使用此组件 包裹要滚动的区域 -->
    <!-- <scroll
      class="wrapper"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :data="goodsList"
      :pull-up-load="true"
      :probe-type="3"
    >
    </scroll> 
    组件默认不进行上拉加载所以要设置为true   数据绑定要进行上拉加载的数据  @pullingUp="loadMore"
    loadMore() {
      
    这里写要进行的操作

      this.$refs.scroll.finishPullUp();
    }, -->
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1,//默认不进行实时监听
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: {},
    };
  },
  mounted() {
    setTimeout(this.__initScroll, 20);
  },
  methods: {
    __initScroll() {
      // 1.初始化BScroll对象
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
      });

      // 2.将监听事件回调
      this.scroll.on("scroll", (postion) => {
        //自定义scroll事件,将postion参数:坐标位置传出去
        this.$emit("scroll", postion);
      });

      // 3.监听上拉到底部
      this.scroll.on("pullingUp", () => {
        console.log("上拉加载");
        this.$emit("pullingUp");
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    },
  },
};
</script>

<style scoped>
</style>
