<template>
  <div class="maintenance-manage">
     <OperationPopup
      ref="operationPopup"
      @dialogParams="dialogParams"
      :dialogFormShow="dialogFormShow"
      :specialFormShow="specialFormShow"
      :dialogTitle="dialogTitle"
      @closeDialog="closeDialog"
      :dialogWidth="dialogWidth"
      :formGroupShow="pageName"
      :repairsId="repairsId"
      dialogTop="40px"
    />
    <div class="panel-container">
      <CommonSearch />
      <el-dialog
        v-dialogDrag
        title="新增维修"
        :visible.sync="dialogVisible"
        width="70%"
        top="30px"
        custom-class="per-modal popup-style"
        :before-close="dialogClose"
      >
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <CommonAddMaintenance :showBoxShadow="false" :closeDialogModel="closeDialogModel" />
        </el-scrollbar>
      </el-dialog>
      <z-table :ref="tableConfig.ref" :options="tableConfig" class="panel">
        <template slot="custom-top" slot-scope="{size}">
          <el-button type="primary" :size="size" @click="onClickAddBtn()">新增维修</el-button>
        </template>
        <template slot="operation" slot-scope="{ scopeRow: { $index, row } }">
          <el-button
            type="text"
            v-for="(item,index) in row.ownBtnList"
            :key="index"
            @click="item.event(row)"
          >{{item.text}}</el-button>
          <!-- <el-button type="text" @click="auditDetail(row)">详情</el-button> -->
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
let objFlag = {
  1: { name: "派单", api: MaintenanceManage.dispatch, status: "" ,width:'50%'},
  2: { name: "关闭", api: TaskManageApi.closeTask, status: 2 ,width:'30%'},
  3: { name: "退回", api: MaintenanceManage.backRepair, status: 5,width:'30%' },
  4: { name: "撤销", api: TaskManageApi.dealTask,status: 2 ,width:'30%'},
};
import CommonAddMaintenance from "./coms/commonAddMaintenance";
import CommonSearch from "./coms/commonSearch";
import MaintenanceManage from "@/service/api/maintenance-manage";
import CommonApi from "@/service/api/common";
import { TaskManageDic, MaintenanceManageDic } from "@/utils/dictionary";
import OperationPopup from "../taskManage/coms/operationPopup";
import CommonFun from "@/utils/commonFun.js";
import TaskManageApi from "../../service/api/taskManage";
export default {
  name: "MaintenanceManageInfo",
  components: {
    CommonAddMaintenance,
    CommonSearch,
    OperationPopup
  },
  data() {
    let _this = this;
    return {
      tableConfig: {
        ref: "tableRef",
        operation: {
          width: 200
        },
        data: [],
        columnConfig: [
          {
            label: "工单名称",
            prop: "taskName"
          },
          {
            label: "关联设备",
            prop: "deviceName"
          },
          {
            label: "维修类型",
            prop: "repairType"
          },
          {
            label: "任务状态",
            prop: "status",
            // dicData: TaskManageDic.urgentStatus
            formatter: row => {
              return TaskManageDic.sendTaskStatus[row.status];
            }
          },
          {
            label: "是否收费",
            prop: "charge",
            type: "select",
            dicData: MaintenanceManageDic.payWayStatus
          },
          {
            label: "报修人",
            prop: "repairPerson"
          },
          {
            label: "接单人",
            prop: "designatorName"
          },
          {
            label: "预约时间",
            prop: "repairTime"
          },
          {
            label: "派单时间",
            prop: "startTime"
          }
        ],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          showIndex: true,
          pagination: {
            //是否分页，分页是否自定义
            layout: "total,->, prev, pager, next, jumper",
            pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
              _this.handleCurrentChange(currentPage);
            }
          }
        }
      },
      dialogVisible: false,
      selectParams: {},
      addParams: {},
      dialogFormShow: false,
      specialFormShow: 0,
      dialogTitle: "",
      currentPage: 1,
      pageName: "",
      repairsId: "",
      taskTypeStatus: "",
      paramsDialog: {},
      apiFlag:"",
      dialogWidth:'50%'
    };
  },
  watch: {
    apiFlag(val) {
      this.dialogTitle = objFlag[val].name;
      this.dialogWidth = objFlag[val].width;
    }
  },
  computed: {
    commonBtn() {
      let _this = this;
      return [{ id: 0, text: "详情", event: _this.auditDetail }];
    }
  },
  methods: {
    async test() {
      let res = await MaintenanceManage.getRepairs();
      console.log("res", this.$refs[this.tableConfig.ref].tableShowData);
    },
    async repairsList() {
      let res = await MaintenanceManage.getRepairs({
        ...this.selectParams,
        ...{
          pageSize: 10,
          pageNum: this.currentPage
        }
      });
      if (res && res.list) {
        res.list.map(item => {
          let btnTmp = [];
          let arr = [];
          if (item.status == 1) {
            btnTmp = [
              { id: 3, text: "派单", event: this.acceptClick },
              { id: 4, text: "关闭", event: this.closeClick },
              { id: 4, text: "退回", event: this.returnClick }
            ];
          } else if (item.status == 2) {
            btnTmp = [
              { id: 3, text: "撤销", event: this.revokeClick },
              { id: 4, text: "关闭", event: this.closeClick }
            ];
          } else if (item.status == 3) {
            btnTmp = [{ id: 4, text: "关闭", event: this.closeClick }];
          } else if (item.status == 7) {
            btnTmp = [{ id: 7, text: "编辑", event: this.editRow }];
          } else {
            btnTmp = [];
          }
          arr = btnTmp.concat(this.commonBtn);
          item.ownBtnList = arr;
        });
        this.tableConfig.data = res.list;
        this.tableConfig.uiConfig.pagination.total = res.total;
      } else {
        this.tableConfig.data = [];
        this.tableConfig.uiConfig.pagination.total = res.total;
      }
    },
    getData(params) {
      this.selectParams = params;
      this.repairsList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.repairsList();
    },
    onClickAddBtn() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    closeDialogModel(flag) {
      this.dialogVisible = flag;
      this.repairsList();
    },
    auditDetail(row) {
      this.$router.push({
        name: "MaintenanceDetail",
        query: {
          id: row.id
        }
      });
    },
    editRow() {},
    async dealTask() {
      let res = await objFlag[this.apiFlag].api({
        ...this.paramsDialog,
        ...{
          id: this.repairsId,
          taskType: objFlag[this.apiFlag].status
        }
      });
      if (res) {
        this.toastMessage(res);
        this.dialogFormShow = false;
        this.repairsList();
      }
    },
    toastMessage(res) {
      if (res) {
        this.$message({
          showClose: true,
          message: res,
          type: "success"
        });
      }
    },
    async dialogParams(data, hide) {
      this.paramsDialog = data;
      if (this.apiFlag == 3) {
        await this.backRepair();
      } else {
        await this.dealTask();
      }
      this.$refs.operationPopup.resetFormFunc(); //调用子组件重置表单方法
      hide();
    },
    async dispatch() {
      let res = await MaintenanceManage.dispatch({
        ...this.paramsDialog,
        ...{
          id: this.repairsId
        }
      });
      if (res) {
        this.toastMessage(res);
        this.dialogFormShow = false;
        this.repairsList();
      }
    },
    async backRepair() {
      let res = await MaintenanceManage.backRepair({},{id:this.repairsId + '/back'});
      if (res) {
        this.toastMessage(res);
        this.dialogFormShow = false;
        this.repairsList();
      }
    },
    acceptClick(row) {
      this.apiFlag = 1;
      this.repairsId = row.id;
      this.specialFormShow = 4;
      this.dialogFormShow = true;
    },
    revokeClick(row) {
      this.apiFlag = 4;
      this.repairsId = row.id;
      this.taskTypeStatus = 2;
      CommonFun.deleteTip(
        this,
        this.repairsId,
        "请至少选择一条资产！",
        this.dealTask,
        () => {},
        "撤销"
      );
    },
    closeClick(row) {
      this.apiFlag = 2;
      this.repairsId = row.id;
      this.dialogFormShow = true;
      this.specialFormShow = 1;
    },
    returnClick(row){
      this.apiFlag = 3;
      this.repairsId = row.id;
      this.dialogFormShow = true;
      this.specialFormShow = 1;
    },
    closeDialog(val) {
      this.dialogFormShow = val;
    }
  },
  async mounted() {
    await this.repairsList();
    // await this.handleData();
  }
};
</script>

<style lang="less">
.maintenance-manage {
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 0px 20px 20px 20px;
    // background: pink;
    .item-group {
      margin-top: 20px;
    }
    .item-group:first-child {
      .el-input {
        // width: 161px;
      }
    }
  }
  .el-dialog__body {
    padding: 0 !important;
  }
  .operator-box {
    .el-button {
      margin-right: 10px;
    }
  }
  // .per-modal {
  //   .el-dialog__body {
  //     height: 800px;
  //   }
  // }
}
</style>