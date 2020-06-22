<template>
  <div class="access-control">
    <DoorStatus :module-item="moduleItem" :fromFlag="1"/>
  </div>
</template>

<script>
  import DoorStatus from './doorStatus'
  export default {
    name: 'accessControl',
    components: {
      DoorStatus
    },
    props: ["moduleItem"],
    data () {
      return {
        chartData:[]
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
    },
    mounted(){
    }
  }
</script>

<style lang="less">
</style>
