<template>
  <div class="system-manage panel-container">
    <div :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
         class="system-tree-box radius-shadow">
      <Tree :tree-list="treeList" :tree-config="treeConfig"/>
    </div>
    <div class="right-content  panel-container">
      <div class="flex-align radius-shadow panel" v-if="fromFlag!=4">
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
      <AddModal :show-modal="showModal" v-if="showModal" />
      <div class="table-wrapper radius-shadow panel">
        <div class="operator-btn-box flex-row-reverse" v-if="!hideBtn">
          <el-button type="primary" @click="onClickExportBtn" v-if="fromFlag==1">导出</el-button>
          <el-button type="primary" @click="onClickMultiDelBtn" v-if="fromFlag==3 || fromFlag==4">删除</el-button>
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
          <el-button type="primary" @click="onClickAddDefaultBtn">添加默认权限</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig"
                 @select="onSelectCheckBox"
                 @select-all="onSelectAllCheckBox"
                 @selection-change="onSelectionChange"
        >
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}" v-if="!hideBtn">
            <el-button type="text" @click="onClickAddBtn(row)">编辑</el-button>
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
  import {SystemDic} from "@/utils/dictionary";
  import AddModal from './addModal'
  export default {
    name: 'RenderPage',
    components: {
      Tree,
      AddModal
    },
    // fromFlag 1:用户管理  2:空间管理  3：机构管理  4:权限管理
    // hideBtn true/false  角色管理分配权限时隐藏按钮
    props: ["fromFlag", "hideBtn"],
    data() {
      let config = this.getConfig()
      let searchParams = this.setParams()
      return {
        treeList: [],
        treeConfig: {
          treeProps: config.treeProps,
          onClickTreeNodeCallBack: this.onClickTreeNodeCallBack,
          defaultExpandedkeys: [],
          currentKey: '',
          expandOnClickNode: false
        },
        searchParams: searchParams,
        tableConfig: {
          ref: "renderPageTable",
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
          operation: config.operation == false ? false : {
            width: 200
          },
          uiConfig: {
            height: "auto",
            selection: config.selection,
            pagination: config.pagination == false ? false : true
          },
          customTop: true,
          tableMethods: {},
        },
        deleteId: '',
        delConfig: config.delConfig,
        curTreeNode: {},
        userCheckFlag: false,  //true：是用户点击的  false：程序回显
        curPerList: [],  //所选不是最子级模块时，存储当前模块下所有子级权限。
        showModal:false
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse: state => state.digitalPark.menuIsCollapse,
        permissionIdsList: state => state.digitalPark.permissionIdsList,
        userInfo: state => state.user.userInfo
      }),
      nameLabel() {
        return this.fromFlag == 2 ? '工程用名' : '机构简称'
      },
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
            treeProps: {
              label: 'name',
              children: 'childNode'
            },
            delConfig: {
              api: SystemManageApi.deleteUser,
              paramKey: 'userId'
            },
            selection: false,
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
            treeProps: {
              label: 'text',
              children: 'nodes'
            },
            delConfig: {
              api: CommonApi.deleteSpace,
              paramKey: 'ids'
            },
            selection: false,
            serverUrl: CommonApi.getSpaceList,
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
            treeProps: {
              label: 'name',
              children: 'childNode'
            },
            delConfig: {
              api: SystemManageApi.deleteDept,
              paramKey: 'deptIds'
            },
            selection: true,
            serverUrl: SystemManageApi.getDeptList,
            columnConfig: [{
              label: '编号',
              prop: 'id'
            }, {
              label: '机构简称',
              prop: 'name'
            }, {
              label: '机构全称',
              prop: 'abbr'
            }],
          }
        } else if (this.fromFlag == 4) {
          config = {
            treeProps: {
              label: 'name',
              children: 'childNode'
            },
            delConfig: {
              api: SystemManageApi.deletePermission,
              paramKey: 'permissionIds'
            },
            selection: true,
            pagination: false,
            operation: this.hideBtn ? false : {},
            serverUrl: SystemManageApi.getPermissionById,
            columnConfig: [{
              label: '编号',
              prop: 'id'
            }, {
              label: '权限名称',
              prop: 'name'
            }, {
              label: '权限类型',
              prop: 'pType',
              formatter: function (row) {
                return SystemDic.pTypeStatus[row.pType]
              }
            }, {
              label: '描述',
              prop: 'perDesc'
            }],
          }
        }
        return config
      },
      setParams() {
        let params = {}
        if (this.fromFlag == 1) {   //1:用户管理  2:空间管理  3：机构管理  4:权限管理
          params = {
            id: '',
            loginId: '',
            mail: '',
            phone: '',
            department: '',
          }
        } else if (this.fromFlag == 2) {
          params = {
            caption: '', //名称
            name: '', //工程用名
            parentId: 0
          }
        } else if (this.fromFlag == 3) {
          params = {
            id: '',
            name: '',
            abbr: '',
            parent: ''
          }
        } else if (this.fromFlag == 4) {
          params = {
            menuId: ''
          }
        }
        return params
      },
      async getDeptTree() {
        this.treeList = await SystemManageApi.getDepartmentTree({
          userId: this.userInfo.id
        })
        this.treeConfig.defaultExpandedkeys = [this.treeList[0].id]
        if (this.fromFlag == 1) {
          // this.treeConfig.currentKey = this.treeList[0].id
          // this.searchParams.department = this.treeList[0].id
        }
      },
      async getAssetAllTree() {
        this.treeList = await CommonApi.getAssetAllTree({
          flag: 'space',
          locationRoot: 1,
          moduleId:JSON.parse(localStorage.moduleInfo).id
        })
        this.treeConfig.defaultExpandedkeys = [this.treeList && this.treeList[0].id]
      },
      async getPermissionTree() {
        // let treeList = await SystemManageApi.getPermissionTree()
        this.treeList = await SystemManageApi.getPermissionTree({})
        this.treeConfig.defaultExpandedkeys = [this.treeList[0].id]
      },
      onClickTreeNodeCallBack(val) {
        //需要分开赋值，否则后台接口会报错
        //1:用户管理  2:空间管理  3：机构管理 4:权限管理
        if (this.fromFlag == 1) {
          this.searchParams.department = val.id
        } else if (this.fromFlag == 2) {
          this.searchParams.parentId = val.id
        } else if (this.fromFlag == 3) {
          this.searchParams.parent = val.id
        } else if (this.fromFlag == 4) {
          this.curTreeNode = val
          this.searchParams.menuId = val.id
          this.setCheckedPermission()
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
        this.$refs[this.tableConfig.ref].refreshTable().then(() => {
          if (this.fromFlag == 4 && this.hideBtn == true) {
            this.setHadPermission()
          }
        })
      },
      onClickMultiDelBtn() {
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        this.deleteId = tmp.map((item) => item.id).join(",")
        CommonFun.confirmTip(this.deleteId, '至少选择一条数据！','确定要删除吗？',this.sureDelete)
      },
      onClickAddBtn(data) {
        let id = data.id || ''
        let url = ''
        if (this.fromFlag == 1) {
          url = `/addUser?userId=${id}`
        } else if (this.fromFlag == 2) {
          url = `/addSpace?spaceId=${id}`
        } else if (this.fromFlag == 3) {
          url = `/addDept?deptId=${id}`
        } else if (this.fromFlag == 4) {
          url = `/addPermission?perId=${id}`
          this.showModal=true
        }
        let idStr = 'perId'
        this.$router.replace({
          url:this.$route.path,
          query:{
            ...this.$route.query,
            ...{[idStr]:id}
          }
        })
        // this.$router.push(url)
      },
      onClickAddDefaultBtn(){
        CommonFun.confirmTip(true,'','此操作将会添加所有模块的查看权限，确定要添加吗?', this.sureAddDefault)
      },
      async sureAddDefault(){
        await SystemManageApi.setDefaultPermission().then(()=> {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        })
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
        CommonFun.confirmTip(this.deleteId, '至少选择一条数据！', '确定要删除吗？',this.sureDelete)
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
        if (this.fromFlag == 3) {
          this.getDeptTree()
        }
        this.deleteId = ''
      },
      editRow(data) {
        // let url = ''
        // if (this.fromFlag == 1) {
        //   url = `/addUser?userId=${data.id}`
        // }else if(this.fromFlag==2){
        //   url = `/addSpace?spaceId=${data.id}`
        // }else if(this.fromFlag==3){
        //   url = `/addDept?deptId=${data.id}`
        // }
        // this.$router.push(url)
      },
      assignRole(data) {
        this.$router.push(`/addUser?userId=${data.id}&assign=true`)
      },
      fixTree() {
        $(".system-tree-box").css({
          height: ($(document).height() - 110) + 'px'
        })
      },
      async initTree() {
        if (this.fromFlag == 1 || this.fromFlag == 3) {
          await this.getDeptTree()
        } else if (this.fromFlag == 2) {
          await this.getAssetAllTree()
        } else if (this.fromFlag == 4) {
          await this.getPermissionTree()
        }
      },
      onSelectAllCheckBox(selection) {
        // console.log('select-all', this.userCheckFlag)
        this.userCheckFlag = true
        this.handleCheck(selection)
      },
      onSelectCheckBox(selection, row) {
        // console.log("select", this.userCheckFlag)
        this.userCheckFlag = true
        this.handleCheck(selection)
      },
      async handleCheck(selection) {
        if (this.curTreeNode.childNode && this.curTreeNode.childNode.length && this.userCheckFlag) {
          let permissionIds = this.permissionIdsList
          let res = await SystemManageApi.getChildList({
            parentId: this.curTreeNode.id
          })
          res.push(this.$refs[this.tableConfig.ref].allData[0].id)
          let tmp = []
          console.log(selection.length)
          if (selection.length) {
            tmp = [...new Set(permissionIds.concat(res))]
          } else {
            console.log(permissionIds, res)
            res.map((item) => {
              permissionIds.map((per, index) => {
                if (item == per) {
                  permissionIds.splice(index, 1)
                }
              })
            })
            permissionIds.splice()
            tmp = permissionIds
          }
          // console.log("tmp", tmp)
          this.$store.commit('digitalPark/permissionIdsList', tmp)
        }
      },
      async onSelectionChange(selection) {
        //如果勾选的是父节点,则同步勾选/取消勾选子节点
        //pType 0：只读权限 1:写权限   若勾选写权限，则必须勾选读权限
        const Table = this.$refs[this.tableConfig.ref];
        let writePermission = selection.find((item) => {
          return item.pType == 1
        })
        if (writePermission) {
          let readPermissionIndex = Table.allData.find((item) => {
            return item.pType == 0
          })
          if (readPermissionIndex != -1) {
            Table.toggleSelection(readPermissionIndex, true)
          }
        }
      },
      getAssignList() {
        let tmp = this.$refs[this.tableConfig.ref].selectedData
        return tmp
      },
      async setHadPermission() {
        //从接口拿到的已有权限+已经勾选的回显

        let permissionIds = this.permissionIdsList


        this.$refs[this.tableConfig.ref].allData.map((item, index) => {
          let flag = permissionIds.findIndex((per) => {
            return item.id == per
          })
          console.log("flag",flag,index)

          if (flag != -1) {
            this.userCheckFlag = false
            this.$refs[this.tableConfig.ref].toggleSelection(index, true)
            permissionIds.splice(flag, 1)
          }
        })

        //如果切到的是父级模块，子级有勾选则父级勾选，子级全都没有勾选，则父级不勾选。
        if (this.curTreeNode.childNode && this.curTreeNode.childNode.length) {

          let res = await SystemManageApi.getChildList({
            parentId: this.curTreeNode.id
          })

          //判断是否有勾选任意子级
          let obj;
          for(let i=0;i<res.length;i++){
            obj = permissionIds.find((per) => {
                return res[i]==per
            })
            if(obj){
              break ;
            }
          }
          console.log("obg",obj)

          let data = this.$refs[this.tableConfig.ref].selectedData
          if (data.length && !obj) {
            //父级是勾选状态但权限列表没有勾选任意子级
            let index = permissionIds.findIndex((per) => {
              return per==data[0].id
            })
            permissionIds.splice(index,1)
            this.userCheckFlag = false
            this.$refs[this.tableConfig.ref].toggleSelection(0, false)
          }else if(!data.length && obj){
            //父级不是勾选状态但有勾选任意子级
            this.$refs[this.tableConfig.ref].toggleSelection(0, true)
          }

        }
        this.$store.commit('digitalPark/permissionIdsList', [...new Set(permissionIds)])
      },
      async setCheckedPermission() {
        //左侧模块变化后，存储在上一个模块所选择的权限
        let selectData = this.$refs[this.tableConfig.ref].selectedData.map((item) => item.id)
        let tmp = this.permissionIdsList.concat(selectData)
        this.$store.commit('digitalPark/permissionIdsList', [...new Set(tmp)])

        //存储当前模块所有子级权限
        if (this.curTreeNode.childNode && this.curTreeNode.childNode.length) {
          let res = await SystemManageApi.getChildList({
            parentId: this.curTreeNode.id
          })
          this.curPerList = res
        }
        this.getData()
      },

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
    }
  }
</script>

<style lang="less" scoped>
  @import '../less/index.less';
  @import '../../commonProject/less/dataDetailRow.less';

</style>
