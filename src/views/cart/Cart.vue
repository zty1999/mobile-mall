<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车</div>
      <div slot="right">
        <span @click="manage">{{ isEditor ? "完成" : "编辑" }}</span>
      </div>
    </nav-bar>
    <!-- 滚动区域 -->
    <scroll class="wrapper" ref="scroll" :pull-up-load="true" :probe-type="3">
      <div v-if="cartList.length > 0" class="cart-list">
        <div class="cart-list-item" v-for="(item,index) in cartList" :key="index">
          <div class="item-selector">
            <CheckButton @checkBtnClick="checkedChange(item.iid)" v-model="item.checked"></CheckButton>
          </div>
          <van-card
            :class="isEditor ? 'van-card van-card1' : 'van-card van-card2'"
            currency
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
          <div class="item-delete" v-if="isEditor">
            <van-button van-button size="large" type="danger" @click="deleted(index)">删除</van-button>
          </div>
        </div>
      </div>
    </scroll>

    <div class="bottom-menu">
      <CheckButton class="select-all" @checkBtnClick="checkAll" v-model="isSelectAll"></CheckButton>
      <span>全选</span>
      <span class="total-price">合计: ¥{{ totalPrice }}</span>
      <span
        class="buy-product"
        @click="multiple"
      >{{ isEditor ? "删除" : `提交订单${$store.getters.cartCount}` }}</span>
      <!-- 提交订单({{ $store.getters.cartCount }}) -->
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
// import CartList from "views/cart/child/CartList";
import CheckButton from "./child/CheckButton";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    // CartList,
    CheckButton
  },
  data() {
    return {
      isEditor: false,
      //要删除的商品
      good: {},
      submitGoods: []
    };
  },
  created() {
    // JSON.parse(localStorage.getItem("cartList") || "[]");
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    // ...mapGetters(["getAllCount", "cartLength", "cartList"])
    cartList() {
      return this.$store.getters.cartList;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    },

    // submitPrice() {
    //   // submit-bar组件price只接受number所以乘以数字，组件中price自动将价格除以100，所以这里乘以一百
    //   return (
    //     100 *
    //     this.cartList
    //       .filter((item) => {
    //         return (item.checked = true);
    //       })
    //       .reduce((preValue, item) => {
    //         return preValue + item.price * item.count;
    //       }, 0)
    //   );
    // },
    totalPrice() {
      return this.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    isSelectAll: function() {
      return (
        this.$store.getters.cartList.find(item => item.checked === false) ===
        undefined
      );
    }
  },
  methods: {
    // 全选
    checkAll() {
      // 1.判断是否有未选中的按钮
      let isSelectAll = this.$store.getters.cartList.find(
        item => !item.checked
      );

      // 2.有未选中的内容, 则全部选中
      if (isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = false;
        });
      }
    },
    //单选
    checkedChange(iid) {
      this.cartList.find(item => {
        if (iid === item.iid) {
          item.checked = !item.checked;
        }
      });
    },

    //切换显示delete按钮
    manage() {
      this.isEditor = !this.isEditor;
      console.log(this.isEditor);
    },
    //删除单个商品
    deleted(i) {
      this.$dialog
        .confirm({
          message: "确定删除该商品吗？",
          cancelButtonText: "再想想"
        })
        .then(() => {
          this.cartList.splice(i, 1);
        })
        .catch(() => {
          // on cancel
        });
    },
    multiple() {
      console.log(this.isEditor);
      if (this.isEditor === true) {
        this.deleteGoods();
      } else {
        this.submit();
      }
    },
    //提交订单
    submit() {
     this.cartList.filter(item => {
       if(item.checked === true){
          this.submitGoods.push(item)
       } ;
        
      })
      console.log(this.submitGoods);

      this.$router.push('/order');
      this.submitGoods = []
    },
    //删除多个商品
    deleteGoods() {
      //声明i为数组最后一位的index，i>=0表示在数组不为空的情况下，i自减
      // 因为splice方法通过获取下标index定位删除，同时删除多个会造成index错误，所以按照index从最后一位元素开始向前查找删除
      for (let i = this.cartList.length - 1; i >= 0; i--) {
        if (this.cartList[i].checked === true) {
          this.cartList.splice(i, 1);
        }
      }
      console.log(this.cartList);
    }
  }
};
</script>
<style lang="scss" scoped>
#cart {
  position: relative;
  height: 100vh;
  .cart-nav {
    background: var(--color-tint);
    color: #fff;
  }
  .wrapper {
    position: absolute;
    // overflow: hidden;
    top: 44px;
    bottom: 94px;
    left: 0;
    right: 0;
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
        .van-button {
          height: 80px;
          font-size: 12px;
        }
      }

      .van-card1 {
        width: 76%;
      }
      .van-card2 {
        width: 88%;
      }
      .van-card {
        // width: 88%;
        flex: 1;
        padding-left: 0;
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
            color: var(--color-high-text) !important;
            background-color: #fff;
            border: 1px solid var(--color-tint) !important;
          }
          .van-stepper--round .van-stepper__plus {
            color: #fff;
            background-color: var(--color-tint) !important;
          }
        }
      }
    }
  }
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: var(--color-high-text);
  }

  .bottom-menu .buy-product {
    background: -webkit-linear-gradient(left, #ff8198, #ff5777);
    background: linear-gradient(to right, #ff8198, #ff5777);
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
}
</style>
