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
            label: "本体情况列表",
            prop: "group",
            forms: [
              // 文物本体 parentId
              {
                type: "select",
                prop: "ontology",
                placeholder: "",
                label: "文物本体",
                span: 5,
                dicData: ontology
              },
              // 评估状态 assessment
              {
                type: "select",
                prop: "assessment",
                placeholder: "",
                label: "评估状态",
                span: 5,
                offset: 1,
                dicData: assessment
              },
              // 遗产要素保护状态 saveStatues
              {
                type: "select",
                prop: "saveStatues",
                placeholder: "",
                label: "遗产要素保护状态",
                span: 5,
                width: "150",
                offset: 1,
                dicData: saveStatues
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
        data: [
          /**
             *      
             { label: "文物本体", prop: "parentId" },
            { label: "评估状态", prop: "evaluation" },
            { label: "保存状态", prop: "protectStatus" },
            { label: "日期", prop: "data" },
             *   
            */
          // 模拟的假数据
          {
            parentId: "002",
            evaluation: "滕王阁序",
            protectStatus: "关山难越",
            data: "2021-5-29"
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
        // 文物本体 parentId   评估状态evaluation    保存状态protectStatus  日期 date
        { label: "文物本体", prop: "parentId" },
        { label: "评估状态", prop: "evaluation" },
        { label: "保存状态", prop: "protectStatus" },
        { label: "日期", prop: "data" }
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
    }
  },
  mounted() {
    this.tablePropList();
  }
};
</script>
<style lang="less" scoped>
</style>
