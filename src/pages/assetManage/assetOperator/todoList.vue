<template>
  <div class="todo-list panel-container panel">
    <el-tabs type="border-card" @tab-click="onClickTab" v-model="activeTab">
      <el-tab-pane label="待办">
        <TodoComs />
      </el-tab-pane>
      <el-tab-pane label="已办">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import TodoComs from '../coms/todo'
  export default {
    name: 'TodoList',
    components: {
      TodoComs,

    },
    data () {
      return {
        activeTab:1
      }
    },
    methods: {
      onClickTab(){}
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .todo-list{
    .el-tabs{
      height:100%;
    }
  }
</style>

