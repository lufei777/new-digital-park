<template>
  <!--<div class="menu-item">-->
  <!--<template >-->
  <!--:index="specialRoute?item.id + item.routeAddress:item.routeAddress"-->
  <el-menu-item
    v-if="_.isEmpty(item.childNode) || item.childNode.length == 0"
    :index="item.id + item.routeAddress"
    :parentMenu="parentMenu"
  >
    <i v-if="item.icon && !specialRoute" :class="['iconfont',item.icon]"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>
  <!--</template>-->
  <!--<template v-else>-->
  <el-submenu
    v-else
    :parentMenu="parentMenu"
    :index="item.id + item.routeAddress"
    @click.native="onClickSubmenu(item,parentMenu)"
  >
    <template slot="title">
      <i v-if="item.icon && !specialRoute" :class="['iconfont',item.icon]"></i>
      <span>{{item.name}}</span>
    </template>

    <sidebar-item
      class="nest-menu"
      v-for="child in item.childNode"
      :item="child"
      :key="child.id"
      :specialRoute="specialRoute"
      :menuList="menuList"
      :parentMenu="item.level === 1 ? child : item.level === 2 ? item : {}"
    />
  </el-submenu>
  <!--</template>-->

  <!--</div>-->
</template>

<script>
import CommonFun from "../../utils/commonFun";
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    specialRoute: {
      // type:Boolean,
      // required:false
    },
    menuList: {
      type: Array
    },
    parentMenu: {}
  },
  methods: {
    onClickSubmenu(item, menuList) {
      if (!this.specialRoute) return;
      Cookies.set("moduleType", 2);
      Cookies.set("activeMenuIndex", item.childNode[0].id+item.routeAddress);
      if (
        item.name == "安防管理" || item.name == "机房动环" ||
        item.name == "智能建筑" || item.name == "建筑监控" ||
        item.name == "消防管理") {
        let clientName = item.name;
        if (item.name === "安防管理") {
          clientName = "综合安防";
        }
        Client.SkipToSigleBuild(clientName);
        return;
      }
      // 获取level = 2的菜单列表
      if (!_.isEmpty(menuList)) {
        localStorage.setItem("menuList", JSON.stringify(menuList));
      } else {
        if (item.level == 1) {
          return;
        } else {
          if (item.level == 2) {
            localStorage.setItem("menuList", JSON.stringify(item));
          } else {
            let firstMenu = this.menuList.find(first => {
              return first.id == item.firstMenuId;
            });
            let secondMenu = firstMenu.childNode.find(second => {
              return second.id == item.secondMenuId;
            });
            localStorage.setItem("menuList", JSON.stringify(secondMenu));
          }
        }
      }
      this.loadPage(item);
    },
    loadPage(item) {
      if (item.routeAddress) {
        if (item.routeAddress.indexOf("@") != -1) {
          CommonFun.loadOldPage(item);
        } else {
          setTimeout(() => {
            this.$router.push(item.routeAddress);
          }, 500);
        }
      } else {
        this.$router.push("/digitalPark/defaultPage?type=2");
      }
    }
  },
  mounted() {
    // console.log(this.item);
  }
};
</script>
<style lang="less">
/*.menu-item {*/
/*float: left;*/
/*}*/
/*.nest-menu {*/
/*float: none;*/
/*.el-submenu__icon-arrow {*/
/*position: absolute !important;*/
/*}*/
/*}*/
/*.el-menu--horizontal .el-submenu__icon-arrow {*/
/*position: static;*/
/*vertical-align: middle;*/
/*margin-left: 8px;*/
/*margin-top: -3px;*/
/*}*/
</style>
