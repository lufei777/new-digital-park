<template>
  <div class="asset-manage">
    <!--<div class="left-nav">-->
      <el-menu default-active="1-4-1"
               :class="isCollapse?'my-el-menu2':'my-el-menu'"
               :collapse="isCollapse"
               background-color="#394562"
               text-color="#B7BAC4"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">我的资产</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>资产信息维护</span>
          </template>
          <el-menu-item index="1-1">资产组设置</el-menu-item>
          <el-menu-item index="1-2">资产类型设置</el-menu-item>
        </el-submenu>
      </el-menu>
    <!--</div>-->
    <div class="right-content">
        <div class="asset-bread-crumb">
          <i class="el-icon-location"
             style="font-size: 30px;line-height: 70px;"
             @click="onClickCollapseBtn"
          ></i>
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
        dataList:['1','2','3','4'],
        activeName:'1'
        // assetBreadcrumb:[{name:'资产管理',path:'/assetManage'}]
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
      handleOpen(){},
      onClickCollapseBtn(){
        this.isCollapse=!this.isCollapse
        // if(this.isCollapse){
        //   $(".my-el-menu").('width')
        // }
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
    }
    /*.el-submenu__icon-arrow{*/
      /*right:0;*/
    /*}*/
    /*.el-submenu{*/
      /*padding:0 20px;*/
    /*}*/
    /*.el-breadcrumb{*/
      /*padding:20px 0;*/
    /*}*/
    /*a{*/
      /*margin:0 20px;*/
      /*&:hover{*/
        /*cursor: pointer;*/
      /*}*/
    /*}*/
  }
</style>
