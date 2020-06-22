<template>
  <div class="already-task panel-container">
    <div
      :class="menuIsCollapse?'collapse-left-zoom-nav':'unload-left-zoom-nav'"
      class="energy-tree-box radius-shadow"
    >
      <Tree :tree-list="taskData" :tree-config="taskTreeConfig"></Tree>
    </div>
    <div class="right-content panel-container">
      <CommonSelect :taskTypes="taskTypesList" @showSelectParams="updateSelectParams" />
      <div class="already-task-table panel">
        <div class="operator-box flex-row-reverse">
          <el-button type="primary">刷新</el-button>
          <el-button type="primary">删除</el-button>
        </div>
        <z-table :ref="tableData.ref" :options="tableData"></z-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tree from "../../components/tree/index";
import CommonSelect from "../taskManage/coms/commonSelect";
import TaskManageApi from "../../service/api/taskManage";

export default {
  name: "AlreadyTask",
  components: {
    Tree,
    CommonSelect
  },
  data() {
    let _this = this;
    return {
      currentPage: 1,
      taskId: "",
      taskTreeConfig: {
        nodeKey: "value",
        treeProps: {
          label: "label",
          children: "nodes"
        },
        showSearch: true,
        // onClickTreeNodeCallBack: this.onClickTreeNodeCallBack,
        defaultExpandedkeys: []
      },
      tableData: {
        ref: "tableData",
        data: [],
        columnConfig: [],
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
        },
        btnConfig: {
          prop: "operation",
          label: "操作",
          fixed: "right",
          width: 150,
          btns: [
            {
              type: "basic",
              label: "详情",
              handler: function(data) {
                _this.editRow(data.row);
              }
            },
            {
              type: "basic",
              label: "删除",
              handler: function(data) {
                _this.deleteRow(data.row);
              }
            }
          ]
        }
      },
      todayFinish: "",
      taskTypesList: [
        { label: "全部", value: "5", status: "0" },
        // { label: "待派", value: "0", status: "1" },
        // { label: "已派", value: "3", status: "2" },
        { label: "处理中", value: "2", status: "3" },
        { label: "已完成", value: "0", status: "4" }
        // { label: "已挂起", value: "0", status: "5" }
      ],
      commonParams: {}
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
        { label: "优先级", prop: "urgentText" },
        { label: "状态", prop: "taskStatus" },
        { label: "创建人", prop: "founderName" },
        { label: "处理人", prop: "username" }
      ];
      this.tableData.columnConfig = labelList;
      let params = {
        ...this.commonParams,
        ...{
          pageNum: this.currentPage,
          pageSize: 10,
          taskStatus: 1
        }
      };
      let res = await TaskManageApi.taskList(params);
      if (res.list) {
        res.list.map((item, ind) => {
          item.taskStatus =
            item.status == "1"
              ? "待派"
              : item.status == "2"
              ? "已派"
              : item.status == "3"
              ? "处理中"
              : item.status == "4"
              ? "已完成"
              : "";

          item.urgentText =
            item.urgent == "1"
              ? "正常"
              : item.urgent == "2"
              ? "重要"
              : item.urgent == "3"
              ? "紧急"
              : "";
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
    async homeTaskCount() {
      let res = await TaskManageApi.homeTaskCount();
      if (res) {
        this.todayFinish = res.todayFinish;
      }
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
      console.log(val);
      this.taskId = val.id;
      this.showDeleteTip();
    },
    editRow(val) {
      this.$router.push({
        name: "NewTask",
        query: {
          extraOptions: {
            disabled: true
          },
          id: val.id,
          status: val.status,
          pageParams: 1
        }
      });
    },
    fixTree() {
      $(".energy-tree-box").css({
        height: $(document).height() - 110 + "px"
      });
    }
  },
  mounted() {
    this.taskList();
    this.homeTaskCount();
    this.taskTreeConfig.defaultExpandedkeys = [this.taskData[0].value];
    this.fixTree();
    $(window).resize(() => {
      this.fixTree();
    });
  }
};
</script>

<style lang="less">
.already-task {
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
  .already-task-table {
    margin: 20px 0;
    padding: 20px;
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