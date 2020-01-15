<template>
  <div class="apply-coms">
    <div v-show="!showAddModal">
      <div class="tip">基本信息：</div>
      <div class="form-box">
        <miForm :ref="formConfig.ref" :options="formConfig" v-model="model"/>
      </div>
      <div class="tip">入库明细：</div>
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">添加明细</el-button>
      </div>
      <miTable :ref="tableConfig.ref" :tableConfig="tableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow($index)">编辑</el-button>
          <el-button type="text" @click="deleteRow($index)">删除</el-button>
        </template>
      </miTable>
      <div class="operator-box">
        <el-button type="primary" >提交</el-button>
        <el-button type="primary" @click="onClickSaveBtn">保存</el-button>
      </div>
    </div>
    <div v-show="showAddModal">
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
  import TaskManageApi from '@/service/api/taskManageApi'
  import StockManageApi from '@/service/api/stockManageApi'
  export default {
    name: "Apply",
    components: { miForm, miTable,AddAsset },
    data() {
      let _this = this
      return {
        model: {},
        formConfig:{
          ref:'formRef',
          menuBtn:false,
          forms: [{
            type: "select",
            label: "入库类型",
            prop: "stockType",
            dicData:StockDic.stockInApply,
            valueDefault:1,
            span: 10,
          },{
            type: "date",
            label: "购置日期",
            prop: "buyTime",
            valueFormat:'yyyy-MM-dd',
            span: 10,
            offset:4
          },{
            type: "cascader",
            label: "采购人",
            prop: "buyId",
            showAllLevels:false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
              lazy: true,
              lazyLoad:async function (node, resolve) {
                const { level,data } = node;
                let nodes =[]
                if(level==0 || data.childNode.length){
                  resolve(nodes);
                }else{
                  let res =await _this.getUserList(node.data.id)
                  nodes=res
                }
                resolve(nodes);
              },
            },
            span: 10,
          },{
            type: "date",
            label: "入库日期",
            prop: "stockTime",
            valueFormat:'yyyy-MM-dd',
            span: 10,
            offset:4
          },{
            type: "cascader",
            label: "验收人",
            prop: "acceptId",
            showAllLevels:false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
              lazy: true,
              lazyLoad:async function (node, resolve) {
                const { level,data } = node;
                let nodes =[]
                if(level==0 || data.childNode.length){
                  resolve(nodes);
                }else{
                  let res =await _this.getUserList(node.data.id)
                  nodes=res
                }
                resolve(nodes);
              },
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
            // {label:'编号',prop:'coding'},
            {label:'名称',prop:'name'},
            // {label:'单位',prop:'unit'},
            {label:'品牌',prop:'brand'},
            {label:'价格',prop:'price'},
            // {label:'单独核算',prop:'singleCount',
            //   formatter:function (row) {
            //     return row.singleCount==1?'是':'否'
            //   }
            // },
            // {label:'资产组',prop:'groupName'},
            // {label:'资产类型',prop:'typeName'},
            {label:'数量',prop:'quantity'},
            {label:'入库部门',prop:'departmentName'}],
          uiConfig:{
            height:'auto',
            selection: true,
          }
        },
        showAddModal:false,
        curDetail:{},
        deptTree:[],
      };
    },
    methods: {
      async getDepartmentTree() {
        let res = await AssetManageApi.getDepartmentTree();
        this.$refs[this.formConfig.ref].setColumnByProp("buyId", {
          dicData: res[0].childNode
        });
        this.$refs[this.formConfig.ref].setColumnByProp("acceptId", {
          dicData: res[0].childNode
        });
       this.deptTree=res[0].childNode
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
      },
      onClickMultiDelBtn(){
        let delArr = this.$refs["tableRef"].getSelectedData()
        let tmp = []
        this.tableConfig.data.map((item)=>{
          if(delArr.indexOf(item)==-1){
            tmp.push(item)
          }
        })
        this.tableConfig.data=tmp
      },
      async getUserList(id) {
        let deptId = id
        let res = await TaskManageApi.listBy({
          deptId
        })
        res.map((item)=>{
          item.name=item.fullName
          item.leaf=true
        })
        return res
      },
      async onClickSaveBtn(){
        let stockDetailsList = this.tableConfig.data
        stockDetailsList.map((item)=>{
          item.assetId = item.id
          item.description = item.remark
        })
        let obj = {
          ...this.model,
          ...{buyId:this.model.buyId[this.model.buyId.length-1],
              acceptId:this.model.acceptId[this.model.acceptId.length-1],
              stockDetailsList
              },
        }
        console.log(obj)
        await StockManageApi.saveStockApply(obj)
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
  .operator-box{
    margin-top: 40px;
    text-align: center;
  }
}
</style>
