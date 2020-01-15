<template>
  <div class="man-made-list panel-container">
    <div class="flex condition-box radius-shadow">
      <div class="block">
        <span class="demonstration">开始时间</span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(-1)"
          :clearable="false"
        ></el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(-1)"
          :clearable="false"
        ></el-date-picker>
      </div>
      <el-button type="primary" @click="getManMadeCollectList">确定</el-button>
    </div>
    <div class="table-box panel">
      <div class="operator-box">
        <el-button type="primary" icon="el-icon-delete" @click="onMultiDel">删除记录</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加记录</el-button>
      </div>
      <Table :ref="collectTableConfig.ref" :table-config="collectTableConfig"></Table>
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/common";
import Table from "../../../components/Table/index";
import CommonFun from "../../../utils/commonFun";
export default {
  name: "ManMadeCollectList",
  components: {
    Table
  },
  data() {
    let _this = this;
    return {
      startTime: "",
      endTime: "",
      curPage: 1,
      collectTableConfig: {
        ref: "collectTable",
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto",
          selection: true,
          pagination: {
            layout: "total,->, prev, pager, next, jumper",
            handler(pageSize, val) {
              _this.handleCurrentChange(val);
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
              label: "修改",
              handler: function(data) {
                _this.tableEdit(data.row);
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
        },
        tableMethods: {}
      },
      deviceId: ""
    };
  },
  methods: {
    onTimeChange(flag) {},
    async getManMadeCollectList() {
      let params = {
        start: this.startTime,
        end: this.endTime,
        page: this.curPage,
        rows: 10
      };
      let res = await CommonApi.getManMadeCollectList(params);
      this.collectTableConfig.columnConfig = [
        { label: "监测器名称", prop: "monitorStr" },
        { label: "录入时间", prop: "lookTime" },
        { label: "用户名", prop: "person" },
        { label: "表值", prop: "value" }
      ];
      this.collectTableConfig.data = res.data;
      this.collectTableConfig.uiConfig.pagination.total = res.total;
      if (res && res.data) {
        res.data.map(item => {
          this.deviceId = item.id;
        });
      }
    },
    tableEdit(data) {
      this.$router.push({
        path: "addCollect",
        query: {
          rowData: data
        }
      });
    },
    showDeleteTip() {
      CommonFun.deleteTip(this, this.deviceId, "请至少选择一条设备！", this.sureDelete,this.cancelDelete);
    },
    async sureDelete() {
      console.log(this.deviceId);
       await CommonApi.deleteHandInput({
        idStr: this.deviceId
      });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.deviceId = ''
      this.getManMadeCollectList();
    },
    cancelDelete(){
      this.deviceId = ''
    },
    deleteRow(val) {
      this.deviceId = val.id;
      this.showDeleteTip()
    },
     onMultiDel(){
      this.deviceId=this.$refs['collectTable'].getSelectedData().length &&
      this.$refs['collectTable'].getSelectedData().map((item)=>item.id).join(",")
      this.showDeleteTip()
    },
    onClickAddBtn() {
      this.$router.push("/addCollect");
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getManMadeCollectList();
    }
  },
  mounted() {
    this.getManMadeCollectList();
  }
};
</script>

<style lang="less">
.man-made-list {
  .condition-box {
    padding: 20px;
    background: @white;
    margin-bottom: 20px;
  }
  .block {
    margin-right: 40px;
  }
  .demonstration {
    margin-right: 5px;
  }
  .operator-box {
    clear: both;
    display: flex;
    margin-bottom: 20px;
    flex-direction: row-reverse;
    .el-button {
      margin-left: 20px;
    }
  }
  .table-box {
    padding: 20px;
    background: @white;
  }
}
</style>
