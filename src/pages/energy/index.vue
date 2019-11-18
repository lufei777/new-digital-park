<template>
  <div class="energy-index">
    <!--<Theme />-->
    <!--<NavList />-->
    <!--<router-view></router-view>-->
    <CommonIndexLayout :menu-list="menuList" :menu-config="menuConfig"/>
  </div>
</template>

<script>
  import NavList from '../../components/navList'
  import Theme from '../../components/theme'
  import CommonIndexLayout from '../commonProject/coms/commonIndexLayout'
  import CommonFun from '../../utils/commonFun'
  export default {
    name: 'EnergyIndex',
    components: {
      NavList,
      Theme,
      CommonIndexLayout
    },
    data () {
      return {
        menuList: CommonFun.menuData.childNode,//JSON.parse(Cookies.get('menuList')),
        menuConfig:{
          bgColor:'#394562',
          textColor:'#B7BAC4',
          isCollapse:false,
          activeIndex:'',
          moduleName:'能源管理',
          moduleLogo:'iconnengyuanguanli'
        },
      }
    },
    watch:{
      $route(to, from) {
        this.$store.dispatch('conditionSelect/resetStates')  //重置vuex
        this.$store.dispatch('analysis/resetStates')  //重置vuex
      },
    },
    methods: {
    },
    created(){
      this.$store.dispatch('analysis/setDefaultNode')
    },
    mounted(){
      document.title='能源管理'
    }
  }
</script>

<style lang="less">
  .energy-index{
    height: 100%;
  }
</style>
