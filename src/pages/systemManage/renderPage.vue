<template>
  <div class="system-manage panel-container">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="system-tree-box radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content  panel-container">
      <div class="choose-box flex-align radius-shadow panel">
        <div class="item-group flex-align-center">
          <label>编号：</label>
          <el-input v-model="searchParams.id"/>
        </div>
        <div class="item-group flex-align-center" v-if="fromFlag==1 || fromFlag==2">
          <label>用户名：</label>
          <el-input v-model="searchParams.loginId"/>
        </div>
        <div class="item-group flex-align-center" v-if="fromFlag==1">
          <label>E-mail：</label>
          <el-input v-model="searchParams.mail"/>
        </div>
        <div class="item-group flex-align-center" v-if="fromFlag==1">
          <label>电话号码：</label>
          <el-input v-model="searchParams.phone"/>
        </div>
        <div class="item-group flex-align-center" v-if="fromFlag==2">
          <label>名称：</label>
          <el-input v-model="searchParams.caption"/>
        </div>
        <div class="item-group flex-align-center" v-if="fromFlag==2">
          <label>工程用名：</label>
          <el-input v-model="searchParams.name"/>
        </div>
        <div class="item-group operator-box">
          <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
          <el-button @click="onClickResetBtn">重置</el-button>
        </div>
      </div>
      <div class="table-wrapper radius-shadow panel">
        <div class="operator-btn-box flex-row-reverse">
          <el-button type="primary" @click="onClickExportBtn" v-if="fromFlag==1">导出</el-button>
          <!--<el-button type="primary" @click="onClickMultiDelBtn">删除</el-button>-->
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="editRow(row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)">删除</el-button>
            <el-button type="text" @click="assignRole(row)" v-if="fromFlag==1">分配角色</el-button>
          </template>
        </z-table>
      </div>
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
    name: 'RenderPage',
    components: {
      Tree
    },
    props: ["fromFlag"], // fromFlag 1:用户管理
    data() {
      let config = this.getConfig()
      return {
        treeList: [],
        treeConfig: {
          treeProps: {
            label: 'text',
            children: 'nodes'
          },
          onClickTreeNodeCallBack: this.onClickTreeNodeCallBack,
          defaultExpandedkeys: [],
          currentKey: ''
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
            url: config.serverUrl,
            data: {}
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          columnConfig: config.columnConfig,
          operation: {
            width: 200
          },
          uiConfig: {
            height: "auto",
            selection: true,
          },
          customTop: true,
          tableMethods: {},
        },
        deleteId: '',
        delConfig: config.delConfig
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse: state => state.digitalPark.menuIsCollapse
      }),
      // fromFlag() {
      //   //来自角色管理-分配用户
      //   return this.$route.query.from
      // }
    },
    methods: {
      getConfig() {
        let config = {
          serverUrl: '',
          columnConfig: [],
          delConfig: {}
        }
        if (this.fromFlag == 1) {
          config = {
            delConfig: {
              api: SystemManageApi.deleteUser,
              paramKey: 'userId'
            },
            serverUrl: SystemManageApi.getUserList,
            columnConfig: [
              {
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
            ]
          }
        } else if (this.fromFlag == 2) {
          config = {
            delConfig: {
              api: CommonApi.deleteSpace,
              paramKey: 'ids'
            },
            serverUrl:CommonApi.getSpaceList,
            columnConfig: [{
              label: '编号',
              prop: 'id'
            }, {
              label: '名称',
              prop: 'caption'
            }, {
              label: '工程用名',
              prop: 'name'
            }, {
              label: '描述',
              prop: 'memo'
            }],
          }
        }
        return config
      },
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
        if (this.fromFlag == 1) {
          this.$router.push('/addUser')
        }
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
        await this.delConfig.api({
          [this.delConfig.paramKey]: this.deleteId,
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      editRow(data) {
        let url = ''
        if (this.fromFlag == 1) {
          url = `/addUser?userId=${data.id}`
        }
        this.$router.push(url)
      },
      assignRole(data) {
        this.$router.push(`/addUser?userId=${data.id}&assign=true`)
      },
      fixTree() {
        $(".system-tree-box").css({
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
      // if (this.fromFlag == 'assignUser') {
      //   this.tableConfig.operation = false
      //   this.tableConfig.btnConfig = false
      // }
    }
  }
</script>

<style lang="less" scoped>
  @import './less/index.less';
  @import './../commonProject/less/dataDetailRow.less';

</style>
