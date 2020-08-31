<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 滚动区域 -->
    <scroll
      class="wrapper"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :data="goodsList"
      :pull-up-load="true"
      :probe-type="3"
    >
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <a :href="item.link">
            <img :src="item.image" @load="swiperLoad" />
            <!-- 轮播图加载完后触发swiperLoad方法 -->
          </a>
        </van-swipe-item>
      </van-swipe>
      <!-- 推荐展示1 -->
      <van-grid :border="false" :column-num="4">
        <van-grid-item v-for="(item, index) in recommend" :key="index">
          <a :href="item.link" class="recommend-link">
            <van-image width="60" :src="item.image" />
            <div class="grid-text">{{ item.title }}</div>
          </a>
        </van-grid-item>
      </van-grid>
      <!-- 推荐展示2 -->
      <van-image
        width="100vw"
        class="recommend2"
        fit="contain"
        :src="recommend2"
      />
      <!-- 商品列表分类展示 -->
      <van-tabs
        @click="tabControl"
        v-model="activeName"
        id="tabControl"
        ref="tab-control"
        line-height="0"
        title-active-color="var(--color-high-text)"
        color="var(--color-tint)"
      >
        <van-tab
          v-for="(item, index) in typeList"
          :key="index"
          :title="item.title"
          :name="item.sort"
        >
          <goods-list :goods="goodsList"></goods-list>
        </van-tab>
      </van-tabs>
    </scroll>
    <van-tabs
      @click="tabControl"
      class="tab-control"
      v-model="activeName"
      v-show="isTabFixed"
      line-height="0"
      ref="tab-control"
      title-active-color="var(--color-high-text)"
      color="var(--color-tint)"
    >
      <van-tab
        v-for="(item, index) in typeList"
        :key="index"
        :title="item.title"
        :name="item.sort"
      >
      </van-tab>
    </van-tabs>
    <!-- 回到顶部 -->
    <div class="back-top" @click="backTop" v-show="showBackTop" ref="backTop">
      <img src="~assets/img/common/top.png" alt="" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/common/navbar/NavBar";
import GoodsList from "@/components/common/goodslist/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "Home",
  components: {
    NavBar,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      //轮播图数据
      banner: [],
      // 推荐展示1数据
      recommend: [],
      // 推荐展示2图片
      recommend2: require("@/assets/img/home/recommend_bg.jpg"),
      // tab切换控制 title 数据
      typeList: [],
      // 商品列表展示tab页默认激活  也是获取商品列表数据时的type
      activeName: "pop",
      // 数据默认页码
      page: 1,
      //tab展示的商品列表数据
      goodsList: [],
      //是否显示吸顶tab-control
      isTabFixed: false,
      //tab-control offsetTop
      tabOffsetTop: 0,
      // better-scroll参数
      loading: false,
      finished: false,
      // 回到顶部
      showBackTop: false,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getGoodsList();
  },

  methods: {
    //获取轮播图 推荐 数据
    async getHomeMultidata() {
      const { data: res } = await this.$axios.get("home/multidata");
      // console.log(res.data);
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list;
      // console.log(this.recommend);
    },
    //获取商品列表数据
    async getGoodsList(active) {
      const { data: res } = await this.$axios.get("home/data", {
        params: { type: this.activeName, page: this.page },
      });
      //tab控制项的title数据
      this.typeList = res.data.filter.list;
      let list;
      // 如果通过上拉加载函数触发此方法会传来数据,如果有数据就获取下一页数据进行拼接  没有就直接获取
      if (active) {
        list = res.data.list;
        this.goodsList = this.goodsList.concat(...list);
      } else {
        this.goodsList = res.data.list;
      }
      console.log(res.data);
      console.log(this.goodsList);
      console.log(this.page);
    },
    // tab切换
    tabControl() {
      // page重置为1
      this.page = 1;
      //重新获取当前页商品数据
      this.getGoodsList();
      //当前tab页下回到商品列表开头位置
      if (this.isTabFixed) {
        return this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 300);
      }
    },
    //上拉加载
    loadMore() {
      this.page += 1;
      this.getGoodsList(this.activeName);

      this.$refs.scroll.finishPullUp();
    },
    //回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300); //300毫秒回到位置0,0
    },
    //轮播图加载完后触发  获取回到顶部元素的offsetTop
    swiperLoad() {
      //获取tab-control的offsetTop 所有组件都有一个$el属性,用于获取组件中的元素
      // this.tabOffsetTop = this.$refs.tab-control2.$el.offsetTop;
      //使用$el获取组件元素时,需要将两个tab-control设置不同的ref,导致激活样式出现问题,所以改用id获取
      this.tabOffsetTop = document.getElementById("tabControl").offsetTop;
      // console.log(this.tabOffsetTop);
    },
    //滚动监听事件
    contentScroll(position) {
      // console.log(position)
      // 1.决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop;
      // 2.决定backTop是否显示
      this.showBackTop = -position.y > 1000;
    },
  },
};
</script>
<style lang="scss">
#home {
  position: relative;
  height: 100vh;
  .home-nav {
    background: var(--color-tint);
    color: #fff;
    border-bottom: 1px solid var(--color-tint);

  }
  .wrapper {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
  .my-swipe {
    .van-swipe__track {
      position: relative;
    }
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      // height: 180px;
      text-align: center;
      // background-color: rgb(122, 115, 115);
      img {
        width: 100%;
        // height: 180px;
      }
    }
    .van-swipe__indicators {
      position: absolute;
      bottom: 15px;
      transform: translateX(-50%);
    }
  }
}
.van-grid-item {
  .van-grid-item__content {
    text-align: center;
    padding: 4px 8px;
    .grid-text {
      font-size: 12px;
      padding: 4px;
    }
  }
}
.recommend2 {
  width: 100%;
}
.tab-control {
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
  z-index: 99;
}

.van-tab--active {
  color: var(--color-tint) !important;
  .van-tab__text {
    line-height: 42px;
    padding: 0 8px;
    // padding: 10px 8px;
    border-bottom: 2px solid !important;
  }
}
.back-top {
  position: fixed;
  bottom: 55px;
  right: 5px;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
