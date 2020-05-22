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

        <el-button>导出</el-button>
        <el-button @click="gonewGrounp" type="primary">新建</el-button>
        <el-button>批量编辑</el-button>
        <el-button>批量删除</el-button>
        <el-button>导入</el-button>
      </div>
      <!-- 表格部分 -->
      <z-table
        class="_border"
        :ref="tableData.ref"
        :options="tableData"
      >
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
        ref: "tableData",
        customTop: true,
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          showIndex: false,
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
          width: 200,
          btns: [
            {
              label: "查看",
              handler: function(row) {}
            },
            {
              label: "编辑",
              handler: function(row) {}
            },
            {
              label: "删除",
              handler: function(row) {}
            }
          ]
        }
      }
    };
  },

  methods: {
    // 新建按钮
    gonewGrounp(){
      this.$router.push('/newGrounp');
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
    addTenant() {}
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
