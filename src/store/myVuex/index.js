let Vue
class Store {
  constructor(options = {}) {
    // 增加响应式
    this.vm = new Vue({
      data:{
        state: options.state
      }
    })
    // getters
    this.defineGetters(options)
    // mutations
    this.defineMutations(options)
    // actions
    this.defineActions(options)
  }
  defineGetters(options) {
    this.getters = {}
    let getters = options.getters || {}
    Object.keys(getters).forEach(key=>{
        // 将设置的getters代理到$store实例的getters
        Object.defineProperty(this.getters, key, {
            get:()=>{
              console.log('this.state', this.state)
              return getters[key](this.state)
            }
        })
    })
  }
  defineMutations(options) {
    this.mutations = {}
    let mutations = options.mutations || {}
    Object.keys(mutations).forEach(mutationName=>{
        this.mutations[mutationName] = (arg) => {
          mutations[mutationName](this.state, arg)
        }
    })
  }
  defineActions(opotions) {
    this.actions = {}
    let actions = opotions.actions
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] =(arg) => {
        // 箭头函数，不绑定this。这里this就是$store实例
        actions[actionName](this, arg)
      }
    })
  }
  dispatch(method, arg) {
    console.log(  `dispatch:actions:${method}===>`, method)
    this.actions[method](arg)
  }
  commit = (method, arg) => {
    console.log(`commit:mutations:${method}===>`, method)
    this.mutations[method](arg)
  }
  // 为了能直接访问state
  get state() {
    return this.vm.state
  }
}

// vue插件机制
function install (vue) {
  Vue = vue
  Vue.mixin({
    beforeCreate() {
      // 根组件才有store
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 子组件
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default {
  Store,
  install
}