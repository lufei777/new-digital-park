<template>
  <div class="department-manage">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="dept-tree-box radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content">
        <div class="choose-box flex-align radius-shadow">
          <div class="block flex-align-center">
            <span>编号：</span>
            <el-input v-model="did" />
          </div>
          <div class="block flex-align-center">
            <span>机构简称：</span>
            <el-input v-model="name" />
          </div>
          <div class="block flex-align-center">
            <span>机构全称：</span>
            <el-input v-model="abbr" />
          </div>
          <el-button type="primary" icon="el-icon-search" @click="onClickSearchBtn">搜索</el-button>
      </div>
      <div class="table-wrapper radius-shadow">
        <div class="operator-box flex-row-reverse">
          <el-button type="primary" icon="el-icon-delete" @click="deleteTip">删除机构</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加机构</el-button>
        </div>
        <CommonTable :tableObj="departList" :curPage="1"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import CommonApi from '@/service/api/common'
  import CommonTable from '@/components/commonTable/index'
  import Tree from '@/components/tree/index'
  export default {
    name: 'UserManage',
    components: {
      CommonTable,
      Tree
    },
    data () {
      return {
        treeList:[],
        treeConfig: {
          defaultExpandedkeys: [],
          onClickTreeNodeCallBack: this.onClickItemTree,
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
    computed:{
      ...mapState({
        menuIsCollapse:state=>state.digitalPark.menuIsCollapse
      })
    },
    methods: {
      async getDeptTree(){
        this.treeList = await CommonApi.getDeptTree()
        this.treeConfig.defaultExpandedkeys=[this.treeList[0].id]
        this.department= this.treeList[0].id
      },
      onClickItemTree(val){
        this.parent=val.id
      },
      async queryDeptList(){
        let res  = await CommonApi.queryDeptList({
          parent:this.parent,
          did:this.did,
          name:this.name,
          abbr:this.abbr
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
        this.queryDeptList()
      },
      deleteRow(data){
        this.deleteId=data.did
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
        let tmp=val.map((item)=>item.did)
        this.deleteId=tmp.join(",")
      },
      deleteTip(){
        if(!this.deleteId){
          this.$message({
            type: 'warning',
            message: '请先选择机构！',
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
        console.log(data)
        this.$router.push(`/addDept?deptId=${data.did}`)
      },
      onClickAddBtn(){
         this.$router.push("/addDept")
      },
      fixTree(){
        $(".dept-tree-box").css({
          height:($(document).height()-110)+'px'
        })
      },
    },
    async mounted(){
      await this.getDeptTree()
      await this.queryDeptList()
      this.fixTree()
      $(window).resize(()=>{
        this.fixTree()
      })
    }
  }
</script>

<style lang="less">
  @import '../commonProject/less/dataDetailRow.less';
  .department-manage{
    .right-content{
    }
    .choose-box{
      overflow: hidden;
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
        margin-left: 20px;
      }
    }
    .item-row-detail-table{
      tr:nth-child(6) td{
        border-bottom:1px solid @mainBg;
      }
    }
    .table-wrapper{
       background: @white;
      padding: 20px;
    }
  }
</style>
