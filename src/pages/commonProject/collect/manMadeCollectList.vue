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
        <el-button type="primary" @click="onMultiDel" v-if="checkPermission(['remove'])">删除</el-button>
        <el-button type="primary" @click="onClickAddBtn" v-if="checkPermission(['add'])">添加</el-button>
      </div>
      <z-table :ref="collectTableConfig.ref" :options="collectTableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="tableEdit(row)" v-if="checkPermission(['edit'])">编辑</el-button>
          <el-button type="text" @click="deleteRow(row)" v-if="checkPermission(['remove'])">删除</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/common";
import CommonFun from "../../../utils/commonFun";
import { checkPermission } from '@/utils/permission'

export default {
  name: "ManMadeCollectList",
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
        operation:true,
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
        tableMethods: {}
      },
      deviceId: ""
    };
  },
  methods: {
    checkPermission(val){
      return checkPermission(val)
    },
    onTimeChange(flag) {},
    async getManMadeCollectList() {
      let params = {
        start: this.startTime,
        end: this.endTime,
        page: this.curPage,
        rows: 10
      };
      this.collectTableConfig.columnConfig = [
        { label: "监测器名称", prop: "monitorStr" },
        { label: "录入时间", prop: "lookTime" },
        { label: "用户名", prop: "person" },
        { label: "表值", prop: "value" }
      ];
      let res = await CommonApi.getManMadeCollectList(params); 
      this.collectTableConfig.data = res.data;
      this.collectTableConfig.uiConfig.pagination.total = res.total;
      if (res && res.data) {
        res.data.map(item => {
          this.deviceId = item.id;
        });
      }
    },
    tableEdit(data) {
      this.$router.push(`/addCollect?id=${data.id}`)
    },
    showDeleteTip() {
      console.log(this.deviceId)
      CommonFun.confirmTip(this.deviceId, "请至少选择一条设备！", '确定要删除吗?',this.sureDelete,this.cancelDelete);
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
      this.deviceId = this.$refs['collectTable'].getSelectedData().map((item)=>item.id).join(",")
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
