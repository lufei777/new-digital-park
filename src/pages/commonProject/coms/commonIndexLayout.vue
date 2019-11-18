<template>
  <div class="common-index-layout">
    <div :class="menuConfig.isCollapse?'my-el-menu2':'my-el-menu'">
      <Sidebar :menu-list="menuList" :menu-config="menuConfig"/>
    </div>
    <div :class="menuConfig.isCollapse?'right-content2':'right-content'">
      <div :class="menuConfig.isCollapse?'right-content-header2':'right-content-header'">
        <div class="flex-align asset-bread-crumb">
          <i :class="menuConfig.isCollapse?'iconzhankai':'iconshouqi'"
             class="iconfont collapse-icon hover-pointer"
             @click="onClickCollapseBtn"
          ></i>
          <breadCrumb></breadCrumb>
        </div>
        <div class="asset-nav-operator-box">
          <NavOperator class='asset-nav-operator' :showGoback="true"/>
        </div>
      </div>
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../../../components/commonMenu/SideBar'
  import NavOperator from '../../digitalPark/coms/navOperator'
  import breadCrumb from '@/components/breadCrumb'
  export default {
    name: 'CommonIndexLayout',
    props:['menuList','menuConfig'],
    components: {
      Sidebar,
      NavOperator,
      breadCrumb
    },
    data () {
      return {
      }
    },
    computed:{
    },
    watch:{
    },
    methods:{
      onClickNav(item){
        this.$router.push(item.path)
      },
      handleOpen(key){
        this.$router.push(key)
      },
      handleClose(key){
        this.$router.push(key)
      },
      onClickCollapseBtn(){
        this.menuConfig.isCollapse=!this.menuConfig.isCollapse
      },
      handleSelect(index,indexPath){
        console.log(index,indexPath)
        if(index && index!=2){
          this.$router.push(index)
        }
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .common-index-layout{
    height: 100%;
    background-color: #efefef;
    .my-el-menu,.my-el-menu2{
      float: left;
      height:100%;
      /*width:15%;*/
      background-color:#394562 ;
      position: fixed;
      width:250px;
      overflow-y: auto;
      overflow-x: unset;
      z-index:999999999;
    }
    .my-el-menu2{
      width:80px;
    }
    .right-content,.right-content2{
      max-width: 100%;
      /*height:100%;*/
      overflow: auto;
      background-color: #efefef;
      margin-left: 250px;

    }
    .right-content2{
      margin-left: 80px;
    }
    .right-content-header,.right-content-header2{
      padding:0 20px;
      height:70px;
      background-color: @white;
      position: fixed;
      /*width:100%;*/
      box-sizing: border-box;
      z-index: 99;
      overflow: hidden;
      left:250px;
      right:0;
    }
    .right-content-header2{
      left:80px;
    }
    .asset-bread-crumb{
      float: left;
      width:60%;
    }
    .collapse-icon{
      font-size: 24px;
      line-height: 60px;
      padding-right:20px;
      color:#969CA8;
      float: left;
    }
    .router-view{
      padding:20px 20px 0 20px;
      margin-top: 70px;
    }
    .asset-nav-operator-box{
      /*flex-grow: 1;*/
      float: right;
      width: 40%;
      line-height: 70px;
    }
    .asset-nav-operator{
      float: right;
    }
    .el-menu{
      border-right: none;
    }
    .el-submenu__title,.el-menu-item{
      /*font-size: 18px;*/
      &:hover{
        background-color: #008DEA !important;
        color:@white !important;
        i{
          color:@white;
        }
      }

    }
    .nest-menu{
      /*font-size: 16px;*/
    }
    .el-menu-item.is-active{
      background-color: #008DEA !important;
      color:@white;
    }
    .el-submenu.is-active{
      background-color: #008DEA !important;
      color:@white;
    }
  }
</style>
