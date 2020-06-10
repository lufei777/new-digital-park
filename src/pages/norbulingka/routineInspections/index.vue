<template>
  <!-- 日常巡查 -->
  <div class='panel-container'>
    <!-- 日常巡查记录 -->
    <div class="panel">
      <!-- 表单部分 -->
      <z-form
        v-model="model"
        :ref="formData.ref"
        :options='formData'
        @submit="submit"
      >
        <template
          slot="btn"
          slot-scope="{obj}"
        >
          <div>
            <el-button
              type='primary'
              @click="search(obj)"
            >搜索</el-button>
            <el-button @click="clearData(obj)">清除</el-button>
          </div>
        </template>
      </z-form>
    </div>
    <div class="panel">
      <!-- 表单部分 -->
      <z-table
        :ref="tableData.ref"
        :options="tableData"
      >
        <template
          slot='custom-top'
          slot-scope="obj"
        >
          <div>
            <!-- 添加、删除 -->
            <el-button
              type='primary'
              @click="add"
            >添加</el-button>
            <el-button
              @click="del(obj)"
              :disabled='!obj.selectedData.length'
            >删除</el-button>
          </div>
        </template>
        <template
          slot="operation"
          slot-scope="obj"
        >
          <div>
            <el-button
              type="text"
              @click="propertyDetail(obj)"
            >详情</el-button>
            <el-button
              type="text"
              @click="propertyEdit(obj)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="propertyDel(obj)"
            >删除</el-button>
          </div>
        </template>
      </z-table>
    </div>

  </div>
</template>

<script>
import commonFun from "@/utils/commonFun";
// 字典配置
import { Norbulingka } from "utils/dictionary";
// 维护类型
const maintenanceTypes = Norbulingka.maintenanceTypes;
// 巡检人员
const inspectionPersonnel = Norbulingka.inspectionPersonnel;
export default {
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            label: "日常巡查记录",
            prop: "group",
            forms: [
              // 维护类型 maintenanceTypes
              {
                type: "select",
                prop: "maintenanceTypes",
                placeholder: "",
                label: "维护类型",
                span: 6,
                offset: 1,
                dicData: maintenanceTypes
              },
              // 巡检人员
              {
                type: "select",
                prop: "inspectionPersonnel",
                placeholder: "",
                label: "巡检人员",
                span: 6,
                offset: 1,
                dicData: inspectionPersonnel
              },

              // 搜素 清除按钮
              {
                prop: "btn",
                formslot: true,
                span: 6,
                offset: 4
              }
            ]
          }
        ]
      },
      tableData: {
        ref: "tabel",
        customTop: true,
        customTopPosition: "right",
        data: [
          /**
             *      
             { label: "维护类型", prop: "checkType" },
              { label: "巡检人员", prop: "person" },
              { label: "处理结果 ",prop: "result" },
              { label: " 日期",    prop: "date" }
             *   
            */
          // 模拟的假数据
          {
            checkType: "安全事故记录",
            person: "admin",
            result: "能够",
            date: "2020-05-27"
          },
          {
            checkType: "安全事故记录",
            person: "admin",
            result: "能够",
            date: "2020-05-27"
          },
          {
            checkType: "安全事故记录",
            person: "admin",
            result: "能够",
            date: "2020-05-27"
          }
        ],
        columnConfig: [],
        operation: {
          prop: "operation",
          label: "操作",
          fixed: "right",
          width: 200
        },
        uiConfig: {
          height: "auto",
          selection: true,
          showIndex: true
        }
      }
    };
  },
  computed: {
    // 表格
    Form() {
      return this.$refs[this.formData.ref];
    },
    // 表单
    Tables() {
      return this.$refs[this.tableData.ref];
    }
  },
  methods: {
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 维护类型  巡检人员  处理结果  日期
        { label: "维护类型", prop: "checkType" },
        { label: "巡检人员", prop: "person" },
        { label: "处理结果 ", prop: "result" },
        { label: " 日期", prop: "date" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      console.log(obj);
    },
    search(obj) {
      this.Form.getFormModel(res => {
        console.log("搜索", res);
      });
    },
    clearData(obj) {
      this.Form.resetForm();
    },
    // 编辑
    propertyEdit(obj) {
      this.$router.push({
        path: "/editdetailadd",
        query: { flag: false,mark:'edit', ...obj.row }
      });
    },
    // 删除
    propertyDel(obj) {},
    // 详情
    propertyDetail(obj) {
      this.$router.push({
        path: "/editdetailadd",
        query: { flag: true, mark:'detail', ...obj.row }
      });
    },
    // 添加
    add() {
      this.$router.push({ path: "/editdetailadd", query: { mark:'edit'} });
    }
  },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
