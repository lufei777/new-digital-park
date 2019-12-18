<template>
  <div>
    <div class="man-made-list">
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
      <div class="table-box radius-shadow">
        <div class="operator-box">
          <el-button type="primary" icon="el-icon-delete">删除记录</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加记录</el-button>
        </div>
        <Table :ref="tableConfig.ref" :table-config="tableConfig"></Table>
      </div>
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/commonApi";
import Table from "../../../components/Table/index";
import commonApi from "../../../service/api/commonApi";

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
      tableConfig: {
        ref: "tableRef",
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
                _this.tableDel(data.row);
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
      this.tableConfig.columnConfig = [
        { label: "监测器名称", prop: "monitorStr" },
        { label: "录入时间", prop: "lookTime" },
        { label: "用户名", prop: "person" },
        { label: "表值", prop: "value" }
      ];
      this.tableConfig.data = res.data;
      this.tableConfig.uiConfig.pagination.total = res.total;
      if (res && res.data) {
        res.data.map(item => {
          this.deviceId = item.id;
        });
      }
    },
    tableEdit(data) {
      // this.$router.push('/addCollect')
      console.log("data", data);
      this.$router.push({
        path: "addCollect",
        query: {
          rowData: data
        }
      });
    },
    async deviceDel() {
      await commonApi.deleteHandInput({
        idStr: this.deviceId
      });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.getManMadeCollectList();
    },
    tableDel(data) {
      this.deviceId = data.id;
      this.deleteTip();
    },
    deleteTip() {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deviceDel();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
