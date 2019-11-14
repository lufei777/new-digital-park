<template>
  <!--<div class="sidebar-container">-->
    <!--<el-scrollbar wrap-class="scrollbar-wrapper">-->
      <el-menu
        class="el-menu-demo"
        :default-active="menuConfig.activeIndex"
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
import CommonFun from '../../utils/CommonFun'
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
    // console.log(this.menuList);
  },
  data() {
    return {
      breadcrumb:[]
    };
  },
  computed: {
    ...mapState({
      // breadcrumb:state=>state.digitalPark.breadcrumb
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key,keyPath)
      if (key) {
        if (key.indexOf("null") != -1) {
          this.$router.push("/digitalPark/defaultPage");
        }else if (key.indexOf("@") != -1) {
          // CommonFun.loadOldPage(key);
        }else{
          if(key=='/assetGroup' || key=='/assetType' || key=='/assetMaintenance'){ //测试
            this.$router.push(key)
          }
          this.breadcrumb=[]
          this.matchRoute(this.menuList,[...keyPath])
          Cookies.set('activeIndex',key)
        }
      }
    },
    handleOpen(key){
      // if(key=='/assetMaintenance'){
      //   this.$router.push(key)
      // }
    },
    handleClose(key){
      // console.log(key)
      // if(key=='/assetMaintenance'){
      //   this.$router.push(key)
      // }
    },
    matchRoute(list,keyPath){
      list.map((item)=>{
        keyPath.map((path)=>{
          if(item.routeAddress==path){
            this.breadcrumb.push(item)
            keyPath.shift()
          }
        })
        if(keyPath){
          this.matchRoute(item.childNode,keyPath)
        }
      })
      Cookies.set('breadcrumb',this.breadcrumb)
      this.$store.commit('digitalPark/tmpBreadcrumb',this.breadcrumb)
    }
  },
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
