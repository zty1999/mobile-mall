<template>
  <div>
    <van-goods-action class="shopBar">
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-icon icon="star-o" text="收藏" color="" />
      <van-goods-action-button
        type="warning"
        color="var(--color-tint)"
        text="加入购物车"
        @click="addToCart"
      />
      <van-goods-action-button
        type="danger"
        color="var(--color-high-text)"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import skuData from "./data";

export default {
  props: {
    skuInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      checked: this.value,
      value: 1,
    };
  },

  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
  },
};
</script>

<style lang="scss">
.demo-sku {
  .sku-container {
    padding: 0 15px;
  }
}
</style>
