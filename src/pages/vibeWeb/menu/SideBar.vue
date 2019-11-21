<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
    <el-menu
      class="el-menu-demo"
      :default-active="menuConfig.activeIndex"
      :mode="menuConfig.mode"
      :background-color="menuConfig.bgColor"
      :text-color="menuConfig.textColor"
      :unique-opened="true"
      :active-text-color="menuConfig.activeTextColor"
      :collapse="menuConfig.isCollapse"
      @select="menuConfig.handleSelect"
      @open="menuConfig.handleOpen"
      @close="menuConfig.handleClose"
    >
      <sidebar-item
        v-for="menu in menuConfig.menuList"
        :key="menu.id"
        :item="menu"
        :specialRoute="menuConfig.specialRoute"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import CommonFun from "@/utils/commonFun";
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    menuConfig: {
      type: Object,
      require: true
    }
  },
  mounted() {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {},
    handleOpen(key) {},
    handleClose(key) {},
    matchRoute(list, keyPath) {}
  }
};
</script>
<style lang="less">
.el-menu-item,
.el-submenu__title {
  font-size: 16px;
}
.el-menu-demo {
  border-bottom: none !important;
}
</style>
