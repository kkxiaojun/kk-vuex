<template>
  <div id="app">
    <div>
      getters: {{ $store.getters.getNum }}
    </div>
    <div class="btn" @click="handSame">同步操作+1</div>
    <div class="btn" @click="handleAsync">异步操作+1</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      obj: {}
    }
  },
  created() {
    console.log('this.$store', this.$store)
  },
  methods: {
    handSame() {
      this.$store.commit('addNum', 1)
    },
    handleAsync() {
      this.$store.dispatch('asyncAddNum', 1)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn {
  width: 110px;
  margin: 10px auto;
  padding: 5px;
  border-radius: 10px;
  background: #91dfe2;
}
</style>
