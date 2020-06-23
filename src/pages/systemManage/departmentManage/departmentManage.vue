<template>
  <div class="department-manage system-manage panel-container">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="dept-tree-box radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content panel-container">
      <div class="choose-box flex-align radius-shadow panel">
        <div class="item-group flex-align-center">
          <label>编号：</label>
          <el-input v-model="searchParams.did"/>
        </div>
        <div class="item-group flex-align-center">
          <label>机构简称：</label>
          <el-input v-model="searchParams.name"/>
        </div>
        <div class="item-group flex-align-center">
          <label>机构全称：</label>
          <el-input v-model="searchParams.abbr"/>
        </div>
        <div class="item-group">
          <el-button type="primary"  @click="onClickSearchBtn">搜索</el-button>
        </div>
      </div>
      <div class="table-wrapper radius-shadow panel">
        <div class="operator-btn-box flex-row-reverse">
          <el-button type="primary"  @click="deleteTip">删除</el-button>
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="editRow(row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)">删除</el-button>
            <el-button type="text" @click="assignRole(row)">分配角色</el-button>
          </template>
        </z-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import CommonApi from '@/service/api/common'
  import Tree from '@/components/tree/index'

  export default {
    name: 'DepartmentManage',
    components: {
      Tree
    },
    data() {
      return {
        treeList: [],
        treeConfig: {
          defaultExpandedkeys: [],
          onClickTreeNodeCallBack: this.onClickItemTree,
        },

        departList: {},
        showAdd: false,
        curPage: 1,
        searchParams:{
          parent: 0,
          did: '',
          name: '',
          abbr: '',
        },
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url: CommonApi.queryDeptList,
            data: {}
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          columnConfig: [{
            label: '编号',
            prop: 'id'
          },{
            label: '机构简称',
            prop: 'name'
          }, {
            label: '机构全称',
            prop: 'mail'
          }],
          operation: {
            width: 200
          },
          uiConfig: {
            height: "auto",
            selection: true,
          },
          customTop:true,
          tableMethods: {},
        },
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse: state => state.digitalPark.menuIsCollapse
      })
    },
    methods: {
      async getDeptTree() {
        this.treeList = await CommonApi.getDeptTree()
        this.treeConfig.defaultExpandedkeys = [this.treeList[0].id]
        this.department = this.treeList[0].id
      },
      onClickItemTree(val) {
        this.parent = val.id
      },
      async queryDeptList() {
        let res = await CommonApi.queryDeptList({
          parent: this.parent,
          did: this.did,
          name: this.name,
          abbr: this.abbr
        })
        if (!res || !res.total) {
          res = {
            rows: [],
            total: 0
          }
        }
        res.labelList = [{name: '', prop: '', type: 'selection'},
          {name: '编号', prop: 'did'},
          {name: '机构简称', prop: 'name'},
          {name: '机构全称', prop: 'abbr'}]
        res.dataList = res.rows
        res.hideExportBtn = true
        res.showOperator = true
        this.departList = res
      },
      onClickSearchBtn() {
        this.curPage = 1
        this.queryDeptList()
      },
      deleteRow(data) {
        this.deleteId = data.did
        this.deleteTip()
      },
      async sureDelete() {
        await CommonApi.deleteUser({
          ids: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getUserList()
      },
      handleSelectionChange(val) {
        let tmp = val.map((item) => item.did)
        this.deleteId = tmp.join(",")
      },
      deleteTip() {
        if (!this.deleteId) {
          this.$message({
            type: 'warning',
            message: '请先选择机构！',
            duration: 1000
          });
          return;
        }
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sureDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
      editRow(data) {
        console.log(data)
        this.$router.push(`/addDept?deptId=${data.did}`)
      },
      onClickAddBtn() {
        this.$router.push("/addDept")
      },
      fixTree() {
        $(".dept-tree-box").css({
          height: ($(document).height() - 110) + 'px'
        })
      },
    },
    async mounted() {
      await this.getDeptTree()
      await this.queryDeptList()
      this.fixTree()
      $(window).resize(() => {
        this.fixTree()
      })
    }
  }
</script>

<style lang="less">
  /*@import '../../commonProject/less/dataDetailRow.less';*/
  @import '../less/index.less';
</style>
