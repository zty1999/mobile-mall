import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: [],
    token: 0,
  },
  getters: {
    cartList(state) {
      return state.cartList;
    },
    cartCount(state, getters) {
      return getters.cartList.length;
    },
    // isLogin(state) {
    //   if (state.token === 0) {
    //     state.token = localStorage.getItem("token");
    //   }
    //   return state.token;
    // },
  },
  mutations: {
    addCart(state, product) {
      console.log(product);
      const oldProduct = state.cartList.find(
        (item) => item.iid === product.iid
      );
      if (oldProduct) {
        oldProduct.count += 1;
      } else {
        product.count = 1;
        product.checked = true;
        state.cartList.push(product);
      }
    },
    CHANGE_TOKEN(state, res) {
      state.token = res;
      localStorage.setItem("token",JSON.stringify(state.token));
      return state.token;
    },
  },
  actions: {},
  modules: {},
});
