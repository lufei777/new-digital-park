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
              @click="addProject"
              type='primary'
            >添加</el-button>
            <el-button
              @click="orderDel(obj)"
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
// 导入接口
import norbulingka from "@/service/api/norbulingka";
import commonFun from "@/utils/commonFun";
export default {
  data() {
    return {
      // 保存的查询条件
      condition: null,
      model: {},
      loading: false,
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            label: "项目工程",
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
          showIndex: true,
          pagination: {
            handler: (pageSize, currentPage, table) => {
              this.getTableData({ page: 1, rows: pageSize, ...this.condition });
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
      // let res = commonFun.protectItem;
      var list = [
        { label: "工程名称", prop: "projectName" },
        { label: "施工单位", prop: "constructDept" },
        { label: "监理单位", prop: "supervisionDept" },
        { label: "开工时间", prop: "startTime" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
      // this.tableData.data = res;
    },
    submit(obj) {
      console.log(obj);
    },
    // 表格中的搜索
    search(obj) {
      console.log(obj);
      this.Form.getFormModel(res => {
        // console.log(res)
        let params = res;
        this.condition = res;
        norbulingka.queryProtectByPage({ ...res }).then(res => {
          this.getTableData({ page: 1, rows: 10, ...params });
        });
      });
      // console.log(this.model);
    },
    // 表单上的'清除'
    clearData(obj) {
      this.Form.resetForm();
    },
    // 编辑
    propertyEdit(obj) {
      let info = obj.row
      // 多选框要的是数组进行转换
      info.relateElement = info.relateElement.split(',')
      // 后端返回多了一个逗号，把最后一个逗号删除
      info.relateElement.pop()
      console.log(info)

      this.$router.push({
            name: "DetailEdit",
            params: { flag: false, mark: "edit", ...info }
          });

      // norbulingka
      //   .queryDetailProtectProjectById({ id: obj.row.id })
      //   .then(res => {
      //     // res.relateElement = JSON.parse(res.relateElement)
          
      //     res.relateElement = res.relateElement.split(',')
      //     console.log( res.relateElement)
      //     this.$router.push({
      //       name: "DetailEdit",
      //       params: { flag: false, mark: "edit", ...res }
      //     });
      //   });
    },
    // 表格中的批量删除
    orderDel(obj) {
      let arr = obj.selectedData;
      //  console.log(arr)
      let str = "";
      arr.forEach(item => {
        str = str + item.id + ",";
      });
      let ids = str;
      norbulingka.deleteProtectProject({ ids }).then(res => {
        console.log(res);
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.getTableData({ page: 1, rows: 10 });
      });
    },
    // 删除
    propertyDel(obj) {
      // console.log(obj)
      let ids = obj.row.id;
      norbulingka.deleteProtectProject({ ids }).then(res => {
        // 删除成功后进行提示
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        // 刷新页面
        this.getTableData({ page: 1, rows: 10 });
      });
    },
    // 详情
    propertyDetail(obj) {
      this.$router.push({
        name: "DetailEdit",
        params: { flag: true, mark: "detail", ...obj.row }
      });
    },
    // 添加
    addProject(obj) {
      this.$router.push({
        name: "DetailEdit",
        params: { mark: "add", ...obj.row }
      });
    },
    getTableData(pageParams = { page: 1, rows: 10 }) {
      this.loading = true;
      // 考古发掘表格中的数据
      norbulingka
        .queryProtectByPage(pageParams)
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
    this.getTableData();
  },
  mounted() {
    // 表格
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
