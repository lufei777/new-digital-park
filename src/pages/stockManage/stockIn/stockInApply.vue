<template>
  <div class="stock-in-apply panel-container">
    <!--<div class="condition-box radius-shadow">-->
      <!--<miForm-->
        <!--:ref="formData.ref"-->
        <!--:options="formData"-->
        <!--v-model="model"-->
        <!--@submit="submit"-->
        <!--@reset-change="resetChange"-->
      <!--&gt;-->
        <!--<template slot="btn" slot-scope="obj">-->
          <!--<div>-->
            <!--<el-button :disabled="obj.disabled" type="primary" @click="onClickSearchBtn(obj)">搜索</el-button>-->
            <!--<el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>-->
          <!--</div>-->
        <!--</template>-->
      <!--</miForm>-->
    <!--</div>-->

    <!--<div class="warehouse-manage-table panel">-->
      <!--<miTable :ref="tableData.ref" :tableConfig="tableData">-->
        <!--<template slot="custom-top" slot-scope="obj">-->
          <!--<div class="operator-box flex-row-reverse">-->
            <!--<el-button :size="obj.size" type="primary">批量删除</el-button>-->
            <!--<el-button :size="obj.size" type="primary">批量编辑</el-button>-->
            <!--<el-button :size="obj.size" type="primary">导出</el-button>-->
            <!--<el-button :size="obj.size" type="primary">导入</el-button>-->
            <!--<el-button :size="obj.size" type="primary">新增</el-button>-->
          <!--</div>-->
        <!--</template>-->
      <!--</miTable>-->
    <!--</div>-->
    <el-tabs type="border-card">
      <el-tab-pane label="入库申请">
        <Apply />
      </el-tab-pane>
      <el-tab-pane label="申请记录"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import miForm from "@/components/Form";
import miTable from "@/components/Table";
import CommonFun from "../../../utils/commonFun";
import Apply from '../coms/apply'
export default {
  name: "WarehouseManage",
  components: {
    miForm,
    miTable,
    Apply
  },
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        menuBtn: false,
        // labelPosition: "left",
        forms: [
          {
            type: "input",
            label: "物品名称",
            prop: "goodsName",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            minRows: 0
          },
          {
            type: "input",
            label: "物品类型",
            prop: "goodsType",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "入库总数",
            prop: "warehouseSum",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            prop: "",
            formslot: true,
            span: 12
          },
          {
            type: "input",
            label: "入库日期",
            prop: "warehouseTime",
            placeholder: "选择日期时间",
            // clearable: true,
            span: 4,
            format: "yyyy-MM-dd",
            valueFormat: "timestamp"
          },
          // {
          //   prop: "",
          //   formslot: true,
          //   span: 6
          // },
          {
            type: "input",
            label: "申请人",
            prop: "applicant",
            placeholder: "请输入",
            span: 4
          },
          {
            type: "input",
            label: "经办人",
            // offset:1,
            prop: "handlePeople",
            placeholder: "请输入",
            span: 4
          },
          {
            prop: "btn",
            span: 6,
            pull: 4,
            formslot: true
            // width: "34px"
          }
        ]
      },
      tableData: {
        ref: "tableData",
        customTop: true,
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          showIndex: true,
          pagination: {
            //是否分页，分页是否自定义
            layout: "total,->, prev, pager, next, jumper",
            pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
              _this.handleCurrentChange(currentPage);
            }
          }
        },
        btnConfig: {
          prop: "operation",
          label: "操作",
          fixed: "right",
          width: 200,
          btns: [
            {
              label: "详情",
              handler: function(row) {}
            },
            {
              label: "编辑",
              handler: function(row) {}
            },
            {
              label: "删除",
              handler: function(row) {}
            }
          ]
        }
      }
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    onClickSearchBtn(...args) {
      this.$refs[this.formData.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.formData.ref].resetForm();
    },
    getCleaningList() {
      let res = CommonFun.warehouseManageData;
      let labelList = [
        { label: "物品名称", prop: "goodsName" },
        { label: "物品类型", prop: "goodsType" },
        { label: "入库总数", prop: "warehouseSum" },
        { label: "入库日期", prop: "warehouseTime" },
        { label: "申请人", prop: "applicant" },
        { label: "经办人", prop: "handlePeople" },
        { label: "备注", prop: "remark" }
      ];
      this.tableData.columnConfig = labelList;
      this.tableData.data = res;
    },
    batchDels() {},
    addTenant() {}
  },
  mounted() {
    this.getCleaningList();
  }
};
</script>

<style lang="less">
.stock-in-apply {
  .el-tabs{
    height:100%;
  }
}
</style>
