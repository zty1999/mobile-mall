<template>
  <div>
    <div class="cart-list">
      <div class="cart-list-item" v-for="item in cartList" :key="item.iid">
        <div class="item-selector">
          <CheckButton
            @checkBtnClick="checkedChange(item.iid)"
            v-model="item.checked"
          ></CheckButton>
        </div>
        <van-card
          :class="isEditor ? 'van-card1' : 'van-card2'"
          currency=""
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.image"
        >
          <template #num>
            <van-stepper
              v-model="item.count"
              min="1"
              max="99"
              color="var(--color-high-text)"
              integer
              theme="round"
              input-width="20px"
              button-size="20px"
            />
          </template>
        </van-card>
        <van-button v-if="isEditor" size="mini" class="item-delete">
          删除
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import CartListItem from './CartListItem'
import CheckButton from "./CheckButton";

export default {
  props: {
    cartContent: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  components: {
    // CartListItem,
    CheckButton,
  },
  data() {
    return {
      cartList: this.cartContent.cartList,
      isEditor: this.cartContent.isEditor,
    };
  },

  created() {
    console.log(this.isEditor);
  },
  methods: {
    //单选
    checkedChange(iid) {
      this.cartList.find((item) => {
        if (iid === item.iid) {
          item.checked = !item.checked;
        }
      });
      // this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  border-bottom: 1px solid #eee;
  height: 120px;
  background-color: #fafafa;
  .item-selector {
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-delete {
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .van-card1 {
    width: 76%;
    flex: 1;
    padding-left: 0;
    // border-bottom: 1px solid #eee;
  }
  .van-card2 {
    width: 88%;
    flex: 1;
    padding:  0;
    // border-bottom: 1px solid #eee;
  }
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
</style>
