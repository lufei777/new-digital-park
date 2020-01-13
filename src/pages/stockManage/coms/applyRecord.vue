<template>
  <div class="apply-record">
    <miTable :ref="tableConfig.ref" :tableConfig="tableConfig">
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="editRow(row)">详情</el-button>
      </template>
    </miTable>
  </div>
</template>

<script>
  import miTable from "@/components/Table";
  import {StockDic} from "@/utils/dictionary";
  import AssetManageApi from '@/service/api/assetManageApi'
  export default {
    name: "Apply",
    components: { miTable },
    data() {
      return {
        model: {},
        tableConfig:{
          ref:'tableRef',
          data:[],
          operation:true,
          columnConfig:[
            {label:'采购人',prop:'buyer'},
            {label:'验收人',prop:'checker'},
            {label:'购置日期',prop:'buyDate'},
            {label:'入库日期',prop:'brand'},
            {label:'入库状态',prop:'singleCount',
              formatter:function (row) {
                return row.singleCount==1?'是':'否'
              }
            }],
          uiConfig:{
            height:'auto',
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
      }
    },
    mounted() {
      // this.getDepartmentTree();
      // this.getProviderList()
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
