<template>
  <div class="door-magnetic-coms">
    <DoorStatus :module-item="moduleItem" :fromFlag="2"/>
  </div>
</template>

<script>
  import DoorStatus from '../security/doorStatus'
  export default {
    name: '',
    components: {
      DoorStatus
    },
    props: ["moduleItem"],
    data () {
      return {
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
