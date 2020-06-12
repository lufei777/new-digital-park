<template>
  <div class="about-me panel-container">
    <div class="common-tree-box radius-shadow">
      <Tree :tree-list="taskData" :tree-config="taskTreeConfig"></Tree>
    </div>
    <div class="right-content panel-container">
      <CommonSelect @showSelectParams="updateSelectParams" :taskTypes="taskTypesList" />
      <el-tabs type="border-card" v-model="taskActiveName" @tab-click="handleClick" class="panel">
        <el-tab-pane
          v-for="(item,index) in tabTypeList"
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
                <el-button type="text" @click="editRow(obj)">详情</el-button>
                <el-button type="text" @click="deleteRow(obj)" v-if="deleteRowShow">删除</el-button>
                <el-button type="text" @click="taskPosition(obj)">定位</el-button>
                <!-- window.parent.FindAssetLocation -->
              </template>
            </z-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tree from "../../components/tree/index";
import CommonSelect from "../taskManage/coms/commonSelect";
import TaskManageApi from "../../service/api/taskManage";
import CommonFun from "../../utils/commonFun";

export default {
  name: "AboutMe",
  components: {
    Tree,
    CommonSelect
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
      ]
    };
  },
  computed: {
    ...mapState({
      menuIsCollapse: state => state.digitalPark.menuIsCollapse
    }),
    taskData() {
      return [
        {
          value: 1,
          label: "巡检任务",
          nodes: []
        },
        {
          value: 2,
          label: "维修任务",
          nodes: []
        },
        {
          value: 3,
          label: "保养任务",
          nodes: []
        },
        {
          value: 4,
          label: "流程任务",
          nodes: []
        },
        {
          value: 5,
          label: "审批任务",
          nodes: []
        },
        {
          value: 6,
          label: "其他任务",
          nodes: []
        }
      ];
    },
    tabTypeList() {
      return [
        {
          text: "全部",
          name: "frist"
        },
        {
          text: "我发起的",
          name: "second"
        },
        {
          text: "我收到的",
          name: "third"
        }
      ];
    }
  },
  methods: {
    onClickTreeNodeCallBack() {},
    updateSelectParams(params) {
      this.commonParams = params;
      this.taskList();
    },
    async taskList() {
      let labelList = [
        { label: "工单编号", prop: "taskNumber" },
        { label: "工单名称", prop: "taskName" },
        { label: "工单类型", prop: "type" },
        { label: "工单描述", prop: "description" },
        { label: "创建时间", prop: "beginTime" },
        { label: "预计结束时间", prop: "endTime" },
        { label: "优先级", prop: "urgent" },
        { label: "状态", prop: "taskStatus" },
        { label: "创建人", prop: "founderName" },
        { label: "处理人", prop: "username" },
        { label: "地点", prop: "officeLocation" },
        { label: "补录", prop: "isSupplementText" },
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
          if (this.taskActiveName == "third") {
            switch (item.status) {
              case "2":
                item.taskStatus = "待接";
                break;
              case "3":
                item.taskStatus = "处理中";
                break;
              case "4":
                item.taskStatus = "已完成";
                break;
              case "5":
                item.taskStatus = "挂单中";
                break;
              default:
                item.taskStatus = "";
                break;
            }
          } else {
            switch (item.status) {
              case "1":
                item.taskStatus = "待派";
                break;
              case "2":
                item.taskStatus = "已派";
                break;
              case "3":
                item.taskStatus = "处理中";
                break;
              case "4":
                item.taskStatus = "已完成";
                break;
              case "5":
                item.taskStatus = "挂单中";
                break;
              default:
                item.taskStatus = "";
                break;
            }
          }
          item.typeText =
            item.type == "1"
              ? "巡检"
              : item.type == "2"
              ? "审批"
              : item.type == "3"
              ? "调试"
              : "其他";

          item.urgent =
            item.urgent == "1"
              ? "正常"
              : item.urgent == "2"
              ? "重要"
              : item.urgent == "3"
              ? "紧急"
              : "";

          item.officeLocation =
            item.officeLocation == 0
              ? "公司"
              : item.officeLocation == 1
              ? "现场"
              : "";

          item.isSupplementText =
            item.isSupplement == "1"
              ? "正常"
              : item.isSupplement == "0"
              ? "补录"
              : "正常";
        });

        this.tableData.data = res.list;
        this.tableData.uiConfig.pagination.total = res.total;
      } else {
        this.tableData.data = [];
        this.tableData.uiConfig.pagination.total = res.total;
      }
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
    showDeleteTip() {
      CommonFun.deleteTip(
        this,
        this.taskId,
        "请至少选择一条任务！",
        this.sureDelete,
        this.cancelDelete
      );
    },
    async sureDelete() {
      await TaskManageApi.closeTask({
        taskId: this.taskId
      });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.taskId = "";
      this.taskList();
    },
    cancelDelete() {
      this.taskId = "";
    },
    deleteRow(val) {
      this.taskId = val.scopeRow.row.id;
      this.showDeleteTip();
    },
    taskPosition(val) {
      console.log("val", val);
      // window.parent.FindAssetLocation()
      if (val.row.deviceId && type == "type") {
        //  window.FindAssetLocation && window.FindAssetLocation(val.row.deviceId +'')
        window.parent.FindAssetLocation &&
          window.parent.FindAssetLocation(val.row.deviceId + "");
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
    this.taskTreeConfig.defaultExpandedkeys = [this.taskData[0].value];
    this.fixTree();
    $(window).resize(() => {
      this.fixTree();
    });
  }
};
</script>

<style lang="less">
.about-me {
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