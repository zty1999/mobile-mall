<template>
  <!-- <div id="cart-list-item">
    <div class="checkbox-wrapper">
      <van-checkbox v-model="product.checked" icon-size="24px" checked-color="var(--color-tint)"
        @change="checkChanged(product)" ></van-checkbox>
    </div>
  </div> -->
  <div id="cart-list-item">
    <div class="item-selector">
      <CheckButton
        @checkBtnClick="checkedChange"
        v-model="product.checked"
      ></CheckButton>
      <!-- <van-checkbox v-model="product.checked" icon-size="24px" checked-color="var(--color-tint)"
        @change="checkChanged(product)" ></van-checkbox> -->
    </div>
    <van-card
      currency=""
      :price="product.price"
      :desc="product.desc"
      :title="product.title"
      :thumb="product.image"
    >
      <template #num>
        <van-stepper
          v-model="product.count"
          min="1"
          max="99"
          color="var(--color-high-text)"
          integer
          theme="round" input-width="20px" button-size="20px"
        />
      </template>
    </van-card>
    <!-- <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">商品描述: {{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  props: {
    product: {
      type: Object,
    },
  },
  components: {
    CheckButton,
  },
  data() {
    return {
    };
  },
  methods: {
    //单选
    checkedChange() {
      this.product.checked = !this.product.checked;
    },

    // checkChanged() {
    //   this.product.checked = !this.product.checked;
    //   // this.amount(val)
    //   // console.log(this.product.checked)
    //   // this.$store.$emit('checkChange',this.product)
    // },
  },
};
</script>

<style lang="scss">
#cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  border-bottom: 1px solid #eee;
  height: 120px;
  background-color: #fafafa;
  // .checkbox-wrapper {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 10%;
  // }

  .item-selector {
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .van-card {
    width: 88%;
    flex: 1;
    padding-left: 0;
    // border-bottom: 1px solid #eee;

    .van-card__content {
      width: 100%;
    }
    .van-card__title {
      font-size: 16px;
      margin-bottom: 6px;
    }
    .van-card__price {
      color: var(--color-high-text);
    }
    .van-card__num {
      font-size: 14px;
      .van-stepper--round .van-stepper__minus {
        color: var(--color-high-text);
        background-color: #fff;
        border: 1px solid var(--color-tint);
      }
      .van-stepper--round .van-stepper__plus {
    color: #fff;
    background-color: var(--color-tint);
}
    }
  }
}
</style>
