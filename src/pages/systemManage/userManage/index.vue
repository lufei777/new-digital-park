<template>
  <div class="user-manage panel-container">
    <RenderPage :from-flag="1"></RenderPage>
  </div>
</template>

<script>

  import RenderPage from '../renderPage'
  export default {
    name: 'UserManage',
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
     created() {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
</style>
