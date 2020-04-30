<template>
  <div class="large-size-screen">
    <component :is="curCom" :ref="curCom" :fullStatus="fullStatus"></component>
  </div>
</template>

<script>
  import Normal from './normal'
  import YiDianCity from './yiDianCity'
  import Dashboard from '@/pages/digitalPark/home/dashboardNew'
  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Normal,
      Dashboard,
      YiDianCity
    },
    props:['fullStatus'],  //配置页时是否是全屏状态
    data () {
      return {
        width:0,
        height:0,
        curCom:''
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      getComponent(){
        this.width = document.body.offsetWidth
        this.height = document.body.offsetHeight
        if(this.width<2610 && this.height<1468){
          this.curCom = 'Dashboard'
        }else{
          this.curCom = 'Normal'
        }
      },
      getLargeScreenModuleList(){
        this.$refs[this.curCom].getLargeScreenModuleList &&
        this.$refs[this.curCom].getLargeScreenModuleList()
      },
      setInnerDragFlag(flag){
        this.$refs[this.curCom].setInnerDragFlag &&
        this.$refs[this.curCom].setInnerDragFlag(flag)
      },
      updateInnerModule(id){
        this.$refs[this.curCom].updateInnerModule &&
        this.$refs[this.curCom].updateInnerModule(id)
      },
      setItemDragFlag(list){
        this.$parent.setItemDragFlag &&
        this.$parent.setItemDragFlag(list)
      },
      sureUpdateUserProModules(){
        this.$refs[this.curCom].updateLargeScreenModule &&
        this.$refs[this.curCom].updateLargeScreenModule()
      }
    },
    mounted(){
      let _this = this
      this.getComponent()
      $(window).resize(function(){
        _this.getComponent()
      })
    }
  }
</script>

<style lang="less">
  .large-size-screen{
    height:100%;
  }
</style>
