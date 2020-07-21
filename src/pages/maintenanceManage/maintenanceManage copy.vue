<template>
  <div class="maintenance-manage panel-container">
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
        <!-- {{obj}}
        <div>{{row}}1111</div> -->
        <!-- <el-button type="text" @click="audit(row)">审核</el-button> -->
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
</template>

<script>
let pageInfo = {
  pageSize: 10,
  pageNum: 1
};
import CommonAddMaintenance from "./coms/commonAddMaintenance";
import CommonSearch from "./coms/commonSearch";
import MaintenanceManage from "@/service/api/maintenance-manage";
import CommonApi from "@/service/api/common";
import { TaskManageDic, MaintenanceManageDic } from "@/utils/dictionary";
export default {
  name: "MaintenanceManageInfo",
  components: {
    CommonAddMaintenance,
    CommonSearch
  },
  data() {
    return {
      tableConfig: {
        ref: "tableRef",
        serverMode: {
          url: MaintenanceManage.getRepairs,
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
          selection: true, //是否多选
          showIndex: true,
          height: "auto"
        }
      },
      dialogVisible: false,
      selectParams: {},
      addParams: {}
    };
  },
  computed: {
    commonBtn() {
      let _this = this;
      return [{ id: 0, text: "详情", event: _this.editRow }];
    }
  },
  methods: {
    async test() {
      let res = await MaintenanceManage.getRepairs();
      console.log("res", this.$refs[this.tableConfig.ref].tableShowData);
    },
    getAddParams(operating, params, hide) {
      console.log(operating, params);
      this.addParams = params;
      this.add();
    },
    async add() {
      let res = await MaintenanceManage.addRepairs(this.addParams);
      console.log("res", res);
    },

    getData(params) {
      console.log("params", params);
      this.selectParams = params;
      this.$refs[this.tableConfig.ref].setCurrentPage(1);
      this.tableConfig.serverMode.data = { ...params, ...pageInfo };
      this.$refs[this.tableConfig.ref].refreshTable();
    },
    onClickAddBtn() {
      //   this.$router.push("./addMaintenance");
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    closeDialogModel(flag) {
      this.dialogVisible = flag;
      this.$refs[this.tableConfig.ref].setCurrentPage(1);
      this.$refs[this.tableConfig.ref].refreshTable();
    },
    auditDetail(row) {
      console.log("row", row.id);
      this.$router.push({
        name: "MaintenanceDetail",
        query: {
          id: row.id
        }
      });
    },
    handleData() {
      console.log("555555", this.$refs[this.tableConfig.ref].tableShowData);
      this.$refs[this.tableConfig.ref].refreshTable().then(res => {
        let list = this.$refs[this.tableConfig.ref].tableShowData;
        console.log("list",list)
        list.map(item => {
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
            btnTmp = [{ id: 7, text: "编辑", event: this.auditDetail }];
          } else {
            btnTmp = [];
          }
          arr = btnTmp.concat(this.commonBtn);
          item.ownBtnList = arr;
        });
      });
    },
    editRow() {}
  },
  async mounted() {
    await this.test();
    await this.handleData();
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
  .per-modal {
    .el-dialog__body {
      height: 800px;
    }
  }
}
</style>