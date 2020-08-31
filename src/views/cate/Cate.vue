<template>
  <div id="cate">
    <nav-bar class="cate-nav"><div slot="center">商品分类</div></nav-bar>
    <div class="cate-content">
      <van-sidebar v-model="activeKey" @click="selectItem">
        <van-sidebar-item
          v-for="(item, index) in cateList"
          :key="index"
          :title="item.title"
          @click="getSubCategory(index)"
        />
      </van-sidebar>
      <scroll class="wrapper" ref="scroll" :data="subCateList" :probe-type="3">
        <sub-cate ref="subcate" class="sub-content" :sub-cate-data="subCateData"></sub-cate>
      </scroll>

      <!--        <side-bar :titles="list" @titleClick="titleClick"></side-bar>-->
      <!--        <category-sub-title></category-sub-title>-->
      <!--        <goods-list :goods="showGoods"></goods-list>-->
      <!-- </better-scroll> -->
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import SubCate from "./child/SubCate";
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "Category",
  components: {
    NavBar,
    SubCate,
    Scroll,
  },
  data() {
    return {
      activeKey: 0,
      cateList: [],
      maitKey: "",
      subCateList: [],
      subCateData: []
    };
  },
  mounted() {},
  created() {
    this.getCategory();
  },
  computed: {},

  methods: {
    //获取分类数据
    async getCategory() {
      const { data: res } = await this.$axios.get("category");
      console.log(res.data);
      this.cateList = res.data.category.list;
      console.log(this.cateList);
      this.getSubCategory(this.activeKey);
    },
    //获取子分类数据
    async getSubCategory(index) {
      console.log(index);
      const { data: res } = await this.$axios.get("subcategory", {
        params: { maitKey: this.cateList[index].maitKey },
      });
      this.subCateList = res.data.list;
      this.subCateData = []
      this.subCateData.push(this.subCateList)
      this.subCateData.push(this.cateList[index].miniWallkey)
      console.log(this.cateList[index].maitKey);
      console.log(this.cateList[index].miniWallkey);
      console.log(this.subCateData);
      // this.$refs.subcate.scrollTo(0, 0, 300)
      this.$refs.scroll.scrollTo(0, 0, 300); 
    },
    selectItem() {
      this.getSubCategory();
    },
     
    // getCategory() {
    //   getCategory().then((res) => {
    //     this.list = res.data.category.list;
    //     console.log(res);
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
#cate {
  position: relative;
  height: 100vh;
  .cate-nav {
    background: var(--color-tint);
    color: #fff;
  }
  .cate-content {
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
    display: flex;
    .van-sidebar {
      .van-sidebar-item {
        text-align: center;
        height: 50px;
      }
      .van-sidebar-item--select::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 4px;
        height: 60px;
        background-color: var(--color-tint);
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        content: "";
      }
    }
    .wrapper {
      flex: 1;
      overflow: hidden;
      // position: fixed;
      // top: 44px;
      // bottom: 50px;
      // // left: 0;
      // right: 0;
    }
    .sub-content {
      width: 100%;
      // margin: 0 auto;
      // height: 100%;
    }
  }
}
</style>
