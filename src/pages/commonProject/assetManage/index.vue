<template>
  <div class="asset-manage">
     <div :class="menuConfig.isCollapse?'my-el-menu2':'my-el-menu'">
       <Sidebar :menu-list="menuList" :menu-config="menuConfig"/>
     </div>
    <div :class="menuConfig.isCollapse?'right-content2':'right-content'">
        <div class="asset-bread-crumb flex-align">
          <i :class="menuConfig.isCollapse?'iconzhankai':'iconshouqi'"
             class="iconfont collapse-icon hover-pointer"
             @click="onClickCollapseBtn"
          ></i>
          <breadCrumb></breadCrumb>
          <div class="asset-nav-operator-box">
            <NavOperator class='asset-nav-operator' :showGoback="true"/>
          </div>
        </div>
        <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script>
  let menuList=[{
    routeAddress:'$1',
    name:'概览',
    childNode:[],
    id:1,
    icon:'icongailan'
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
  },{
    routeAddress:"/10",
    name:'入库管理',
    childNode:[],
    id:10,
    icon:'iconrukuguanli'
  },{
    routeAddress:"/11",
    name:'统计分析',
    childNode:[],
    id:11,
    icon:'icontongjifenxi'
  }]
  import {mapState} from 'vuex'
  import Sidebar from '../../../components/commonMenu/SideBar'
  import NavOperator from '../../digitalPark/coms/navOperator'
  import breadCrumb from '@/components/breadCrumb'
  export default {
    name: 'AssetManage',
    components: {
      Sidebar,
      NavOperator,
      breadCrumb
    },
    data () {
      return {
        menuList:menuList,
        menuConfig:{
          bgColor:'#394562',
          textColor:'#B7BAC4',
          isCollapse:false,
          activeIndex:'',
          moduleName:'资产管理',
          moduleLogo:'iconzichanguanli'
        },
        breadcrumb:Cookies.get('breadcrumb')?JSON.parse(Cookies.get('breadcrumb')):
                   [{name:'资产管理',routeAddress:'/assetManage'}]
      }
    },
    computed:{
      ...mapState({
        tmpBreadcrumb:state=>state.digitalPark.tmpBreadcrumb
      })
    },
    watch:{
      tmpBreadcrumb(){
        this.breadcrumb=JSON.parse(Cookies.get('breadcrumb'))
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
      if(!Cookies.get('breadcrumb')){
        Cookies.set('breadcrumb',[{name:'资产管理',routeAddress:'/assetManage'}])
      }
      if(Cookies.get('activeIndex')){
        this.menuConfig.activeIndex=Cookies.get('activeIndex')
      }else{
        this.menuConfig.activeIndex=this.menuList[0].routeAddress
      }
    }
  }
</script>

<style lang="less">
  .asset-manage{
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
    }
    .my-el-menu2{
      width:80px;
    }
    .right-content{
      max-width: 100%;
      /*height:100%;*/
      overflow: auto;
      background-color: #efefef;
      margin-left: 250px;
    }
    .right-content2{
      margin-left: 80px;
    }
    .asset-bread-crumb{
      padding:0 20px;
      height:60px;
      /*border:1px solid #ccc;*/

      background-color: @white;
    }
    .collapse-icon{
      font-size: 24px;
      line-height: 70px;
      padding-right:20px;
      color:#969CA8;
    }
    .router-view{
      padding:20px 20px 0 20px;
    }
    .asset-nav-operator-box{
      flex-grow: 1;
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
