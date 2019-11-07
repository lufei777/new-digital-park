<template>
  <div class="asset-manage">
     <div :class="menuConfig.isCollapse?'my-el-menu2':'my-el-menu'">
       <div v-show="!menuConfig.isCollapse" class="title">资产管理</div>
       <SideBar :menu-list="menuList" :menu-config="menuConfig"/>
     </div>
    <div class="right-content">
        <div class="asset-bread-crumb flex-align">
          <i :class="menuConfig.isCollapse?'iconzhankai':'iconshouqi'"
             class="iconfont collapse-icon"
             @click="onClickCollapseBtn"
          ></i>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in assetBreadcrumb"
                                :key="index"
                                :to="item.path">{{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script>
  let menuList=[{
    routeAddress:'$1',
    name:'首页',
    childNode:[],
    id:1,
    icon:'123'
  },{
    routeAddress:'$2',
    name:'我的资产',
    childNode:[],
    id:2,
    icon:'iconwodezichan'
  },{
    routeAddress:"/assetMaintenance",
    name:'资产信息',
    id:3,
    icon:'iconzichanxinxi',
    childNode:[{
      routeAddress:"/assetMaintenance",
      name:'资产信息维护',
      childNode:[],
      id:4
    },{
      routeAddress:"/assetGroup",
      name:'资产组设置',
      childNode:[],
      id:5
    },{
      routeAddress:"/assetType",
      name:'资产类型设置',
      childNode:[],
      id:6
    }]
  },{
    routeAddress:'/7',
    name:'管理资产',
    icon:'iconguanlizichan',
    id:7,
    childNode:[{
      routeAddress:"/7001",
      name:'资产领用',
      childNode:[],
      id:7001
    },{
      routeAddress:"/7002",
      name:'资产变更',
      childNode:[],
      id:7002
    },{
      routeAddress:"/assetType",
      name:'资产借用',
      childNode:[],
      id:7003
    },{
      routeAddress:"/7004",
      name:'资产归还',
      childNode:[],
      id:7004
    },{
      routeAddress:"/7005",
      name:'资产调拨',
      childNode:[],
      id:7005
    },{
      routeAddress:"/7006",
      name:'资产减损',
      childNode:[],
      id:7006
    }, {
      routeAddress:"/7007",
      name:'资产送修',
      childNode:[],
      id:7007
    },{
      routeAddress:"/7008",
      name:'资产报废',
      childNode:[],
      id:7008
    }]
  },{
    routeAddress:"/8",
    name:'资产台账',
    childNode:[],
    id:8,
    icon:'iconzichantaizhang'
  },{
    routeAddress:"/9",
    name:'资产盘库',
    childNode:[],
    id:9,
    icon:'iconzichanpanku'
  }]
  import {mapState} from 'vuex'
  import SideBar from '../../digitalPark/coms/SideBar'
  export default {
    name: 'AssetManage',
    components: {
      SideBar
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
        menuConfig:{
          bgColor:'#394562',
          textColor:'#B7BAC4',
          isCollapse:false,
        }
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
      document.title='资产管理'
      Cookies.set('assetBreadcrumb',[{name:'资产管理',path:'/assetManage'}])
      console.log($(".asset-manage").length)
    }
  }
</script>

<style lang="less">
  .asset-manage{
    height: 100%;
    background-color: #efefef;
    .left-nav{
      /*height:100%;*/
    }
    .my-el-menu{
      float: left;
      height:100%;
      width:15%;
      background-color:#394562 ;
    }
    .my-el-menu2{
      float: left;
      height:100%;
      background-color:#394562 ;
    }
    .right-content{
      max-width: 100%;
      /*height:100%;*/
      overflow: auto;
      background-color: #efefef;
    }
    .title{
      font-size: 24px;
      color:@white;
      text-align: center;
      margin:20px 0 40px 0 ;
    }
    .asset-bread-crumb{
      padding:0 15px;
      height:60px;
      /*border:1px solid #ccc;*/
      color:#969CA8;
      background-color: @white;
    }
    .collapse-icon{
      font-size: 24px;
      line-height: 70px;
      padding-right:20px;
    }
    .router-view{
      padding:20px 20px 0 20px;
    }
    .el-menu{
      border-right: none;
    }
    .el-submenu__title,.el-menu-item{
      font-size: 18px;
      &:hover{
        background-color: #416EFF !important;
      }
      a{
        color:#B7BAC4;
        text-decoration: none;
      }
    }
    .nest-menu{
      font-size: 16px;
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
