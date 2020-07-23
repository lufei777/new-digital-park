<template>
  <div class="menu-manage panel-container">
    <div class="flex-align panel">
      <div class="item-group flex-align-center">
        <label>菜单名称：</label>
        <el-input v-model="searchParams.name"/>
      </div>
      <div class="item-group flex-align-center">
        <label>是否可见：</label>
        <el-select v-model="searchParams.isHidden">
          <el-option
            v-for="(item,index) in hiddenDic"
             :key="index"
             :label="item.label"
             :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item-group operator-box">
        <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
        <el-button @click="onClickResetBtn">重置</el-button>
      </div>
    </div>
    <div class="panel">
      <div class="flex-row-reverse operator-btn-box">
        <el-button type="primary" @click="onClickExportBtn">导出</el-button>
        <el-button type="primary" @click="onClickImportBtn">导入</el-button>
        <el-button type="primary" @click="onClickAddBtn">新增</el-button>
        <el-button type="primary" @click="onClickFoldBtn">{{foldText}}</el-button>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig" >
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow(row)">编辑</el-button>
          <el-button type="text" @click="deleteRow(row)">删除</el-button>
        </template>
      </z-table>
    </div>
  </div>

</template>

<script>
  import SystemManageApi from '@/service/api/systemManage'
  import {SystemDic} from "@/utils/dictionary";
  import CommonFun from '@/utils/commonFun'

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
            prop: 'isHidden',
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
        searchParams:{
          name:'',
          isHidden:null
        },
        hiddenDic:SystemDic.isHidden,
        isExpand:false
      }
    },
    computed: {
      foldText(){
        return this.isExpand?'折叠':'展开'
      }
    },
    watch: {},
    methods: {
      async getMenuList() {
        let res = await SystemManageApi.getMenuList(this.searchParams)
        this.tableConfig.data = res[0]&&res[0].childNode || []
      },
      editRow(row) {
        this.$router.push(`/addMenu?menuId=${row.id}`)
      },
      onClickAddBtn(){
        this.$router.push(`/addMenu`)
      },
      deleteRow(data) {
        this.deleteId = data.id
        CommonFun.confirmTip(this.deleteId, '至少选择一条数据！', '确定要删除吗？',this.sureDelete)
      },
      async sureDelete() {
        await SystemManageApi.deleteMenu({
         menuIds: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        CommonFun.setHomeKeepAliveFlag()
        this.getMenuList()
      },
      onClickExportBtn() {
        let url = '/user-service/menu/exportMenu'
        let params = ''
        for (let key in this.searchParams) {
          params += key + '=' + this.searchParams[key] + '&'
        }
        CommonFun.exportMethod({
          url,
          params,
        })
      },
      onClickSearchBtn(){
        this.getMenuList()
      },
      onClickResetBtn(){
        this.searchParams = {
          name:'',
          isHidden:null
        }
        this.getMenuList()
      },
      onClickImportBtn(){},
      onClickFoldBtn(){
        this.isExpand = !this.isExpand
        this.$nextTick(() => {
          this.setItemExpandStatus(this.tableConfig.data, this.isExpand)
        })
      },
      setItemExpandStatus(arr, isExpand) {
        arr.forEach(i => {
          this.$refs[this.tableConfig.ref].toggleRowExpansion(i, isExpand)
          if (i.childNode) {
            this.setItemExpandStatus(i.childNode, isExpand)
          }
        })
      },
    },
    mounted() {
      this.getMenuList()
    }
  }
</script>

<style lang="less" scoped>
  .menu-manage{
    .operator-box{
      .el-button{
        margin-right: 10px;
      }
    }
  }
</style>
