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
          <el-button type="text" @click="deleteRow($index)">删除</el-button>
        </template>
      </zTable>
      <div class="submit-btn">
        <el-button type="primary">提交</el-button>
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
  export default {
    name: 'AssetUse',
    components: {
      AddAssetUse,
      SearchAssetModal
    },
    data () {
      let _this = this
      let checkQuantity = (rule, value, callback) => {
        if(value.trim()==""){
          return callback({message:"请输入领用数量"});
        }else if(value==0){
          callback({message:"最小领用数量为1"});
        }else if((!Number(value) || value<0)){
          callback({message:"请输入正数"});
        }else if(value>_this.curDetail.actualQuantity){
          console.log(value,_this.curDetail.actualQuantity)
          callback({message:"领用数量应小于等于入库数量"});
        }else{
          callback();
        }
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
            prop:'date',
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
          //   {
          //   label:'领用部门',
          //   prop:'deptId',
          //   cell:true,
          //   type: "cascader",
          //   showAllLevels: false,
          //   props: {
          //     label: "name",
          //     value: "id",
          //     children: "childNode",
          //   },
          //   dicData:_this.deptTree,
          //   // change:_this.userChange
          // },
            {
            label:'领用人',
            prop:'collarId',
            cell:true,
            type: "cascader",
            showAllLevels: false,
            props: {
              label: "name",
              value: "id",
            },
            dicData:[],
            // change:_this.userChange
          },{
            label:'领用数量',
            prop:'collarNum',
            cell:true,
            type:'input',
            rules: {
              required: true,
              validator: checkQuantity,
            },
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
        deptTree:[]
      }
    },
    methods: {
      async onClickAddBtn(){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let obj={
             id:_.uniqueId(),
             date:moment(new Date()).format('YYYY-MM-DD'),
             applyUser:userInfo.fullName,
             name:'',
             collarId:'',
             specification:'',
             actualQuantity:'',
             collarNum:'',
             description:'',
             flag:false,
             collarName:'',
             deptId:'',
             assetId:''
          }
        // this.$refs['tableRef'].rowCellAdd(obj)
        await AssetManageApi.addAssetUseDetail(obj)
        // this.tableConfig.data.push(obj)
        this.isEdit=false
      },
      goBack(){
        this.showAdd=false
      },
      addAssetUseDetail(obj){
        console.log("obj",obj)
        this.showAdd=false
        if(this.isEdit){
          this.tableConfig.data[this.curRowIndex] =obj
        }else{
          this.tableConfig.data.push(obj)
        }
      },
      deleteRow(index) {
        this.tableConfig.data.splice(index, 1);
      },
      onClickMultiDelBtn() {
        let delArr = this.$refs["tableRef"].getSelectedData();
        let tmp = [];
        this.tableConfig.data.map(item => {
          if (delArr.indexOf(item) == -1) {
            tmp.push(item);
          }
        });
        this.tableConfig.data = tmp;
      },
      chooseAsset(){
        // this.showAdd=true
        this.showSearchModal=true
      },
      rowUpdate(data,index,callback){
        // console.log(val1,val2,val3)
        let tmp =data
        tmp.flag=false
        this.tableConfig.data.splice(index,1,tmp)
        callback()
        console.log(tmp,this.tableConfig.data)
      },
      onGetAssetDetail(val) {
        // console.log("curRow",this.curDetail)
        let tmp={
          id:this.curDetail.id,
          assetId:val.id || val.assetId,
          flag:true,
          collarNum:this.curDetail.collarNum
        }
        let obj={...this.curDetail,...val,...tmp}
        console.log(obj)
        this.tableConfig.data.splice(this.curRowIndex,1,obj)
        this.curDetail=obj
        this.showSearchModal = false
      },
      rowEdit(obj,index){
        console.log("edit",obj,index)
        this.curRowIndex=index
        this.curDetail=obj
      },
      rowEditCancel(obj,index){
        console.log(111,obj,index)
        if(obj.flag){
          this.tableConfig.data.splice(this.curRowIndex,1,{...this.curDetail,...{$cellEdit:false}})
        }
      },
      async getDepartmentTree() {
        let res = await SystemManageApi.getDepartmentTree();
        this.deptTree=res[0].childNode
        // this.$refs['tableRef'].setColumnByProp("deptId", {
        //   dicData:this.deptTree
        // });
        // console.log("this.depeTREE",this.deptTree)
         let list = this.insertNode(this.deptTree)
        // return this.deptTree
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
      userChange(data){
        let userId = data.value[data.value.length-1]
        let user = this.userList.find((item)=>item.id==userId)
        this.tableConfig.data[this.curRowIndex].collarId=userId
        this.tableConfig.data[this.curRowIndex].collarName=user.fullName
        console.log("change",this.tableConfig.data)
      },
       insertNode(arr){
        // console.log("tree2",this.deptTree)
        // console.log("arr1",arr)
          arr.map(async(item)=> {
            if (item.childNode.length) {
              this.insertNode(item.childNode)
            } else {
              let res = await this.getUserList(item.id)
              item.childNode=res
            }
          })
          return arr;
      }
    },
    created(){

    },
    mounted(){
      this.getDepartmentTree()
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

