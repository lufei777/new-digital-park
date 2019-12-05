<template>
  <!--<div class="menu-item">-->
    <!--<template >-->
      <el-menu-item v-if="item.childNode.length == 0"
                    :index="specialRoute?item.id + item.routeAddress:item.routeAddress">
         <i v-if='item.icon' :class="['iconfont',item.icon]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    <!--</template>-->
    <!--<template v-else>-->
      <el-submenu v-else :index="specialRoute?item.id + item.routeAddress:item.routeAddress"
                  @click.native="onClickSubmenu(item)"
      >
        <template slot="title">
          <i v-if='item.icon' :class="['iconfont',item.icon]"></i>
          <span>{{item.name}}</span>
        </template>

        <sidebar-item
          class="nest-menu"
          v-for="child in item.childNode"
          :item="child"
          :key="child.id"
          :specialRoute="specialRoute"
          :menuList="menuList"
        />
      </el-submenu>
    <!--</template>-->

  <!--</div>-->
</template>

<script>
  import CommonFun from '../../utils/commonFun'
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    specialRoute:{
      // type:Boolean,
      // required:false
    },
    menuList:{
      type:Array
    }
  },
  methods:{
    onClickSubmenu(item){
      if(!this.specialRoute) return ;
      console.log(this.menuList)
      if(item.level==1){
        return;
      }else{
        Cookies.set('moduleType',2)
        if(item.level==2){
          localStorage.setItem('menuList',JSON.stringify(item.childNode))
        }else{
          let firstMenu = this.menuList.find((first)=>{
            return first.id==item.firstMenuId
          })
          let secondMenu = firstMenu.childNode.find((second)=>{
            return second.id==item.secondMenuId
          })
          localStorage.setItem('menuList',JSON.stringify(secondMenu.childNode))
          Cookies.set('activeMenuIndex',item.routeAddress)
        }
        if(item.routeAddress){
          if(item.routeAddress.indexOf('@') != -1){
            CommonFun.loadOldPage(item);
          }else{
            setTimeout(()=>{
              this.$router.push(item.routeAddress);
            },500)
          }
        }else{
          this.$router.push('/digitalPark/defaultPage?type=2')
        }
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
