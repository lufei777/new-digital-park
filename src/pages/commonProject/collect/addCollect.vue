<template>
  <div class="add-collect panel-container">
    <div class="panel">
      <div class="tip flex-align">
        <span>{{tipText}}</span>
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
          <el-select v-model="collectForm.childId" @change="onChildChange">
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
        <el-form-item label="设备表" prop="deviceTableId">
          <el-select v-model="collectForm.deviceTableId" filterable placeholder="请选择">
            <el-option
              v-for="item in deviceTableList"
              :key="item.id"
              :label="item.caption"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入时间" prop="time">
          <el-date-picker
            v-model="collectForm.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="数值" prop="positiveNumber">
          <el-input v-model="collectForm.positiveNumber" placeholder="请输入正数">
             <template slot="append">{{unit}}</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('collectForm')">确定</el-button>
          <el-button @click="goBack" class="go-back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/common";
export default {
  name: "AddCollect",
  components: {},
  props: ["curMeterId", "isEdit"],
  data() {
    return {
      unit: "kwh",
      collectForm: {
        catalogId: "",
        childId: "",
        deviceTableId: "",
        time: "",
        positiveNumber: "",
        tableRadio: 0
      },
      rules: {
        positiveNumber: [
          {
            required: true,
            min: 0,
            message: "请输入正数",
            trigger: "change"
          },
          {
            validator(rule, value, callback) {
              let regNumer = /^(0|[1-9][0-9]*)(\.\d+)?$/;
              if (regNumer.test(value)) {
                callback();
              } else {
                callback(new Error("请输入正数"));
              }
            },
            trigger: "change"
          }
        ],
        deviceTableId: [
          { required: true, message: "请选择设备表", trigger: "change" }
        ],
        time: [{ required: true, message: "请选择录入时间", trigger: "change" }]
      },
      energyList: [],
      childEnergyList: [],
      deviceTableList: [],
      deviceFalg: true
    };
  },
  computed: {
    tipText() {
      return this.rowData ? "编辑采集" : "添加采集";
    },
    rowData() {
      return this.$route.query.rowData;
    }
  },
  methods: {
    async getEnergyList() {
      let res = await CommonApi.getEnergyListAll({
        catalogId: 2200
      });
      this.energyList = res;
      this.childEnergyList = res[0].nodes;
      this.unit = res[0].unit
      this.collectForm.catalogId = res[0].id;
      this.collectForm.childId = res[0].nodes[0].id;
    },
    async getProbe() {
      let res = await CommonApi.getProbe({
        type: this.collectForm.tableRadio,
        energyType: this.collectForm.catalogId,
        subitemType: this.collectForm.childId
      });
      // if(res){

      // }
      if (res && res.length > 0) {
        this.deviceTableList = res;
        if (!this.rowData) {
          this.collectForm.deviceTableId = res[0].id;
        } else if (this.rowData && this.deviceFalg == false) {
          this.collectForm.deviceTableId = res[0].id;
        }
      } else {
        this.deviceTableList = [];
        this.collectForm.deviceTableId = "";
      }
    },
    async findHandInputById() {
      let res = await CommonApi.findHandInputById({
        id: this.rowData.id
      });
      if (res && this.deviceFalg == true) {
        console.log("positiveNumber",typeof res.value)
        this.collectForm.catalogId = res.parentId;
        this.collectForm.childId = res.childId;
        this.collectForm.deviceTableId = res.monitor;
        this.collectForm.time = res.lookTime;
        this.collectForm.positiveNumber = res.value + '';
      }
      this.getEnergyList();
    },
    agreeChange: function() {
      this.getProbe();
    },
    onEnergyChange(val) {
      let tmp = this.energyList.find(item => {
        return item.id == val;
      });
      this.unit = tmp.unit
      this.childEnergyList = tmp.nodes;
      this.collectForm.childId = tmp.nodes ? tmp.nodes[0].id : "";
      this.getProbe();
    },
    onChildChange(val) {
      this.deviceFalg = false;
      this.getProbe();
    },
    async insertHandInput() {
      let params = [
        {
          lookTime: this.collectForm.time,
          value: this.collectForm.positiveNumber,
          monitor: this.collectForm.deviceTableId
        }
      ];
      let res;
      if (this.rowData) {
        res = await CommonApi.updateHandInput({
          id: this.rowData.id,
          lookTime: this.collectForm.time,
          value: this.collectForm.positiveNumber,
          monitor: this.collectForm.deviceTableId
        });
      } else {
        res = await CommonApi.insertHandInput(params);
      }
      if (res.result == true) {
        this.$message({
          type: "success",
          message: this.rowData ? "修改成功！" : "添加成功！"
        });
        this.$router.go(-1);
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
      this.$router.go(-1);
    }
  },
  async mounted() {
    if (this.rowData) {
      await this.findHandInputById();
    } else {
      await this.getEnergyList();
    }
    await this.getProbe();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.add-collect {
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
