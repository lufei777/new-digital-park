<template>
  <div class="maintenance-manage panel-container">
    <div class="condition-box radius-shadow flex-align-wrap">
      <div class="item-group">
        <label>工单名称：</label>
        <el-input v-model="searchObj.taskName" />
      </div>

      <div class="item-group">
        <label>是否收费：</label>
        <el-select v-model="searchObj.whetherPay" placeholder="请选择">
          <el-option
            v-for="item in whetherPayList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item-group">
        <label>任务状态：</label>
        <el-select v-model="searchObj.taskStatus" placeholder="请选择">
          <el-option
            v-for="item in taskStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item-group">
        <label>维修类型：</label>
        <el-select v-model="searchObj.maintenanceType" placeholder="请选择">
          <el-option
            v-for="item in maintenanceTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item-group">
        <label>优先级：</label>
        <el-select v-model="searchObj.priority" placeholder="请选择">
          <el-option
            v-for="item in priorityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item-group">
        <label>预约时间：</label>
        <el-date-picker
          v-model="searchObj.reservationTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          :clearable="false"
        ></el-date-picker>
      </div>
      <div class="item-group">
        <label>派单时间：</label>
        <el-date-picker
          v-model="searchObj.sendTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          :clearable="false"
        ></el-date-picker>
      </div>
      <div class="item-group operator-box">
        <el-button type="primary" class="search-btn" @click="onClickSearchBtn">搜索</el-button>
        <el-button @click="onClickResetBtn">重置</el-button>
      </div>
    </div>
    <z-table :ref="tableConfig.ref" :options="tableConfig" class="panel">
      <template slot="custom-top" slot-scope="{size}">
        <el-button type="primary" :size="size" @click="onClickAddBtn(row)">新增维修</el-button>
      </template>
    </z-table>

    <el-dialog
      v-dialogDrag
      title="新增维修"
      :visible.sync="dialogVisible"
      width="80%"
      top="30px"
      custom-class="per-modal popup-style"
      :before-close="dialogClose"
    >
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <PublicAddMaintenance :showBoxShadow="false" />
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
let pageInfo = {
  pageSize: 10,
  pageNum: 1
};
import PublicAddMaintenance from "./coms/publicAddMaintenance";
import maintenanceManage from "../../service/api/maintenance-manage";
import { MaintenanceManageDic, TaskManageDic } from "@/utils/dictionary.js";
import CommonApi from "@/service/api/common";
export default {
  name: "MaintenanceManageInfo",
  components: {
    PublicAddMaintenance
  },
  data() {
    return {
      searchObj: {
        taskName: "",
        whetherPay: "0",
        taskStatus: "0",
        maintenanceType: "",
        priority: "",
        reservationTime: "",
        sendTime: ""
      },
      whetherPayList: MaintenanceManageDic.payRadio,
      taskStatusList: MaintenanceManageDic.taskStatus,
      maintenanceTypeList: MaintenanceManageDic.maintenanceType,
      priorityList: TaskManageDic.priorityType,
      tableConfig: {
        ref: "tableRef",
        serverMode: {
          url: CommonApi.getLogList,
          data: {
            ...pageInfo
          }
        },
        operation: {
          width: 200
        },
        propsHttp: {
          list: "list",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        columnConfig: [
          {
            label: "操作者",
            prop: "loginName"
          },
          {
            label: "操作内容",
            prop: "operatingContent"
          },
          {
            label: "日期时间",
            prop: "optDate"
          },
          {
            label: "结果",
            prop: "result"
          }
        ],
        uiConfig: {
          height: "auto"
        }
      },
      dialogVisible: false
    };
  },
  methods: {
    async test() {
      let res = await maintenanceManage.getRepairs();
      console.log("res", res);
    },
    onClickSearchBtn() {
      this.getData();
    },
    onClickResetBtn() {
      this.searchObj = {
        taskName: "",
        whetherPay: "",
        taskStatus: "",
        maintenanceType: "",
        priority: "",
        reservationTime: "",
        sendTime: ""
      };
      this.getData();
    },
    getData() {
      this.$refs[this.tableConfig.ref].setCurrentPage(1);
      this.tableConfig.serverMode.data = { ...this.searchObj, ...pageInfo };
      this.$refs[this.tableConfig.ref].refreshTable();
    },
    onClickAddBtn() {
      //   this.$router.push("./addMaintenance");
      this.dialogVisible = true;
    },
    dialogClose() {}
  },
  mounted() {
    this.test();
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
  .operator-box {
    .el-button {
      margin-right: 10px;
    }
  }
  .per-modal {
    .el-dialog__body {
      height: 750px;
    }
  }
}
</style>