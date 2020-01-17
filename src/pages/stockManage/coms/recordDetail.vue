<template>
  <div class="record-detail">
    <div class="tip">{{detailTip}}</div>
    <BasicInformation :detail="detailData"/>
    <div class="module-tip">入库明细：</div>
    <miTable :ref="tableConfig.ref" :tableConfig="tableConfig">
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="editRow($index,row)">编辑</el-button>
      </template>
    </miTable>
    <div class="operator-box">
      <el-button type="primary" @click="onClickCheckBtn" v-if="fromFlag==3">确认验收</el-button>
      <el-button  @click="onClickBackBtn">返回</el-button>
    </div>


    <el-dialog
      title="编辑"
      :visible.sync="showEditModal"
       width="400px"
    >
      <el-form ref="formRef"label-position="right"
               label-width="80px" :model="formData"
               :rules="rules"
      >
        <el-form-item label="入库数量" prop="">
          <el-input v-model="curRow.quantity" disabled></el-input>
        </el-form-item>
        <el-form-item label="实收数量" prop="actualQuantity">
          <el-input v-model="formData.actualQuantity"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="formData.description" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="onCloseModal">取 消</el-button>
      <el-button type="primary" @click="onClickSureBtn">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import {StockDic} from "@/utils/dictionary";
  import StockManageApi from '@/service/api/stockManage'
  import BasicInformation from '../coms/basicInformation'
  import miTable from '@/components/Table'
  export default {
    name: "RecordDetail",
    components: { BasicInformation,miTable },
    //fromFlag 1:申请详情 2:验收详情 3:验收页面
    props:["detailId","fromFlag","onClickBackCallback","onClickCheckCallback"],
    data() {
      let _this = this
      let checkQuantity = (rule, value, callback) => {
        if ((!Number(value) || value<0) && value!="") {
          callback(new Error("请输入正数"));
        } else if(value>_this.curRow.quantity){
          callback(new Error("实收数量应小于入库数量"));
        }else{
          callback();
        }
      };
      return {
       detailData:{},
       tableConfig:{
         ref:'tableRef',
         data:[],
         operation:_this.fromFlag==3?true:false,
         columnConfig:[
           {label:'资产名称',prop:'name'},
           {label:'规格型号',prop:'specification'},
           {label:'单价',prop:'price'},
           {label:'入库数量',prop:'quantity'}],
         uiConfig:{
           height:'auto'
         }
       },
        showEditModal:false,
        curRow:{},
        curIndex:{},
        formData:{
          actualQuantity:0,
          description:''
        },
        rules: {
          actualQuantity: [{ required: true, message: "请输入实收数量", trigger: "blur" },
            { validator: checkQuantity, trigger: "blur" }]
        }
      };
    },
    computed:{
      ...mapState({
        stockTabChange:state=>state.digitalPark.stockTabChange
      }),
      detailTip(){
        return this.fromFlag==1?'入库申请记录详情':
               this.fromFlag==2?'入库验收记录详情':
               this.fromFlag==3?'验收':''
      }
    },
    watch:{
    },
    methods: {
      onClickBackBtn(){
        this.onClickBackCallback && this.onClickBackCallback()
      },
      async getDetail(){
        let res
        console.log(this.fromFlag)
        if(this.fromFlag==1 || this.fromFlag==2){
           res = await StockManageApi.getRecordDetail({
            recordId:this.detailId
          })
        }else if(this.fromFlag==3){
           res = await StockManageApi.getApplyDraft({
            id:this.detailId
          })
          console.log("beforeRes",res)
        }

        if(this.fromFlag==2 || this.fromFlag==3){
          this.tableConfig.columnConfig=[...this.tableConfig.columnConfig, ...
            [{label:'实收数量',prop:'actualQuantity'},
              {label:'备注',prop:'description'}]]
          if(this.fromFlag==3){
            res.stockDetailsList.map((item)=>{
              item.actualQuantity=0
              item.description=''
            })
          }
          console.log("centerres",res)
        }
        console.log("res",res.stockDetailsList)
        this.detailData=res
        this.tableConfig.data=res.stockDetailsList
      },
      async onClickCheckBtn(){
        console.log(this.tableConfig.data)
        let res = await StockManageApi.checkStockApply({
          id:this.detailId,
          stockDetailsList:this.tableConfig.data
        })
        this.$message({
          type: 'success',
          message: res,
        });
        this.onClickCheckCallback && this.onClickCheckCallback()
      },
      editRow(index,row){
        this.showEditModal=true
        this.curRow=row
        this.curIndex=index
      },
      onClickSureBtn(){
        this.$refs['formRef'].validate((valid) => {
          if (valid) {
            this.tableConfig.data[this.curIndex].actualQuantity=this.formData.actualQuantity,
            this.tableConfig.data[this.curIndex].description=this.formData.description
            this.showEditModal=false
            this.formData={
              actualQuantity:0,
              description:''
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onCloseModal(){
        this.showEditModal=false
      }
    },
    mounted() {
      this.getDetail()
    }
  };
</script>

<style lang="less">
  .record-detail {
    .tip{
      text-align: center;
      margin:20px;
      font-weight: bold;
      font-size: 16px;
    }
    .operator-box{
      text-align: center;
      margin-top: 20px;
    }
    .module-tip{
      font-weight: bold;
      font-size: 16px;
      margin:0 0 20px 0;
      text-align: left;
    }
  }
</style>
