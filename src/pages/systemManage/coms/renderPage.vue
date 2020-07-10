<template>
  <div class="system-manage panel-container">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="system-tree-box radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content  panel-container">
      <div class="choose-box flex-align radius-shadow panel" v-if="fromFlag!=4">
        <div class="item-group flex-align-center">
          <label>编号：</label>
          <el-input v-model="searchParams.id"/>
        </div>
        <div class="item-group flex-align-center" v-if="fromFlag==1">
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
        <div class="item-group flex-align-center" v-if="fromFlag==2 || fromFlag==3">
          <label>{{nameLabel}}：</label>
          <el-input v-model="searchParams.name"/>
        </div>
        <div class="item-group flex-align-center" v-if="fromFlag==3">
          <label>机构全称：</label>
          <el-input v-model="searchParams.abbr"/>
        </div>
        <div class="item-group operator-box">
          <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
          <el-button @click="onClickResetBtn">重置</el-button>
        </div>
      </div>
      <div class="table-wrapper radius-shadow panel">
        <div class="operator-btn-box flex-row-reverse" v-if="!hideBtn">
          <el-button type="primary" @click="onClickExportBtn" v-if="fromFlag==1">导出</el-button>
          <el-button type="primary" @click="onClickMultiDelBtn"  v-if="fromFlag==3">删除</el-button>
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig"
                 @select="onSelectCheckBox"
                 @selection-change="onSelectionChange"
        >
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}" v-if="!hideBtn">
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
      Tree,
    },
    // fromFlag 1:用户管理  2:空间管理  3：机构管理  4:权限管理
    // hideBtn true/false  角色管理分配权限时隐藏按钮
    props: ["fromFlag","hideBtn"],
    data() {
      let config = this.getConfig()
      let searchParams = this.setParams()
      return {
        treeList: [],
        treeConfig: {
          treeProps:config.treeProps,
          onClickTreeNodeCallBack: this.onClickTreeNodeCallBack,
          defaultExpandedkeys: [],
          currentKey: ''
        },
        searchParams: searchParams,
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url: config.serverUrl,
            data: {...pageInfo}
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
            selection: config.selection,
            pagination:config.pagination==false?false:true
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
      nameLabel(){
        return this.fromFlag==2?'工程用名':'机构简称'
      }
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
            treeProps:{
              label: 'name',
              children: 'childNode'
            },
            delConfig: {
              api: SystemManageApi.deleteUser,
              paramKey: 'userId'
            },
            selection:false,
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
            treeProps:{
                label: 'text',
                children: 'nodes'
            },
            delConfig: {
              api: CommonApi.deleteSpace,
              paramKey: 'ids'
            },
            selection:false,
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
        } else if (this.fromFlag == 3) {
          config = {
            treeProps:{
              label: 'name',
              children: 'childNode'
            },
            delConfig: {
              api: SystemManageApi.deleteDept,
              paramKey: 'deptIds'
            },
            selection:true,
            serverUrl:SystemManageApi.getDeptList,
            columnConfig:  [{
                label: '编号',
                prop: 'id'
              },{
                label: '机构简称',
                prop: 'name'
              }, {
                label: '机构全称',
                prop: 'abbr'
            }],
          }
        }else if(this.fromFlag == 4){
          config = {
            treeProps:{
              label: 'name',
              children: 'childNode'
            },
            delConfig: {
              api: SystemManageApi.deleteDept,
              paramKey: 'deptIds'
            },
            selection:true,
            pagination:false,
            serverUrl:SystemManageApi.getPermissionById,
            columnConfig:  [{
              label: '编号',
              prop: 'id'
            },{
              label: '权限名称',
              prop: 'name'
            }, {
              label: '描述',
              prop: 'perDesc'
            }],
          }
        }
        return config
      },
      setParams(){
        let params = {}
        if(this.fromFlag==1){   //1:用户管理  2:空间管理  3：机构管理  4:权限管理
          params = {
            id: '',
            loginId: '',
            mail: '',
            phone: '',
            department: 1,
          }
        }else if(this.fromFlag==2){
          params = {
            caption:'', //名称
            name:'', //工程用名
            parentId: 0
          }
        }else if(this.fromFlag==3){
          params = {
            id:'',
            name:'',
            abbr:'',
            parent:''
          }
        }else if(this.fromFlag==4){
          params = {
            menuId:''
          }
        }
        return params
      },
      async getDeptTree() {
        this.treeList = await SystemManageApi.getDepartmentTree()
        this.treeConfig.defaultExpandedkeys = [this.treeList[0].id]
        if(this.fromFlag==1){
          this.treeConfig.currentKey = this.treeList[0].id
          this.searchParams.department = this.treeList[0].id
        }

      },
      async getAssetAllTree() {
        this.treeList = await CommonApi.getAssetAllTree({
          flag: 'space',
          locationRoot: 1
        })
        this.treeConfig.defaultExpandedkeys = [this.treeList && this.treeList[0].id]
      },
      async getPermissionTree() {
        // let treeList = await SystemManageApi.getPermissionTree()
        this.treeList = await SystemManageApi.getPermissionTree()
        this.treeConfig.defaultExpandedkeys = [this.treeList[0].id]
      },
      onClickTreeNodeCallBack(val) {
        //需要分开赋值，否则后台接口会报错
        if(this.fromFlag==1){   //1:用户管理  2:空间管理  3：机构管理
          this.searchParams.department = val.id
        }else if(this.fromFlag==2){
          this.searchParams.parentId = val.id
        }else if(this.fromFlag==3){
          this.searchParams.parent = val.id
        }else if(this.fromFlag==4){
          this.searchParams.menuId = val.id
          this.getData()
        }
      },
      onClickSearchBtn() {
        this.getData()
      },
      onClickResetBtn() {
        this.searchParams = this.setParams()
        this.initTree()
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
        let url = ''
        if (this.fromFlag == 1) {
          url = `/addUser`
        }else if(this.fromFlag==2){
          url = `/addSpace`
        }else if(this.fromFlag==3) {
          url = `/addDept`
        }
        this.$router.push(url)
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
        if(this.fromFlag==3){
          this.getDeptTree()
        }
        this.deleteId=''
      },
      editRow(data) {
        let url = ''
        if (this.fromFlag == 1) {
          url = `/addUser?userId=${data.id}`
        }else if(this.fromFlag==2){
          url = `/addSpace?spaceId=${data.id}`
        }else if(this.fromFlag==3){
          url = `/addDept?deptId=${data.id}`
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
      async initTree(){
        if(this.fromFlag==1 || this.fromFlag==3){
          await this.getDeptTree()
        }else if(this.fromFlag==2){
          await this.getAssetAllTree()
        }else if(this.fromFlag==4){
          await this.getPermissionTree()
        }
      },
      onSelectCheckBox(selection,row){
      },
      onSelectionChange(selection){
        /*
           pType 0：只读权限 1:写权限
           若勾选写权限，则必须勾选读权限
        */
         let writePermission = selection.find((item)=>{
           return item.pType==1
         })
        if(writePermission){
          let readPermissionIndex = this.$refs[this.tableConfig.ref].allData.findIndex((item)=>{
            return item.pType==0
          })
          console.log("readPermissionIndex",readPermissionIndex)
          if(readPermissionIndex!=-1){
            this.$refs[this.tableConfig.ref].toggleSelection(readPermissionIndex,true)
          }
        }
      }
    },
    async created() {
      await this.initTree()
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
  @import '../less/index.less';
  @import '../../commonProject/less/dataDetailRow.less';

</style>
