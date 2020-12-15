import Vue from 'vue'
class Store {

}

let install = function () {
  Vue.mixin({
    beforeCreate() {
      // 根组件
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 子组件
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

let Vuex = {
  Store,
  install
}

export default Vuex