<template>
  <div class="user-manage system-manage panel-container">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="user-tree-box radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content  panel-container">
      <div class="choose-box flex-align radius-shadow panel">
        <div class="item-group flex-align-center">
          <label>编号：</label>
          <el-input v-model="searchParams.id"/>
        </div>
        <div class="item-group flex-align-center">
          <label>用户名：</label>
          <el-input v-model="searchParams.loginId"/>
        </div>
        <div class="item-group flex-align-center">
          <label>E-mail：</label>
          <el-input v-model="searchParams.mail"/>
        </div>
        <div class="item-group flex-align-center">
          <label>电话号码：</label>
          <el-input v-model="searchParams.phone"/>
        </div>
        <div class="item-group operator-box">
          <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
          <el-button @click="onClickResetBtn">重置</el-button>
        </div>
      </div>
      <div class="table-wrapper radius-shadow  panel">
        <div class="operator-btn-box flex-row-reverse" v-if="fromFlag!='assignUser'">
          <el-button type="primary" @click="onClickExportBtn">导出</el-button>
          <!--<el-button type="primary" @click="onClickMultiDelBtn">删除</el-button>-->
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="editRow(row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)">删除</el-button>
            <el-button type="text" @click="assignRole(row)">分配角色</el-button>
          </template>
        </z-table>
      </div>
      <!--<div class="item-row-detail-table radius-shadow">-->
      <!--<table>-->
      <!--<tbody>-->
      <!--<tr><th>用户名</th><td>{{curUser.login_id}}</td></tr>-->
      <!--<tr><th>姓名</th><td>{{curUser.name}}</td></tr>-->
      <!--<tr><th>电话号码</th><td>{{curUser.phone}}</td></tr>-->
      <!--<tr><th>Email</th><td>{{curUser.mail}}</td></tr>-->
      <!--<tr><th>所在部门</th><td>{{curUser.departmentText}}</td></tr>-->
      <!--<tr><th>分配角色名称</th><td>{{curUser.roleText}}</td></tr>-->
      <!--</tbody>-->
      <!--</table>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  let pageInfo = {
    pageNum: 1,
    pageSize: 10,
  }
  import {mapState} from 'vuex'
  import CommonApi from '@/service/api/common'
  import CommonFun from '@/utils/commonFun'
  import Tree from '@/components/tree/index'
  import SystemManageApi from '@/service/api/systemManage'

  export default {
    name: 'UserManage',
    components: {
      Tree
    },
    data() {
      return {
        treeList: [],
        treeConfig: {
          treeProps: {
            label: 'text',
            children: 'nodes'
          },
          onClickTreeNodeCallBack: this.onClickTreeNodeCallBack,
          defaultExpandedkeys: [],
          currentKey:''
        },
        searchParams: {
          id: '',
          loginId: '',
          mail: '',
          phone: '',
          department: 1
        },
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url: SystemManageApi.getUserList,
            data: {}
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          columnConfig: [{
            label: '编号',
            prop: 'id'
          }, {
            label: '用户名',
            prop: 'loginId'
          }, {
            label: '姓名',
            prop: 'name'
          }, {
            label: 'E-mail',
            prop: 'mail'
          }, {
            label: '电话',
            prop: 'phone'
          },
            // {
            //   label:'相关权限',
            //   prop:'permission'
            // },{
            //   label:'相关用户',
            //   prop:'roleList'
            // }
          ],
          operation: {
            width: 200
          },
          uiConfig: {
            height: "auto",
            selection: true,
          },
          customTop:true,
          tableMethods: {},
        },
        deleteId: ''
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse: state => state.digitalPark.menuIsCollapse
      }),
      fromFlag() {
        //来自角色管理-分配用户
        return this.$route.query.from
      }
    },
    methods: {
      async getDeptTree() {
        this.treeList = await CommonApi.getDeptTree()
        this.searchParams.department = this.treeList[0].id
        this.treeConfig.defaultExpandedkeys = [this.treeList[0].id]
        this.treeConfig.currentKey = this.treeList[0].id
        // this.onClickSearchBtn()
      },
      onClickTreeNodeCallBack(val) {
        this.searchParams.department = val.id
      },
      onClickSearchBtn() {
        this.getData()
      },
      onClickResetBtn() {
        this.searchParams = {
          id: '',
          loginId: '',
          mail: '',
          phone: '',
          department: 1
        }
        this.getData()
      },
      getData() {
        this.$refs[this.tableConfig.ref].setCurrentPage(1)
        this.tableConfig.serverMode.data = {...this.searchParams, ...pageInfo}
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      onClickMultiDelBtn() {
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        this.deleteId = tmp.map((item) => item.id).join(",")
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
      },
      onClickAddBtn() {
        this.$router.push('/addUser')
      },
      onClickExportBtn() {
        let url = '/user-service/user/exportRecord'
        let params = ''
        for (let key in this.searchParams) {
            params += key + '=' + this.searchParams[key] + '&'
        }
        CommonFun.exportMethod({
          url,
          params,
        })
      },
      deleteRow(data) {
        this.deleteId = data.id
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
      },
      async sureDelete() {
        await SystemManageApi.deleteUser({
          userId: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      editRow(data) {
        this.$router.push(`/addUser?userId=${data.id}`)
      },
      assignRole(data) {
        this.$router.push(`/addUser?userId=${data.id}&assign=true`)
      },
      fixTree() {
        $(".user-tree-box").css({
          height: ($(document).height() - 110) + 'px'
        })
      },
    },
    async created() {
      await this.getDeptTree()
      this.getData()
    },
    mounted() {
      this.fixTree()
      $(window).resize(() => {
        this.fixTree()
      })
      if (this.fromFlag == 'assignUser') {
        this.tableConfig.operation = false
        this.tableConfig.btnConfig = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../less/index.less';
  @import '../../commonProject/less/dataDetailRow.less';

</style>
