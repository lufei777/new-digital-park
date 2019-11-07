<template>
  <!--<div class="sidebar-container">-->
    <!--<el-scrollbar wrap-class="scrollbar-wrapper">-->
      <el-menu
        class="el-menu-demo"
        :default-active="activeIndex2"
        :mode="menuConfig.mode"
        :background-color="menuConfig.bgColor"
        :text-color="menuConfig.textColor"
        :unique-opened="true"
        :active-text-color="menuConfig.activeTextColor"
        :collapse="menuConfig.isCollapse"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <sidebar-item v-for="menu in menuList"
                      :key="menu.id"
                      :item="menu"
                      :specialRoute="menuConfig.specialRoute"/>
      </el-menu>
    <!--</el-scrollbar>-->
  <!--</div>-->
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
    },
    menuConfig:{}
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
      console.log(key)
      if (key) {
        if (key.indexOf("null") != -1) {
          window.open("/#/digitalPark/defaultPage");
        }else if (key.indexOf("@") != -1) {
          window.open(this.oldProjectHome + "?forward=" + key.split("@")[1]);
        }else{
          if(key=='/assetGroup' || key=='/assetType' || key=='/assetMaintenance'){ //测试
            this.$router.push(key)
          }
        }
      }
    },
    handleOpen(key){
      if(key=='/assetMaintenance'){
        this.$router.push(key)
      }
    },
    handleClose(key){
      console.log(key)
      if(key=='/assetMaintenance'){
        this.$router.push(key)
      }
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
/*.sidebar-container .is-active {*/
  /*border-bottom: 2px solid red;*/
/*}*/

</style>
