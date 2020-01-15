<template>
  <div class="stock-in-check panel-container">
    <el-tabs type="border-card">
      <el-tab-pane label="入库验收">
        <div class="form-box radius-shadow flex-align">
            <div class="item-group">
              <label for="">购置日期：</label>
              <el-date-picker
                v-model="query.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="item-group">
              <el-button  type="primary">搜索</el-button>
              <el-button >重置</el-button>
            </div>
        </div>
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
      query: {
        name:'',
        date:''
      },
      tableConfig: {
        ref: "tableRef",
        customTop: true,
        operation:true,
        data: [],
        columnConfig: [
          {label:'采购人',prop:'buyer'},
          {label:'验收人',prop:'checker'},
          {label:'购置日期',prop:'price'},
          {label:'入库日期',prop:'quantity'},
          {label:'合同号',prop:'time'}],
        uiConfig: {
          height: "auto",
          // selection: true,
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
  .form-box{
    padding: 20px;
    .el-input{
      width:200px;
    }
  }
}
</style>
