<template>
  <div class="asset-manage">
    <CommonIndexLayout :menu-list="menuList" :menu-config="menuConfig" />
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
  import CommonIndexLayout from '../commonProject/coms/commonIndexLayout'
  export default {
    name: 'AssetManage',
    components: {
      CommonIndexLayout
    },
    data () {
      return {
        menuList:menuList,
        menuConfig:{
          bgColor:'#394562',
          textColor:'#B7BAC4',
          isCollapse:false,
          moduleName:'资产管理',
          moduleLogo:'iconzichanguanli'
        },
      }
    },
    methods:{
    },
    mounted(){
      document.title='资产管理'
    }
  }
</script>

<style lang="less">
  .asset-manage{
    /*height: 100%;*/
    /*background-color: #efefef;*/
  }
</style>
