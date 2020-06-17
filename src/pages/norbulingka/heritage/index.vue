<template>
  <!-- 遗产要素 -->
  <div class='panel-container'>
    <!-- 藏品档案 -->
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
              @click="addHeritage"
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
import commonFun from "@/utils/commonFun";
// 字典配置
import { Norbulingka } from "utils/dictionary";
// 导入接口
import norbulingka from "@/service/api/norbulingka";
// 文物级别
const levelCultural = Norbulingka.levelCultural;
export default {
  data() {
    return {
      // 查询条件
      condition:null,
      loading:false,
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        group: [
          {
            label: "藏品档案",
            prop: "group",
            forms: [
              //藏品名称 collectionName

              {
                type: "input",
                prop: "collectionName",
                label: "藏品名称",
                span: 6
              },
              // 藏品编号serial
              {
                type: "input",
                prop: "serial",
                label: "藏品编号",
                span: 6
              },
              // 文物级别 culturalRank
              {
                type: "select",
                prop: "culturalRank",
                placeholder: "",
                label: "文物级别",
                dicUrl: norbulingka.getSelectOption,
                dicQuery: { catalogId: 7001, parentId: 0 },
                span: 6,
                // dicData: levelCultural
                props: {
                  label: "name",
                  value: "id"
                }
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
          showIndex: false,
          pagination: {
            handler: (pageSize, currentPage, table) => {
              //翻页的时候需要携带查询添加
              this.getTableData({ page: currentPage, rows: pageSize,...this.condition });
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
    // '添加' 按钮
    addHeritage() {
      this.$router.push({ path: "/addeditdetail", query: { mark: "add" } });
    },
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 藏品编号 serial  名称collectionName 原名primaryName 具体年代practicalYear 文物级别culturalRank
        { label: "藏品序号", prop: "id" },
        { label: "藏品编号", prop: "serial" },
        { label: "名称", prop: "collectionName" },
        { label: "原名", prop: "primaryName" },
        { label: "具体年代", prop: "practicalYear" },
        { label: "文物级别", prop: "culturalRank" }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      //   console.log(obj);
    },
    // 表单中的搜索按钮
    search(obj) {
      let data = obj
      console.log(obj)
      this.Form.getFormModel(res => {
        // console.log("搜索", res);
        // params 为保存得查询条件 需要携带给查询的接口
        let params = res
        //将查询的条件保存下来
        this.condition = res
        norbulingka.queryRelic2ByPage({page:1,rows:10,...res}).then(res => {
          // debugger
          this.getTableData({page:1,rows:10,...params})

        });
      });
      console.log(this.Form.model);
      //   console.log(this.model);
    },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    // 表单上方的删除
    del(selectedData) {
      console.log(selectedData)
      let arr = selectedData.selectedData
      var str = ''
      arr.forEach(item => {
        str = str +  item.id +','
      })
      let ids = str
      // console.log(str)
       norbulingka.deleteRelic2({ids}).then(res => {
        // console.log(res)      
          this.$message({
          message: '批量删除成功！',
          type: 'success'
        });
        let page = this.Tables.currentPage
         this.getTableData({page, rows: 10})
        
      })
    },
    // 删除
    propertyDel(obj) {
      console.log(obj) 
      // debugger
      let ids = obj.row.id
      norbulingka.deleteRelic2({ids}).then(res => {
        // console.log(res)      
          this.$message({
          message: '删除成功！',
          type: 'success'
        });
         let page = this.Tables.currentPage
         this.getTableData({page, rows: 10})
        
      }).finally(res => {
       
      })
    },
    // 编辑
    propertyEdit(obj) {
      console.log(obj)
      this.$router.push({
        path: "/addeditdetail",
        query: { mark: "edit", ...obj.row }
      });
    },
    // 详情
    propertyDetail(obj) {
      // console.log(obj.row)
      this.$router.push({
        path: "/addeditdetail",
        query: { flag: true, mark: "detail", ...obj.row }
      });
    },
    // 表格中的数据
    getTableData(pageParams = { page: 1, rows: 10 }) {
      // 考古发掘表格中的数据
      norbulingka
        .queryRelic2ByPage(pageParams)
        .then(res => {
          console.log(res);
          this.loading = true;
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
    this.tablePropList();
  }
};
</script>

<style  scoped lang="less">
</style>
