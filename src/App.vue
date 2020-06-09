<template>
  <div id="app">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <transition name="fade-transform" mode="out-in" appear> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <!-- </transition> -->

      <!-- <transition v-if="!$route.meta.keepAlive" name="fade-transform" mode="out-in" appear> -->
      <router-view v-if="!$route.meta.keepAlive" />
      <!-- </transition> -->
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() { }
};
</script>
<style lang="less">
@import url("./less/index.less");
#app {
  font-family: "MicrosoftYaHei", Helvetica, Arial, sans-serif;
  color: #666;
  height: 100%;
  font-size: 14px;
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
