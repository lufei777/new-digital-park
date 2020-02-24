<template>
  <div class="asset-use panel-container panel">
    <div v-if="!showAdd" class="asset-use-table-panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">添加</el-button>
      </div>
      <zTable :ref="tableConfig.ref"
              :options="tableConfig"
              @row-update="rowUpdate"
              @row-edit="rowEdit"
              @row-edit-cancel="rowEditCancel"
      >
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <!--<el-button type="text" @click="editRow($index)">编辑</el-button>-->
          <el-button type="text" @click="deleteRow(row)">删除</el-button>
        </template>
      </zTable>
      <div class="submit-btn">
        <el-button type="primary" @click="onClickSubmitBtn">提交</el-button>
      </div>
    </div>
    <!--<AddAssetUse v-if="showAdd" :curDetail="curDetail" :goBack="goBack"/>-->
    <SearchAssetModal :showSearchModal="showSearchModal"  from-flag="2"/>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  import SearchAssetModal from '../../stockManage/coms/searchAsset'
  import AddAssetUse from '../coms/addAssetUse'
  import SystemManageApi from '@/service/api/systemManage'
  import moment from 'moment'
  import CommonFun from '@/utils/commonFun'
  export default {
    name: 'AssetUse',
    components: {
      AddAssetUse,
      SearchAssetModal
    },
    data () {
      let _this = this
      let checkQuantity = (rule, value, callback) => {
        console.log("value",_this.curDetail.actualQuantity,value)
        if(value.trim()==""){
          return callback({message:"请输入领用数量"});
        }else if(value==0){
          return  callback({message:"最小领用数量为1"});
        }else if((!Number(value) || value<0)){
         return  callback({message:"请输入正数"});
        }else if(_this.curDetail.actualQuantity && value>_this.curDetail.actualQuantity){
          return callback({message:"领用数量应小于等于入库数量"});
        }
        return callback();
      };
      return {
        tableConfig:{
          ref:'tableRef',
          data:[],
          editBtn:true,
          props:{
            rowKey:'id'
          },
          columnConfig:[{
            label:'申请日期',
            prop:'applyTime',
          },{
            label:'申请人',
            prop:'applyUser'
          },{
            label:'领用的资产',
            prop:'name',
            cell:true,
            clearable: false,
            readonly:true,
            focus:_this.chooseAsset
          },{
            label:'规格型号',
            prop:'specification'
          },{
            label:'库存数量',
            prop:'actualQuantity'
          },
            {
            label:'领用人',
            prop:'collarId',
            cell:true,
            type: "cascader",
            showAllLevels: false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
            },
            dicData:[],
          },{
            label:'领用数量',
            prop:'collarNum',
            cell:true,
            type:'input',
            // rules: {
            //   required: true,
            //   validator: checkQuantity,
            // },
          },{
            label:'备注',
            prop:'description',
            cell:true
          }],
          customTop: true,
          operation: {
            width:200
          },
          uiConfig:{
            height: "auto",
            selection: true,
          }
        },
        showAdd:false,
        curDetail:{},
        curRowIndex:0,
        isEdit:false,
        showSearchModal:false,
        pageSize:10,
        deptTree:[],
        curPage:1,
        deleteId:''
      }
    },
    methods: {
      async onClickAddBtn(){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let obj={
             id:_.uniqueId(),
             applyTime:moment(new Date()).format('YYYY-MM-DD'),
             applyUser:userInfo.fullName,
             name:'',
             collarId:'',
             specification:'',
             actualQuantity:'',
             collarNum:'',
             description:'',
             flag:false,
             assetId:''
          }
        // this.$refs['tableRef'].rowCellAdd(obj)
        // this.tableConfig.data.push(obj)
        await this.addAssetUseDetail(obj)
        this.isEdit=false
      },
      goBack(){
        this.showAdd=false
      },
      deleteRow(row) {
        // this.tableConfig.data.splice(index, 1);
        // CommonFun.deleteTip(this,true,"确定要删除吗")
        this.deleteId= row.id
        this.deleteAssetUseDetail()
      },
      onClickMultiDelBtn() {
        let delArr = this.$refs["tableRef"].getSelectedData();
        this.deleteId=delArr.map((item)=>item.id).join(",")
        this.deleteAssetUseDetail()
      },
      chooseAsset(){
        this.showSearchModal=true
      },
      async rowUpdate(data,index,callback){
        console.log("baocun",data)
        if(data.collarId && data.collarId instanceof Array){
          data.collarId = data.collarId[data.collarId.length-1]
        }
        data.isEdit=1
        // let tmp =data
        // tmp.isEdit=0
        // tmp.collarId = data[data.collarId.length-1]
        await this.editAssetUseDetail(data)
        callback()
      },
      onGetAssetDetail(val) {
        let tmp={
          id:this.curDetail.id,
          assetId:val.id || val.assetId,
          $cellEdit:true,
          collarNum:this.curDetail.collarNum
        }
        let obj={...this.curDetail,...val,...tmp}
        console.log("getDetail",this.curDetail,obj)
        this.tableConfig.data.splice(this.curRowIndex,1,obj)
        this.curDetail=obj
        this.showSearchModal = false
      },
      async rowEdit(obj,index){
        this.curRowIndex=index
        this.curDetail=obj
        // await this.editAssetUseDetail({...obj,...{isEdit:0}})
      },
      async rowEditCancel(obj,index){
        console.log("cancel",obj)
        if(obj.flag){
          this.tableConfig.data.splice(index,1,{...obj.preDetail,...{$cellEdit:false}})
        }
      },
      async getDepartmentTree() {
        let res = await SystemManageApi.getDepartmentTree();
        this.deptTree=res[0].childNode

        let list = this.insertNode(this.deptTree)
        this.$refs['tableRef'].setColumnByProp("collarId", {
          dicData:list
        });
      },
      async getUserList(id) {
        let deptId = id;
        let res = await SystemManageApi.listBy({
          deptId
        });
        res.map(item => {
          item.name = item.fullName;
          item.leaf = true;
        });
        this.userList=res
        return res;
      },
      insertNode(arr){
        arr.map(async(item)=> {
          if (item.childNode.length) {
            this.insertNode(item.childNode)
          } else {
            let res = await this.getUserList(item.id)
            item.childNode=res
          }
        })
        return arr;
      },
      async getAssetUseList(){
        let res = await AssetManageApi.getAssetUseList({
           pageNum:this.curPage,
           pageSize:10,
        })
        if(res.list){
          res.list.map((item)=>{
            // item.$cellEdit=item.isEdit?true:false
            // item.preDetail = item
          })
        }else{
          res.list=[]
        }
        this.tableConfig.data=res.list
        this.tableConfig.uiConfig.pagination.total=res.total
      },
      async addAssetUseDetail(obj){
        await AssetManageApi.addAssetUseDetail(obj)
        await this.getAssetUseList()
      },
      async deleteAssetUseDetail(){
        await AssetManageApi.deleteAssetUseDetail({
          ids:this.deleteId
        })
        this.getAssetUseList()
      },
      async editAssetUseDetail(obj){
        await AssetManageApi.editAssetUseDetail(obj)
        this.getAssetUseList()
      },
      async onClickSubmitBtn(){
        let list = this.tableConfig.data
        let arr= list.filter((item)=>{
          return !item.name || !item.collarId || !item.collarNum
        })
        console.log(list)
        if(arr.length){
          this.$message({
            type:'warning',
            message:'请将信息补充完整'
          })
          return ;
        }
        await AssetManageApi.addAssetUseApply()
        this.getAssetUseList()
      }
    },
    created(){

    },
    async mounted(){
      await this.getDepartmentTree()
      this.getAssetUseList()
    }
  }
</script>

<style lang="less">
  .asset-use{
    .asset-use-table-panel{
      overflow: hidden;
    }
    .submit-btn{
      margin:20px 0;
      text-align: center;
    }
  }

</style>

