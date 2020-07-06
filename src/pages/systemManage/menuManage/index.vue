<template>
  <div class="menu-manage panel-container">
    <z-table :ref="tableConfig.ref" :options="tableConfig" class="panel">
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="editRow(row)">编辑</el-button>
        <!--<el-button type="text" @click="deleteRow(row)">删除</el-button>-->
      </template>
    </z-table>
  </div>

</template>

<script>
  import SystemManageApi from '@/service/api/systemManage'
  import {SystemDic} from "@/utils/dictionary";

  export default {
    name: 'menuManage',
    components: {},
    props: [],
    data() {
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
            label: '菜单名称',
            prop: 'name'
          }, {
            label: '菜单编号',
            prop: 'code'
          }, {
            label: '排序',
            prop: 'sequence'
          }, {
            label: '图标',
            prop: 'icon',
            formatter: function (row) {
              return row.icon ? "<i class ='iconfont " + row.icon + "'></i>" : '--'
            }
          }, {
            label: '可见',
            prop: 'isHide',
            formatter: function (row) {
              return SystemDic.hiddenStatus[row.isHidden]
            }
          }, {
            label: '菜单路径',
            prop: 'routeAddress'
          }],
          operation: {
            width: 200
          },
          uiConfig: {
            height: "auto",
            pagination: false,
          },
          customTop: true,
          tableMethods: {},
        },
      }
    },
    computed: {},
    watch: {},
    methods: {
     async getMenuList() {
        let res = await SystemManageApi.getMenuList()
        this.tableConfig.data=res[0].childNode
      },
      editRow(row) {
        this.$router.push(`/addMenu?menuId=${row.id}`)
      },
      deleteRow(row) {
      },
    },
    mounted() {
      this.getMenuList()
    }
  }
</script>

<style lang="less" scoped>
</style>
