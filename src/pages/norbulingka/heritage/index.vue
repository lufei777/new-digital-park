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
      condition: null,
      loading: false,
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,

        // label: "遗产要素",
        // prop: "group",
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
            // dicUrl: norbulingka.getSelectOption,
            // dicQuery: { catalogId: 7001, parentId: 0 },
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
            handler:(pageSize, currentPage, table)=> {
              //翻页的时候需要携带查询添加
              console.log(currentPage);
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
    // '添加' 按钮
    addHeritage() {
      this.$router.push({ path: "/addeditdetail", query: { mark: "add" } });
    },
    // 表格配置项
    tablePropList() {
      // 配置表格的列名称和属性
      var list = [
        // 藏品编号 serial  名称collectionName 原名primaryName 具体年代practicalYear 文物级别culturalRank
        // { label: "藏品序号", prop: "id" },
        { label: "藏品编号", prop: "serial" },
        { label: "名称", prop: "collectionName" },
        { label: "原名", prop: "primaryName" },
        { label: "具体年代", prop: "practicalYear" },
        {
          label: "文物级别",
          prop: "culturalRank",
          type: "select",
          props: {
            label: "name",
            value: "id"
          }
        }
      ];
      // 赋值给表格的配置项
      this.tableData.columnConfig = list;
    },
    submit(obj) {
      //   console.log(obj);
    },
    // 表单中的搜索按钮
    search(obj) {
      let data = obj;
      console.log(obj);
      this.Form.getFormModel(res => {
        // console.log("搜索", res);
        // params 为保存得查询条件 需要携带给查询的接口
        let params = res;
        //将查询的条件保存下来
        this.condition = res;
        norbulingka
          .queryRelic2ByPage({ page: 1, rows: 10, ...res })
          .then(res => {
            // debugger
            this.getTableData({ page: 1, rows: 10, ...params });
          });
      });
      console.log(this.Form.model);
      //   console.log(this.model);
    },
    // 清除
    clearData(obj) {
      this.Form.resetForm();
    },
    // 删除方法
    delRowData(ids) {
      this.$confirm("确认删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        norbulingka.deleteRelic2({ ids }).then(res => {
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
    del(selectedData) {
      console.log(selectedData);
      let arr = selectedData.selectedData;
      var str = "";
      arr.forEach(item => {
        str = str + item.id + ",";
      });
      let ids = str;
      this.delRowData(ids);
      // console.log(str)
      // norbulingka.deleteRelic2({ ids }).then(res => {
      //   // console.log(res)
      //   this.$message({
      //     message: "批量删除成功！",
      //     type: "success"
      //   });
      //   let page = this.Tables.currentPage;
      //   this.getTableData({ page, rows: 10 });
      // });
    },
    // 删除
    propertyDel(obj) {
      console.log(obj);
      // debugger
      let ids = obj.row.id;
      this.delRowData(ids);
      // debugger
      // norbulingka.deleteRelic2({ ids }).then(res => {
      //   // console.log(res)
      //   this.$message({
      //     message: "删除成功！",
      //     type: "success"
      //   });
      //   // let page = this.Tables.currentPage;
      //   this.Tables.refreshTable();
      //   // this.getTableData({ page:1, rows: 10 });
      //   this.getTableData();
      // });
    },
    // 编辑
    propertyEdit(obj) {
      // console.log(obj);
      // debugger
      var info = obj.row;
      if (info.year1 && info.year2 && info.year3) {
        //  具体年年代的是数字类型要转换
        info["years"] = [
          Number(info.year1),
          Number(info.year2),
          Number(info.year3)
        ];
      } else if (info.year1 && info.year2) {
        info["years"] = [Number(info.year1), Number(info.year2)];
      } else if (info.year1) {
        info["years"] = [Number(info.year1)];
      }

      if (info.characterType1 && info.characterType2 && info.relicCharacter) {
        info["characterTypes"] = [
          info.characterType1,
          info.characterType2,
          info.relicCharacter
        ];
      } else if (info.characterType1 && info.characterType2) {
        info["characterTypes"] = [info.characterType1, info.characterType2];
      }
      [
        "year1",
        "year2",
        "year3",
        "characterType1",
        "characterType2",
        "relicCharacter"
      ].forEach(item => delete info[item]);
      // 实际数量 realQuantity
      if(info.realQuantity==null){
        info.realQuantity=undefined
      }
      // 具体尺寸 specificDimension
      if(info.specificDimension==null){
        info.specificDimension=undefined
      }
      // 藏品通长 openLength
      if(info.openLength==null){
        info.openLength=undefined
      }
      // 藏品通宽 openWidth
      if(info.openWidth==null){
        info.openWidth=undefined
      }
      // 藏品通高 openHeight
      if(info.openHeight==null){
        info.openHeight=undefined
      }
      //  delete info.year1
      //  delete info.year2
      //  delete info.year3
      console.log(info);
      // ...info
      
      localStorage.setItem('INFO',JSON.stringify(info))
      this.$router.push({
        path: "/addeditdetail",
        query: { mark: "edit" }
      });
    },
    // 详情
    propertyDetail(obj) {
      // console.log(obj.row)
      var info = obj.row;
      if (info.year1 && info.year2 && info.year3) {
        //  具体年年代的是数字类型要转换
        info["years"] = [
          Number(info.year1),
          Number(info.year2),
          Number(info.year3)
        ];
      } else if (info.year1 && info.year2) {
        info["years"] = [Number(info.year1), Number(info.year2)];
      } else if (info.year1) {
        info["years"] = [Number(info.year1)];
      }

      if (info.characterType1 && info.characterType2 && info.relicCharacter) {
        info["characterTypes"] = [
          info.characterType1,
          info.characterType2,
          info.relicCharacter
        ];
      } else if (info.characterType1 && info.characterType2) {
        info["characterTypes"] = [info.characterType1, info.characterType2];
      }
      [
        "year1",
        "year2",
        "year3",
        "characterType1",
        "characterType2",
        "relicCharacter"
      ].forEach(item => delete info[item]);

       // 实际数量 realQuantity
      if(info.realQuantity==null){
        info.realQuantity=undefined
      }
      // 具体尺寸 specificDimension
      if(info.specificDimension==null){
        info.specificDimension=undefined
      }
      // 藏品通长 openLength
      if(info.openLength==null){
        info.openLength=undefined
      }
      // 藏品通宽 openWidth
      if(info.openWidth==null){
        info.openWidth=undefined
      }
      // 藏品通高 openHeight
      if(info.openHeight==null){
        info.openHeight=undefined
      }
      this.$router.push({
        path: "/addeditdetail",
        query: { flag: true, mark: "detail"}
      });
    },
    // 表格中的数据
    getTableData(params = { page: 1, rows: 10 }) {
      this.loading = true;
      // 考古发掘表格中的数据
      norbulingka
        .queryRelic2ByPage(params)
        .then(res => {
          // console.log(res);
          // this.loading = true;
          this.$refs[this.tableData.ref].setData(res.list);
          this.$refs[this.tableData.ref].setTotal(res.total);
          this.$refs[this.tableData.ref].setCurrentPage(params.page);
        })
        .finally(res => {
          this.loading = false;
        });
    }
  },
  created() {
    // 文物级别
    norbulingka.getSelectOption({ catalogId: 7001, parentId: 0 }).then(res => {
      this.Form.setColumnByProp("culturalRank", {
        dicData: res
      });
      this.Tables.setColumnByProp("culturalRank", {
        dicData: res
      });
    });

    this.$nextTick(() => {
      this.Tables.refreshTable();
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
