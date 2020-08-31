<template>
  <div id="site-list">
    <nav-bar class="order-nav">
      <div slot="left">
        <img class="back-icon" src="~/assets/img/common/back.svg" alt @click="$router.back()" />
      </div>
      <div slot="center">收货地址</div>
    </nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- {{address}} -->
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [
        // {
        //   id: "1",
        //   name: "张三",
        //   tel: "13000000000",
        //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
        //   isDefault: true
        // },
        // {
        //   id: "2",
        //   name: "李四",
        //   tel: "1310000000",
        //   address: "浙江省杭州市拱墅区莫干山路 50 号"
        // }
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  computed: {

  },
  methods: {
    //获取localStorage中存储的地址数据
    getData() {
      this.list = JSON.parse(localStorage.getItem("addressList"));
      // return this.list.forEach(item => {
        
      // }
      
        // for(let i; i >= 0 && i === list.length-1; i--) {
        //   this.list[i].id = i + '';
        // }
      // })
    },
    onAdd() {
      this.$router.push("/addressEdit");

      // this.$toast("新增地址");
    },
    onEdit(item, index) {
      // this.$router.push('/addressEdit')
      // this.$toast("编辑地址:" + index);
    }
  }
};
</script>

<style>
#site-list {
  background-color: var(--tint-background);
}
.back-icon {
  margin-top: 11px;
}
</style>