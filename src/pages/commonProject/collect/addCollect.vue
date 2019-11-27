<template>
  <div class="add-collect">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>人工采集</span>
    </div>
    <el-form
      ref="collectForm"
      :rules="rules"
      :model="collectForm"
      label-position="right"
      label-width="120px"
    >
      <el-form-item label="能源类型" prop>
        <el-select v-model="collectForm.catalogId" @change="onEnergyChange">
          <el-option
            v-for="(item,index) in energyList"
            :label="item.text"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分项类别" prop="region">
        <el-select v-model="collectForm.childId">
          <el-option
            v-for="(item,index) in childEnergyList"
            :label="item.text"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="collectForm.tableRadio" @change="agreeChange">
          <el-radio :label="0">智能表</el-radio>
          <el-radio :label="1">非智能表</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设备表" prop="region">
        <el-select v-model="collectForm.deviceTableId" filterable placeholder="请选择">
          <el-option
            v-for="item in deviceTableList"
            :key="item.id"
            :label="item.caption"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入时间">
        <el-date-picker
          v-model="collectForm.time"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="数值" prop="positiveNumber">
        <el-input v-model="collectForm.positiveNumber" placeholder="请输入正数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('collectForm')">确定</el-button>
        <el-button @click="goBack" class="go-back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/commonApi";
import ZoomModal from "../../../components/zoomModal/index";
export default {
  name: "AddCollect",
  components: {
    ZoomModal
  },
  props: ["curMeterId", "isEdit"],
  data() {
    return {
      collectForm: {
        catalogId: "",
        childId: "",
        deviceTableId: "",
        time: "",
        positiveNumber: "",
        tableRadio: 0,
      },
      rules: {
        positiveNumber: [
          { min: 0, message: "请输入正数", trigger: "blur" },
          {
            validator(rule, value, callback) {
              let regNumer = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
              if (regNumer.test(value)) {
                callback();
              } else {
                callback(new Error("请输入正整数"));
              }
            },
            trigger: "blur"
          }
        ]
      },
      energyList: [],
      childEnergyList: [],
      deviceTableList: []
    };
  },
  computed: {
    rowData() {
      return this.$route.query;
    },
  },
  watch: {},
  methods: {
    async getEnergyList() {
      let res = await CommonApi.getEnergyListAll({
        catalogId: 2200
      });
      let tmp = [];
      res.map(item => {
        tmp.push(item);
      });
      this.energyList = res;
      this.childEnergyList = res[0].nodes;
      this.collectForm.catalogId = res[0].id;
      this.collectForm.childId = res[0].nodes[0].id;
    },
    async getProbe(val) {
      let res = await CommonApi.getProbe({
        type: val
      });
      if (res) {
        this.deviceTableList = res;
      }
    },
    agreeChange: function() {
      this.getProbe(this.collectForm.tableRadio);
    },
    onEnergyChange(val) {
      let tmp = this.energyList.find(item => {
        return item.id == val;
      });
      this.childEnergyList = tmp.nodes;
      this.collectForm.childId = tmp.nodes ? tmp.nodes[0].id : "";
    },
    async insertHandInput() {
      let params = [
        {
          lookTime: this.collectForm.time,
          value: this.collectForm.positiveNumber,
          monitor: this.collectForm.deviceTableId
        }
      ];
      let res = await CommonApi.insertHandInput(params);
      if(res.result == true) {
        this.$message({
            type: 'success',
            message: '添加成功!'
         });
        //  this.$router.push('/manMadeCollectList')
        this.$router.go(-1)
         
      }
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.insertHandInput();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack() {
      // this.$parent.showAdd = false;
      this.$router.go(-1)
    },
    editList(){
      if(this.rowData) {
        this.collectForm.time = this.rowData.lookTime
        this.collectForm.positiveNumber = this.rowData.value
        this.collectForm.deviceTableId = this.rowData.monitor
      }
    }
  },
  mounted() {
    this.getEnergyList();
    this.getProbe(0);
    this.editList()
    console.log('rowData',this.rowData)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.add-collect {
  // margin-top: 85px;
  padding: 0 20px;
  .tip {
    height: 66px;
    border-bottom: 1px solid #eaeaea;
    .icon {
      width: 2px;
      height: 24px;
      background: #01465c;
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      font-size: 24px;
      color: #01465c;
    }
  }
  .el-form {
    width: 50%;
    margin: 30px auto;
  }
  .el-input {
    width: 400px;
  }
  /*.go-back{*/
  /*background: #ecf5ff;*/
  /*color:#3a8ee6;*/
  /*border-color:#c6e2ff;*/
  /*}*/
}
</style>
