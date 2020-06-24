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
          <el-input v-model="searchParams.id"/>
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
          <el-button type="primary"  @click="onClickMultiDelBtn">删除</el-button>
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="editRow(row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)">删除</el-button>
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
  import SystemManageApi from '@/service/api/systemManage'
  import CommonFun from '@/utils/commonFun'
  let pageInfo = {
    pageNum: 1,
    pageSize: 10,
  }
  export default {
    name: 'DepartmentManage',
    components: {
      Tree
    },
    data() {
      return {
        treeList: [],
        treeConfig: {
          treeProps:{
            label:'name',
            value:'id',
            children:'childNode'
          },
          defaultExpandedkeys: [],
          onClickTreeNodeCallBack: this.onClickItemTree,
        },
        searchParams:{
          parent: 0,
          id: '',
          name: '',
          abbr: '',
        },
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url:SystemManageApi.getDeptList,
            data: {...pageInfo}
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
            prop: 'abbr'
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
        this.treeList = await SystemManageApi.getDepartmentTree()
        this.treeConfig.defaultExpandedkeys = [this.treeList[0].id]
        // this.searchParams.parent = this.treeList[0].id
      },
      onClickItemTree(val) {
        this.searchParams.parent = val.id
      },
      onClickSearchBtn() {
        this.getData()
      },
      deleteRow(data) {
        this.deleteId = data.id
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
      },
      async sureDelete() {
        await SystemManageApi.deleteDept({
          deptIds: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getDeptTree()
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      editRow(data) {
        this.$router.push(`/addDept?deptId=${data.id}`)
      },
      onClickAddBtn() {
        this.$router.push("/addDept")
      },
      fixTree() {
        $(".dept-tree-box").css({
          height: ($(document).height() - 110) + 'px'
        })
      },
      getData() {
        this.$refs[this.tableConfig.ref].setCurrentPage(1)
        this.tableConfig.serverMode.data = {...this.searchParams, ...pageInfo}
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      onClickMultiDelBtn(){
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        this.deleteId = tmp.map((item)=>item.id).join(",")
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
      },
    },
    async created(){
      await this.getDeptTree()
      this.getData()
    },
    async mounted() {
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
