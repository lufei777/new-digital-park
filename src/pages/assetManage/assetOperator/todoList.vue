<template>
  <div class="todo-list panel-container panel">
    <el-tabs type="border-card"  v-model="activeTab">
      <el-tab-pane label="待办">
        <TodoComs fromFlag="1"/>
      </el-tab-pane>
      <el-tab-pane label="已办">
        <TodoComs fromFlag="2"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import TodoComs from '../coms/todo'
  export default {
    name: 'TodoList',
    components: {
      TodoComs,
    },
    data () {
      return {
        activeTab:'0'
      }
    },
    computed:{
    },
    watch:{
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

