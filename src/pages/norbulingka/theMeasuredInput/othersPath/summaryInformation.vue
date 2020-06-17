<template>
  <!-- 实测录入 -->
  <div class='panel-container'>
    <!-- 实测录入清单 -->
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
      <!-- 表格部分 -->
      <z-table
        :load='loading'
        :ref="tableData.ref"
        :options="tableData"
      >
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
              @click="propertyDetail(obj)"
            >详情</el-button>
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
// 类型选择
const typeSelect = Norbulingka.typeSelect;

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
            label: "实测录入清单",
            prop: "group",
            forms: [
              //类型选择
              {
                type: "select",
                prop: "collectionName",
                placeholder: "",
                label: "类型选择",
                span: 6,
                dicData: typeSelect
              },
              // 起始日期
              {
                type: "date",
                prop: "serial",
                placeholder: "",
                label: "起始日期",
                span: 6
              },
              // 结束日期
              {
                type: "date",
                prop: "culturalRank",
                label: "结束日期",
                span: 6
              },
              // 搜素按钮
              {
                prop: "btn",
                formslot: true,
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
            width: 200
          },
          //分页
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
        //类型   录入时间 date
        {
          label: "类型",
          prop: "collectionName",
          type: "select",
          dicData: typeSelect
          // props:{
          //   label:'name',
          //   value:'id'
          // }
        },
        { label: "录入时间", prop: "date" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      //   console.log(obj);
    },
    search(obj) {
      this.Form.getFormModel(res => {
        console.log("搜索", res);
      });
      console.log(this.Form.model);
      //   console.log(this.model);
    },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    // 表单上方的删除
    del(selectedData) {},
    // 删除
    propertyDel(obj) {},
    // 编辑
    propertyEdit(obj) {
      console.log(obj);
      this.$router.push({
        path: "/inputinfo",
        query: { flag: false, ...obj.row }
      });
    },
    // 详情
    propertyDetail(obj) {
      console.log(obj.row);
    },
    // 表格中的数据
    getTableData(pageParams = { page: 1, rows: 10 }) {
      (this.loading = true),
        norbulingka
          .queryUnionPollingByPage(pageParams)
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
    // 页面初始化调取表格中的数据
    this.getTableData();
  },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
