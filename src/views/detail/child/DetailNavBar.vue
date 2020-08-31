<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left">
        <img
          class="back-icon"
          src="~/assets/img/common/back.svg"
          alt=""
          @click="$router.back()"
        />
      </div>
      <div slot="center" class="title">
        <a
          tag="div"
          class="title-item"
          v-for="(item, index) in titles"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </a>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {

    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
  },
};
</script>

<style lang="scss">
.title {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  .title-item {
    /* text-align: center; */
    flex: 1;
    font-size: 14px;
    height: 44px;
  }
  .active {
    color: var(--color-tint);
  }
  .back-icon {
    margin-top: 11px;
  }
}
</style>
