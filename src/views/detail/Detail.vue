<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      class="wrapper"
      ref="scroll"
      :data="[
        banner,
        baseInfo,
        columns,
        services,
        shopInfo,
        detailInfo,
        paramsInfo,
        commentsInfo,
      ]"
      :pull-up-load="true"
      :probe-type="3"
    >
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item" />
        </van-swipe-item>
      </van-swipe>

      <!-- 商品信息 -->
      <good-info :good-info="goodInfo"></good-info>

      <!-- 店铺信息 -->
      <shop-info :shop-info="shopInfo"></shop-info>

      <!-- 商品详情 -->
      <good-detail :detail-info="detailInfo"></good-detail>

      <!-- 参数信息 -->
      <params-info :params-info="paramsInfo" ref="param"></params-info>

      <!-- 用户评价 -->
      <comment :comments-info="commentsInfo" ref="comments"></comment>

      <!-- 推荐 -->
      <div class="recommend-info" ref="recommend">
        <div class="info-header">热门推荐</div>
        <recommend-list :recommend-list="recommendList"></recommend-list>
      </div>
    </scroll>
    <!-- 底部商品导航 -->
    <good-submit @addToCart="addToCart" :skuInfo="skuInfo"></good-submit>
  </div>
</template>

<script>
import DetailNavBar from "./child/DetailNavBar";
import Scroll from "@/components/common/scroll/Scroll";
import RecommendList from "./child/RecommendList";
import GoodInfo from "./child/GoodInfo";
import ShopInfo from "./child/ShopInfo";
import GoodDetail from "./child/GoodDetail";
import ParamsInfo from "./child/ParamsInfo";
import Comment from "./child/Comment";
import GoodSubmit from "./child/GoodSubmit";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    RecommendList,
    Scroll,
    GoodInfo,
    ShopInfo,
    GoodDetail,
    ParamsInfo,
    Comment,
    GoodSubmit
  },
  data() {
    return {
      //轮播图数据
      banner: [],
      //商品信息
      goodInfo: {
        baseInfo: {},
        columns: [],
        services: [],
      },
      baseInfo: {},
      //总数据
      totalData: {},
      iid: "",
      columns: [],
      services: [],
      //店铺信息
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      //评论
      commentsInfo: [],
      //推荐商品
      recommendList: [],
      // better-scroll参数
      loading: false,
      finished: false,
      themeTopYs: [],
      show: false,
      count: 1,
      skuInfo: {},
    };
  },
  created() {
    this.getDetailData();
    this.getRecommendData();
  },

  computed: {

  },
  methods: {
    //请求商品详情数据
    async getDetailData() {
      this.iid = this.$route.params.iid;
      console.log(this.iid);
      const { data: res } = await this.$axios.get("detail", {
        params: { iid: this.iid },
      });
      console.log(res);

      //总数据
      const totalData = res.result;
      //轮播图数据
      this.banner = totalData.itemInfo.topImages;
      this.baseInfo = totalData.itemInfo;
      this.columns = totalData.columns;
      this.services = totalData.shopInfo.services;
      this.shopInfo = totalData.shopInfo;
      this.detailInfo = totalData.detailInfo;
      this.paramsInfo = totalData.itemParams;
      this.commentsInfo = totalData.rate.list;
      //good-info组件中要传入的值
      this.goodInfo.baseInfo = totalData.itemInfo;
      this.goodInfo.column = totalData.columns;
      this.goodInfo.services = totalData.shopInfo.services;
      //sku  点击加入购物车弹窗
      this.skuInfo = totalData.skuInfo;
    },
    //请求推荐商品数据
    async getRecommendData() {
      let recommendType = "pop";
      const { data: res } = await this.$axios.get("home/data", {
        params: { type: recommendType, page: 18 },
      });
      this.recommendList = res.data.list;
      console.log(res.data.list);
    },
    // 点击导航栏标题跳转至相应位置
    titleClick(index) {
      console.log(index);
      this.getThemeTopYs();

      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    // 获取导航栏跳转的offsetTop即y轴坐标
    getThemeTopYs() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.offsetTop);
    },
    //添加至购物车
    addToCart() {
      // product.checked = true;
 const product = {};
      //点击加入购物车时，该商品被获取的信息
      product.count = this.count;
      product.iid = this.iid;
      product.title = this.baseInfo.title;
      product.desc = this.baseInfo.desc;
      product.price = this.baseInfo.highNowPrice;
      product.image = this.baseInfo.topImages[0] || [];
      //product添加到store中
      this.$store.commit("addCart", product);
      this.$toast("商品已成功加入购物车");
    },
  },
};
</script>

<style lang="scss">
#detail {
  position: relative;
  height: 100vh;
  .wrapper {
    position: absolute;
    // overflow: hidden;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
  .back-icon {
    margin-top: 11px;
  }
  .van-swipe-item {
    height: 300px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    img {
      width: 100%;
    }
  }

  .van-swipe--indicators {
    position: absolute;
    bottom: 15px;
    transform: translateX(-50%);
  }
  // 推荐
  .recommend-info {
    padding: 5px;
    .info-header {
      line-height: 40px;
      padding-left: 8px;
      font-size: 15px;
      color: #333;
    }
  }
  .shopBar {
    z-index: 99;
    padding: 5px 0;
  }
}
</style>
