<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeIndex2"
        mode="horizontal"
        class="el-menu-demo"
        background-color="#fff"
        text-color="#606266"
        :unique-opened="true"
        active-text-color="red"
        @select="handleSelect"
      >
        <sidebar-item v-for="menu in menuList" :key="menu.id" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from "./SidebarItem";
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    menuList: {
      type: Array,
      required: false
    }
  },
  mounted() {
    console.log(this.menuList);
  },
  data() {
    return {
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      var routerUrl = ("@?forward=" + keyPath[0].split("@")[1]).replace(
        "@",
        this.oldProjectHome
      );
      console.log(routerUrl);
    }
  },
  computed: {
    ...mapState("digitalPark", ["oldProjectHome"])
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
.sidebar-container .is-active {
  border-bottom: 2px solid red;
}
.sidebar-container {
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
}
</style>
