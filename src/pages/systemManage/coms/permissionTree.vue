<template>
  <div class="panel">
    <div class="flex-row-reverse operator-btn-box" v-if="fromFlag!=1">
      <el-button type="primary" @click="onClickExportBtn">导出</el-button>
      <el-button type="primary" @click="onClickImportBtn">导入</el-button>
    </div>
    <z-table :ref="tableConfig.ref" :options="tableConfig"
             @selection-change="onSelectionChange"
             @select="onSelectPermission"
    >
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="editRow(row)">编辑</el-button>
        <!--<el-button type="text" @click="deleteRow(row)">删除</el-button>-->
      </template>
    </z-table>
  </div>
</template>

<script>
  import SystemManageApi from '@/service/api/systemManage'

  export default {
    name: 'PermissionTree',
    components: {},
    props: ['fromFlag'], //fromFlag 1:来自角色管理
    data() {
      let _this = this
      return {
        tableConfig: {
          ref: "tableRef",
          data: [],
          props: {
            rowKey: "id",
          },
          treeProps: {
            children: 'childNode',
            hasChildren: 'hasChildren'
          },
          columnConfig: [{
            label: '权限名称',
            prop: 'name'
          }, {
            label: '权限描述',
            prop: 'pDesc'
          }],
          operation: _this.fromFlag==1?false:{
            width: 150,
          },
          uiConfig: {
            height: "auto",
            selection: _this.fromFlag==1?true:false,
            pagination:false
          },
          customTop: true,
          tableMethods: {},
        },
      }
    },
    computed: {},
    watch: {},
    methods: {
      async getPermissionTree() {
        let res = await SystemManageApi.getPermissionTree()
        this.tableConfig.data = res[0].childNode
      },
      onClickExportBtn() {
      },
      onClickImportBtn() {
      },
      onSelectionChange(val){
        // console.log(val);
      },
      onSelectPermission(val,row){
        console.log("val",val,row);
      }
    },
    mounted() {
      this.getPermissionTree()
    }
  }
</script>
