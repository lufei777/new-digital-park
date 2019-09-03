<template>
  <div class="edit-meter">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>编辑表计</span>
    </div>
    <el-form label-position="right" label-width="80px" ref="meterForm">
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
        <el-input v-model="meterForm.transform"></el-input>
      </el-form-item>
      <el-form-item label="警告条件表达式">
        <el-input v-model="meterForm.warn_cond"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="meterForm.warn_cond"></el-input>
      </el-form-item>
      <el-form-item label="能耗类型">
        <el-input v-model="meterForm.warn_cond"></el-input>
      </el-form-item>
      <el-form-item label="分项表达式">
        <el-input v-model="meterForm.itemizeExpression"></el-input>
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
    props:['curTableData'],
    data () {
      return {
        meterForm:{
          caption:'',
          name:'',
          memo:'',
          catalogId:'',
          time_interval:'',
          warn_cond:'',
          itemizeExpression:''
        }
      }
    },
    methods: {
    },
    async mounted(){
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
    background: #eaeff3;
  }
</style>
