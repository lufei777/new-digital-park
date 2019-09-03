<template>
  <div class="edit-meter">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>编辑表计</span>
    </div>
    <el-form label-position="right" label-width="120px" ref="meterForm">
      <el-form-item label="标题">
        <el-input v-model="meterForm.caption"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="meterForm.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="meterForm.memo"></el-input>
      </el-form-item>
      <el-form-item label="监控类型" prop="region">
        <el-select v-model="meterForm.catalogId">
          <el-option label="电" value="1002"></el-option>
          <el-option label="水" value="4000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监测间隔">
        <el-input v-model="meterForm.time_interval"></el-input>
      </el-form-item>
      <el-form-item label="结果转换表达式">
        <el-input v-model="meterForm.transform" placeholder="如 '#R/1023 * 500'"></el-input>
      </el-form-item>
      <el-form-item label="警告条件表达式">
        <el-input v-model="meterForm.warn_cond" placeholder="如 '#R > 400'"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="meterForm.warn_cond" ></el-input>
      </el-form-item>
      <el-form-item label="能耗类型">
        <el-select v-model="meterForm.catalogId">
          <el-option label="电" value="1002"></el-option>
          <el-option label="水" value="4000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分项表达式">
        <el-input v-model="meterForm.itemizeExpression"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('meterForm')">确定</el-button>
        <el-button @click="goBack" class="go-back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'EditMeter',
    components: {
    },
    props:['curMeterId'],
    data () {
      return {
        meterForm:{
          caption:'',
          name:'',
          memo:'',
          catalogId:"",
          time_interval:'',
          warn_cond:'',
          itemizeExpression:''
        },
        meterDetail:{}
      }
    },
    methods: {
      async getItemMeterDetail(){
        this.meterDetail=await CommonApi.getItemMeterDetail({
          id:this.curMeterId
        })
        this.meterForm={
          caption:this.meterDetail.caption,
          name:this.meterDetail.name,
          memo:this.meterDetail.memo,
          catalogId:this.meterDetail.catalogId+"",
          time_interval:this.meterDetail.time_interval,
          warn_cond:this.meterDetail.warn_cond,
          itemizeExpression:this.meterDetail.itemizeExpression
        }
      },
      submitForm(){},
      goBack(){
        this.$parent.showEdit=false
      }
    },
     mounted(){
      this.getItemMeterDetail()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .edit-meter{
    width:83%;
    padding:10px;
    float: right;
    box-sizing: border-box;
    background: @white;
    .el-form{
      width:50%;
      margin:30px auto;
    }
    .el-input{
      width:60%;
    }
    .go-back{
      background: #ecf5ff;
      color:#3a8ee6;
      border-color:#c6e2ff;
    }
  }
</style>
