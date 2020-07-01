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
              type='primary'
              :disabled='!obj.selectedData.length'
            >批量删除</el-button>
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
// 导入接口
import norbulingka from "@/service/api/norbulingka";

import commonFun from "@/utils/commonFun";
// 字典配置
import { Norbulingka } from "utils/dictionary";
// 维护类型
const maintenanceTypes = Norbulingka.maintenanceTypes;
// 巡检人员
const inspectionPersonnel = Norbulingka.inspectionPersonnel;
let pageInfo = {
  page: 1,
  rows: 10
};
export default {
  data() {
    return {
      // 保存的查询条件
      condition: null,
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            // label: "日常巡查记录",
            // prop: "group",
            forms: [
              // 维护类型 maintenanceTypes
              {
                type: "select",
                prop: "checkType",
                placeholder: "",
                label: "维护类型",
                span: 6,
                offset: 1,
                // dicUrl: norbulingka.getSelectOption,
                // dicQuery: { catalogId: 16001 },
                props: {
                  label: "name",
                  value: "id"
                }
                // dicData: maintenanceTypes
              },
              // 巡检人员
              {
                type: "input",
                prop: "person",
                label: "巡检人员",
                span: 6,
                offset: 1
                // dicUrl: norbulingka.userNameList,
                // props: {
                //   label: "name",
                //   value: "id"
                // }
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
        // norbulingka.queryDailyCheckByPage
        // serverMode: {
        //   url: norbulingka.queryDailyCheckByPage,
        //   data: pageInfo
        // },
        // propsHttp: {
        //   list: "list",
        //   total: "total",
        //   pageSize: "rows",
        //   pageNum: "page"
        // },
        data: [],
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
          showIndex: {
            width: 250,
            align: "left"
          },
          pagination: {
            handler: (pageSize, currentPage, table) => {
              // 翻页的时候也需要携带查询的条件
              this.getTableData({
                page: currentPage,
                rows: pageSize,
                ...this.condition
              });
            }
          }
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
        {
          label: "维护类型",
          prop: "checkType",
          type: "select",
          props: {
            label: "name",
            value: "id"
          }
        },
        {
          label: "巡检人员",
          prop: "person",
          type: "select",
          props: {
            label: "name",
            value: "id"
          }
        },
        { label: "处理结果 ", prop: "result" },
        { label: " 日期", prop: "date" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(model, done) {
      console.log(model);
      // console.log(obj);
    },
    // setData() {
    //   debugger
    //   // let searchParams = null
    //   this.$refs[this.tableData.ref].setCurrentPage(1);
    //   this.$refs[this.formData.ref].getFormModel(res => {
    //     this.condition = res
    //   })
    //   this.tableData.serverMode.data = {
    //     ...this.condition,
    //     ...pageInfo
    //   };
    //   this.$refs[this.tableData.ref].refreshTable();
    // },
    search(obj) {
      // this.setData()
      this.Form.getFormModel(res => {
        console.log("搜索", res);
        let params = res;
        // 保存搜索条件
        this.condition = res;
        norbulingka.queryDailyCheckByPage({ ...params }).then(res => {
          this.getTableData({ page: 1, rows: 10, ...params });
        });
      });
    },
    clearData(obj) {
      this.Form.resetForm();
    },
    // 编辑
    propertyEdit(obj) {
      console.log(obj);
      this.$router.push({
        path: "/editdetailadd",
        query: { flag: false, mark: "edit", ...obj.row }
      });
    },
    // 删除方法
    delRowData(ids) {
      this.$confirm("确认删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        norbulingka.deleteDailyCheck({ ids }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          // this.Tables.refreshTable();
          this.getTableData();
        });
      });
    },
    // 批量删除
    del(obj) {
      console.log(obj.selectedData);
      let arr = obj.selectedData;
      let str = "";
      arr.forEach(item => {
        str = str + item.id + ",";
      });
      let ids = str;
      this.delRowData(ids);
      // norbulingka.deleteDailyCheck({ ids }).then(res => {
      //   this.$message({
      //     type: "success",
      //     message: "批量删除成功！"
      //   });
      //   this.Tables.refreshTable()
      //   this.getTableData();
      // });
    },
    // 删除
    propertyDel(obj) {
      console.log(obj);

      let ids = obj.row.id;
      this.delRowData(ids);
      // norbulingka.deleteDailyCheck({ ids }).then(res => {
      //   this.$message({
      //     type: "success",
      //     message: "删除成功！"
      //   });
      //   var page = this.Tables.currentPage;
      //   // console.log("page",page)
      //   // this.getTableData({ page, rows: 10 });
      //   this.Tables.refreshTable()
      //   this.getTableData();
      // });
    },
    // 详情
    propertyDetail(obj) {
      this.$router.push({
        path: "/editdetailadd",
        query: { flag: true, mark: "detail", ...obj.row }
      });
    },
    // 添加
    add() {
      this.$router.push({ path: "/editdetailadd", query: { mark: "add" } });
    },
    // 表格的信息
    getTableData(pageParams = { page: 1, rows: 10 }) {
      this.loading = true;
      // 考古发掘表格中的数据
      norbulingka
        .queryDailyCheckByPage(pageParams)
        .then(res => {
          // console.log(res);

          this.$refs[this.tableData.ref].setData(res.list);
          this.$refs[this.tableData.ref].setTotal(res.total);
          // this.$refs[this.tableData.ref].refreshTable();
          this.$refs[this.tableData.ref].setCurrentPage(pageParams.page);
        })
        .finally(res => {
          this.loading = false;
        });
    }
  },
  created() {
    //维护类型
    norbulingka.getSelectOption({ catalogId: 16001 }).then(res => {
      this.Form.setColumnByProp("checkType", {
        dicData: res
      });
      this.Tables.setColumnByProp("checkType", {
        dicData: res
      });
    });
    // 更改需求后 巡检人员变成手动输入，不再是下拉框
    norbulingka.userNameList().then(res => {
      // this.Form.setColumnByProp("person", {
      //   dicData: res
      // });
      this.Tables.setColumnByProp("person", {
        dicData: res
      });
    });

    this.getTableData();
  },

  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
