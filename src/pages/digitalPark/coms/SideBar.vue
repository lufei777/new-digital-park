<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
      :default-active="activeIndex2"
        mode="horizontal"
        class="el-menu-demo"
        background-color="#fff"
        text-color="#606266"
        menu-trigger="click"
        :unique-opened="true"
        active-text-color="red"
        @select="handleSelect"
      >
        <sidebar-item v-for="menu in menuList" :key="menu.id" :item="menu"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    menuList: {
      type: Array,
      required: false
    }
  },
  data(){
    return{
      activeIndex2:'1'
    }
  },
  methods:{
     handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>
<style lang="less">
.sidebar-container {
  width: 1250px;
  // height: 30px;
  margin: 0 auto;
  padding-top: 10px;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0px !important;
}
.el-menu-item,
.el-submenu__title {
  font-size: 16px;
  padding: 0;
  text-align: center
}
.el-menu--horizontal {
  font-size: 14px !important;
  .el-icon-arrow-right {
    right: -88px !important;
  }
}
.sidebar-container .is-active{
  border-bottom: 2px solid red;
}
</style>
