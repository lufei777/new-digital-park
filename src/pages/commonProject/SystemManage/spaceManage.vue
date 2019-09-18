<template>
  <div class="user-manage">
    <div class="left-zoom-nav">
      <el-tree
        :data="treeList"
        :props="treeProps"
        node-key="id"
        ref="navTree"
        @node-click="onClickItemTree"
      >
      </el-tree>
    </div>
    <div class="right-content" v-if="!showAdd">
        <div class="tip flex-align">
          <span class="icon"></span>
          <span>空间列表</span>
        </div>
        <div class="choose-box flex-align">
          <div class="block flex-align-center">
            <span>编号</span>
            <el-input v-model="id" />
          </div>
          <div class="block flex-align-center">
            <span>名称</span>
            <el-input v-model="caption" />
          </div>
            <div class="block flex-align-center">
              <span>工程用名</span>
              <el-input v-model="name" />
            </div>
            <el-button type="primary" icon="el-icon-search" @click="onClickSearchBtn">搜索</el-button>
      </div>
      <CommonTable :tableObj="tableData" :curPage="1"/>
      <div class="operator-box">
        <el-button type="primary" icon="el-icon-delete" @click="deleteTip">删除记录</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加记录</el-button>
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
    <AddSpace v-if="showAdd" :curSpaceId='curSpace.id' :isEdit="isEdit"/>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  import AddSpace from '../coms/addSpace'
  export default {
    name: 'UserManage',
    components: {
      CommonTable,
      AddSpace
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
        showAdd:false,
        curSpace:{},
        isEdit:false,
      }
    },
    methods: {
      async getAssetAllTree(){
        this.treeList = await CommonApi.getAssetAllTree({
          flag: 'space',
          locationRoot: 1
        })

      },
      onClickItemTree(val){
        this.showAdd=false
        this.parentId=val.id
        this.getSpaceList()
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
        res.showOpertor=true
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
        this.curSpace=data
        this.showAdd=true
        this.isEdit=true
      },
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
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
  .user-manage{
    margin-top: 85px;
    .left-zoom-nav{
      width:17%;
      float: left;
      position: fixed;
      height: 100%;
      overflow: auto;
      background: var(--mainBg);
      padding: 10px 0;
      .el-tree{
        background: var(--mainBg);
        font-size: 16px;
      }
      .el-tree-node__content{
        color:@white;
        padding:5px 0;
      }
      .el-tree-node__content:hover{
        color:#22dbfc;
      }
      .el-tree-node:focus>.el-tree-node__content{
        color:#22dbfc;
      }
    }
    .right-content{
      width:83%;
      padding:10px;
      float: right;
      box-sizing: border-box;
      /*background: #eaeff3;*/
    }
    .tip{
      height: 66px;
      border-bottom: 1px solid #eaeaea;
      .icon {
        width: 2px;
        height: 24px;
        background: #01465c;
        border-radius: 2px;
        margin-right: 10px;
      }
      span{
        font-size: 24px;
        color:#01465c;
      }
    }
    .choose-box{
      overflow: hidden;
      padding:20px 0;
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
      padding: 10px;
    }
    .item-row-detail-table{
      tr:nth-child(4) td{
        border-bottom:1px solid var(--mainBg);
      }
    }
  }
</style>
