<template>
  <div class="task-overview panel-container">
    <div class="common-tree-box radius-shadow">
      <Tree :tree-list="taskData" :tree-config="taskTreeConfig"></Tree>
    </div>
    <div class="right-content panel-container">
      <div class="task-sum-box radius-shadow flex-align-between">
        <div class="task-sum flex-align-center">
          <p>今日任务</p>
          <span>50</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>待派工单</p>
          <span>10</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>待接工单</p>
          <span>50</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>处理中工单</p>
          <span>50</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>今日完成工单</p>
          <span>{{todayFinish}}</span>
        </div>
      </div>
      <CommonSelect />
      <div class="task-overview-table panel">
        <z-table :ref="tableData.ref" :options="tableData">
          <template slot="operation" slot-scope="obj">
            <el-button type="text" @click="editRow(obj)">详情</el-button>
          </template>
        </z-table>
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
  name: "TaskOverview",
  components: {
    Tree,
    CommonSelect
  },
  data() {
    let _this = this;
    return {
      currentPage: 1,
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
        operation: {
          width: 150
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
        },
        btnConfig: {}
      },
      todayFinish: ""
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
    async taskList() {
      let labelList = [
        { label: "工单编号", prop: "taskNumber" },
        { label: "工单名称", prop: "taskName" },
        { label: "工单类型", prop: "typeText" },
        { label: "工单描述", prop: "description" },
        { label: "开始时间", prop: "beginTime" },
        { label: "预计结束时间", prop: "endTime" },
        { label: "优先级", prop: "priority" },
        { label: "状态", prop: "taskStatus" },
        { label: "创建人", prop: "founderName" },
        { label: "处理人", prop: "username" },
        { label: "地点", prop: "officeLocation" },
        { label: "补录", prop: "isSupplementText" }
      ];
      this.tableData.columnConfig = labelList;
      let res = await TaskManageApi.taskList({
        pageNum: this.currentPage,
        pageSize: 10,
        type: 3
      });
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
          item.typeText =
            item.type == "1"
              ? "巡检"
              : item.type == "2"
              ? "审批"
              : item.type == "3"
              ? "调试"
              : "其他";

          item.priority =
            item.urgent == "1"
              ? "重要"
              : item.urgent == "2"
              ? "紧急"
              : item.urgent == "3"
              ? "正常"
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
      }
      if (res) {
        this.tableData.data = res.list;
        this.tableData.uiConfig.pagination.total = res.total;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.taskList();
    },
    editRow(val) {
       this.$router.push({
          name: "NewTask",
          query: {
            extraOptions: {
              disabled: true
            },
            id: val.scopeRow.row.id,
            allTaskStatus: '000'
          }
        });
    },
    async homeTaskCount() {
      let res = await TaskManageApi.homeTaskCount();
      if (res) {
        this.todayFinish = res.todayFinish;
      }
    },
    fixTree() {
      $(".common-tree-box").css({
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
.task-overview {
  .energy-tree-box {
    height: 100%;
    padding: 20px 0;
    background: @white;
    bottom: 20px;
    // left: 270px;
    .el-select {
      width: 120px;
      margin: 0 0 20px 65px;
    }
  }
  .task-sum-box {
    padding: 20px 20px;
    margin-bottom: 20px;
    .task-sum {
      width: 18%;
      height: 70px;
      // background: @white;
      border-radius: 6px;
      color: @white;
      font-size: 20px;
      p {
        margin-right: 5px;
      }
      background: linear-gradient(
        120deg,
        rgba(234, 111, 233, 1),
        rgba(141, 100, 248, 1)
      );
      box-shadow: 0px 4px 12px 0px rgba(141, 100, 248, 0.5) !important;
    }
    .task-sum:nth-child(2) {
      background: linear-gradient(
        120deg,
        rgba(95, 176, 255, 1),
        rgba(106, 136, 254, 1)
      );
      box-shadow: 0px 4px 12px 0px rgba(106, 138, 254, 0.5) !important;
    }
    .task-sum:nth-child(3) {
      background: linear-gradient(
        120deg,
        rgba(255, 133, 96, 1),
        rgba(255, 113, 152, 1)
      );
      box-shadow: 0px 4px 12px 0px rgba(255, 113, 152, 0.5) !important;
    }
    .task-sum:nth-child(4) {
      background: linear-gradient(
        120deg,
        rgba(57, 206, 192, 1),
        rgba(19, 159, 209, 1)
      );
      box-shadow: 0px 4px 12px 0px rgba(19, 159, 209, 0.5) !important;
    }
    .task-sum:nth-child(5) {
      background-image: linear-gradient(120deg, #21d4fd, #b721ff);
    }
  }
  .task-overview-table {
    margin: 20px 0;
    padding: 20px;
  }
}
</style>
