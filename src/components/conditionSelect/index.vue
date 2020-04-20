<template>
  <div class="condition-select flex-align radius-shadow">
     <div class="item-group" v-if="showEnergy">
        <label>能源：</label>
        <el-select v-if="!isGroup" v-model="curEnergyId" placeholder="请选择" @change="handleEnergyChange" >
           <el-option v-for="item in energyList" :key="item.id" :label="item.name" :value="item.id">
           </el-option>
        </el-select>
       <el-select v-if="isGroup" v-model="curEnergyId" multiple @change="handleEnergyChange">
         <el-option-group v-for="group in energyList" :key="group.id" :label="group.name" :disabled="group.disabled">
           <el-option
             v-for="item in group.energyType"
             :key="item.id"
             :label="item.name"
             :value="item.id">
           </el-option>
         </el-option-group>
       </el-select>
     </div>
     <div class="item-group">
      <label>时间类型：</label>
      <el-select v-model="curDateType" placeholder="请选择" @change="handleDateTypeChange">
        <el-option v-for="item in dateTypeList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="item-group">
      <el-radio-group v-model="radio" @change="handleRadioChange">
        <el-radio label="0">单个</el-radio>
        <el-radio label="1">范围</el-radio>
      </el-radio-group>
    </div>
    <div style="flex-shrink: 0" class="flex item-group">
      <div>
        <label>时间：</label>
        <el-date-picker v-model='startTime' :type="dateType"
                        @change="handleStartTimeChange" :clearable="false">
        </el-date-picker>
      </div>
      <div v-show="showLastTime">
        <span class="tag-style">至</span>
        <el-date-picker v-model='lastTime' :type="dateType"
                        @change="handleLastTimeChange" :clearable="false">
        </el-date-picker>
      </div>
    </div>

    <el-button type="primary" class="sure-btn" @click="handleClickSureBtn">确定</el-button>
  </div>
</template>

<script>
  let dateTypeList = [{
    name:'年',
    id:1
  },{
    name:'月',
    id:2
  },{
    name:'日',
    id:3
  }]

  import {mapState} from 'vuex'
  import moment from 'moment'
  import CommonApi from '../../service/api/common'
  export default {
    name:'ConditionSelect',
    components: {
    },
    //fromFlag 1:空间对比 2:同比环比分析 3:能耗对比 4:分时能耗 5:分项能耗
    props:['isGroup','showEnergy','fromFlag','getDataFlag'],
    data () {
      let curSystem = window.czSystemConfig.curSystem
      return {
        energyList:[],
        // dateTypeList,
        curEnergyId:[],
        curDateType:2,
        dateType:'month',
        radio:'0',
        // startTime:moment(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000*10)).format("YYYY-MM"),
        startTime:curSystem=='zg'?moment().format('YYYY-MM'):"2019-02",
        lastTime:'',
        showLastTime:false,
        curEnergy:[]
      }
    },
    computed: {
      dateTypeList(){
          return [{
            name:'年',
            id:1
          },{
            name:'月',
            id:2
          },{
            name:'日',
            id:3
          }]
      }
    },
    watch:{
      async getDataFlag(){
        if(this.getDataFlag){
            await this.getEnergyList()
            this.handleClickSureBtn()
        }
      }
    },
    methods: {
      async getEnergyList(){
        let res = await CommonApi.getEnergyListByGroup()
        if(this.isGroup){
          res.map((item,index)=>{
            item.disabled=false
            if(index!=0){
              item.disabled=true
            }
          })
          this.energyList = res
          this.curEnergyId=[res[0].energyType[0].id,res[0].energyType[1].id]
          this.curEnergy=[res[0].energyType[0],res[0].energyType[1]]
        }else{
          let tmp=[]
          if(window.czSystemConfig.curSystem=='zg'){
            if(this.fromFlag==1 || this.fromFlag==2 || this.fromFlag==4 || this.fromFlag==5 ){
              res.map((item)=>{
                tmp.push(item)
              })
            }
          }else{
            if(this.fromFlag==1){
              res.map((item)=>{
                tmp.push(item)
                item.energyType.map((val)=>{
                  tmp.push(val)
                })
              })
            }else if(this.fromFlag==2 || this.fromFlag==4){
              res.map((item)=>{
                item.energyType.map((val)=>{
                  tmp.push(val)
                })
              })
            }else if(this.fromFlag==5){
              res.map((item)=>{
                tmp.push(item)
              })
            }
          }
           if(this.fromFlag){
             this.energyList = tmp
             this.curEnergyId=tmp[0].id
             this.curEnergy=[{
               id:tmp[0].id,
               name:tmp[0].name
             }]
           }

        }
      },
      handleRadioChange(value){
         this.showLastTime = value==1?true:false
         if(value==0){
              this.lastTime=''
          }else{
              this.lastTime=moment(new Date()).format('YYYY-MM')
          }
      },
      handleDateTypeChange(value){
        this.dateType=value==1?'year':value==2?"month":'date'
        this.timeFormat('startTime',this.startTime)
        this.timeFormat('lastTime',this.lastTime)
      },
      handleEnergyChange(value){
        // console.log(value)
        let tmp=[]
        if(this.isGroup){
          this.energyList.map((itemGroup)=>{
            //不同类不可选
             itemGroup.disabled=false
             if(value.length==0) return;
             let tmpArr = itemGroup.energyType.map((item)=> item.id)
             if(tmpArr.indexOf(value[0])==-1){
               itemGroup.disabled=true
             }
             //存入
             itemGroup.energyType.map((item)=>{
               value.map((val)=>{
                  if(item.id==val){
                    tmp.push(item)
                  }
               })
             })
           })
        }else{
           tmp=this.energyList.filter((item)=>item.id==value)
        }
        this.curEnergy=tmp
      },
      handleStartTimeChange(value){
         this.timeFormat('startTime',value)
      },
      handleLastTimeChange(value){
        this.timeFormat('lastTime',value)
      },
      timeFormat(time,value){
        let formatType = this.dateType =='year'?'YYYY':this.dateType=='month'?'YYYY-MM':'YYYY-MM-DD'
        this[time]=this[time]?moment(value).format(formatType):''
      },
      handleClickSureBtn(){
        let params ={
          energy:this.curEnergy,
          selectType:this.curDateType,
          redioType:this.radio,
          startTime:this.startTime,
          lastTime:this.lastTime
        }
        console.log(params)
        this.$parent.getData && this.$parent.getData(params)
      },
    },
    async mounted(){
    }
  }
</script>

<style lang="less">
  .condition-select {
    background: @white;
    padding:25px 15px;
    flex-flow: wrap;
    .tag-style{
      margin:0 5px;
    }
    .sure-btn{
      margin-left: 10px;
    }
    .el-select{
      width:120px;
    }
    .el-radio{
      margin-right: 20px;
    }
    .el-date-editor.el-input{
      width:150px;
    }

  }
</style>
