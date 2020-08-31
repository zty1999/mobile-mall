<template>
  <div id="order">
    
    <van-cell icon="location-o" title="收货地址" value="内容" label="描述信息" is-link to="addressList" />
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {};
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
#order {
  position: relative;
  height: 100vh;
 
}
</style>
