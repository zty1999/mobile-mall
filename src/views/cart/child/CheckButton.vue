<template>
  <div
    class="icon-selector"
    :class="{ 'selector-active': checked }"
    @click="selectItem"
  >
    <input type="checkbox" />
    <label></label>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data: function() {
    return {
      checked: this.value,
    };
  },
  methods: {
    selectItem: function() {
      this.$emit("checkBtnClick");
    },
  },
  watch: {
    value: function(newValue) {
      this.checked = newValue;
    },
  },
};
</script>

<style scoped>
.icon-selector {
  position: relative;
  line-height: 1;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
}
.icon-selector > input[type="checkbox"],
.icon-selector > input[type="radio"] {
  position: absolute;
  z-index: 99999999;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  opacity: 0;
}

label:after {
  opacity: 1;
  content: "";
  position: absolute;
  width: 10px;
  height: 6px;
  background: transparent;
  top: 3.5px;
  left: 2.6px;
  border: 1.8px solid #fff;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.selector-active {
  color: #fff;
  opacity: 1;
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
</style>
