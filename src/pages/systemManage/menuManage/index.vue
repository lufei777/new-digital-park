<template>
  <div class="menu-manage panel-container">
    <z-table :ref="tableConfig.ref" :options="tableConfig" class="panel">
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="editRow(row)">编辑</el-button>
        <el-button type="text" @click="deleteRow(row)">删除</el-button>
      </template>
    </z-table>
  </div>

</template>

<script>
  export default {
    name: 'menuManage',
    components: {},
    props: [],
    data() {
      return {
        tableConfig: {
          ref: "tableRef",
          data:[],
          // serverMode: {
            // url: config.serverUrl,
            // data: {...pageInfo}
          // },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          props:{
            rowKey:"id",
            treeProps:{
              children: 'childNode',
              hasChildren: 'hasChildren'
            },
          },
          treeProps:{
            children: 'childNode',
            hasChildren: 'hasChildren'
          },
          columnConfig:[{
            label:'菜单编号',
            prop:'code'
          },{
            label:'菜单名称',
            prop:'name'
          }],
          operation: {
            width: 200
          },
          uiConfig: {
            height: "auto",
          },
          customTop: true,
          tableMethods: {},
        },
      }
    },
    computed: {},
    watch: {},
    methods: {
      editRow(row){},
      deleteRow(row){},
    },
    mounted() {
      let data = [{
        id:1,
        code:'001',
        name:'运维管理',
        childNode:[{
          id:1001,
          code:'1001',
          name:'系统管理'
        }]
      }]
      this.tableConfig.data = data
    }
  }
</script>

<style lang="less" scoped>
</style>
