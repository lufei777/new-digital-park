<template>
  <div class="asset-manage">
    <a v-for="(item,index) in menuList" :key="index" @click="onClickNav(item)">{{item.name}}</a>
     <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
       <!--<el-breadcrumb-item v-for="(item,index) in assetBreadcrumb"-->
                           <!--:key="index"-->
                           <!--:to="item.path"-->
       <!--&gt;-->
         <!--{{item.name}}</el-breadcrumb-item>-->
     <!--</el-breadcrumb>-->
     <router-view></router-view>
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
    padding:0 20px;
    .el-breadcrumb{
      padding:20px 0;
    }
    a{
      margin:0 20px;
      &:hover{
        cursor: pointer;
      }
    }
  }
</style>
