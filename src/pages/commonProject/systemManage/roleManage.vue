<template>
  <div class="role-manage">
    <div class="role-list">
      <div class="tip flex-align">
        <span class="icon"></span>
        <span>角色列表</span>
      </div>
      <CommonTable :tableObj="roleList" :curPage="1"/>
    </div>
    <div class="operator-box">
      <el-button type="primary" icon="el-icon-delete" @click="deleteTip">删除角色</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加角色</el-button>
    </div>
    <div class="role-detail">
      <div class="tip flex-align">
        <span class="icon"></span>
        <span>角色详情</span>
      </div>
      <div class="item-row-detail-table">
        <table>
          <tbody>
          <tr><th>角色名</th><td>{{curRole.name}}</td></tr>
          <tr><th>角色介绍</th><td>{{curRole.caption}}</td></tr>
          <tr><th>人员</th><td>{{curRole.userList}}</td></tr>
          <tr><th>权限详情</th><td>{{curRole.menuDataDetail}}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  export default {
    name: 'UserManage',
    components: {
      CommonTable
    },
    data () {
      return {
        roleList:{},
        curPage:1,
        curRole:{}
      }
    },
    methods: {
      async getRoleList(){
        let res = await CommonApi.getRoleList({
           page:this.curPage,
           rows:10
        })
        if(!res || !res.total){
          res={
            rows:[],
            total:0
          }
        }
        res.labelList=[{name:'',prop:'',type:'selection'},
                        {name:'角色',prop:'name'},
                       {name:'权限',prop:'menuData'},
                       {name:'角色介绍',prop:'caption'}]
        res.rows.map((item)=>{
          let tmp='',detailTmp=''
          item.menuTree && item.menuTree.children && item.menuTree.children.map((child)=>{
            tmp+=child.caption+' '
            detailTmp+=child.caption+'、'
            child.children &&child.children.map((secondChild)=>{
              detailTmp+=secondChild.caption+'、'
            })
          })
          item.menuData=tmp
          item.menuDataDetail=detailTmp
        })
        res.dataList=res.rows
        res.hideExportBtn=true
        res.showOperator=true
        this.roleList=res
        if(res.rows.length){
          this.curRole=res.rows[0]
          this.getUserList(res.rows[0].department)
        }else{
          this.curRole={}
        }
      },
      deleteRow(data){
        this.deleteId=data.id
        this.deleteTip()
      },
      async sureDelete(){
        await CommonApi.deleteRole({
          ids:this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getRoleList()
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
         this.$router.push(`/addRole?roleId=${data.id}`)
      },
      onClickAddBtn(){
         this.$router.push('/addRole')
      },
      rowClick(row){
        this.curRole=row
      },
      async getUserList(data){
        let res = await CommonApi.getUserList({
          department:data
        })
        let tmp=""
        res.rows.map((item)=>{
          tmp+=item.name+" "
        })
        this.curRole.userList=tmp

      }
    },
    async mounted(){
      this.getRoleList()
    }
  }
</script>

<style lang="less">
  @import '../less/dataDetailRow.less';
  .role-manage{
    background: #eaeff3;
    .role-list,.role-detail{
      background: @white;
      padding:10px 20px;
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
        border-bottom:1px solid @mainBg;
      }
    }
    .role-detail{
      margin-top:20px;
    }
  }
</style>
