<template>
  <div class="recommend-list">
    <goods-list-item
      v-for="(item, index) in recommendList"
      :key="index"
      :good="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/common/goodslist/GoodsListItem";

export default {
  props: {
    recommendList: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  components: {
    GoodsListItem,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style>
.recommend-list {
  display: flex;
  flex-flow: wrap;
  width: 100vw;
}
</style>
