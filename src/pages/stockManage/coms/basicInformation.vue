<template>
  <div class="basic-information">
    <div class="module-tip">基本信息：</div>
    <div class="basic-box">
      <el-row>
        <el-col :span="8" :offset="4">
          <label for="">入库类型：</label>
          <span>采购入库</span>
        </el-col>
        <el-col :span="8" :offset="4">
          <label for="">购置日期：</label>
          <span>{{this.detail.buyTime}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="4">
          <label for="">采购人：</label>
          <span>{{this.detail.buyUserName}}</span>
        </el-col>
        <el-col :span="8" :offset="4">
          <label for="">入库日期：</label>
          <span>{{this.detail.stockTime}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="4">
          <label for="">验收人：</label>
          <span>{{this.detail.stockUserName}}</span>
        </el-col>
         <el-col :span="8" :offset="4">
          <label for="">供应商：</label>
          <span>{{this.detail.stockUserName}}</span>
         </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="4">
          <label for="">合同号：</label>
          <span>1600697784187</span>
        </el-col>
        <!--<div>-->
          <!--<label for="">供应商：</label>-->
          <!--<span>京东</span>-->
        <!--</div>-->
     </el-row>

    </div>
  </div>
</template>

<script>
  export default {
    name: "BasicInformation",
    components: { },
    props:['detail'],
    data() {
      return {

      };
    },
    methods: {
    },
    mounted() {
    }
  };
</script>

<style lang="less">
  .basic-information {
    .module-tip{
      font-weight: bold;
      font-size: 16px;
      margin:0 0 20px 0;
      text-align: left;
    }
    .basic-box{
      .el-row{
        width:50%;
        margin:0 auto;
      }
      .el-col{
        margin-bottom:20px;
        /*text-align: center;*/
      }
    }
  }
</style>
