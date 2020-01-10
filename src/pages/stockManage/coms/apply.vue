<template>
  <div class="apply-coms">
    <div v-if="!showAddModal">
      <div class="tip">基本信息：</div>
      <div class="form-box">
        <miForm :ref="formConfig.ref" :options="formConfig" v-model="model"/>
      </div>
      <div class="tip">入库明细：</div>
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">添加明细</el-button>
      </div>
      <miTable :ref="tableConfig.ref" :tableConfig="tableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow($index)">编辑</el-button>
          <el-button type="text" @click="deleteRow($index)">删除</el-button>
        </template>
      </miTable>
    </div>

    <div v-if="showAddModal">
      <AddAsset fromFlag="stockApply" :curDetail="curDetail"/>
    </div>
  </div>
</template>

<script>
  import miForm from "@/components/Form";
  import miTable from "@/components/Table";
  import {StockDic} from "@/utils/dictionary";
  import AssetManageApi from '@/service/api/assetManageApi'
  import AddAsset from '../../assetManage/addAsset'
  export default {
    name: "Apply",
    components: { miForm, miTable,AddAsset },
    data() {
      return {
        model: {},
        formConfig:{
          ref:'formRef',
          menuBtn:false,
          forms: [{
            type: "select",
            label: "入库类型",
            prop: "type",
            dicData:StockDic.stockInApply,
            valueDefault:1,
            span: 10,
          },{
            type: "date",
            label: "购置日期",
            prop: "buyDate",
            span: 10,
            offset:4
          },{
            type: "tree",
            label: "采购人",
            prop: "buyer",
            props: {
              label: "name",
              value: "id",
              children: "childNode"
            },
            span: 10,
          },{
            type: "date",
            label: "入库日期",
            prop: "inDate",
            span: 10,
            offset:4
          },{
            type: "tree",
            label: "验收人",
            prop: "checker",
            props: {
              label: "name",
              value: "id",
              children: "childNode"
            },
            span: 10,
          },{
            type: "select",
            label: "供应商",
            prop: "providerId",
            props: {
              label: "name",
              value: "id",
            },
            span: 10,
            offset:4
          },{
            type: "input",
            label: "合同号",
            prop: "contractId",
            span: 10,
          }]
        },
        tableConfig:{
          ref:'tableRef',
          customTop:true,
          operation:true,
          data:[],
          columnConfig:[
            {label:'编号',prop:'coding'},
            {label:'名称',prop:'name'},
            {label:'单位',prop:'unit'},
            {label:'品牌',prop:'brand'},
            {label:'价格',prop:'price'},
            {label:'单独核算',prop:'singleCount',
              formatter:function (row) {
                return row.singleCount==1?'是':'否'
              }
            },
            {label:'资产组',prop:'groupName'},
            {label:'资产类型',prop:'typeName'},
            {label:'数量',prop:'quantity'},
            {label:'入库部门',prop:'departmentName'}],
          uiConfig:{
            height:'auto',
            selection: true,
          }
        },
        showAddModal:false,
        curDetail:{},
        showModal2:false
      };
    },
    methods: {
      async getDepartmentTree() {
        let res = await AssetManageApi.getDepartmentTree();
        this.$refs[this.formConfig.ref].setColumnByProp("buyer", {
          dicData: res
        });
        this.$refs[this.formConfig.ref].setColumnByProp("checker", {
          dicData: res
        });
      },
      async getProviderList() {
        let res = await AssetManageApi.getProviderList();
        this.$refs[this.formConfig.ref].setColumnByProp("providerId", {
          dicData: res
        });
      },
      onClickAddBtn(){
        this.curDetail={}
        this.showAddModal=true

      },
      addStockDetail(obj){
        this.tableConfig.data.push(obj)
        this.showAddModal=false
      },
      deleteRow(index){
        this.tableConfig.data.splice(index,1)
      },
      editRow(index){
        this.showAddModal=true
        this.curDetail=this.tableConfig.data[index]
      }
    },
    mounted() {
      this.getDepartmentTree();
      this.getProviderList()
    }
  };
</script>

<style lang="less">
  .apply-coms {
   .tip{
     font-weight: bold;
     font-size: 16px;
     margin-bottom: 20px;
   }
  .form-box{
    width:800px;
    margin:0 auto;
  }
  .add-modal{
    height:100%
  }
}
</style>
