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
  export default {
    name: 'menuManage',
    components: {},
    props: [],
    data() {
      return {
        tableConfig: {
          ref: "tableRef",
          data:[],
          serverMode: {
            // url: SystemManageApi.getMenuList,
            // data: {...pageInfo}
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          props:{
            rowKey:"id",
          },
          treeProps:{
            children: 'childNode',
            hasChildren: 'hasChildren'
          },
          columnConfig:[{
            label:'菜单名称',
            prop:'name'
          },{
            label:'菜单编号',
            prop:'code'
          },{
            label:'排序',
            prop:'sequence'
          },{
            label:'图标',
            prop:'icon',
            formatter:function (row) {
              // return row.icon
              // console.log("<i class ='iconfont "+row.icon+"'></i>")
              return row.icon?"<i class ='iconfont "+row.icon+"'></i>":'--'
            }
          },{
            label:'可见',
            prop:'isHide',
            formatter:function (row) {
              // return row.icon
              return row.isHide==1?'可见':'隐藏'
            }
          },{
            label:'菜单路径',
            prop:'routeAddress'
          }],
          operation: {
            width: 200
          },
          uiConfig: {
            height: "auto",
            pagination:false,
          },
          customTop: true,
          tableMethods: {},
        },
      }
    },
    computed: {},
    watch: {},
    methods: {
      async getMenuList(){
        let res = await SystemManageApi.getMenuList()
        this.tableConfig.data = res[0].childNode
      },
      editRow(row){},
      deleteRow(row){},
    },
    mounted() {
      this.getMenuList()
      // let data = [{
      //   id:1,
      //   code:'001',
      //   name:'运维管理',
      //   childNode:[{
      //     id:1001,
      //     code:'1001',
      //     name:'系统管理'
      //   }]
      // }]
      // this.tableConfig.data = data
    }
  }
</script>

<style lang="less" scoped>
</style>
