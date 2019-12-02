<template>
  <div class="space-manage">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content">
        <div class="choose-box flex-align radius-shadow">
          <div class="block flex-align-center">
            <span>编号：</span>
            <el-input v-model="id" />
          </div>
          <div class="block flex-align-center">
            <span>名称：</span>
            <el-input v-model="caption" />
          </div>
            <div class="block flex-align-center">
              <span>工程用名：</span>
              <el-input v-model="name" />
            </div>
            <el-button type="primary" icon="el-icon-search" @click="onClickSearchBtn">搜索</el-button>
      </div>
      <div class="table-wrapper radius-shadow">
        <div class="operator-box flex-row-reverse">
          <el-button type="primary" icon="el-icon-delete" @click="deleteTip">删除记录</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加记录</el-button>
        </div>
        <CommonTable :tableObj="tableData" :curPage="1"/>
      </div>
      <div class="item-row-detail-table">
        <table>
          <tbody>
          <tr><th>编号</th><td>{{curSpace.id}}</td></tr>
          <tr><th>名称</th><td>{{curSpace.caption}}</td></tr>
          <tr><th>工程用名</th><td>{{curSpace.name}}</td></tr>
          <tr><th>描述</th><td>{{curSpace.memo}}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  import AddSpace from './addSpace'
  import Tree from '../../../components/tree/index'
  export default {
    name: 'SpaceManage',
    components: {
      CommonTable,
      AddSpace,
      Tree
    },
    data () {
      return {
        treeList:[],
        treeProps:{
          label:'text',
          children: 'nodes',
        },
        id:'',
        name:'',
        caption:'',
        parentId:0,
        tableData:{},
        curPage:1,
        curSpace:{},
        treeConfig:{
          treeProps:{
            label:'text',
            children:'nodes'
          },
          defaultExpandedkeys:[],
          onClickTreeNodeCallBack:this.onClickItemTree
        }
      }
    },
    computed:{
      ...mapState({
        menuIsCollapse:state=>state.digitalPark.menuIsCollapse
      })
    },
    methods: {
      async getAssetAllTree(){
        this.treeList = await CommonApi.getAssetAllTree({
          flag: 'space',
          locationRoot: 1
        })
        this.treeConfig.defaultExpandedkeys=[this.treeList[0].id]
      },
      onClickItemTree(val){
        this.parentId=val.id
      },
      async getSpaceList(){
        let res = await CommonApi.getSpaceList({
          id:this.id,
          name:this.name,
          caption:this.caption,
          parentId:this.parentId,
          page:this.curPage
        })
        if(!res || !res.total){
          res={
            rows:[],
            total:0
          }
        }
        res.labelList=[{name:'',prop:'',type:'selection'},
                        {name:'编号',prop:'id'},
                       {name:'名称',prop:'caption'},
                       {name:'工程用名',prop:'name'},
                       {name:'描述',prop:'memo'}]
        res.dataList=res.rows
        res.hideExportBtn=true
        res.showOperator=true
        this.tableData=res
        if(res.rows.length){
          this.curSpace=res.rows[0]
        }else{
          this.curSpace={}
        }
      },
      onClickSearchBtn(){
        this.curPage=1
        this.getSpaceList()
      },
      deleteRow(data){
        this.deleteId=data.id
        this.deleteTip()
      },
      async sureDelete(){
        await CommonApi.deleteSpace({
          ids:this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getSpaceList()
      },
      handleSelectionChange(val){
        let tmp=val.map((item)=>item.id)
        this.deleteId=tmp.join(",")
      },
      deleteTip(){
        if(!this.deleteId){
          this.$message({
            type: 'warning',
            message: '请先选择空间！',
            duration:1000
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
      editRow(data){
        this.$router.push(`/addSpace?spaceId=${data.id}`)
      },
      onClickAddBtn(){
        this.$router.push('/addSpace')
      },
      rowClick(row){
        this.curSpace=row
      },
    },
    async mounted(){
      await this.getAssetAllTree()
      this.getSpaceList()
    }
  }
</script>

<style lang="less">
  @import '../less/dataDetailRow.less';
  .space-manage{
    .choose-box{
      padding:20px;
      background: @white;
      margin-bottom: 20px;
    }
    .block{
      margin-right:40px;
      display: flex;
      span{
        flex-shrink: 0;
        margin-right: 10px;
      }
    }
    .choose-tip{
      margin-left: 100px;
      width:80px;
      text-align: right;
    }
    .operator-box{
      background: @white;
      margin-bottom: 20px;
      .el-button{
        margin-left:20px;
      }
    }
    .item-row-detail-table{
      tr:nth-child(4) td{
        border-bottom:1px solid @mainBg;
      }
    }
    .table-wrapper{
      padding:20px;
      background: @white;
      margin-bottom: 20px;
    }
  }
</style>
