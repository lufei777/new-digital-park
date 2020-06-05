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
// 病害分类 diseasesSort
const diseasesSort = Norbulingka.diseasesSort;
// 病害类型 diseaseType
const diseaseType = Norbulingka.diseaseType;
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
            label: "病害分析记录",
            prop: "group",
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
                dicData: diseasesSort
              },
              //  病害类型 damageType2
              {
                type: "select",
                prop: "damageType2",
                placeholder: "",
                label: "遗产要素保护状态",
                span: 5,
                width: "150",
                offset: 1,
                dicData: diseasesSort
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
             { label: "病害位置", prop: "damagePosition" },
            { label: "病害分类", prop: "damageType1" },
            { label: "病害类型", prop: "damageType1" },
            { label: "日期", prop: "data" },
             *   
            */
          // 模拟的假数据
          {
            damagePosition: "北京姑娘",
            damageType1: "造像，碑刻，壁画",
            damageType2: "裂隙与空鼓",
            data: "2021-5-29 16:04:48.0"
          },
          {
            damagePosition: "北京姑娘",
            damageType1: "造像，碑刻，壁画",
            damageType2: "裂隙与空鼓",
            data: "2021-5-29 16:04:48.0"
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
        // 病害位置 damagePosition   病害分类 damageType1    病害类型 damageType2  日期 date
        { label: "病害位置", prop: "damagePosition" },
        { label: "病害分类", prop: "damageType1" },
        { label: "病害类型", prop: "damageType2" },
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
        path: "/temanalysis",
        query: { flag: false,mark:'edit', ...obj.row }
      });
    },
    // 详情
    propertyDetail(obj) {
      console.log(obj.row);
      this.$router.push({
        path: "/temanalysis",
        query: { flag: true,mark:'detail', ...obj.row }
      });
    },
    add() {
      this.$router.push({ path: "/temanalysis", query: { mark:'add'} });
    }
  },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
