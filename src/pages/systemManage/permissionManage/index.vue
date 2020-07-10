<template>
  <div class="permission-manage panel-container">
    <RenderPage :from-flag="4"/>
  </div>

</template>

<script>
  import PermissionTree from '../coms/permissionTree'
  import RenderPage from '../coms/renderPage'
  export default {
    name: 'menuManage',
    components: {
      PermissionTree,
      RenderPage
    },
    props: [],
    data() {
      return {
      }
    },
    computed: {
    },
    watch: {},
    methods: {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .permission-manage{

  }
</style>
