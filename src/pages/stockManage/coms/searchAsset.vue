<template>
  <div class="search-asset-coms">
    <el-dialog
      title="搜索资产信息"
      :visible.sync="showModal"
      width="40%"
    >
      <el-tabs type="border-card" @tab-click="onClickTab">
        <el-tab-pane label="按资产类型">
          <div class="tree-box">
            <Tree :tree-list="typeTree" :treeConfig="treeConfig"/>
            <z-table :ref="tableConfig.ref" :options="tableConfig"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="组合查询">
          <zForm :ref="formConfig.ref" :options="formConfig" v-model="formModel">
            <template slot="btn" slot-scope="obj">
              <div>
                <el-button :disabled="obj.disabled" type="primary" @click="onClickSearchBtn(obj)">搜索</el-button>
                <el-button :disabled="obj.disabled" @click="clearForm(obj)">重置</el-button>
              </div>
            </template>
          </zForm>
          <z-table :ref="tableConfig.ref" :options="tableConfig"/>
        </el-tab-pane>
      </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModal">取 消</el-button>
      <el-button type="primary" @click="onClickSureBtn">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  import Tree from '@/components/tree'
  import {AssetDic} from "../../../utils/dictionary";
  import StockManageApi from '@/service/api/stockManage'
  export default {
    name: "SearchAssetModal",
    props:["showSearchModal","fromFlag"], //fromFlag 1：搜索资产信息 2：搜索资产
    components: {
      Tree
    },
    data() {
      let columnConfig=[]
      if(this.fromFlag==1){
        columnConfig = [
          {label:'编号', prop:'coding'},
          {label:'名称', prop:'name'},
          {label:'规格型号', prop:'specification'},
          {label:'单独核算', prop:'singleCount',
            formatter:function(row){
              return row.singleCount==1?'是':'否'
            }
          }
        ]
      }else if(this.fromFlag==2){
        columnConfig = [
          {label:'名称', prop:'name'},
          {label:'规格型号', prop:'specification'},
          {label:'状态', prop:'status',
            formatter:function(row){
              return '闲置'
            }
          },
          {label:'入库部门', prop:'deptName'},
          {label:'数量',prop:'actualQuantity'}
        ]
      }
      let _this = this
      return {
        typeTree:[],
        treeConfig:{
          treeProps:{
            label:'name',
            children: 'childNode',
          },
          onClickTreeNodeCallBack:this.onClickTreeNodeCallBack
        },
        tableConfig:{
          ref:'tableRef',
          data:[],
          customTop:true,
          columnConfig:columnConfig,
          uiConfig:{
            height:'300',
            pagination:{},
          },
          tableMethods: {
            rowClick: this.rowClick,
          },
        },
        formModel:{},
        formConfig:{
          ref:'formRef',
          menuBtn:false,
          forms:[{
            type: "input",
            label: "编号",
            prop: "coding",
            span: 10,
          },{
            type: "input",
            label: "名称",
            prop: "name",
            span: 10,
          },{
            type: "radio",
            label: "单独核算",
            prop: "singleCount",
            dicData:AssetDic.singleCount,
            // valueDefault:1,
            span: 10,
          },{
            prop: "btn",
            span: 12,
            // offset: 2,
            formslot: true,
            width: 100
          }]
        },
        curType:'',
        curPage:1,
        curRow:{}
      }
    },
    computed:{
      showModal:{
        get(){
          return this.showSearchModal
        },
        set(){
          this.closeModal()
        }
      },
    },
    methods: {
      closeModal(){
        this.$parent.showSearchModal=false
      },
      async getAssetTypeList(){
        let res = await AssetManageApi.getAssetTypeTree()
        this.typeTree =res
      },
      async getAssetList(){
        let params={...{
            typeId:this.curType,
            pageNum:this.curPage,
            pageSize:10
        },...this.formModel}
        let res
        if(this.fromFlag==1){
          res = await AssetManageApi.getAssetList(params)
        }else if(this.fromFlag==2){
          params={...params,...{status:0}}
          res = await StockManageApi.getStockList(params)
        }
        this.tableConfig.data=res.list
        this.tableConfig.uiConfig.pagination.total=res.total
      },
      onClickTreeNodeCallBack(node){
         this.curType=node.id
         this.getAssetList()
      },
      rowClick(row){
        console.log("rowClick",row)
        this.curRow=row
      },
      onClickSureBtn(){
        this.$parent.onGetAssetDetail && this.$parent.onGetAssetDetail(this.curRow)
      },
      onClickSearchBtn(){
        this.getAssetList()
      },
      clearForm(){
        this.$refs[this.formConfig.ref].resetForm();
      },
      onClickTab(){
        this.curType=""
        this.formModel={
          singleCount:'',
          name:'',
          coding:''
        }
        this.curPage=1
        this.getAssetList()
      }
    },
    async mounted() {
      await this.getAssetTypeList()
      this.getAssetList()
    }
  };
</script>

<style lang="less">
  .search-asset-coms {
    .el-tabs{
      height:100%;
    }
    .tree-box{
      height:200px;
      border:1px solid #f0f0f0;
    }
    .el-tabs__content{
      height:500px;
    }
  }
</style>
