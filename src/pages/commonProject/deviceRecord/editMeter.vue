<template>
  <div class="edit-meter radius-shadow">
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
        <el-select v-model="meterForm.catalogId" @change="onEnergyChange">
          <el-option label="电" :value="1002"></el-option>
          <el-option label="水" :value="4000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="能耗类型">
        <el-select v-model="meterForm.itemizeType">
          <el-option v-for="item in energyList" :key="item.id" :label="item.text" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监控位置">
        <el-input v-model="meterForm.monitorName" @focus="showTreeModal(1)"></el-input>
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
      <el-form-item label="安装位置">
        <el-input v-model="meterForm.floorName" @focus="showTreeModal(2)"></el-input>
      </el-form-item>
      <el-form-item label="分项表达式">
        <el-input v-model="meterForm.itemizeExpression"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('meterForm')">确定</el-button>
        <el-button @click="goBack" class="go-back">返回</el-button>
      </el-form-item>
    </el-form>
    <TreeModal :showDialog="showDialog" :treeList="treeList" :tree-config="treeConfig"
               :on-click-sure-btn-callback="onClickModalSureBtn"
               :onClickCancelBtnCallback="onClickModalCancelBtn"
    />
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import ZoomModal from '../../../components/zoomModal/index'
  import MeterModal from './coms/meterTree'
  import TreeModal from '../../../components/treeModal/index'
  export default {
    name: 'EditMeter',
    components: {
      ZoomModal,
      MeterModal,
      TreeModal
    },
    props:[],
    data () {
      let timeValidate=function(rule,value,callback){
         let reg=/^[0-9]*[h|m|s]$/
         if(!reg.test(value)){
           callback(new Error('请填入正确的间隔时间:数字+时/分/秒 如10h/10m/10s'));
         }
      }
      return {
        meterForm:{
          caption:'',
          name:'',
          memo:'',
          catalogId:1002,
          time_interval:'',
          warn_cond:'',
          itemizeType:'',
          itemizeExpression:'',
          floorName:'',
          monitorName:''
        },
        rules: {
          time_interval:[{validator: timeValidate, trigger: 'blur' }]
        },
        meterDetail:{},
        energyList:[],
        showDialog:false,
        showMonitor:false,
        treeConfig:{
          defaultExpandedkeys:[],
        },
        treeList:[],
        spaceList:[]
      }
    },
    computed:{
      curMeterId(){
        return this.$route.query.meterId
      }
    },
    watch:{
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
          catalogId:this.meterDetail.catalogId,
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
        if(this.meterForm.catalogId==1002){
          tmp.push(res[0])
          res=res[0]
        }else if(this.meterForm.catalogId==4000){
          tmp.push(res[1])
          res=res[1]
        }
        res.nodes && res.nodes.map((node)=>{
          tmp.push(node)
        })
        this.energyList=tmp
        this.meterForm.itemizeType=tmp[0].id
      },
      onEnergyChange(){
        this.getEnergyListAll()
      },
      async getAssetAllTree(){
        let res =  await CommonApi.getAssetAllTree({
          flag: "space",
          locationRoot: 1
        })
        this.spaceList = res
      },
      async getMeterTree(){
        let res = await CommonApi.getMeterTree({
          parentMeter: 0,
          catalogId:this.enegyId
        })
        this.monitorList=res
      },
      showTreeModal(flag){
        if(flag==1){
          this.treeList=this.monitorList
          this.treeConfig.defaultExpandedkeys=[this.monitorList[0].id]
        }else if(flag==2){
          this.treeList=this.spaceList
          this.treeConfig.defaultExpandedkeys=[this.spaceList[0].id]
        }
        this.showDialog=true
      },
      onClickModalSureBtn(val){
        if(this.flag==1){
          this.meterForm.parentMeter = val.id
          this.meterForm.monitorName=val.text
        }else{
          this.meterForm.floorName=val.text
          this.meterForm.parentId=val.id
        }
        this.showDialog=false
      },
      onClickModalCancelBtn(){
        this.showDialog=false
      },
      async submitForm(){
        console.log(this.meterForm)
        let res = await CommonApi.updateMeter(this.meterForm)
      },
      goBack(){
        history.go(-1)
      },
    },
    async mounted(){
       await this.getEnergyListAll()
       this.getItemMeterDetail()
       this.getAssetAllTree()
       this.getMeterTree()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .edit-meter{
    background: @white;
    padding:20px;
    .el-form{
      width:50%;
      margin:30px auto;
    }
    .el-input{
      width:60%;
    }
  }
</style>
