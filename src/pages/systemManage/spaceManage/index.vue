<template>
  <div class="space-manage panel-container">
    <RenderPage :from-flag="2"></RenderPage>
  </div>
</template>

<script>
  import RenderPage from '../coms/renderPage'
  export default {
    name: 'SpaceManage',
    components: {
      RenderPage
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    async created(){
    },
    async mounted() {
    }
  }
</script>

<style lang="less" scoped>
</style>
