<template>
  <div class="record-detail">
    <div class="tip">{{detailTip}}</div>
    <BasicInformation :detail="detailData"/>
    <div class="module-tip">入库明细：</div>
    <z-table :ref="tableConfig.ref" :options="tableConfig"
             @handle-pagination="handleCurrentChange"
             @row-edit="rowEdit"
             @row-update="rowUpdate"
    >
      <template slot="actualQuantity" slot-scope="{isEdit,row,column,size}">
        <el-input
          :size="size"
          v-model="row[column.prop]"
          @focus="onQuantityInputFocus(row,column,$event)"
          v-if="isEdit"
        ></el-input>
        <span v-if="!isEdit">{{row.actualQuantity}}</span>
      </template>
      <!--<template slot="operation" slot-scope="{scopeRow:{$index,row}}">-->
        <!--<el-button type="text" @click="editRow($index,row)">编辑</el-button>-->
      <!--</template>-->
    </z-table>
    <div class="operator-box">
      <el-button type="primary" @click="onClickCheckBtn" v-if="fromFlag==3">确认验收</el-button>
      <el-button  @click="onClickBackBtn">返回</el-button>
    </div>


    <el-dialog
      title="编辑"
      :visible.sync="showEditModal"
       width="400px"
    >
      <el-form ref="formRef" label-position="right"
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
  export default {
    name: "RecordDetail",
    components: { BasicInformation },
    //fromFlag 1:申请详情 2:验收详情 3:验收页面
    props:["detailId","fromFlag","onClickBackCallback","onClickCheckCallback"],
    data() {
      let _this = this
      return {
       detailData:{},
       tableConfig:{
         ref:'tableRef',
         data:[],
         editBtn: true,
         operation:_this.fromFlag==3?{width:150}:false,
         columnConfig:[
           {label:'资产名称',prop:'name'},
           {label:'规格型号',prop:'specification'},
           {label:'单价',prop:'price'},
           {label:'入库数量',prop:'quantity'}],
         uiConfig:{
           height:'auto',
           pagination:{
             pageSize:5,
           }
         }
       },
        showEditModal:false,
        curRow:{},
        curIndex:{},
        formData:{
          actualQuantity:'',
          description:''
        },
        rules: {
        },
        pageSize:5,
        curPage:1,
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
        // console.log(this.fromFlag)
        if(this.fromFlag==1 || this.fromFlag==2){
           res = await StockManageApi.getRecordDetail({
            recordId:this.detailId
          })
        }else if(this.fromFlag==3){
           res = await StockManageApi.getApplyDraft({
            id:this.detailId
          })
          // console.log("beforeRes",res)
        }

        if(this.fromFlag==2 || this.fromFlag==3){
          this.tableConfig.columnConfig=[...this.tableConfig.columnConfig, ...
            [{label:'实收数量',
              prop:'actualQuantity',
              cell: true,
              slot: true,
              // type:'input',
              rules: {
                required: true,
                validator: this.checkQuantity,
              },
              // focus:this.onQuantityInputFocus()
            },{
              label:'备注',
              prop:'description',
              cell: true,
              type:'textarea'
             }
            ]]
          if(this.fromFlag==3){
            res.stockDetailsList.map((item)=>{
              item.actualQuantity=''
              item.description=''
            })
          }
          // console.log("centerres",res)
        }
        // console.log("res",res.stockDetailsList)
        this.detailData=res
        this.tableConfig.data=res.stockDetailsList
      },
      checkQuantity(rule, value, callback) {
        if((value+"").trim()==''){
          return callback({ message: "请输入领用数量" })
        }else if ((!Number(value) || value<0) && value!==0 && value!=='0') {
          return callback({ message: "请输入正数" });
        } else if(value>this.curRow.quantity){
          return callback({message:"实收数量应小于等于入库数量"});
        }else{
          return callback();
        }
      },
      onQuantityInputFocus(row,column,data){
        // console.log("focus",row,column,data)
        this.curRow = this.tableConfig.data[row.$index]
      },
      async onClickCheckBtn(){
        // console.log(this.tableConfig.data)
        let tmp =[],tmp2=[]
        this.tableConfig.data.map((item,index)=>{
          if(item.actualQuantity==''){
            tmp.push(index+1)
          }
          if(item.$cellEdit){
            tmp2.push(index+1)
          }
        })
        if(tmp.length){
          this.$message({
            type: 'warning',
            message:`请填写第${tmp.join("、")}行实收数量！`,
          });
          return ;
        }
        if(tmp2.length){
          this.$message({
            type: 'warning',
            message:`请先保存第${tmp2.join("、")}行数据！`,
          });
          return ;
        }
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
        this.curIndex=index+(this.curPage-1)*this.pageSize
        this.formData={
          actualQuantity:this.curRow.actualQuantity,
          description:this.curRow.description
        }
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
      },
      handleCurrentChange(size,page){
        this.curPage=page
      },
      rowEdit(obj,index){
        this.curRow = obj
      },
      async rowUpdate(data, index, callback) {
        console.log(data,data.actualQuantity>data.quantity)
        if(data.actualQuantity>data.quantity){
          this.$message({
            type: 'warning',
            message: "实收数量应小于等于入库数量",
          });
          return;
        }
        callback()
      },
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
