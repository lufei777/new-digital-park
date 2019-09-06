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
          <span>员工列表</span>
        </div>
        <div class="choose-box flex-align">
          <div class="block flex-align-center">
            <span>编号</span>
            <el-input v-model="id" />
          </div>
          <div class="block flex-align-center">
            <span>用户名</span>
            <el-input v-model="login_id" />
          </div>
            <div class="block flex-align-center">
              <span>E-mail</span>
              <el-input v-model="mail" />
            </div>
            <div class="block flex-align-center">
              <span>电话号码</span>
              <el-input v-model="phone" />
            </div>
            <el-button type="primary" icon="el-icon-search" @click="onClickSearchBtn">搜索</el-button>
            <el-button type="primary"  @click="onClickExportBtn">导出</el-button>
      </div>
      <CommonTable :tableObj="tableData" :curPage="1"/>
      <div class="operator-box">
        <el-button type="primary" icon="el-icon-delete" @click="deleteTip">删除用户</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加用户</el-button>
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
        id:'',
        login_id:'',
        mail:'',
        phone:'',
        tableData:{},
        curPage:1,
        showAdd:false,
        curUser:{},
        isEdit:false,
        department:1,
      }
    },
    methods: {
      async getUserTree(){
        this.treeList = await CommonApi.getUserTree()
        this.department= this.treeList[0].id
      },
      onClickItemTree(val){
        this.showAdd=false
        this.department=val.id
        this.getUserList()
      },
      async getUserList(){
        let res = await CommonApi.getUserList({
          id:this.id,
          login_id:this.login_id,
          mail:this.mail,
          phone:this.phone,
          department:this.department,
          page:this.curPage,
          size:10
        })
        if(!res || !res.total){
          res={
            rows:[],
            total:0
          }
        }
        res.labelList=[{name:'',prop:'',type:'selection'},
                        {name:'编号',prop:'id'},
                       {name:'用户名',prop:'login_id'},
                       {name:'姓名',prop:'name'},
                       {name:'E-mail',prop:'mail'},
                       {name:'电话号码',prop:'phone'}]
        res.dataList=res.rows
        res.hideExportBtn=true
        res.showOpertor=true
        this.tableData=res
      },
      onClickSearchBtn(){
        this.curPage=1
        this.getUserList()
      },
      onClickExportBtn(){
        let url = `${window.gateway}/vibe-web/user/report?type=xlsx&id=${this.id}&login_id=${this.login_id}&mail=${this.mail}&phone=${this.phone}`;
        location.href = url
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
      }
    },
    async mounted(){
      await this.getUserTree()
      this.getUserList()
    }
  }
</script>

<style lang="less">
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
  }
</style>
