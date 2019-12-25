<template>
  <div class="energy-index">
    <CommonLogin url="/energy"/>
  </div>
</template>

<script>
  import CommonLogin from '../../../components/login/index'
  export default {
    name: 'EnergyLogin',
    components: {
      CommonLogin
    },
    data () {
      return {
      }
    },
  }
</script>

<style lang="less">
  .energy-index{
    height: 100%;
  }
</style>
