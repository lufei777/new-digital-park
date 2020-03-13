<template>
  <fragment>
    <template v-for="item in menuData.childNode">
      <el-menu-item
        :key="item.id"
        v-if="!item.childNode || item.childNode.length == 0"
        :index="getMenuIndex(item)"
        @click.native="onClickLastMenu(item)"
      >
        <i v-if="item.icon && !specialRoute" :class="['iconfont',item.icon]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>

      <el-submenu
        v-else
        :key="item.id"
        :index="getMenuIndex(item)"
        @click.native="onClickSubmenu(item)"
      >
        <template slot="title">
          <i v-if="item.icon && !specialRoute" :class="['iconfont',item.icon]"></i>
          <span>{{item.name}}</span>
        </template>

        <sidebar-item class="nest-menu" :menu-data="item" :specialRoute="specialRoute" />
      </el-submenu>
    </template>
  </fragment>
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
    menuData: {}
  },
  data() {
    return {
      findMenu: {}
    };
  },
  computed: {
    allMenuList() {
      return JSON.parse(localStorage.getItem("menuTree"))[0].childNode;
    }
  },
  methods: {
    onClickSubmenu(item) {
      if (!this.specialRoute || item.level == 1) {
        return;
      }
      Cookies.set("moduleType", 2);
      this.setMenuList(item);
    },
    getMenuIndex(item) {
      return CommonFun.setMenuIndex(item);
    },
    onClickLastMenu(item) {
      if (this.specialRoute) {
        //瀑布流
        CommonFun.goToZGManage(item)
        this.setMenuList(item);
      } else {
        this.setActiveIndex(item);
        CommonFun.loadPage(item);
      }
    },
    setMenuList(item) {
      if (item.level == 2) {
        this.$store.commit("digitalPark/menuList", item);
        this.normalShortcutList();
      } else {
        let firstMenu = this.allMenuList.find(first => {
          return first.id == item.firstMenuId;
        });
        let secondMenu = firstMenu.childNode.find(second => {
          return second.id == item.secondMenuId;
        });
        let menuTmp={}
        //菜单：如果是二级是客户端类概览页且点击的子集是跳网页，则不存全部菜单
        if(secondMenu.clientType==1 && item.clientType!=1 && item.level==3){
          menuTmp=item
        }else if(secondMenu.clientType==1 && item.clientType!=1 && item.level!=3){
          let node = this.findNode(secondMenu,item)
          menuTmp=node
        }else {
          menuTmp = secondMenu
        }
        this.$store.commit("digitalPark/menuList",menuTmp);
        //快接入口菜单：概览类非二级菜单的快捷入口设置
        if (secondMenu.clientType == 1) {
          localStorage.setItem("shortcutList", JSON.stringify(secondMenu.childNode));
        } else {
          this.normalShortcutList();
        }
      }
      if (CommonFun.loadThreeD(item, JSON.parse(localStorage.getItem("menuList")))) {
        return;
      }
      CommonFun.loadPage(item);
      },
    setActiveIndex(menu) {
      if (menu.childNode.length != 0) {
        this.setActiveIndex(menu.childNode[0]);
      } else {
        let activeTmp = CommonFun.setMenuIndex(menu);
        this.$store.commit("digitalPark/activeMenuIndex", activeTmp);
        // Cookies.set("activeMenuIndex",activeTmp);
      }
      return;
    },
    findNode(menu, obj) {
      //menu起始是二级菜单
      menu.childNode.map(child => {
        if (child.id == obj.id) {
          this.findMenu = menu;
        } else {
          this.findNode(child, obj);
        }
      });
      return this.findMenu;
    },
    normalShortcutList() {
      let shortcutList = [];
      this.allMenuList.map(item => {
        item.childNode.map(child => {
          shortcutList.push(child);
        });
      });
      localStorage.setItem("shortcutList", JSON.stringify(shortcutList));
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
