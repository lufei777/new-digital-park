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

        <sidebar-item class="nest-menu" :menu-data="item" :specialRoute="specialRoute"/>
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
  import CommonFun from "../../utils/commonFun";
  import {mapState} from 'vuex'
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
      firstMenuId(){
        return this.$route.query.firstMenuId
      },
      secondMenuId(){
        return this.$route.query.secondMenuId
      },
      menuModuleId(){
        return this.$route.query.menuModuleId
      },
      ...mapState({
        repeatRouteList : state => state.digitalPark.repeatRouteList
      }),
    },
    watch: {
      firstMenuId() {
        console.log("this.first",this.firstMenuId)
        if (this.firstMenuId && !this.specialRoute) {
          this.setMenuList()
        }
      },
      secondMenuId(){
        console.log("this.secpmd",this.secondMenuId)
        if (this.secondMenuId && !this.specialRoute) {
          this.setMenuList()
        }
      }
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
        return CommonFun.setMenuIndex(item, 1);
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
        } else {
          this.setMenuList(item)
        }
        this.normalShortcutList();
        CommonFun.loadPage(item);
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
      setMenuList(item) {

        let secondMenu = {}
        let firstMenu = this.allMenuList.find(first => {
          return first.id == (this.firstMenuId || item.firstMenuId);
        });
        secondMenu = firstMenu.childNode.find(second => {
          return second.id == (this.secondMenuId || item.secondMenuId);
        });
        this.$store.commit("digitalPark/menuList", secondMenu);
        let activeMenuIndex = this.$route.path
        if (this.$route.path == '/vibe-web') {
          let node = this.findNode(secondMenu.childNode,'id')
          activeMenuIndex = node.routeAddress
        } else {
          this.repeatRouteList.map((item)=>{
            if (this.$route.path.indexOf(item) != -1) {
              let node = this.findNode(secondMenu.childNode,'route')
              activeMenuIndex = node.id + node.routeAddress
            }
          })
        }
        this.$store.commit("digitalPark/activeMenuIndex",activeMenuIndex);
      },
      findNode(menu,flag){
        for(let i=0;i<menu.length;i++){
          let item = menu[i]
          let tmp = flag=='id'?item.id==this.menuModuleId:item.routeAddress==this.$route.path
          console.log(item,this.menuModuleId,item.id==this.menuModuleId)
          if(tmp){
            return item
          }else{
            return this.findNode(item.childNode,flag)
          }
        }
        return {}
      }
    },
    mounted() {
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
