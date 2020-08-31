<template>
  <div class="base-info" v-if="goodInfo">
    <h5 class="title">{{ goodInfo.baseInfo.title }}</h5>
    <div class="price">
      <span class="new-price">{{ goodInfo.baseInfo.price }}</span>
      <span class="old-price">{{ goodInfo.baseInfo.oldPrice }}</span>
      <span class="discount" v-show="goodInfo.baseInfo.discountDesc">{{
        goodInfo.baseInfo.discountDesc
      }}</span>
    </div>
    <!-- Object.keys(goodInfo.baseInfo).length !== 0 -->
    <div class="columns">
      <span v-for="(item, index) in goodInfo.column" :key="index">{{ item }}</span>
    </div>
    <div class="services">
      <div
            class="services-item"
            v-for="(item, index) in goodInfo.services"
            :key="index"
          >
            <img :src="item.icon" />
            <span>{{ item.name }}</span>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // baseInfo: {},
      // columns: this.goodInfo.columns,
      // services: this.goodInfo.servicess,
      // flag: false
    };
  },
  watch: {
    // goodInfo(val) {
    //   console.log(this.goodInfo);
    //   console.log(this.goodInfo.baseInfo);
    //   // this.baseInfothis.goodInfo.baseInfo,
    //   // this.chartsInit(val);
    // },
  },
  created() {
console.log(this.goodInfo)
  },
  methods: {
    // chartsInit(val) {
    //   homeResource.getConditionData().then((res) => {
    //     this.flag = true;
    //     if (res.data.status === 0) {
    //       console.log("条件", res.data.data);
    //       this.conditionStatisticsData = res.data.data;
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss">
  // 基础信息
  .base-info {
    padding: 0 8px;
    border-bottom: 5px solid #f2f5f8;
    .title {
      font-size: 17px;
      margin: 10px 0;
    }
    .price {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .new-price {
        font-size: 24px;
        color: var(--color-high-text);
      }
      .old-price {
        font-size: 13px;
        color: gray;
        margin: 0 5px;
        align-self: flex-end;
        text-decoration: line-through;
      }
      .discount {
        font-size: 12px;
        color: #fff;
        padding: 2px 5px;
        background-color: var(--color-high-text);
        border-radius: 8px;
        /*让元素上浮一些: 使用相对定位即可*/
        position: relative;
        top: -8px;
      }
    }
    .columns {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      span {
        line-height: 30px;
        color: gray;
        font-size: 13px;
      }
    }
    .services {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-top: 1px solid #f3f5f4;
      line-height: 30px;
      .services-item {
        display: flex;
        align-items: center;

        img {
          width: 14px;
          height: 14px;
          margin-right: 3px;
        }
        span {
          font-size: 13px;
          color: #333;
        }
      }
    }
  }
</style>