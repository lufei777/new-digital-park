<template>
  <el-dialog
    title="提示"
    :visible="showModal"
    width="50%"
    custom-class="popup-style"
    :before-close="onBeforeClose"
    >
    <AddPermission :hide-modal="onBeforeClose"/>
  </el-dialog>
</template>

<script>
  import AddPermission from '../permissionManage/addPermission'
  export default {
    name: 'SystemAddModal',
    components: {
      AddPermission
    },
    props: ['showModal'],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      onBeforeClose(){
        this.$parent.showModal = false
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
</style>
