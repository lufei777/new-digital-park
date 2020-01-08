<template>
  <div class="apply-coms">
    <div class="tip">基本信息：</div>
    <div class="form-box">
      <miForm
        :ref="formConfig.ref"
        :options="formConfig"
        v-model="model"
      >
      </miForm>
    </div>
  </div>
</template>

<script>
  import miForm from "@/components/Form";
  import miTable from "@/components/Table";
  import CommonFun from "../../../utils/commonFun";
  import {StockDic} from "@/utils/dictionary";
  import AssetManageApi from '@/service/api/assetManageApi'
  export default {
    name: "WarehouseManage",
    components: { miForm, miTable },
    data() {
      return {
        model: {},
        formConfig:{
          ref:'formRef',
          emptyBtn:false,
          forms: [{
            type: "select",
            label: "入库类型",
            prop: "type",
            dicData:StockDic.stockInApply,
            valueDefault:1,
            span: 10,
          },{
            type: "date",
            label: "购置日期",
            prop: "buyDate",
            span: 10,
            offset:4
          },{
            type: "tree",
            label: "采购人",
            prop: "buyer",
            props: {
              label: "name",
              value: "id",
              children: "childNode"
            },
            span: 10,
          },{
            type: "date",
            label: "入库日期",
            prop: "inDate",
            span: 10,
            offset:4
          }]
        },
        deptTree:[],
      };
    },
    methods: {
      async getDepartmentTree() {
        let res = await AssetManageApi.getDepartmentTree();
        // this.deptTree = res;
        this.$refs[this.formConfig.ref].setColumnByProp("buyer", {
          dicData: res
        });
      },
    },
    mounted() {
      this.getDepartmentTree();
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
}
</style>
