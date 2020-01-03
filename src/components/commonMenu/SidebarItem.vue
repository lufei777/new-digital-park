<template>
  <div :class="specialRoute && first?'horizonal-menu':''">
    <template v-for="item in menuData.childNode">

      <el-menu-item :key="item.id" v-if="item.childNode.length == 0" :index="item.id + item.routeAddress">
        <i v-if="item.icon && !specialRoute" :class="['iconfont',item.icon]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>

      <el-submenu v-else :key="item.id" :index="item.id + item.routeAddress" @click.native="onClickSubmenu(item)">
        <template slot="title">
          <i v-if="item.icon && !specialRoute" :class="['iconfont',item.icon]"></i>
          <span>{{item.name}}</span>
        </template>
        <sidebar-item
          class="nest-menu"
          :menu-data="item"
          :specialRoute="specialRoute"
          :first="false"
        />
      </el-submenu>

    </template>
  </div>
</template>

<script>
import CommonFun from "../../utils/commonFun";
export default {
  name: "SidebarItem",
  props: {
    specialRoute: {
      type: Boolean,
      required: false
    },
    menuData: {},
    first: {}
  },
  computed: {
    menuList() {
      return JSON.parse(localStorage.getItem("menuTree"))[0].childNode;
    }
  },
  methods: {
    onClickSubmenu(item) {
      if (!this.specialRoute || item.level == 1) {
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
      // 跳转三维
      console.log(item, JSON.parse(localStorage.getItem("menuList")));
      if (
        CommonFun.loadThreeD(item, JSON.parse(localStorage.getItem("menuList")))
      ) {
        return;
      }
      this.loadPage(item);
    },
    loadPage(item) {
      Cookies.set("moduleType", 2);
      Cookies.set("activeMenuIndex", item.childNode[0].id + item.routeAddress);
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
.horizonal-menu {
  display: flex;
  &:focus {
    outline: unset !important;
  }
}
</style>
