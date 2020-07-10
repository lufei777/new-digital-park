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
    },
    // firstMenuId(){
    //   return this.$route.query.firstMenuId
    // },
    // secondMenuId(){
    //   return this.$route.query.secondMenuId
    // },
    queryIdObj(){
      return this.$route.query
    }
  },
  watch:{
    queryIdObj(){
      if(this.queryIdObj && !this.specialRoute){
        console.log("watch")
        this.setMenuList()
      }
    },
    // secondMenuId(){
    //   if(this.secondMenuId && !this.specialRoute){
    //     console.log("watch")
    //     this.setMenuList()
    //   }
    // },
  },
  methods: {
    onClickSubmenu(item) {
      if (!this.specialRoute || item.level == 1) {
        return;
      }
      Cookies.set("moduleType", 2);
      this.setMenu(item);
    },
    getMenuIndex(item) {
      return CommonFun.setMenuIndex(item,1);
    },
    onClickLastMenu(item) {
      if (this.specialRoute) {
        //瀑布流
        this.setMenu(item);
      } else {
        CommonFun.loadPage(item);
      }
    },
    setMenu(item) {
      //菜单目前都存为2级菜单，沿用之前逻辑使用level判断
      //待产品确定菜单管理设计后再更改判断依据

      if (item.level == 2) {
        this.$store.commit("digitalPark/menuList", item);
        this.normalShortcutList();
      } else {
        this.setMenuList(item)
       /* let firstMenu = this.allMenuList.find(first => {
          return first.id == this.firstMenuId;
        });
        secondMenu = firstMenu.childNode.find(second => {
          return second.id == item.secondMenuId;
        });
        let menuTmp={}
    /!*    //菜单：如果二级是客户端类概览页且点击的子集为是跳网页，则不存全部菜单
        if(secondMenu.clientType==1 && item.clientType!=1 && item.level==3){
          menuTmp = item
        }else if(secondMenu.clientType==1 && item.clientType!=1 && item.level!=3){
          menuTmp = this.findNode(secondMenu,item,secondMenu)
        }else {
          menuTmp = secondMenu
        }*!/
        menuTmp = secondMenu
        this.$store.commit("digitalPark/menuList",menuTmp);

       /!* //快接入口菜单：概览类非二级菜单的快捷入口设置
        if (secondMenu.clientType == 1) {
          localStorage.setItem("shortcutList", JSON.stringify(secondMenu.childNode));
        } else {
          this.normalShortcutList();
        }*!/
        this.normalShortcutList();*/
      }
      CommonFun.loadPage(item);
    },
    findNode(menu, obj,secondMenu) {
      //menu起始是二级菜单,返回的是第三层
      menu.childNode.map(child => {
        if (child.id == obj.id) {
          if(obj.level==4){
            this.findMenu = menu;
          }else{
            this.findNode(secondMenu,menu,secondMenu);
          }
        } else {
          this.findNode(child,obj,secondMenu);
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
    },
    setMenuList(item){
      // console.log(this.firstMenuId,this.secondMenuId)
      let secondMenu={}
      let firstMenu = this.allMenuList.find(first => {
        console.log(this.queryIdObj.firstMenuId)
        return first.id == (this.queryIdObj.firstMenuId || item.firstMenuId);
      });
      console.log("fis",firstMenu)
      secondMenu = firstMenu.childNode.find(second => {
        return second.id == (this.queryIdObj.secondMenuId || item.secondMenuId);
      });
      this.$store.commit("digitalPark/menuList",secondMenu);
      this.normalShortcutList();
    }
  },
  mounted() {
    // console.log(this.item);
  }
};
</script>
<style lang="less" scoped>
.horizonal-menu {
  display: flex;
  &:focus {
    outline: unset !important;
  }
}
</style>
