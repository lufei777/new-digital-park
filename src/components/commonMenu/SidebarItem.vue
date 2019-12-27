<template>
  <!--<div class="menu-item">-->
  <!--<template >-->
  <!--:index="specialRoute?item.id + item.routeAddress:item.routeAddress"-->
  <el-menu-item
    v-if="_.isEmpty(item.childNode) || item.childNode.length == 0"
    :index="item.id + item.routeAddress"
    :parentMenu="parentMenu"
  >
    <div v-if="item.icon && !specialRoute" class="menu-icon"><i :class="['iconfont',item.icon]"></i></div>
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
      <div class="menu-icon">
        <i v-if="item.icon && !specialRoute" :class="['iconfont',item.icon]"></i>
      </div>
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
      Cookies.set("activeMenuIndex", item.childNode[0].id + item.routeAddress);
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
      // 跳转三维
      if (CommonFun.loadThreeD(JSON.parse(localStorage.getItem("menuList")))) {
        return;
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
.menu-icon{
  display: inline-block;
  /*width:25px;*/
  /*height:25px;*/
  /*margin-right:2px;*/
  /*text-align: center;*/
  /*line-height: 25px;*/
  /*background: pink;*/
  i{
    font-size: 18px;
  }
}
</style>
