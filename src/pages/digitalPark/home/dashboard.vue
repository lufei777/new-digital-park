<template>
  <div class="dashboard-park-home-page">
    <div class="dashboard-left">

    </div>
    <div class="dashboard-center">

    </div>
    <div class="dashboard-right">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'DashBoardHomePage',
    components: {
    },
    data () {
      return {

      }
    },
    methods:{
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .dashboard-park-home-page{
    display: flex;
    height:100%;
  }
  .dashboard-left{
    width:25%;
    background: pink;
    height:100%;
  }
  .dashboard-center{
    width:50%;
    background: yellow;
  }
  .dashboard-right{
    width:25%;
    background: pink;
  }
</style>
