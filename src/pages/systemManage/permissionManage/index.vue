<template>
  <div class="permission-manage panel-container">
    <PermissionTree />
  </div>

</template>

<script>
  import PermissionTree from '../coms/permissionTree'
  export default {
    name: 'menuManage',
    components: {
      PermissionTree
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
