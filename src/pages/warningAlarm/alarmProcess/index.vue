<template>
  <!-- 报警规则处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class="condition-box radius-shadow">
      <z-form
        :ref="formData.ref"
        :options="formData"
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
    </div>

    <!-- 下半部分 -->
    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
      </div>
      <!-- 表格部分 -->
      <z-table
        class="_border"
        :ref="tableData.ref"
        :options="tableData"
      >
      <template slot="operation" slot-scope="obj">
            <el-button type="text" @click="propertyDetail(obj)">查看</el-button>
            <el-button type="text" @click="propertyEdit(obj)">编辑</el-button>
            <el-button type="text" @click="propertyDel(obj)">删除</el-button>
      </template>

      <template slot="custom-top" slot-scope = "{size,disabled,selectedData}">
           <el-button :disabled='!selectedData.length' >导出</el-button>
          <el-button @click="gonewGrounp" type="primary">新建</el-button>
          <el-button>批量编辑</el-button>
          <el-button>批量删除</el-button>
          <el-button>导入</el-button>
      </template>
      </z-table>
    </div>
  </div>
</template>

<script>
// 导入配置的字典====根据需要导入自定义配置
import CommonFun from "@/utils/commonFun";
//导入字典中的定义的字段
import { WarningAlerm } from "utils/dictionary";
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 子系统
const subSystem = WarningAlerm.subSystem;
// 处理人员
const handingPerson = WarningAlerm.handingPerson;

export default {
  name: "areaManage",
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        menuBtn: false,
        // labelPosition: "left",
        forms: [
          //   子系统
          {
            type: "select",
            label: "子系统",
            span: 5,
            prop: "subSystem",
            dicData: subSystem
          },
          // 报警级别
          {
            type: "select",
            label: "报警级别",
            prop: "alarmLevel",
            offset: 1,
            span: 5,
            dicData: alarmLevel
          },
          // 处理组名称
          {
            type: "input",
            label: "处理组名称",
            span: 5,
            offset: 1,
            placeholder: "请输入关键字",
            clearable: true
          },
          // 处理人员
          {
            type: "select",
            label: "处理人员",
            span: 5,
            offset: 1,
            prop: "handingPerson",
            dicData: handingPerson
          },
          // 自定义按钮
          {
            prop: "btn",
            span: 6,
            pull: 2,
            offset: 18,
            formslot: true
            // width: "34px"
          }
        ]
      },
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
  computed:{
    zForm(){
      return this.$refs[this.formData.ref]
    },
    zTabel(){
      return this.$refs[this.tableData.ref]
    }
  },

  methods: {
    // 查看
    propertyDetail(obj){
      // console.log(obj)
      // 单击好看按钮去往只能增处理组 /warningalarm/newGrounp
       // 给点一个状态设置所有表单为禁用状态
      let newAdd = {path:'/warningalarm/newGrounp',query:{flag:true,...obj.row}}
      this.$router.push(newAdd)
     

    },
    // '编辑' 按钮
    propertyEdit(obj){
      // 需要携带当前行的信息
      let newAdd = {path:'/warningalarm/newGrounp',query:{flag:false,...obj.row}}
      this.$router.push(newAdd)
    },
    // 新建按钮
    gonewGrounp(){
      this.$router.push('/warningalarm/newGrounp');
      console.log(111)
    },
    submit() {},
    resetChange() {},
    getCleaningList() {
      // 来自CommonFun的模拟数据源 let res = CommonFun.alarmGrounp;
      let res = CommonFun.alarmGrounp;
      let labelList = [
        { label: "子系统",     prop: "subSystem" },
        { label: "报警级别",   prop: "alarmLevel" },
        { label: "处理组名称", prop: "dealGroup" },
        { label: "处理人员",   prop: "handingPerson" }
      ];
      this.tableData.columnConfig = labelList;
      this.tableData.data = res;
    },
    batchDels() {},
    addTenant() {},
    // '重置'按钮
    clearForm(...args){
      // console.log('重置',...args)
      // console.log(this.zForm)
      this.zForm.resetForm();
    },
    // '查询按钮'
    onClickSearchBtn(obg){
      
      this.zForm.submit();
    }
  },
  mounted() {
    this.getCleaningList();
  }
};
</script>

<style lang="less">
.message-device-manage {
  .condition-box {
    padding-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
