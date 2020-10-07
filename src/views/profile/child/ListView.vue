<template>
  <div id="list">
    <router-link
      v-for="(item, index) in listData"
      :key="index"
      class="item"
      :to="item.path"
    >
      <div class="icon">
        <img :src="item.icon" alt="" />
      </div>
      <div class="info">{{ item.info }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
  .item {
    display: flex;
    height: 44px;
    line-height: 44px;
    .icon {
      height: 44px;
      position: relative;

      img {
        position: absolute;
        width: 18px;
        height: 18px;
        margin-top: 3px;
        transform: translate(50%, 50%);
      }
    }
    .info {
      flex: 1;
      margin-left: 40px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.1);
      padding-left: 5px;
    }
  }
  .item:last-of-type .info {
    border-bottom: none;
  }
}
</style>
