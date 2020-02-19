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
          callback(new Error("请输入领用数量"));
        }else if(value==0){
          callback(new Error("最小领用数量为1"));
        }else if((!Number(value) || value<0)){
          callback(new Error("请输入正数"));
        }else if(value>_this.curDetail.quantity){
          callback(new Error("领用数量应小于等于入库数量"));
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
            label:'领用人',
            prop:'userName',
            cell:true,
            type: "cascader",
            showAllLevels: false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
              lazy: true,
              lazyLoad: async function(node, resolve) {
                const { level, data } = node;
                let nodes = [];
                if (level == 0) {
                  _this.getDepartmentTree().then(_ => {
                    resolve(_this.deptTree);
                  });
                } else if (level === 2) {
                  let res = await _this.getUserList(node.data.id);
                  nodes = res;
                  resolve(nodes);
                }
                resolve([]);
              }
            },
          },{
            label:'规格型号',
            prop:'specification'
          },{
            label:'库存数量',
            prop:'quantity'
          },{
            label:'领用数量',
            prop:'num2',
            cell:true,
            // rules: {
            //   required: true,
            //   validator: checkQuantity,
            //   trigger: "blur",
            //   // message:'请填写22222'
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
      }
    },
    methods: {
      onClickAddBtn(){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let obj={
             id:_.uniqueId(),
             date:moment(new Date()).format('YYYY-MM-DD'),
             applyUser:userInfo.fullName,
             name:'',
             userName:'',
             specification:'',
             quantity:'',
             num2:'',
             description:'',
             flag:false
          }
        // this.$refs['tableRef'].rowCellAdd(obj)
        this.tableConfig.data.push(obj)
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
      },
      onGetAssetDetail(val) {
        console.log("curRow",this.curDetail)

        let obj={...this.curDetail,...val,...{flag:true}}
        this.showSearchModal = false
        this.tableConfig.data.splice(this.curRowIndex,1,obj)
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
    },
    mounted(){
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

