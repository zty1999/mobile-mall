<template>
  <div id="address-edit">
    <nav-bar class="address-edit-nav">
      <div slot="left">
        <img class="back-icon" src="~/assets/img/common/back.svg" alt @click="$router.back()" />
      </div>
      <div slot="center">地址编辑</div>
    </nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
    <van-popup v-model="show">
      <!-- <van-area title="标题" :area-list="areaList" value="110101" @confirm="onConfirm" /> -->
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import areaList from "@/assets/js/area.js";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      //地区数据
      areaList,
      searchResult: [],
      addressInfo: {},
      //控制地区选择组件展示与否
      show: false,
      //点击保存后的回调内容 地址信息
      addressData: {},
      //
      list: []
    };
  },
  computed: {},
  methods: {
    //保存  content触发事件时的回调参数 表单内容
    onSave(content) {
      console.log(content);
      this.addressData = content;
      //vant的地址编辑组件对数据格式有要求
      //创建一个新对象添加需要的属性 Object.assign方法将两个对象合并得到符合格式要求的对象
      //再push到数组中 forEach方法给增加的属性赋值
      const addressed = {
        id: 0,
        address: ""
      };
      let add = Object.assign(this.addressData, addressed);
      let ll = [];
      ll.push(add);
      console.log(add);

      for (let i; (i = 0 && i < this.list.length); i++) {
        ll.forEach((item, index) => {
          item.id = i;
          item.address =
            item.province +
            " " +
            item.city +
            " " +
            item.county +
            " " +
            item.addressDetail;
        });
      }
      this.list = this.list.concat(ll);

      console.log(this.list);
      // this.list.forEach((item, index) => {

      //   item.id = index;
      //   item.address =
      //     item.province +
      //     " " +
      //     item.city +
      //     " " +
      //     item.county +
      //     " " +
      //     item.addressDetail;
      //   })

      // this.list.push(Object.assign(this.addressData, addressed));
      // this.list.forEach((item, index) => {
      //   item.id = index;
      //   item.address =
      //     item.province +
      //     " " +
      //     item.city +
      //     " " +
      //     item.county +
      //     " " +
      //     item.addressDetail;
      // });
      localStorage.setItem("addressList", JSON.stringify(this.list));

      this.$router.push("/addressList");
    },
    onDelete() {
      Toast("delete");
    },

    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style>
</style>