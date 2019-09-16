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
    margin-top: 85px;
      .left-zoom-nav{
        width:17%;
        float: left;
        position: fixed;
        height: 100%;
      }
      .right-content{
        width:83%;
        background: #f2f2f2;
        padding:10px;
        float: right;
        box-sizing: border-box;
      }
  }
</style>
