<template>
  <!-- 施工情况 -->
  <div class='panel-container'>
    <!-- 施工情况记录 -->
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
          slot-scope="obj"
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
        :load='loading'
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
              @click="add"
              type='primary'
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
              @click="propertyEdit(obj)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="propertyDel(obj)"
            >删除</el-button>
            <el-button
              type="text"
              @click="propertyDetail(obj)"
            >详情</el-button>
          </div>
        </template>
      </z-table>
    </div>

  </div>
</template>

<script>
import { Norbulingka } from "utils/dictionary";
// 工程分类
const projectType = Norbulingka.proType;
import CommonFun from "@/utils/commonFun";
// 导入接口
import norbulingka from "@/service/api/norbulingka";
import props from "../../../../components/zvue/common/props";
export default {
  data() {
    return {
      loading: false,
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
            // label: "施工情况记录",
            // prop: "group",
            forms: [
              // 项目名称 projectName
              {
                type: "input",
                prop: "projectName",
                placeholder: "",
                label: "项目名称",
                span: 5
              },
              //  工程分类 projectType
              {
                type: "select",
                prop: "projectType",
                placeholder: "",
                label: "工程分类",
                span: 6,
                // width: "150",
                offset: 1,
                dicData: projectType
              },
              // 搜素按钮
              {
                prop: "btn",
                formslot: true,
                offset: 7,
                span: 5
              }
            ]
          }
        ]
      },
      tableData: {
        ref: "tabel",
        customTop: true,
        customTopPosition: "right",
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
        // 项目名称 projectName   工程分类 projectType      日期 date
        { label: "项目名称", prop: "projectName" },
        {
          label: "工程分类",
          prop: "projectType",
          type: "select",
          dicData: projectType
        },
        { label: "记录日期", prop: "date" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      //   console.log(obj);
    },
    // searchData(params) {
    //   norbulingka.queryImplimentationByPage({ params }).then(res => {
    //     // this.Tables.refreshTable();
    //     this.getTableData({ page: 1, rows: 10, ...this.condition });
    //   });
    // },

    // 搜索
    search(obj) {
      this.Form.getFormModel(res => {
        this.condition = res;
        // this.searchData(res);
        norbulingka.queryImplimentationByPage({ ...res }).then(res => {
          // this.Tables.refreshTable();
          this.getTableData({ page: 1, rows: 10, ...this.condition });
        });
      });
      // console.log(this.Form.model);
      // //   console.log(this.model);
      // var that = this;
      // // 5秒后自动清空搜索内容
      // setTimeout(function() {
      //   that.clearData();
      // }, 5000);
    },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    delRowData(ids) {
      this.$confirm("确认删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        norbulingka.deleteImplimentation({ ids }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          // this.Tables.refreshTable();
          this.getTableData();
        });
      });
    },
    // 表单上方的删除
    del({ selectedData }) {
      console.log(selectedData);

      let arr = selectedData;
      let str = "";
      arr.forEach(item => {
        str = str + item.id + ",";
      });
      let ids = str;
      this.delRowData(ids);
    },
    // 删除
    propertyDel(obj) {
      let ids = obj.row.id;
      this.delRowData(ids);
    },
    // 编辑
    propertyEdit(obj) {
      console.log(obj.row);
      this.$router.push({
        path: "/temconstruction",
        query: { flag: false, mark: "edit", id:obj.row.id }
      });
    },
    // 详情
    propertyDetail(obj) {
      console.log(obj.row);
      this.$router.push({
        path: "/temconstruction",
        query: { flag: true, mark: "detail", id:obj.row.id }
      });
    },
    add() {
      this.$router.push({ path: "/temconstruction", query: { mark: "add" } });
    },
    // 表格中的数据
    getTableData(pageParams = { page: 1, rows: 10 }) {
      (this.loading = true),
        norbulingka
          .queryImplimentationByPage(pageParams)
          .then(res => {
            // console.log(res);
            this.$refs[this.tableData.ref].setData(res.list);
            this.$refs[this.tableData.ref].setTotal(res.total);
            this.$refs[this.tableData.ref].setCurrentPage(pageParams.page);
          })
          .finally(res => {
            this.loading = false;
          });
    }
  },
  created() {
    this.getTableData();
  },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
