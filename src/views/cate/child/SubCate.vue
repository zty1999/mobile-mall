<template>
  <div class="sub-cate">
    <van-grid :column-num="3" :border="false">
      <van-grid-item
        v-for="(item, index) in subCateData[0]"
        :key="index"
        :url="item.link"
      >
        <img width="60px" v-lazy="item.image" />
        <div class="grid-text">{{ item.title }}</div>
      </van-grid-item>
    </van-grid>
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
        v-for="(item, index) in tabData"
        :key="index"
        :title="item.title"
        :name="item.type"
      >
        <goods-list :goods="cateGoodsList" class="goods-list"></goods-list>
        <!-- @itemClick="goodClick()" -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import GoodsList from "@/components/common/goodslist/GoodsList";
export default {
  props: {
    subCateData: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  components: {
    GoodsList,
  },
  data() {
    return {
      // tab切换控制 title 数据
      tabData: [
        { title: "综合", type: "pop" },
        { title: "新品", type: "new" },
        { title: "销量", type: "sell" },
      ],
      // 商品列表展示tab页默认激活  也是获取商品列表数据时的type
      activeName: "pop",
      // 数据默认页码
      page: 1,
      //tab展示的商品列表数据
      cateGoodsList: [],
    };
  },
  watch: {
    //监听prop传来的属性有值后再执行数据请求
    subCateData() {
      this.getSubGoodsList();
    },
  },
  created() {},
  methods: {
    // 请求分类页面中的商品列表数据
    async getSubGoodsList() {
      // console.log(this.subCateData[1])
      // if(this.subCateData) {
      const { data: res } = await this.$axios.get("subcategory/detail", {
        params: { miniWallkey: this.subCateData[1], type: this.activeName },
      });
      // }
      console.log(this.subCateData[1]);
      console.log(res);
      this.cateGoodsList = res;
    },

    // tab切换
    tabControl() {
      // page重置为1
      this.page = 1;
      //重新获取当前页商品列表数据
      this.getSubGoodsList();
      //当前tab页下回到商品列表开头位置
      if (this.isTabFixed) {
        return this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 300);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-text {
  text-align: center;
  font-size: 12px;
  padding: 4px;
}
</style>
