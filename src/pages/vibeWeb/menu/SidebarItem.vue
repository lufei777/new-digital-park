<template>
  <!--<div class="menu-item">-->
  <el-menu-item
    v-if="item.childNode.length == 0"
    :index="specialRoute ? (item.id + item.routeAddress) : item.routeAddress"
  >
    <i v-if="item.icon" :class="['iconfont',item.icon]"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>

  <el-submenu v-else :index="specialRoute ? (item.id + item.routeAddress) : item.routeAddress">
    <template slot="title">
      <i v-if="item.icon" :class="['iconfont',item.icon]"></i>
      <span>{{item.name}}</span>
    </template>

    <sidebar-item
      v-for="child in item.childNode"
      :item="child"
      :key="child.id"
      :specialRoute="specialRoute"
      class="nest-menu"
    />
  </el-submenu>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    specialRoute: {}
  },
  mounted() {}
};
</script>
<style lang="less">
</style>
