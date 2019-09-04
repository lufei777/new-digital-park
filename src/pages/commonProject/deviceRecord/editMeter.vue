<template>
  <div class="edit-meter">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>编辑表计</span>
    </div>
    <el-form ref="meterForm" :rules="rules" :model="meterForm" label-position="right" label-width="120px" >
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
      <el-form-item label="监测间隔" prop="time_interval">
        <el-input v-model="meterForm.time_interval" placeholder="数字+时/分/秒 如10h/10m/10s"></el-input>
      </el-form-item>
      <el-form-item label="结果转换表达式">
        <el-input v-model="meterForm.transform" placeholder="如 '#R/1023 * 500'"></el-input>
      </el-form-item>
      <el-form-item label="警告条件表达式">
        <el-input v-model="meterForm.warn_cond" placeholder="如 '#R > 400'"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="meterForm.floorName" @focus="showModal"></el-input>
      </el-form-item>
      <el-form-item label="能耗类型">
        <el-select v-model="meterForm.itemizeType">
          <el-option v-for="item in energyList" :key="item.id" :label="item.text" :value="item.id">
          </el-option>
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
    <ZoomModal :showDialog="showDialog"/>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import ZoomModal from '../../../components/zoomModal/index'
  export default {
    name: 'EditMeter',
    components: {
      ZoomModal
    },
    props:['curMeterId','isEdit'],
    data () {
      let timeValidate=function(rule,value,callback){
         let reg=/^[0-9]*[h|m|s]$/
         if(!reg.test(value)){
           callback(new Error('请填入正确的间隔时间'));
         }

      }
      return {
        meterForm:{
          caption:'',
          name:'',
          memo:'',
          catalogId:"",
          time_interval:'',
          warn_cond:'',
          itemizeType:'',
          itemizeExpression:'',
          floorName:''
        },
        rules: {
          time_interval:[{validator: timeValidate, trigger: 'blur' }]
        },
        meterDetail:{},
        energyList:[],
        showDialog:false,
      }
    },
    computed:{
      floor(){
        return {
          id:this.$route.query.id,
          name:this.$route.query.name
        }
      },
    },
    watch:{
      floor(){
        this.meterForm.floorName=this.floor.name
        this.meterForm.parentId=this.floor.id
      },
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
          parentId:this.meterDetail.parentId,
          itemizeType:this.meterDetail.itemizeType,
          itemizeExpression:this.meterDetail.itemizeExpression
        }
      },
      async getEnergyListAll(){
        let res  = await CommonApi.getEnergyListAll({
          catalogId:2200
        })
        let tmp=[]
        res.map((item)=>{
          tmp.push(item)
          item.nodes && item.nodes.map((node)=>{
            tmp.push(node)
          })
        })
        this.energyList=tmp
      },
      showModal(){
        this.showDialog=true
      },
      async submitForm(){
        let res = await CommonApi.updateMeter(this.meterForm)
      },
      goBack(){
        this.$parent.showEdit=false
        if(!this.isEdit){
          this.$parent.showAdd=true
        }
      }
    },
     mounted(){
      this.getEnergyListAll()
       if(this.isEdit){
         this.getItemMeterDetail()
       }
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
