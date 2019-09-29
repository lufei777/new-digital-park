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
          <span>机构列表</span>
        </div>
        <div class="choose-box flex-align">
          <div class="block flex-align-center">
            <span>编号</span>
            <el-input v-model="did" />
          </div>
          <div class="block flex-align-center">
            <span>机构简称</span>
            <el-input v-model="name" />
          </div>
          <div class="block flex-align-center">
            <span>机构全称</span>
            <el-input v-model="abbr" />
          </div>
          <el-button type="primary" icon="el-icon-search" @click="onClickSearchBtn">搜索</el-button>
      </div>
      <CommonTable :tableObj="departList" :curPage="1"/>
      <div class="operator-box">
        <el-button type="primary" icon="el-icon-delete" @click="deleteTip">删除机构</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加机构</el-button>
      </div>
    </div>
    <AddUser v-if="showAdd" :curUserId='curUser.id' :isEdit="isEdit"/>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  import AddUser from '../coms/addUser'
  export default {
    name: 'UserManage',
    components: {
      CommonTable,
      AddUser
    },
    data () {
      return {
        treeList:[],
        treeProps:{
          label:'text',
          children: 'nodes',
        },
        parent:0,
        departList:{},
        showAdd:false,
        did:'',
        name:'',
        abbr:'',
        curPage:1
      }
    },
    methods: {
      async getUserTree(){
        this.treeList = await CommonApi.getUserTree()
        this.department= this.treeList[0].id
      },
      onClickItemTree(val){
        this.showAdd=false
        this.parent=val.id
        this.queryDeptList()
      },
      async queryDeptList(){
        let res  = await CommonApi.queryDeptList({
          parent:this.parent
        })
        if(!res || !res.total){
          res={
            rows:[],
            total:0
          }
        }
        res.labelList=[{name:'',prop:'',type:'selection'},
          {name:'编号',prop:'did'},
          {name:'机构简称',prop:'name'},
          {name:'机构全称',prop:'abbr'}]
        res.dataList=res.rows
        res.hideExportBtn=true
        res.showOperator=true
        this.departList=res
      },
      onClickSearchBtn(){
        this.curPage=1
        this.getUserList()
      },
      deleteRow(data){
        this.deleteId=data.id
        this.deleteTip()
      },
      async sureDelete(){
        await CommonApi.deleteUser({
          ids:this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getUserList()
      },
      handleSelectionChange(val){
        let tmp=val.map((item)=>item.id)
        this.deleteId=tmp.join(",")
      },
      deleteTip(){
        if(!this.deleteId){
          this.$message({
            type: 'warning',
            message: '请先选择用户！',
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
        this.curUser=data
        this.showAdd=true
        this.isEdit=true
      },
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
      },
      rowClick(row){
        this.curUser=row
      },
    },
    async mounted(){
      await this.getUserTree()
      await this.queryDeptList()
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
      tr:nth-child(6) td{
        border-bottom:1px solid var(--mainBg);
      }
    }
  }
</style>
