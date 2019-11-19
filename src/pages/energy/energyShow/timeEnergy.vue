<template>
  <div class="time-energy">
    <TbhbAnalysis />
  </div>
</template>

<script>
  import TbhbAnalysis from '../coms/tbhbAnalysis'
  export default {
    name: 'TimeEnergy',
    components: {
      TbhbAnalysis
    },
    data () {
      return {
      }
    },
    $route(to, from) {
      // 路由改变发起重置
      debugger
      console.log(to,from)
      this.$store.dispatch('conditionSelect/resetStates')
    },
    computed: {
    },
    methods: {
    },
    mounted(){
    },
    created(){
      this.$store.commit("conditionSelect/tbhbEnergy",[{id:44,name:'空调用电'}])
    }
  }
</script>

<style lang="less">
  .time-energy{
      .left-zoom-nav{
        width:250px;
        float: left;
        position: fixed;
        height: 100%;
        left:270px;
      }
      .right-content{
        width:83%;
        background: #f2f2f2;
        float: right;
        box-sizing: border-box;
      }
  }
</style>
