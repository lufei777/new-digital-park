<template>
  <div class="role-manage ">
    <div class="role-list radius-shadow">
      <div class="operator-box flex-row-reverse">
          <el-button type="primary" icon="el-icon-delete" @click="deleteTip">删除记录</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加记录</el-button>
        </div>
      <!--<CommonTable :tableObj="roleList" :curPage="1"/>-->
      <z-table :ref="tableConfig.ref" :options="tableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="rowClick(row)">分配权限</el-button>
          <el-button type="text" @click="deleteRow(row)">分配用户</el-button>
          <el-button type="text" @click="rowClick(row)">编辑</el-button>
          <el-button type="text" @click="deleteRow(row)">删除</el-button>
        </template>
      </z-table>
    </div>
    <div class="item-row-detail-table radius-shadow">
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
</template>

<script>
  import CommonApi from '@/service/api/common'
  import CommonTable from '@/components/commonTable/index'
  export default {
    name: 'UserManage',
    components: {
      CommonTable
    },
    data () {
      return {
        roleList:{},
        curPage:1,
        curRole:{},
        tableConfig:{
          ref: "tableRef",
          data:[],
          columnConfig:[{
            label:'序号',
            prop:''
          },{
            label:'角色ID',
            prop:'roleId'
          },{
            label:'角色名称',
            prop:'roleName'
          },{
            label:'相关权限',
            prop:'permission'
          },{
            label:'相关用户',
            prop:'roleList'
          }],
          btnConfig:[],
          customTop: true,
          operation: true,
          uiConfig: {
            height: "auto",
            selection: true,
          },
          tableMethods: {
          },
        }
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
  @import '../../commonProject/less/dataDetailRow.less';
  .role-manage{
    .role-list{
      padding:20px;
      background: @white;
      margin-bottom: 20px;
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
  }
</style>
