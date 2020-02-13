<template>
  <div class="add-asset-use">
    <div class="add-tip"></div>
    <div class="form-panel">
      <zForm
        :ref="formConfig.ref"
        :options="formConfig"
        v-model="formModel"
        @submit="onSubmit"
      >
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="back(scope)">返回</el-button>
        </template>
      </zForm>
    </div>
    <SearchAssetModal :showSearchModal="showSearchModal"  from-flag="2"/>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  import SystemManageApi from '@/service/api/systemManage'
  import moment from 'moment'
  import SearchAssetModal from '../../stockManage/coms/searchAsset'
  export default {
    name: 'AssetUse',
    components: {
      SearchAssetModal
    },
    props:["goBack"],
    data () {
      let _this = this
      let userInfo =JSON.parse(localStorage.userInfo)
      let checkQuantity = (rule, value, callback) => {
        if ((!Number(value) || value<0)) {
          callback(new Error("请输入正数"));
        } else if(value==0){
          callback(new Error("最小领用数量为1"));
        }else if(value>_this.formModel.quantity){
          callback(new Error("领用数量应小于入库数量"));
        }else{
          callback();
        }
      };
      return {
        formModel:{},
        formConfig:{
          ref:'formRef',
          labelWidth: "100",
          emptyBtn:false,
          forms:[{
            type: "input",
            label: "资产名称",
            prop: "name",
            span: 24,
            focus:_this.onSearchAsset,
            rules:{
              required:true
            }
          },{
            type: "input",
            label: "申请日期",
            prop: "date",
            valueDefault:moment(new Date()).format('YYYY-MM-DD'),
            disabled: true,
            span: 24,
          },{
            type: "input",
            label: "申请人",
            prop: "applyUser",
            valueDefault:userInfo.fullName,
            disabled: true,
            span: 24,
          },{
            type: "cascader",
            label: "领用人",
            prop: "buyId",
            showAllLevels: false,
            span: 24,
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
            rules:{
              required: true,
              message:'请选择领用人',
              trigger: "change",
            },
          },{
            type: "input",
            label: "规格型号",
            prop: "specification",
            span: 24,
            disabled:true,
          },{
            type: "input",
            label: "库存数量",
            prop: "quantity",
            span: 24,
            disabled:true,
          },{
            type: "input",
            label: "领用数量",
            prop: "num2",
            rules: {
              required: true,
              validator: checkQuantity,
              trigger: "blur",
              // message:'请填写22222'
           },
            span: 24,
          },{
            type: "textarea",
            label: "备注",
            prop: "description",
            span: 24,
          }]
        },
        showSearchModal:false
      }
    },
    methods: {
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
        return res;
      },
      onSearchAsset(){
        console.log("start")
        this.showSearchModal=true
      },
      onGetAssetDetail(row){
        this.showSearchModal=false
        this.formModel={...this.formModel,...row}
      },
      onSubmit(){
        this.$parent.addAssetUseDetail &&  this.$parent.addAssetUseDetail(this.formModel)
      },
      back(){
        this.goBack && this.goBack()
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .add-asset-use{
    height:100%;
    .form-panel{
      width:400px;
      margin:0 auto;
    }
  }
</style>

