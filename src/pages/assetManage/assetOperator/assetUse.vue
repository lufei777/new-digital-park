<template>
  <div class="asset-use panel-container panel">
    <div v-if="!showAdd" class="asset-use-table-panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">添加</el-button>
      </div>
      <zTable :ref="tableConfig.ref" :options="tableConfig" @row-update="rowUpdate">
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
  import moment from 'moment'
  export default {
    name: 'AssetUse',
    components: {
      AddAssetUse,
      SearchAssetModal
    },
    data () {
      let _this = this
      return {
        tableConfig:{
          ref:'tableRef',
          data:[],
          editBtn:true,
          columnConfig:[{
            label:'申请日期',
            prop:'date'
          },{
            label:'申请人',
            prop:'applyUser'
          },{
            label:'领用的资产',
            prop:'name',
            cell:true,
            focus:_this.chooseAsset
          },{
            label:'领用人',
            prop:'userName',
            cell:true
          },{
            label:'规格型号',
            prop:'specification'
          },{
            label:'库存数量',
            prop:'quantity'
          },{
            label:'领用数量',
            prop:'num2',
            cell:true
          },{
            label:'备注',
            prop:'description'
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
        showSearchModal:false
      }
    },
    methods: {
      onClickAddBtn(){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let obj={date:moment(new Date()).format('YYYY-MM-DD'),
                 applyUser:userInfo.fullName,
                 name:'',
                 userName:'',
                 specification:'',
                 quantity:'',
                 num2:'',
                 description:''
        }
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
      rowUpdate(val1,val2,val3){
        console.log(val1,val2,val3)
        val3()
      },
      onGetAssetDetail(val) {
        this.showSearchModal = false
      }
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

