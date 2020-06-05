<template>
  <!-- 报警规则处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class="condition-box radius-shadow">
      <z-form
        :ref="setForms[0].formData.ref"
        :options="setForms[0].formData"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              :disabled="obj.disabled"
              type="primary"
              @click="onClickSearchBtn(obj)"
            >查询</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="clearForm(obj)"
            >重置</el-button>
          </div>
        </template>
      </z-form>
      <!-- 批量编辑弹出来的额对话框 -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        :show-close='false'
      >
        <!-- 批量编辑  === 关闭按钮 -->
        <div class="edit">
          <strong style="font-size:16px;">批量编辑</strong>
          <el-button @click="closeDiolog">
            关闭
          </el-button>
        </div>
        <!-- 弹出框中的表单 -->
        <z-form
          :ref="setForms[1].formData.ref"
          :options="setForms[1].formData"
          v-model="model"
          @submit="submit"
          @reset-change="resetChange"
        >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              :disabled="obj.disabled"
              type="primary"
              @click="onClickSearchBtn(obj)"
            >确认</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="clearForm(obj)"
            >重置</el-button>
          </div>
        </template>
      </z-form>
      </el-dialog>
    </div>

    <!-- 下半部分 -->
    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
      </div>
      <!-- 表格部分 -->
      <z-table
        :ref="tableData.ref"
        :options="tableData"
      >
      <template slot="operation" slot-scope="obj">
            <el-button type="text" @click="propertyDetail(obj)">查看</el-button>
            <el-button type="text" @click="propertyEdit(obj)">编辑</el-button>
            <el-button type="text" @click="propertyDel(obj)">删除</el-button>
      </template>


      <template slot="custom-top" slot-scope="{size,disabled,selectedData}">
          <el-button :disabled='!selectedData.length' >导出</el-button>
          <el-button @click="goAddBasic" type="primary">新建</el-button>
          <el-button @click="orderEdit">批量编辑</el-button>
          <el-button>批量删除</el-button>
          <el-button>导入</el-button>
      </template>
      </z-table>
    </div>
  </div>
</template>

<script>
// 导入配置的字典====根据需要导入自己的配置

import CommonFun from "@/utils/commonFun";
//导入字典中的定义的字段
import { WarningAlerm } from "utils/dictionary";
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 报警状态
const alarmStatus = WarningAlerm.alarmStatus;
// 子系统
const subSystem = WarningAlerm.subSystem;
// 设备类型
const deviceType = WarningAlerm.deviceType;
// 报警类型
const alarmType = WarningAlerm.alarmType;
// 录入类型
const inputType = WarningAlerm.inputType;
// 通知方式
const notificationWay = WarningAlerm.notificationWay;
export default {
  name: "areaManage",
  data() {
    return {
      // 对话框的显示和隐藏
      dialogFormVisible: false,
      model: {},
      // 配置两个表单一个是基本的另一个是弹出框中的表单
      setForms: [
        // 页面显示的表单，
        {
          formData: {
            ref: "formData",
            labelWidth: "100",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            // labelPosition: "left",
            forms: [
              // 报警级别
              {
                type: "select",
                label: "报警级别",
                prop: "alarmLevel",
                span: 5,
                dicData: alarmLevel
              },
              //   子系统
              {
                type: "select",
                label: "子系统",
                span: 5,
                offset: 1,
                prop: "subSystem",
                dicData: subSystem
              },
              //   设备类型
              {
                type: "select",
                label: "设备类型",
                span: 5,
                offset: 1,
                prop: "deviceType",
                dicData: deviceType
              },
              //   报警名称
              {
                type: "input",
                label: "报警名称",
                prop: "name",
                placeholder: "请输入关键字",
                clearable: true,
                span: 5,
                offset: 1,
                minRows: 0
              },
              //  录入类型
              {
                type: "select",
                label: "录入类型",
                prop: "inputType",
                span: 5,
                minRows: 0,
                dicData: inputType
              },
              {
                prop: "btn",
                span: 6,
                pull: 2,
                offset: 13,
                formslot: true
                // width: "34px"
              }
            ]
          }
        },
        // 弹出框的表单
        {
          formData: {
            ref: "formData2",
            labelWidth: "100",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            // labelPosition: "left",
            forms: [
              // 报警级别
              {
                type: "select",
                label: "报警级别",
                prop: "alarmLevel",
                span: 12,
                offset:6,
                row:true,
                dicData: alarmLevel
              },
              // 通知方式 select
              {
                type: "select",
                label: "通知方式",
                prop: "notificationWay",
                span: 12,
                offset:6,
                row:true,
                dicData: notificationWay
              },
              {
                prop: "btn",
                span:18,
                pull: 2,
                offset: 8,
                formslot: true
                // width: "34px"
              }
            ]
          }
        }
      ],
      tableData: {
        ref: "Table",
        customTop: true,
        data:[],
        customTopPosition: "right",
        operation: {
          width: 200
        },
        columnConfig: [ ],
        uiConfig: {
          height: "auto",
          selection: true
        }
      }
    };
  },

  methods: {
    // 查看
    propertyDetail(obj){
        // console.log(obj)
        let seeEdit = {path:'/warningalarm/seeedit',query:{flag:true,...obj.row}}
        this.$router.push(seeEdit)
    },
    // 编辑
    propertyEdit(obj){
      // console.log(obj)
      let seeEdit = {path:'/warningalarm/seeedit',query:{flag:false,...obj.row}}
      this.$router.push(seeEdit)
    },
    // '新建'操作
   goAddBasic(){
      this.$router.push('/warningalarm/addBasicSettings')
    },
    // 批量编辑
    orderEdit() {
      this.dialogFormVisible = true;
    },
    // 弹出框中的关闭按钮
    closeDiolog(){
      this.dialogFormVisible = false;
    },
    // 批量编辑的确认按钮
    onClickSearchBtn(obj){
      this.dialogFormVisible = false;
    },
    submit() {},
    resetChange() {},
    clearForm(obj) {
      // 获取顶部form表单
      var zForm = this.$refs[this.setForms[0].formData.ref]
      // 单击重置按钮时候，重置表单 方法在已经封装好的文档中  名称：resetForm
      zForm.resetForm()
      // console.log(zForm)
    },
    getCleaningList() {
      // 来自CommonFun的模拟数据源 let res = CommonFun.messageDevice;
      let res = CommonFun.warningAlram;
      let labelList = [
        { label: "子系统", prop: "subSystem" },
        { label: "设备类型", prop: "deviceType" },
        { label: "设备名称", prop: "deviceName" },
        { label: "点位类型", prop: "pointType" },
        { label: "报警规则", prop: "alarmRules" },
        { label: "报警级别", prop: "alarmLevel" },
        { label: " 通知方式", prop: "notificationWay" },
        { label: "录入类型", prop: "inputType" }
      ];
      this.tableData.columnConfig = labelList;
      this.tableData.data = res;
    },
    batchDels() {},
    addTenant() {}
  },
  mounted() {
    this.getCleaningList();
  }
};
</script>

<style lang="less" scope="scoped">
.message-device-manage {
  .condition-box {
    padding-top: 20px;
    margin-bottom: 20px;
    .edit{
      display: flex;
      justify-content: space-between;
      padding: 15px 40px;
    }
  }
}
</style>
