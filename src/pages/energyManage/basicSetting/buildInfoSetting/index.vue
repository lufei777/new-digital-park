<template>
  <div class="build-info-setting panel-container">
    <div class="radius-shadow operator-box flex panel">
      <div class="flex item-group">
        <label for="">建筑物分类：</label>
        <el-input  v-model="searchParams.buildType"/>
      </div>
      <div class="flex item-group">
        <label for="">城市名：</label>
        <el-input  v-model="searchParams.city"/>
      </div>
      <div class="flex item-group">
        <label for="">建筑名称：</label>
        <el-input v-model="searchParams.spaceName" @focus="onShowModal"/>
      </div>
      <div class="flex item-group btn-box">
        <el-button type="primary" @click="onClickSearchBtn">确定</el-button>
        <el-button @click="onClickResetBtn">重置</el-button>
      </div>
    </div>
    <TreeModal :tree-modal-config="treeModalConfig"/>
    <div class="panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">新增</el-button>
      </div>
      <z-table class="custom-table"
               :ref="tableConfig.ref" :options="tableConfig"
               @row-update="rowUpdate"
               @row-edit="rowEdit"
               @row-edit-cancel="rowEditCancel"
      >
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <!--<el-button type="text" @click="rowClick(row)">编辑</el-button>-->
          <el-button type="text" @click="deleteRow(row,$index)">删除</el-button>
        </template>
        <template slot="spaceId" slot-scope="{isEdit,row,column,size,disabled}">
           <z-input
             v-if="isEdit"
             type="tree"
             v-model="row[column.prop]"
             :size="size"
             :disabled="disabled"
             :props="{
               label: 'floor',
               value: 'floorId',
               children: 'nodes'
             }"
             :dic="treeModalConfig.treeList"
             :nodeClick="(...args)=>{ onClickSpaceNode(...args,row,column) }"
           />
          <span v-if="!isEdit">{{row.spaceName}}</span>
        </template>
      </z-table>
    </div>

  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import EnergyApi from '@/service/api/energy'
  import {isZG} from '@/utils/project';
  import TreeModal from '@/components/treeModal/index'
  import CommonFun from '@/utils/commonFun'
  import zTree from '@/components/zvue/components/input/src/input'
  let pageInfo = {
    pageCount: 10
  }
  export default {
    name: "buildInfoSetting",
    components: {
      TreeModal,
      zTree
    },
    data() {
      let _this = this
      let checkArea = (rule, value, callback) => {
        // console.log('value',value)
        if((value+'').trim()=='' || value===null){
          return callback({message: `请输入建筑面积`});
        }else if ((!Number(value) || value < 0) && value!=0) {
          return callback({message: "建筑面积：请输入正数"});
        }
        return callback();
      };
      let checkInput = (rule, value, callback) => {
        // console.log('value1',value,value!==null)
        let str = rule.field=='person'?'用能人数':rule.field=='floor'?'建筑层数':'房间数量'
        if((value+'').trim()=='' || value===null){
          return callback({message: `请输入${str}`});
        }else if ((!Number(value) || value < 0) && value!=0 || Math.floor(value) != value) {
          return callback({message: `${str}：请输入正整数`});
        }
        return callback();
      };

      return {
        dateTypeList: [{
          value: 1,
          label: '全天'
        }, {
          value: 2,
          label: '夜间'
        }],
        energyList: [],
        treeModalConfig: {
          treeList: [],
          treeConfig: {
            treeProps: {
              label: "floor",
              children: 'nodes'
            },
            defaultExpandedkeys: [],
            nodeKey:'floorId',
          },
          showModal: false,
          onClickSureBtnCallback: this.onClickModalSureBtn,
          onClickCancelBtnCallback: this.onClickModalCancelBtn
        },
        tableConfig: {
          ref: "tableRef",
          editBtn: true,
          operation: {
            width: 200
          },
          customTop: true,
          data: [],
          props: {
            rowKey: 'id'
          },
          columnConfig: [{
            label: '建筑物分类',
            prop: 'buildType',
            cell:true,
          }, {
            label: '城市名',
            prop: 'city',
            cell:true,
          },
          {
              label: '上级建筑',
              prop: 'parentId',
              cell:true,
              type: "tree",
              props: {
                label: "floor",
                value: "floorId",
                children: "nodes",
              },
              dicData: [],
              disabled:true,
          },
            {
            label: '建筑名称',
            prop: 'spaceId',
            cell:true,
            slot:true,
            disabled:false,
            // type: "tree",
            // props: {
            //   label: "floor",
            //   value: "floorId",
            //   children: "nodes",
            // },
            // dicData: [],
            // nodeClick:_this.onClickSpaceNode,
          }, {
            label: '建筑面积（㎡）' ,
            prop: 'area',
            cell:true,
            rules: {
              validator: checkArea,
            },
          }, {
            label: '用能人数（人）',
            prop: 'person',
            cell:true,
            rules: {
              validator: checkInput,
            },
          },{
            label: '建筑层数（层）',
            prop: 'floor',
            cell:true,
            rules: {
              validator: checkInput,
            },
          },{
            label: '房间数量（间）',
            prop: 'room',
            cell:true,
            rules: {
              validator: checkInput,
            },
          }],
          uiConfig: {
            height: "auto",
            selection: true,
            showIndex: {
              handler: function (index) {
                return _this.setIndex(index);
              }
            },
            pagination: {
              handler(pageSize, currentPage, table) {
                _this.handleCurrentChange(currentPage)
              }
            },
          },
          tableMethods: {
            selectionChange: _this.selectionChange
          }
        },
        curPage: 1,
        searchParams: {
          buildType: '',
          city:'',
          spaceId: '',
          spaceName: ''
        },
        deleteArr:[],

      };
    },
    computed: {},
    methods: {
      async getAllFloorOfA3() {
        let res = await CommonApi.getAllFloorOfA3()
        this.treeModalConfig.treeList = res
        this.treeModalConfig.treeConfig.defaultExpandedkeys = [res[0].floorId]
        // this.searchParams.spaceName = res[0].floor
        // this.searchParams.spaceId = res[0].floorId
        // this.$refs[this.tableConfig.ref].setColumnByProp("spaceId", {
        //   dicData: res
        // });
        this.$refs[this.tableConfig.ref].setColumnByProp("parentId", {
          dicData: res
        });
      },
      async getBuildInfoList(){
        let params = {
          ...{
            pageNum: this.curPage
          }, ...this.searchParams
        }
        let res = await EnergyApi.getBuildInfoList(params)
        res.list.map((item)=>{
          item.$cellEdit=item.isEdit==0?false:true
        })
        this.tableConfig.data = res.list
        this.tableConfig.uiConfig.pagination.total = res.total
      },
      onShowModal() {
        this.treeModalConfig.showModal = true
      },
      onClickModalSureBtn(val) {
        this.searchParams.spaceId = val.floorId
        this.searchParams.spaceName = val.floor
        this.treeModalConfig.showModal = false
      },
      onClickModalCancelBtn() {
        this.treeModalConfig.showModal = false
      },
      async rowUpdate(data, index, callback) {
        if(!data.spaceId){
          this.$message({
            type: 'warning',
            message: '请选择建筑名称'
          })
          return;
        }
        let obj={...data,...{isEdit:0}}
        if(data.flag){
          await EnergyApi.addBuildInfo(obj)
        }else{
          await EnergyApi.updateBuildInfo(obj)
        }
        this.getBuildInfoList()
        callback()
      },
      async rowEdit(obj) {
        if(!this.checkCanEdit()){
          // console.log(this.tableConfig.data)
          obj.$cellEdit=false
          return;
        }
        this.$refs[this.tableConfig.ref].setColumnByProp("spaceId", {
          disabled:true
        });
        await EnergyApi.updateBuildInfo({...obj,...{isEdit:1}})
        this.getBuildInfoList()
      },
      async rowEditCancel(obj) {
        obj.$cellEdit=false
        if(!obj.flag) {
          await EnergyApi.updateBuildInfo({...obj, ...{isEdit: 0}})
        }
        this.getBuildInfoList()
      },
      onClickMultiDelBtn() {
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        if (!tmp.length) {
          this.$message({
            type: 'warning',
            message: '请至少选择一条数据'
          })
          return;
        }
        // console.log("tmp", tmp)
        CommonFun.deleteTip(this,true,'确定要删除吗？',()=>this.sureMulDelete(tmp))
      },
      onClickAddBtn(){
        if(!this.checkCanEdit()) return ;
        let obj = {
          id:-1,
          spaceId: '',
          spaceName: '',
          city: '',
          buildType: '',
          area: null,
          person:null,
          floor: null,
          room: null,
          flag:true,  //代表是新增的
          $cellEdit:true,
          isEdit:1
        }
        // this.$refs['tableRef'].rowCellAdd(obj)
        this.tableConfig.data.unshift(obj)
        this.tableConfig.uiConfig.pagination.total = this.tableConfig.uiConfig.pagination.total+1
        this.$refs[this.tableConfig.ref].setColumnByProp("spaceId", {
          disabled:false
        });
      },
      setIndex(index) {
        return pageInfo.pageCount * (this.curPage - 1) + index + 1
      },
      handleCurrentChange(page) {
        this.curPage = page
        this.getBuildInfoList()
      },
      onClickSearchBtn() {
        this.getBuildInfoList()
        this.$refs[this.tableConfig.ref].setColumnByProp("spaceId", {
          disabled:false
        });
      },
      onClickResetBtn(){
        this.searchParams = {
          buildType: '',
          city:'',
          spaceId: '',
          spaceName: ''
        }
        this.getBuildInfoList()
      },
      deleteRow(row,index){
        this.deleteArr=[row.spaceId]
        CommonFun.deleteTip(this,true,'确定要删除吗？',()=>this.sureDelete(row,index))
      },
      async sureDelete(row,index){
        if(!row.flag){
          await EnergyApi.deleteBuildInfo(this.deleteArr)
        }
        this.getBuildInfoList()
      },
      async sureMulDelete(arr){
        let arr2=[]
        arr.map((item)=>{
          if(!item.flag){
            arr2.push(item)
          }
        })
        let delArr = arr2.map((item)=>item.spaceId)
        await EnergyApi.deleteBuildInfo(delArr)
        this.getBuildInfoList()
      },
      onClickSpaceNode(...args){
        this.tableConfig.data[args[3].$index].parentId = args[0].parentId==0?null:args[0].parentId
      },
      checkCanEdit(){
        let tmp = this.tableConfig.data.find((item)=>{
          return item.isEdit==1
        })
        if(tmp){
          this.$message({
            type:'warning',
            message:'请先将数据补充完整'
          })
          return false;
        }else{
          return true;
        }
      }
    },
    async mounted() {
      await this.getAllFloorOfA3()
      this.getBuildInfoList()
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .build-info-setting {
    .operator-box {
      padding: 20px;
    }

    .btn-box {
      .el-button {
        margin-right: 10px;
      }
    }
  }
</style>
