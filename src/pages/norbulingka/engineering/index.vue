<template>
  <!-- 项目工程 -->
  <div class='panel-container'>
    <!-- 保护工程记录 -->
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
              @click="addProject"
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
import commonFun from "@/utils/commonFun";
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
            label: "保护工程记录",
            prop: "group",
            forms: [
              // 工程名称 projectName

              {
                type: "input",
                prop: "projectName",
                placeholder: "",
                // autofocus: true,
                label: "工程名称",
                span: 6
                // offset: 1
              },
              // 施工单位 constructDept
              {
                type: "input",
                prop: "constructDept",
                placeholder: "",
                // autofocus: true,
                label: "施工单位",
                span: 6
                // offset: 1
              },
              // 监理单位 supervisionDept
              {
                type: "input",
                prop: "supervisionDept",
                placeholder: "",
                // autofocus: true,
                label: "监理单位",
                span: 6
                // offset: 1
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
      let res = commonFun.protectItem;
      var list = [
        { label: "工程名称", prop: "projectName" },
        { label: "施工单位", prop: "constructDept" },
        { label: "监理单位", prop: "supervisionDept" },
        { label: "开工时间", prop: "startTime" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
      this.tableData.data = res;
    },
    submit(obj) {
      console.log(obj);
    },
    search(obj) {
      console.log(obj);
      console.log(this.model);
    },
    // 表单上的'清除'
    clearData(obj) {
      this.Form.resetForm();
    },
    // 编辑
    propertyEdit(obj) {
      this.$router.push({
        name: "DetailEdit",
        params: { flag: false,mark:'edit', ...obj.row }
      });
    },
    // 删除
    propertyDel(obj) {},
    // 详情
    propertyDetail(obj) {
      this.$router.push({
        name: "DetailEdit",
        params: { flag: true,mark:'detail', ...obj.row }
      });
    },
    // 添加
    addProject(obj) {
      this.$router.push({
        name: "DetailEdit",
        params: {mark:'add', ...obj.row }
      });
    }
  },
  mounted() {
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
.protect {
  margin-top: 20px;
  padding: 20px;
}
</style>
