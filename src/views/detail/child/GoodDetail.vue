<template>
        <div
        v-if="Object.keys(detailInfo).length !== 0"
        class="detail-info"
      >
        <div class="info-desc clear-fix">
          <div class="start"></div>
          <div class="desc">{{ detailInfo.desc }}</div>
          <div class="end"></div>
        </div>
        <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
        <div class="info-list">
          <img
            v-for="(item, index) in detailInfo.detailImage[0].list"
            :key="index"
            :src="item"
            alt=""
          />
        </div>
      </div>
</template>

<script>
export default {
 props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {

  }
}
</script>

<style lang="scss">
  // 商品详情
  .detail-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
    .info-desc {
      padding: 0 15px;
      .start,
      .end {
        width: 90px;
        height: 1px;
        background-color: #a3a3a5;
        position: relative;
      }
      .start {
        float: left;
      }
      .end {
        float: right;
      }
      .start::before,
      .end::after {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        background-color: #333;
        bottom: 0;
      }
      .end::after {
        right: 0;
      }
      .desc {
        padding: 15px 0;
        font-size: 14px;
      }
    }
    .info-key {
      margin: 10px 0 10px 15px;
      color: #333;
      font-size: 15px;
      font-weight: 700;
    }
    .info-list {
      width: 100vw;
      img {
        width: 100%;
      }
    }
  }
  
</style>