<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :good="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/common/goodslist/GoodsListItem";

export default {
  props: {
    goods: {
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

<style lang="scss">
.goods-list {
  display: flex;
  flex-flow: wrap;
  width: 100%;
}
  </style>
