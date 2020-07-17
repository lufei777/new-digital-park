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
      <div class="table-wrapper radius-shadow panel">
        <div class="operator-btn-box flex-row-reverse" v-if="!hideBtn">
          <el-button type="primary" @click="onClickExportBtn" v-if="fromFlag==1">导出</el-button>
          <el-button type="primary" @click="onClickMultiDelBtn" v-if="fromFlag==3 || fromFlag==4">删除</el-button>
          <el-button type="primary" @click="onClickAddBtn">添加</el-button>
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

  export default {
    name: 'RenderPage',
    components: {
      Tree,
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
          expandOnClickNode:false
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
        userCheckFlag:false  //true：是用户点击的 false：程序回显
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse: state => state.digitalPark.menuIsCollapse,
        permissionIdsList: state => state.digitalPark.permissionIdsList
      }),
      nameLabel() {
        return this.fromFlag == 2 ? '工程用名' : '机构简称'
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
        this.treeList = await SystemManageApi.getDepartmentTree()
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
        this.treeList = await SystemManageApi.getPermissionTree()
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
          let selectData = this.$refs[this.tableConfig.ref].selectedData.map((item) => item.id)
          // console.log(this.permissionIdsList)
          let tmp = this.permissionIdsList.concat(selectData)
          this.$store.commit('digitalPark/permissionIdsList', tmp)
          // console.log("this.",this.$refs[this.tableConfig.ref].allData)
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
        this.$refs[this.tableConfig.ref].refreshTable().then(() => {
          if (this.fromFlag == 4 && this.hideBtn == true) {
            this.setPermission()
          }
        })
      },
      onClickMultiDelBtn() {
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        this.deleteId = tmp.map((item) => item.id).join(",")
        CommonFun.deleteTip(this, this.deleteId, '至少选择一条数据！', this.sureDelete)
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
       onSelectCheckBox(selection, row) {
        this.userCheckFlag=true
      },
      onSelectAllCheckBox(){
        this.userCheckFlag=true
      },
      async onSelectionChange(selection) {
        // console.log("selection",selection)
        let permissionIds = this.permissionIdsList
        // console.log(this.curTreeNode,selection.length)
        //如果勾选的是父节点,则同步勾选/取消勾选子节点
        if (this.curTreeNode.childNode && this.curTreeNode.childNode.length && this.userCheckFlag) {
          let res = await SystemManageApi.getChildList({
            parentId: this.curTreeNode.id
          })
          res.push(this.$refs[this.tableConfig.ref].allData[0].id)
          let tmp = []
          if (selection.length) {
            tmp = [...new Set(permissionIds.concat(res))]
          } else {
            console.log(permissionIds,res)
            res.map((item)=>{
              permissionIds.map((per,index)=>{
                if(item==per){
                  permissionIds.splice(index,1)
                }
              })
            })
            permissionIds.splice()
            tmp = permissionIds
          }
          console.log("tmp",tmp)
          this.$store.commit('digitalPark/permissionIdsList',tmp)
        }else{
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
        }

      },
      getAssignList() {
        let tmp = this.$refs[this.tableConfig.ref].selectedData
        return tmp
      },
      setPermission() {
        //已有权限回显
        let permissionIds = this.permissionIdsList
        this.$refs[this.tableConfig.ref].allData.map((item, index) => {
          let flag = permissionIds.findIndex((per) => {
            return item.id == per
          })
          if (flag != -1) {
            this.userCheckFlag=false
            this.$refs[this.tableConfig.ref].toggleSelection(index, true)
            permissionIds.splice(flag, 1)
          }
        })
        this.$store.commit('digitalPark/permissionIdsList', permissionIds)
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
