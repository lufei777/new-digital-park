<template>
  <div class="role-manage panel-container">
    <div class="role-list radius-shadow panel">
      <div class="operator-box flex-row-reverse">
        <el-button type="primary" icon="el-icon-delete" @click="deleteTip">批量记录</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加</el-button>
      </div>
      <!--<CommonTable :tableObj="roleList" :curPage="1"/>-->
      <z-table :ref="tableConfig.ref" :options="tableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow(row)">编辑</el-button>
          <el-button type="text" @click="deleteRow(row)">删除</el-button>
          <el-button type="text" @click="rowClick(row)">分配权限</el-button>
          <el-button type="text" @click="deleteRow(row)">分配用户</el-button>
        </template>
      </z-table>
    </div>
    <!--<div class="item-row-detail-table radius-shadow">-->
    <!--<table>-->
    <!--<tbody>-->
    <!--<tr><th>角色名</th><td>{{curRole.name}}</td></tr>-->
    <!--<tr><th>角色介绍</th><td>{{curRole.caption}}</td></tr>-->
    <!--<tr><th>人员</th><td>{{curRole.userList}}</td></tr>-->
    <!--<tr><th>权限详情</th><td>{{curRole.menuDataDetail}}</td></tr>-->
    <!--</tbody>-->
    <!--</table>-->
    <!--</div>-->
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import CommonFun from '@/utils/commonFun'
  import SystemManageApi from '@/service/api/systemManage'
  import {mapState} from 'vuex'

  export default {
    name: 'RoleManage',
    components: {},
    data() {
      return {
        roleList: {},
        curPage: 1,
        curRole: {},
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url: SystemManageApi.getRoleList,
            data: {}
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          columnConfig: [{
            label: '角色ID',
            prop: 'id'
          }, {
            label: '角色名称',
            prop: 'name'
          },
            {
              label: '角色描述',
              prop: 'caption'
            },
            // {
            //   label:'相关权限',
            //   prop:'permission'
            // },{
            //   label:'相关用户',
            //   prop:'roleList'
            // }
          ],
          btnConfig: [],
          customTop: true,
          operation:{
            width:250
          },
          uiConfig: {
            height: "auto",
            selection: true,
          },
          tableMethods: {},
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    methods: {
      deleteRow(data) {
        this.deleteId = data.id
        // this.deleteTip()
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
      },
      async sureDelete() {
        await SystemManageApi.deleteRole({
          id: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getRoleList()
      },
      handleSelectionChange(val) {
        let tmp = val.map((item) => item.id)
        this.deleteId = tmp.join(",")
      },
      deleteTip() {
        if (!this.deleteId) {
          this.$message({
            type: 'warning',
            message: '请先选择角色！',
            duration: 1000
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
      editRow(data) {
        this.$router.push(`/addRole?roleId=${data.id}`)
      },
      onClickAddBtn() {
        this.$router.push('/addRole')
      },
      rowClick(row) {
        this.curRole = row
      },
      async getUserList(data) {
        let res = await CommonApi.getUserList({
          department: data
        })
        let tmp = ""
        res.rows.map((item) => {
          tmp += item.name + " "
        })
        this.curRole.userList = tmp
      },
      setTableData(){
        this.tableConfig.serverMode.data = {
          userId:this.userInfo.id
        }
      },
    },
    async mounted() {
      // this.$refs[this.tableConfig.ref].refreshTable()
    },
    created(){
      this.setTableData()
    }
  }
</script>

<style lang="less">
  @import '../../commonProject/less/dataDetailRow.less';

  .role-manage {
    .role-list {
      padding: 20px;
      background: @white;
      margin-bottom: 20px;
    }

    .operator-box {
      background: @white;
      margin-bottom: 20px;

      .el-button {
        margin-left: 20px;
      }
    }

    .item-row-detail-table {
      tr:nth-child(4) td {
        border-bottom: 1px solid @mainBg;
      }
    }
  }
</style>
