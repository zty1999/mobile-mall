<template>
      <van-popup
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div
        style="display:flex; padding: 15px 10px; justify-content: space-between;"
      >
        <img :src="goodShow" alt="" style=" width: 50px; " />
        <div style="flex: 1;">
          <div>{{ skuInfo.priceRange }}</div>
          <div>剩余{{ skuInfo.totalStock }}件</div>
          <div>已选 {{ model }}</div>
        </div>
      </div>
      <div style="padding: 15px 10px; ">
        <p>{{ skuInfo.styleKey }}</p>
        <div style="display: flex; flex-wrap: wrap; padding: 5px 0;">
          <van-radio-group
            direction="horizontal"
            v-model="skuInfo.styleKey"
            v-for="(item, index) in style.list"
            :key="index"
          >
            <van-radio
              @click="checkedd()"
              style="padding: 5px 0;"
              :name="item.styleId"
            >
              {{ item.name }}</van-radio
            >
          </van-radio-group>
        </div>
      </div>

      <div style="display: flex;">
        <span>我要买</span>
        <div style="flex: 1; display:flex;">
          <span>(2件起售，限购5件)</span>
          <van-stepper v-model="value" style="flex: 1; "></van-stepper>
        </div>
      </div>
      <p>商品不多赶快购买吧</p>
      <van-goods-action>
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </van-popup>
</template>

<script>
export default {

}
</script>

<style>

</style>