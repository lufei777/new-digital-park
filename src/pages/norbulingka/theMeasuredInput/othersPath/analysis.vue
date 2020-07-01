<template>
  <!-- 病害分析 -->
  <div class='panel-container'>
    <!-- 病害分析记录 -->
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
import CommonFun from "@/utils/commonFun";
// 病害分类 diseasesSort
const diseasesSort = Norbulingka.diseasesSort;
// 病害类型 diseaseType
const diseaseType = Norbulingka.diseaseType;
// 导入接口
import norbulingka from "@/service/api/norbulingka";
export default {
  data() {
    return {
      condition: null,
      loading: false,
      typeArr: [],
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            // label: "病害分析记录",
            // prop: "group",
            forms: [
              // 病害位置 damagePosition
              {
                type: "input",
                prop: "damagePosition",
                placeholder: "",
                label: "病害位置",
                span: 5
              },
              //  病害分类 damageType1
              {
                type: "select",
                prop: "damageType1",
                placeholder: "",
                label: "病害分类",
                span: 5,
                offset: 1,
                props: {
                  label: "name",
                  value: "id",
                  children: "children"
                }
                // dicData: diseasesSort
              },
              //  病害类型 damageType2
              {
                type: "select",
                prop: "damageType2",
                placeholder: "",
                label: "病害类型",
                span: 5,
                offset: 1,
                props: {
                  label: "name",
                  value: "id",
                  children: "children"
                }
                // dicData: diseasesSort
              },
              // {
              //   type: "select",
              //   prop: "damageType",
              //   placeholder: "",
              //   label: "病害类型",
              //   span: 5,
              //   // width: "150",
              //   offset: 1,
              //   props: {
              //     label: "name",
              //     value: "id"
              //   }
              //   // dicData: diseasesSort
              // },
              // 搜素按钮
              {
                prop: "btn",
                formslot: true,
                // offset: 2,
                span: 6
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
        // 病害位置 damagePosition   病害分类 damageType1    病害类型 damageType2  日期 date
        { label: "病害位置", prop: "damagePosition" },
        {
          label: "病害分类",
          prop: "damageType1",
          type: "select",
          props: {
            label: "name",
            value: "id"
          }
        },
        {
          label: "病害类型",
          prop: "damageType2",
          type: "select",
          props: {
            label: "name",
            value: "id"
          }
        },
        { label: "日期", prop: "date" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      //   console.log(obj);
    },
    searchData(params) {
      norbulingka.queryDamageByPage({ params }).then(res => {
        this.Tables.refreshTable();
        this.getTableData({ page: 1, rows: 10, ...this.condition });
      });
    },

    // 搜索
    search(obj) {
      this.Form.getFormModel(res => {
        // 参数是string类型，不能是数组 要进行处理
        if (res.damageType1 && Object.values(res.damageType1).length == 2) {
          res["damageType2"] = res.damageType1[1];
          res.damageType1 = res.damageType1[0];
        }
        this.condition = res;
        this.searchData(res);
      });
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
        norbulingka.deleteDamage({ ids }).then(res => {
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
    del(obj) {
      let arr = obj.selectedData;
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
        path: "/temanalysis",
        query: { flag: false, mark: "edit", ...obj.row }
      });
    },
    // 详情
    propertyDetail(obj) {
      console.log(obj.row);
      this.$router.push({
        path: "/temanalysis",
        query: { flag: true, mark: "detail", ...obj.row }
      });
    },
    add() {
      this.$router.push({ path: "/temanalysis", query: { mark: "add" } });
    },
    // 表格中的数据
    getTableData(pageParams = { page: 1, rows: 10 }) {
      this.loading = true;
      norbulingka
        .queryDamageByPage(pageParams)
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
    // 病害分类
    norbulingka.getSelectOptionOther({ catalogId: 14001 }).then(res => {
      this.typeArr = res;
      this.Form.setColumnByProp("damageType1", {
        dicData: res
      });

      this.Tables.setColumnByProp("damageType1", {
        dicData: res
      });

      this.Tables.setColumnByProp("damageType2", {
        dicData: res
      });
    });
    // 病害类型

    this.getTableData();
  },
  watch: {
    "model.damageType1": {
      handler(val, old) {
        console.log(typeof val);
        console.log(typeof old);
        console.log(val);
        console.log(old);
        // console.log( old.length);
        // val != undefined && val != null
        // debugger
        if (typeof val === "number") {
          var child = null;
          this.typeArr.forEach(item => {
            if (item.id == val) {
              child = item;
              this.model.damageType2 = "";
              this.Form.setColumnByProp("damageType2", {
                dicData: child.children
              });
            }
          });
        }
        if (typeof val == "string") {
          this.model.damageType2 = "";
          this.Form.setColumnByProp("damageType2", { dicData: [] });
        }
      },
      immediate: true,
      deep: true
    }
  },
  // watch: {
  //   "model.damageType1": {
  //     handler(val, old) {
  //       console.log(typeof val);
  //       console.log(typeof old);
  //       // console.log( old.length);
  //       // val != undefined && val != null
  //       if (typeof val === "number") {
  //         var child = null;
  //         this.typeArr.forEach(item => {
  //           if (item.id == val) {
  //             child = item;
  //             this.Form.setColumnByProp("damageType2", {
  //               dicData: child.children
  //             });
  //           }
  //         });
  //       }
  //       if (typeof val === "string") {
  //         this.Form.setColumnByProp("damageType2", {
  //           dicData: []
  //         });
  //       }
  //     },
  //     // immediate: true,
  //     // deep: true
  //   }
  // },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
