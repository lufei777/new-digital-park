<template>
  <div class="department-manage panel-container">
    <RenderPage :from-flag="3"></RenderPage>
  </div>
</template>

<script>

  import RenderPage from '../coms/renderPage'
  export default {
    name: 'DepartmentManage',
    components: {
      RenderPage
    },
    data() {
      return {}
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
