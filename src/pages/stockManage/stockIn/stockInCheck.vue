<template>
  <div class="stock-in-check panel-container">
    <el-tabs type="border-card">
      <el-tab-pane label="验收申请">
        <miTable :ref="tableConfig.ref" :tableConfig="tableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="editRow($index)">验收</el-button>
            <el-button type="text" @click="deleteRow($index)">作废</el-button>
          </template>
        </miTable>
      </el-tab-pane>
      <el-tab-pane label="验收记录">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import miForm from "@/components/Form";
import miTable from "@/components/Table";
export default {
  name: "StockCheck",
  components: { miForm, miTable },
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
            label: "验收总数",
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
            label: "验收状态",
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
            label: "验收日期",
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
      tableConfig: {
        ref: "tableRef",
        customTop: true,
        operation:true,
        data: [],
        columnConfig: [
          {label:'名称',prop:'name'},
          {label:'规格型号',prop:'specification'},
          {label:'单价',prop:'price'},
          {label:'数量',prop:'quantity'},
          {label:'申请时间',prop:'time'}],
        uiConfig: {
          height: "auto",
          selection: true,
        },
      }
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="less">
.stock-in-check {
  .el-tabs{
    height:100%;
  }
}
</style>
