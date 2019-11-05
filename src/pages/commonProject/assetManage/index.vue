<template>
  <div class="asset-manage">
    <!--<div class="left-nav">-->
      <el-menu default-active="1-4-1"
               :class="isCollapse?'my-el-menu2':'my-el-menu'"
               :collapse="isCollapse"
               background-color="#394562"
               text-color="#B7BAC4"
               @open="handleOpen"
               @close="handleClose"
               @select="handleSelect"
      >
        <el-menu-item index="">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">我的资产</span>
        </el-menu-item>
        <el-submenu index="/assetMaintenance">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>资产信息维护</span>
          </template>
          <el-menu-item index="/assetGroup">资产组设置</el-menu-item>
          <el-menu-item index="/assetType">资产类型设置</el-menu-item>
        </el-submenu>
      </el-menu>
    <!--</div>-->
    <div class="right-content">
        <div class="asset-bread-crumb flex-align">
          <i class="el-icon-location"
             style="font-size: 30px;line-height: 70px;"
             @click="onClickCollapseBtn"
          ></i>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in assetBreadcrumb"
                                :key="index"
                                :to="item.path">{{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  let menuList=[{
    path:"/assetMaintenance",
    name:'资产信息维护'
  },{
    path:"/assetGroup",
    name:'资产组设置'
  },{
    path:"/assetType",
    name:'资产类型设置'
  }]
  import {mapState} from 'vuex'
  export default {
    name: 'AssetManage',
    components: {
    },
    computed:{
      ...mapState({
        assetBreadcrumb:state=>state.assetManage.assetBreadcrumb
      })
    },
    data () {
      return {
        menuList:menuList,
        isCollapse:false,
        // assetBreadcrumb:[{name:'资产信息维护',path:'/assetMaintenance'}]
      }
    },
    methods:{
      onClickNav(item){
        // let obj=JSON.parse(Cookies.get('assetBreadcrumb'))
        // obj.push(item)
        // Cookies.set('assetBreadcrumb',obj)
        // this.assetBreadcrumb=obj
        // let obj=this.assetBreadcrumb.find((item)=>{
        //   return item.path==obj.path
        // })
        // if(!obj){
        //   let tmp=this.assetBreadcrumb.concat(item)
        //   this.$store.commit('assetManage/assetBreadcrumb',tmp)
        // }
        this.$router.push(item.path)
      },
      handleOpen(key){
          this.$router.push(key)
      },
      handleClose(key){
        this.$router.push(key)
      },
      onClickCollapseBtn(){
        this.isCollapse=!this.isCollapse
      },
      handleSelect(index,indexPath){
        console.log(index,indexPath)
        if(index && index!=2){
          this.$router.push(index)
        }
      }
    },
    mounted(){
      document.title='资产管理'
      Cookies.set('assetBreadcrumb',[{name:'资产管理',path:'/assetManage'}])
    }
  }
</script>

<style lang="less">
  .asset-manage{
    height: 100%;
    .my-el-menu{
      float: left;
      height:100%;
      width:15%;

    }
    .my-el-menu2{
      float: left;
      height:100%;
    }
    /*.el-menu{*/
      /*height:100%;*/
    /*}*/
    .right-content{
      max-width: 100%;
      /*height:100%;*/
      overflow: auto;
    }
    .asset-bread-crumb{
      /*width:100%;*/
      height:70px;
      border:1px solid #ccc;
      color:#969CA8;
    }
    .el-submenu__title,.el-menu-item{
      font-size: 14px;
      &:hover{
        background-color: #416EFF !important;
      }
      a{
        color:#B7BAC4;
        text-decoration: none;
      }
    }
    .el-menu-item.is-active{
        background-color: #416EFF !important;
        color:#B7BAC4;
    }
    .el-submenu.is-active{
      background-color: #416EFF !important;
      color:#B7BAC4;
    }
  }
</style>
