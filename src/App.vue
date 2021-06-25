<template>
  <router-view/>
   <ToastMessages></ToastMessages>
</template>

<style lang="scss">
@import './assets/all.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
// 匯入
import emitter from '@/methods/eventBus';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  // 最外層插入元件 ToastMessage
  components: { ToastMessages },
  // 在這邊使用 提供"emitter的功能"給內部使用  不再main.js註冊
  provide() {
    return {
      emitter,
    };
  },
};
</script>
