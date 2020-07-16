<template>
  <div class="about-me">
    <div class="common-tree-box radius-shadow">
      <Tree :tree-list="taskTypeData" :tree-config="taskTreeConfig"></Tree>
    </div>
    <div class="right-content panel-container">
      <CommonSelect @showSelectParams="updateSelectParams" :taskTypes="taskTypesList" />
      <el-tabs type="border-card" v-model="taskActiveName" @tab-click="handleClick" class="panel">
        <el-tab-pane
          v-for="(item,index) in taskTabsList"
          :label="item.text"
          :name="item.name"
          :key="index"
        >
          <div class="about-me-table">
            <div class="operator-box flex-row-reverse">
              <el-button type="primary" @click="refresh">刷新</el-button>
              <el-button type="primary" @click="addTask">新增</el-button>
            </div>
            <z-table :ref="tableData.ref" :options="tableData">
              <template slot="operation" slot-scope="obj">
                <el-button
                  type="text"
                  v-for="(item,index) in obj.row.ownBtnList"
                  :key="index"
                  @click="item.event(obj)"
                >{{item.text}}</el-button>
                <!-- <el-button type="text" @click="editRow(obj)">详情</el-button>
                <el-button type="text" @click="deleteRow(obj)" v-if="deleteRowShow">删除</el-button>
                <el-button type="text" @click="taskPosition(obj)">定位</el-button>-->
                <!-- window.parent.FindAssetLocation -->
              </template>
            </z-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <OperationPopup
      ref="operationPopup"
      @dialogParams="dialogParams"
      :dialogFormShow="dialogFormShow"
      :specialFormShow="specialFormShow"
      :dialogTitle="dialogTitle"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tree from "../../components/tree/index";
import CommonSelect from "../taskManage/coms/commonSelect";
import OperationPopup from "../taskManage/coms/operationPopup";
import TaskManageApi from "../../service/api/taskManage";
import CommonFun from "../../utils/commonFun";
import {
  StockDic,
  TaskManageDic
} from "@/utils/dictionary";
export default {
  name: "AboutMe",
  components: {
    Tree,
    CommonSelect,
    OperationPopup
  },
  data() {
    let _this = this;
    return {
      currentPage: 1,
      levelId: 1,
      taskActiveName: sessionStorage.taskActiveName
        ? sessionStorage.taskActiveName
        : "frist",
      taskType: 1,
      taskId: "",
      taskTreeConfig: {
        nodeKey: "value",
        treeProps: {
          label: "label",
          children: "nodes"
        },
        showSearch: true,
        defaultExpandedkeys: []
      },
      tableData: {
        ref: "tableData",
        operation: {
          width: 200
        },
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          searchable: ["taskName", "officeLocation"],
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
      deleteRowShow: true,
      deviceId: "",
      commonParams: {},
      taskTypesList: [
        { label: "全部", value: "5", status: "0" },
        { label: "待派", value: "0", status: "1" },
        { label: "已派", value: "3", status: "2" },
        { label: "处理中", value: "2", status: "3" },
        { label: "已完成", value: "0", status: "4" },
        { label: "已挂起", value: "0", status: "5" }
      ],
      taskTypeData: TaskManageDic.taskType,
      taskTabsList: TaskManageDic.taskTabs,
      taskTypeStatus: "",
      designatorId: "",
      reason: "",
      taskPicList: [],
      dialogFormShow: false,
      paramsDialog: {
        designatorId: "",
        reason: "",
        taskPicList: []
      },
      specialFormShow: 0,
      dialogTitle: "标题"
    };
  },
  computed: {
    ...mapState({
      menuIsCollapse: state => state.digitalPark.menuIsCollapse
    }),
    commonBtn() {
      let _this = this;
      if (this.taskActiveName == "second") {
        return [
          { id: 0, text: "详情", event: _this.editRow },
          { id: 1, text: "定位", event: _this.taskPosition },
          { id: 2, text: "关闭", event: _this.closeClick }
        ];
      } else {
        return [
          { id: 0, text: "详情", event: _this.editRow },
          { id: 1, text: "定位", event: _this.taskPosition }
        ];
      }
    }
  },
  methods: {
    onClickTreeNodeCallBack() {},
    updateSelectParams(params) {
      this.commonParams = params;
      this.taskList();
    },
    onClickSureAssignBtn() {},
    async taskList() {
      let _this = this;
      let labelList = [
        { label: "工单编号", prop: "taskNumber" },
        { label: "工单名称", prop: "taskName" },
        { label: "工单类型", prop: "type" },
        { label: "工单描述", prop: "description" },
        { label: "创建时间", prop: "beginTime" },
        { label: "预计结束时间", prop: "endTime" },
        {
          label: "优先级",
          prop: "urgent",
          type: "select",
          dicData: TaskManageDic.urgentStatus
        },
        { label: "状态", prop: "taskStatus" },
        { label: "创建人", prop: "founderName" },
        { label: "处理人", prop: "username" },
        {
          label: "地点",
          prop: "officeLocation",
          type: "select",
          dicData: TaskManageDic.locationStatus
        },
        {
          label: "补录",
          prop: "isSupplement",
          type: "select",
          dicData: TaskManageDic.supplementStatus
        },
        { label: "设备点位", prop: "caption" }
      ];
      this.tableData.columnConfig = labelList;
      let params = {
        ...this.commonParams,
        ...{
          pageNum: this.currentPage,
          pageSize: 10,
          type: this.taskType
        }
      };
      let res = await TaskManageApi.taskList(params);
      this.taskTypesList = res.taskTypes;
      if (res && res.list) {
        res.list.map((item, ind) => {
          this.deviceId = item.deviceId;
          let btnTmp = [];
          let arr = [];
          if (this.taskActiveName == "third") {
            if (item.status == 2) {
              btnTmp = [
                { id: 3, text: "接单", event: this.acceptClick },
                { id: 4, text: "退单", event: this.returnClick }
              ];
            } else if (item.status == 3) {
              btnTmp = [
                { id: 4, text: "转派", event: this.turnSendClick },
                { id: 5, text: "挂起", event: this.hangClick },
                { id: 6, text: "完成", event: this.completeClick }
              ];
            } else if (item.status == 5) {
              btnTmp = [
                { id: 7, text: "解除挂起", event: this.cancelHoldClick }
              ];
            } else {
              btnTmp = [];
            }

            item.taskStatus = TaskManageDic.sendTaskStatus[item.status];
          } else if (this.taskActiveName == "second") {
            if (item.status == 1) {
              btnTmp = [
                { id: 3, text: "派单", event: this.sendClick }
                // { id: 4, text: "删除", event: this.deleteRow }
              ];
            } else if (item.status == 2) {
              btnTmp = [
                { id: 4, text: "撤回", event: this.withdrawClick }
                // { id: 5, text: "删除", event: this.deleteRow }
              ];
            } else if (item.status == 3) {
              // btnTmp = [{ id: 4, text: "删除", event: this.deleteRow }];
            } else if (item.status == 5) {
              // btnTmp = [{ id: 7, text: "删除", event: this.deleteRow }];
            } else {
              btnTmp = [];
              // this.commonBtn.pop()
            }
            item.taskStatus = TaskManageDic.acceptTaskStatus[item.status];
          } else {
            item.taskStatus = TaskManageDic.acceptTaskStatus[item.status];
            btnTmp = [];
          }
          arr = btnTmp.concat(this.commonBtn);
          // arr = this.commonBtn.concat(btnTmp);
          item.ownBtnList = arr;
        });
        this.tableData.data = res.list;
        this.tableData.uiConfig.pagination.total = res.total;
      } else {
        this.tableData.data = [];
        this.tableData.uiConfig.pagination.total = res.total;
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
    async dealTask() {
      let res = await TaskManageApi.dealTask({
        ...this.paramsDialog,
        ...{
          id: this.taskId,
          taskType: this.taskTypeStatus
        }
      });
      if (res) {
        this.toastMessage(res);
        this.dialogFormShow = false;
        this.taskList();
      }
    },
    async dialogParams(data, hide) {
      console.log("data", data);
      this.paramsDialog = data;
      if (this.specialFormShow == 5) {
        await this.sureDelete();
      } else if (this.specialFormShow == 4) {
        await TaskManageApi.completeTask({
          ...this.paramsDialog,
          ...{
            id: this.taskId
          }
        }).then(res => {
          if (res) {
            this.toastMessage(res);
            this.dialogFormShow = false;
            this.taskList();
          }
        });
      } else {
        await this.dealTask();
      }
      this.$refs.operationPopup.resetFormFunc();//调用子组件重置表单方法
      hide();
    },
    closeDialog(val) {
      this.dialogFormShow = val;
    },
    acceptClick({ row }) {
      this.taskId = row.id;
      this.taskTypeStatus = 1;
      this.toastSure("接单", this.dealTask);
    },
    returnClick({ row }) {
      this.taskId = row.id;
      this.taskTypeStatus = 4;
      this.dialogFormShow = true;
      this.specialFormShow = 2;
      this.dialogTitle = "退单原因";
    },
    turnSendClick({ row }) {
      this.taskId = row.id;
      this.taskTypeStatus = 3;
      this.dialogFormShow = true;
      this.specialFormShow = 3;
      this.dialogTitle = "转派工单";
      console.log("转派");
    },
    hangClick({ row }) {
      this.taskId = row.id;
      this.taskTypeStatus = 5;
      this.dialogFormShow = true;
      this.specialFormShow = 7;
      this.dialogTitle = "挂起工单";
    },
    completeClick({ row }) {
      this.taskId = row.id;
      this.dialogFormShow = true;
      this.specialFormShow = 4;
      this.dialogTitle = "完成工单";
    },
    cancelHoldClick({ row }) {
      this.taskId = row.id;
      this.taskTypeStatus = 3;
      this.toastSure("解除挂起", this.cancelHoldEvent);
    },
    async cancelHoldEvent() {
      let res = await TaskManageApi.getCancelHold({
        id: this.taskId
      });
      if (res) {
        this.toastMessage(res);
        this.taskList();
      }
    },
    sendClick(row) {
      this.taskId = row.id;
      this.dialogFormShow = true;
      this.specialFormShow = 1;
      this.dialogTitle = "派单";
      console.log("派单");
    },
    closeClick({ row }) {
      this.taskId = row.id;
      this.dialogFormShow = true;
      this.specialFormShow = 5;
      this.dialogTitle = "关闭工单";
      console.log("关闭");
    },
    withdrawClick(row) {
      this.taskId = row.row.id;
      this.taskTypeStatus = 2;
      this.toastSure("撤回", this.dealTask);
      console.log("撤回");
    },
    toastSure(message, event) {
      this.$confirm(`确定要${message}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          event && event();
        })
        .catch(err => {
          if (err === "cancel" || err === "close") {
            this.$message({
              type: "info",
              message: `已取消${message}`
            });
          } else {
            this.$message({
              type: "error",
              message: "出错,请在控制台查看错误信息"
            });
            console.error(err);
          }
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.taskList();
    },
    handleClick(tab, event) {
      sessionStorage.setItem("taskActiveName", this.taskActiveName);
      this.taskActiveName == "frist"
        ? (this.taskType = 1)
        : this.taskActiveName == "second"
        ? (this.taskType = 1)
        : this.taskActiveName == "third"
        ? (this.taskType = 2)
        : "";
      if (this.taskActiveName == "third") {
        this.deleteRowShow = false;
      } else {
        this.deleteRowShow = true;
      }
      this.taskList();
    },
    async sureDelete() {
      let res = await TaskManageApi.closeTask({
        ...this.paramsDialog,
        ...{
          taskId: this.taskId
        }
      });
      if (res) {
        this.toastMessage(res);
        this.dialogFormShow = false;
        this.taskList();
      }
    },
    deleteRow(val) {
      this.taskId = val.scopeRow.row.id;
      this.toastSure("删除", this.sureDelete);
    },
    taskPosition(val) {
      console.log("val", val);
      // window.parent.FindAssetLocation()
      if (val.row.deviceId && val.row.type == "设备") {
        //  window.FindAssetLocation && window.FindAssetLocation(val.row.deviceId +'')
        window.FindAssetLocation
          ? window.FindAssetLocation(val.row.deviceId + "")
          : window.parent.FindAssetLocation(val.row.deviceId + "");
      } else {
        this.$message({
          type: "warning",
          message: "没有可定位的设备!"
        });
      }
    },
    editRow(val) {
      if (this.taskActiveName == "second") {
        this.$router.push({
          name: "NewTask",
          query: {
            extraOptions: {
              disabled: true
            },
            id: val.scopeRow.row.id,
            status: val.scopeRow.row.status
          }
        });
      } else if (this.taskActiveName == "third") {
        this.$router.push({
          name: "NewTask",
          query: {
            extraOptions: {
              disabled: true
            },
            id: val.scopeRow.row.id,
            acceptStatus: val.scopeRow.row.status
          }
        });
      } else {
        this.$router.push({
          name: "NewTask",
          query: {
            extraOptions: {
              disabled: true
            },
            id: val.scopeRow.row.id,
            allTaskStatus: "000"
          }
        });
      }
    },
    refresh() {
      this.currentPage = 1;
      this.taskList();
    },
    addTask() {
      this.$router.push("newTask");
    },
    fixTree() {
      $(".common-tree-box").css({
        height: $(document).height() - 110 + "px"
      });
    }
  },
  mounted() {
    this.taskActiveName == "frist"
      ? (this.taskType = 1)
      : this.taskActiveName == "second"
      ? (this.taskType = 1)
      : this.taskActiveName == "third"
      ? (this.taskType = 2)
      : "";
    if (this.taskActiveName == "third") {
      this.deleteRowShow = false;
    }
    this.taskList();
    this.taskTreeConfig.defaultExpandedkeys = [this.taskTypeData[0].value];
    this.fixTree();
    $(window).resize(() => {
      this.fixTree();
    });
  }
};
</script>

<style lang="less">
@import "../commonProject/less/popupStyle.less";
.about-me {
  height: 100%;
  .el-tabs {
    // height: 100%;
    border: none;
    margin-top: 20px;
  }
  .panel {
    padding: 0;
  }
  .right-content {
    height: 100%;
  }
  .energy-tree-box {
    height: 100%;
    padding: 20px 0;
    background: @white;
    bottom: 20px;
    .el-select {
      width: 120px;
      margin: 0 0 20px 65px;
    }
  }
  .about-me-table {
    // margin: 20px 0;
    // padding: 20px;
    .operator-box {
      background: @white;
      margin-bottom: 20px;
      display: flex;
      flex-direction: row-reverse;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
