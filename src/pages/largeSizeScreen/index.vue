<template>
  <div class="large-size-screen">
    <component :is="curCom" :ref="curCom" :fromFlag="fromFlag"></component>
  </div>
</template>

<script>
  import Normal from './normal'
  import Dashboard from '@/pages/digitalPark/home/dashboardNew'
  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Normal,
      Dashboard
    },
    props:['fromFlag'],  //fromFlag 1代表配置页
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
    background-image: url('../../../static/image/digitalPark/home.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
