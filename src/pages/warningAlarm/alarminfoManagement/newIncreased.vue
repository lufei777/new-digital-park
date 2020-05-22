<template>
<!-- 报警信息处理 -->
  <div class="message-device-manage panel-container">
      <!-- 上半部分 -->
    <div class="p_top">
      <z-form
        :ref="formData.ref"
        :options="formData"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >

      <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="onClickSearchBtn(obj)">查询</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">重置</el-button>
          </div>
      </template>
      </z-form>
    </div>
  </div>
</template>

<script>
// 导入配置的字典====根据需要导入自己的配置

  import CommonFun from "@/utils/commonFun";
  import { WarningAlerm } from "utils/dictionary";
//导入字典中的定义的字段
// 报警级别
const  alarmLevel = WarningAlerm.alarmLevel;
// 报警状态
const alarmStatus = WarningAlerm.alarmStatus;
// 子系统
const subSystem = WarningAlerm.subSystem;
// 设备类型
const deviceType = WarningAlerm.deviceType
// 报警类型
const alarmType = WarningAlerm.alarmType
// 设备名称
const deviceName = WarningAlerm.deviceName;
// 设备点位
const equipmentSite = WarningAlerm.equipmentSite;
  export default {
    name: "areaManage",
    data() {
      return {
        model: {},
        formData: {
          ref: "formData",
          labelWidth: "100",
          size: "medium",
          menuPosition: "right",
          menuBtn: false,
          // labelPosition: "left",
          forms: [
              //   子系统
              {
                  type:'select',
                  label:'子系统',
                  span:6,
                  offset:8,
                  prop:'subSystem',
                  dicData:subSystem
              },
                // 设备名称
                {
                    type:'select',
                    label:'设备名称',
                    span:6,
                    offset:8,
                    prop:'deviceName',
                    dicData:deviceName
                },
                //设备点位
                 {
                    type:'select',
                    label:'设备点位',
                    span:6,
                    offset:8,
                    prop:'equipmentSite',
                    dicData:equipmentSite
                },
                //   报警名称
                {
                    type:'input',
                    label:'报警名称',
                    prop:'name',
                    placeholder: "请输入关键字",
                    clearable: true,
                    span: 6,
                    offset:8,
                    minRows: 0

                },
                 //  开始时间
                {
                    type:'time',
                    label:'开始时间',
                    clearable: true,
                    prop:'startTime',
                    span: 6,
                    offset:8,
                    minRows: 0

                },
                // 报警描述
                {
                    type:'input',
                    label:'报警描述',
                    clearable: true,
                    prop:'alarmDescribe',
                    span: 6,
                    offset:8,
                    minRows: 0

                },
            // 报警级别
              {
                type:'select',
                label:'报警级别',
                prop:'alarmLevel',
                span:6,
                offset:8,
                dicData:alarmLevel,
              },
            //报警类型
              {
                  type:'select',
                  label:'报警类型',
                  span:6,
                  offset:8,
                //   offset:1,
                  prop:'alarmType',
                  dicData:alarmType
              },
            
           
            {
              prop: "btn",
              span: 6,
              pull: 2,
              offset:9,
              formslot: true
              // width: "34px"
            }
          ]
        }
      };
    },

    methods: {
      submit() {},
      resetChange() {},
      batchDels() {},
      addTenant() {}
    },
    mounted() {
    }
  };
</script>

<style lang="less">
  .message-device-manage {
    .condition-box{
      padding-top:20px;
      margin-bottom: 20px;
    }
    .p_top{
        padding-top:50px;
    }
  }
</style>
