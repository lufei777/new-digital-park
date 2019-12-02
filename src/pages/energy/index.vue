<template>
  <div class="energy-index">
    <CommonIndexLayout :menu-list="menuList" :menu-config="menuConfig"/>
  </div>
</template>

<script>
  import Theme from '../../components/theme'
  import CommonIndexLayout from '../commonProject/coms/commonIndexLayout'
  import CommonFun from '../../utils/commonFun'
  export default {
    name: 'EnergyIndex',
    components: {
      Theme,
      CommonIndexLayout
    },
    data () {
      return {
        menuList:CommonFun.menuData.childNode,//CommonFun.menuData.childNode,// JSON.parse(localStorage.menuList),
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
        this.$store.dispatch('analysis/resetStates')  //重置vuex
      },
    },
    methods: {
      selectMenuCallback(key){
        debugger
        console.log(key.path)
        if(key.path=='/energy/timeEnergy'){
          this.$store.commit('selectCondition/activeIndex',2)
        }
      }
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
