<template>
  <div class="role-manage panel-container">
    <div class="role-list radius-shadow panel">
      <div class="operator-box flex-row-reverse">
        <!--<el-button type="primary"@click="onClickMultiDelBtn">批量记录</el-button>-->
        <el-button type="primary" @click="onClickAddBtn">添加</el-button>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow(row)">编辑</el-button>
          <el-button type="text" @click="deleteRow(row)">删除</el-button>
          <el-button type="text" @click="assignPermission(row)">分配权限</el-button>
          <!--<el-button type="text" @click="assignUser(row)">分配用户</el-button>-->
        </template>
      </z-table>

      <el-dialog
        title="分配权限"
        :visible.sync="showModal"
        width="85%"
        custom-class="per-modal"
        v-if="showModal"
      >
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <!--<PermissionTree fromFlag="1" />-->
          <RenderPage
            :from-flag="4"
            :hide-btn="true"
            ref="renderPage"
          />
        </el-scrollbar>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showModal = false">取 消</el-button>
          <el-button type="primary" @click="onClickSureAssignBtn">确 定</el-button>
        </span>
      </el-dialog>
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
  import PermissionTree from '../coms/permissionTree'
  import RenderPage from '../coms/renderPage'

  export default {
    name: 'RoleManage',
    components: {
      PermissionTree,
      RenderPage
    },
    data() {
      return {
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
          operation: {
            width: 250
          },
          uiConfig: {
            height: "auto",
            // selection: true,
          },
          tableMethods: {},
        },
        showModal: false,
        curRoleId: 0,
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        permissionIdsList: state => state.digitalPark.permissionIdsList
      })
    },
    methods: {
      onClickAddBtn() {
        this.$router.push('/addRole')
      },
      onClickMultiDelBtn() {
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        this.deleteId = tmp.map((item) => item.id).join(",")
        CommonFun.confirmTip(this.deleteId, '至少选择一条数据！','确定要删除吗？',this.sureDelete)
      },
      editRow(data) {
        this.$router.push(`/addRole?roleId=${data.id}`)
      },
      deleteRow(data) {
        this.deleteId = data.id
        CommonFun.confirmTip(this.deleteId, '至少选择一条数据！','确定要删除吗？',this.sureDelete)
      },
      async sureDelete() {
        await SystemManageApi.deleteRole({
          roleId: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      assignUser() {
        // this.$router.push("/userManage?from=assignUser")
      },
      setTableData() {
        this.tableConfig.serverMode.data = {
          userId: this.userInfo.id
        }
      },
      assignPermission(row) {
        this.showModal = true
        this.curRoleId = row.id
        // row.permissionIdsList = [10001,10004]  //测试
        this.$store.commit("digitalPark/permissionIdsList",row.permissionIdsList || [])
      },
      async onClickSureAssignBtn() {
        // console.log(this.permissionIdsList)
        let tmp = this.$refs.renderPage.getAssignList()
        let arr = [...new Set(this.permissionIdsList.concat(tmp.map((item)=>item.id)))]
        this.$store.commit("digitalPark/permissionIdsList",arr)
        let params = {
          roleId: this.curRoleId,
          permissionIds: arr.join(",")
        }
        console.log("params",params)
        await SystemManageApi.assignPermission(params)
        this.$message({
          type: 'success',
          message: '分配成功！'
        })
        this.showModal = false
        this.$refs[this.tableConfig.ref].refreshTable()
      }
    },
    created() {
      this.setTableData()
    },
    mounted() {
    },
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

    .per-modal {
      margin-top: 20px !important;

      .el-dialog__body {
        height: 700px;
      }

      .system-tree-box {
        left: 8.5%;
        height: 700px !important;
      }
    }

    .item-row-detail-table {
      tr:nth-child(4) td {
        border-bottom: 1px solid @mainBg;
      }
    }
  }
</style>
