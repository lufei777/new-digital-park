<template>
  <div class="space-manage system-manage panel-container">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="space-tree-box radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content panel-container">
      <div class="choose-box flex-align radius-shadow panel">
        <div class="item-group flex-align-center">
          <label>编号：</label>
          <el-input v-model="searchParams.id"/>
        </div>
        <div class="item-group flex-align-center">
          <label>名称：</label>
          <el-input v-model="searchParams.caption"/>
        </div>
        <div class="item-group flex-align-center">
          <label>工程用名：</label>
          <el-input v-model="searchParams.name"/>
        </div>
        <div class="item-group operator-box">
          <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
          <el-button @click="onClickResetBtn">重置</el-button>
        </div>
      </div>
      <div class="table-wrapper radius-shadow panel">
        <div class="operator-btn-box flex-row-reverse">
          <el-button type="primary" @click="onClickMultiDelBtn">删除</el-button>
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="editRow(row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)">删除</el-button>
          </template>
        </z-table>
      </div>
      <!--<div class="item-row-detail-table">-->
      <!--<table>-->
      <!--<tbody>-->
      <!--<tr><th>编号</th><td>{{curSpace.id}}</td></tr>-->
      <!--<tr><th>名称</th><td>{{curSpace.caption}}</td></tr>-->
      <!--<tr><th>工程用名</th><td>{{curSpace.name}}</td></tr>-->
      <!--<tr><th>描述</th><td>{{curSpace.memo}}</td></tr>-->
      <!--</tbody>-->
      <!--</table>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  let pageInfo = {
    pageNum:1,
    pageSize:10
  }
  import {mapState} from 'vuex'
  import CommonApi from '@/service/api/common'
  import AddSpace from './addSpace'
  import Tree from '@/components/tree/index'
  import CommonFun from '@/utils/commonFun'
  export default {
    name: 'SpaceManage',
    components: {
      AddSpace,
      Tree
    },
    data() {
      return {
        treeList: [],
        treeConfig: {
          treeProps: {
            label: 'text',
            children: 'nodes'
          },
          highlight:true,
          defaultExpandedkeys: [],
          onClickTreeNodeCallBack: this.onClickItemTree
        },
        searchParams:{
          id: '',
          name: '',
          caption: '',
          parentId: 0,
        },
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url: CommonApi.getSpaceList,
            data: {
              // pageInfo
            }
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          operation: {
            width: 200
          },
          customTop:true,
          columnConfig: [{
            label: '编号',
            prop: 'id'
          }, {
            label: '名称',
            prop: 'caption'
          }, {
            label: '工程用名',
            prop: 'name'
          }, {
            label: '描述',
            prop: 'memo'
          }],

          uiConfig: {
            height: "auto",
            selection: true,
          },
          tableMethods: {},
        },
        curSpace: {},
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse: state => state.digitalPark.menuIsCollapse
      })
    },
    methods: {
      async getAssetAllTree() {
        this.treeList = await CommonApi.getAssetAllTree({
          flag: 'space',
          locationRoot: 1
        })
        this.treeConfig.defaultExpandedkeys = [this.treeList && this.treeList[0].id]
      },
      onClickItemTree(val) {
        this.treeConfig.highlight = true
        this.searchParams.parentId = val.id
      },
      onClickResetBtn() {
        this.searchParams = {
          id: '',
          name: '',
          caption: '',
          parentId: 0
        }
        this.getData()
        this.treeConfig.highlight = false
      },
      onClickSearchBtn() {
        this.getData()
      },
      getData(){
        this.$refs[this.tableConfig.ref].setCurrentPage(1)
        this.tableConfig.serverMode.data = {...this.searchParams,...pageInfo}
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      deleteRow(data) {
        this.deleteId = data.id
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
      },
      onClickMultiDelBtn() {
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        this.deleteId = tmp.map((item) => item.id).join(",")
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
      },
      async sureDelete() {
        await CommonApi.deleteSpace({
          ids: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      onClickAddBtn() {
        this.$router.push('/addSpace')
      },
      editRow(data) {
        this.$router.push(`/addSpace?spaceId=${data.id}`)
      },
      rowClick(row) {
        this.curSpace = row
      },
      fixTree() {
        $(".space-tree-box").css({
          height: ($(document).height() - 110) + 'px'
        })
      },
    },
    async created(){
      await this.getAssetAllTree()
      this.getData()
    },
    async mounted() {

      // this.getSpaceList()
      this.fixTree()
      $(window).resize(() => {
        this.fixTree()
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../less/index.less';
  /*@import '../../commonProject/less/dataDetailRow.less';*/
</style>
