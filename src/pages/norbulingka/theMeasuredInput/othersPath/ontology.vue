<template>
  <!-- 本体情况 -->
  <div class='panel-container'>
    <!-- 本体情况列表 -->
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
// 文物本体
const ontology = Norbulingka.ontology;
// 评估状态
const assessment = Norbulingka.assessment;
// 遗产要素保存状态
const saveStatues = Norbulingka.saveStatues;
// 导入接口
import norbulingka from "@/service/api/norbulingka";

export default {
  data() {
    return {
      loading: false,
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            label: "本体情况列表",
            prop: "group",
            forms: [
              // 文物本体 parentId
              {
                prop: "parentId",
                placeholder: "",
                label: "文物本体",
                span: 5,
                type: "select",
                props: {
                  label: "name",
                  value: "id"
                }
                // dicData: ontology
              },
              // 评估状态 assessment
              {
                type: "select",
                prop: "evaluation",
                placeholder: "",
                label: "评估状态",
                span: 5,
                offset: 1,
                props: {
                  label: "name",
                  value: "id"
                }
                // dicData: assessment
              },
              // 遗产要素保护状态 saveStatues
              {
                type: "select",
                prop: "protectStatus",
                placeholder: "",
                label: "遗产要素保护状态",
                span: 5,
                width: "150",
                offset: 1,
                props: {
                  label: "name",
                  value: "id"
                }
                // dicData: saveStatues
              },
              // 搜素按钮
              {
                prop: "btn",
                formslot: true,
                offset: 2,
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
          showIndex: true,
          pagination: {
            handler: (pageSize, currentPage, table) => {
              this.getTableData({ page: currentPage, rows: pageSize });
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
        // 文物本体 parentId   评估状态evaluation    保存状态protectStatus  日期 date
        {
          label: "文物本体",
          prop: "parentId",
          type: "select",
          props: {
            label: "name",
            value: "id"
          }
        },
        {
          label: "评估状态",
          prop: "evaluation",
          type: "select",
          props: {
            label: "name",
            value: "id"
          }
        },
        {
          label: "保存状态",
          prop: "protectStatus",
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
      norbulingka.queryBuildingByPage({ params }).then(res => {
        this.Tables.refreshTable();
        this.getTableData({ ...this.condition });
      });
    },

    // 搜索
    search(obj) {
      this.Form.getFormModel(res => {
        this.condition = res;
        this.searchData(res);
      });
    },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    // 表单上方的删除
    del(obj) {
       let arr = obj.selectedData;
      let str = "";
      arr.forEach(item => {
        str = str + item.id + ",";
      });
      let ids = str;
      norbulingka.deleteBuildingsPhoto({ ids }).then(res => {
        this.$message({
          type: "success",
          message: "批量删除成功！"
        });
      this.Tables.refreshTable()
        this.getTableData()
      });
    },
    // 删除
    propertyDel(obj) {
      let ids = obj.row.id;
      norbulingka.deleteBuildingsPhoto({ids}).then(res => {
        this.$message({
          type:'success',
          message:'删除成功！'
        })
        this.Tables.refreshTable()
        this.getTableData()
      })
    },
    // 编辑
    propertyEdit(obj) {
      console.log(obj.row);
      this.$router.push({
        path: "/temontolagy",
        query: { flag: false, mark: "edit", ...obj.row }
      });
    },
    // 详情
    propertyDetail(obj) {
      console.log(obj.row);
      this.$router.push({
        path: "/temontolagy",
        query: { flag: true, mark: "detail", ...obj.row }
      });
    },
    // 添加
    add() {
      this.$router.push({ path: "/temontolagy", query: { mark: "add" } });
    },
    // 表格中的数据
    getTableData(pageParams = { page: 1, rows: 10 }) {
      this.loading = true
        norbulingka
          .queryBuildingByPage(pageParams)
          .then(res => {
            // console.log(res);
            this.$refs[this.tableData.ref].setData(res.list);
            this.$refs[this.tableData.ref].setTotal(res.total);
          })
          .finally(res => {
            this.loading = false;
          });
    }
  },
  created() {
    // 文物本体
    norbulingka
      .getSelectOptionOther({ catalogId: 17001, parentId: 0 })
      .then(res => {
        this.Form.setColumnByProp("parentId", {
          dicData: res
        });
        this.Tables.setColumnByProp("parentId", {
          dicData: res
        });
      });
    //   norbulingka.getSelectOption({ catalogId: 16001 }).then(res => {
    //   this.Form.setColumnByProp("checkType", {
    //     dicData: res
    //   });
    //   this.Tables.setColumnByProp("checkType", {
    //     dicData: res
    //   });
    // });
    
    // 评估状态
    norbulingka
      .getSelectOptionOther({ catalogId: 18001, parentId: 0 })
      .then(res => {
        this.Form.setColumnByProp("evaluation", {
          dicData: res
        });
        this.Tables.setColumnByProp("evaluation", {
          dicData: res
        });
      });
    // 保存状态
    norbulingka
      .getSelectOptionOther({ catalogId: 19001, parentId: 0 })
      .then(res => {
        this.Form.setColumnByProp("protectStatus", {
          dicData: res
        });
        this.Tables.setColumnByProp("protectStatus", {
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
<style lang="less" scoped>
</style>
