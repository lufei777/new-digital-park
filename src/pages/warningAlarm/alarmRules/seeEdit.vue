<template>
  <!-- 报警信息处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class="condition-box radius-shadow panel">

      <z-form
        v-model="model"
        :ref="formData.ref"
        :options="formData"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              type="primary"
              v-if='!model.flag'
              @click="onClickSearchBtn(obj)"
            >确认</el-button>
            <el-button
            type="primary"
              @click="goBack"
            >返回</el-button>
          </div>
        </template>
      </z-Form>
    </div>

  </div>
</template>

<script>
//导入字典中的定义的字段
import { WarningAlerm } from "utils/dictionary";
// 导入接口
import warningAlarm from "@/service/api/warningAlarm";
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 报警状态
const alarmStatus = WarningAlerm.alarmStatus;
// 子系统
const subSystem = WarningAlerm.subSystem;
// 设备类型
const deviceType = WarningAlerm.deviceType;
// 报警类型
const alarmType = WarningAlerm.alarmType;
// 录入类型
const inputType = WarningAlerm.inputType;
// 通知方式
const notificationWay = WarningAlerm.notificationWay;
// 设备名称
const deviceName = WarningAlerm.deviceName
export default {
  name: "seeDetails",
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        textMode: false,
        // disabled: true,
        // labelPosition: "left",
        forms: [
          //子系统
          {
            type: "select",
            label: "子系统",
            placeholder: " ",
            prop: "system",
            span: 10,
            disabled:true,
            // row:true,
            offset: 1,
            dicData:subSystem
          },
          // 设备类型
          {
            type: "select",
            label: "设备类型:",
            placeholder: " ",
            prop: "deviceCatalogName",
            span: 10,
            offset: 1,
            dicData:deviceType
          },
          // 设备名称
          {
            type: "select",
            label: "设备名称",
            placeholder: " ",
            prop: "parentCaption",
            span: 10,
            offset: 1,
            dicData:deviceName
          },
          // 点位类型
          {
            type: "input",
            label: "点位类型",
            placeholder: " ",
            prop: "monitorCatalogName",
            span: 10,
            offset: 1
          },
          // 报警规则
          {
            type: "input",
            label: "报警规则",
            placeholder: " ",
            prop: "singlewarn",
            span: 10,
            offset: 1
            // dicData:
          },
          // 报警级别
          {
                type: "select",
                label: "报警级别",
                prop: "eventRank",
                span: 10,
                offset: 1,
                row: true,
                // dicData: alarmLevel
                dicUrl: warningAlarm.geteventRanks,
                dicMethod: "get",
                props: {
                  label: "rankName",
                  value: "rankId"
                }
              },
          // 通知方式
          {
            type: "select",
            label: "通知方式",
            placeholder: " ",
            prop: "notify",
            span: 10,
            offset: 1,
            dicData:notificationWay

          },
          // 录入类型 暂时未提供
          {
            type: "select",
            label: "录入类型",
            placeholder: " ",
            prop: "removed",
            span: 10,
            offset: 1,
            dicData:inputType
          },
          // 按钮
          {
            prop: "btn",
            span: 12,
            pull: 2,
            offset: 6,
            formslot: true
          }
        ]
      }
    };
  },
  created() {
    var arrQuery = this.$route.query
    if(arrQuery.flag){
      this.formData.textMode = arrQuery.flag
      this.model = {...arrQuery}
    }else{
      this.model = {...arrQuery}
    }
    // console.log(arrQuery)
  },
  methods: {
    // 返回
    goBack(){
      this.$router.back()
    },
    submit() {},
    resetChange() {},

    batchDels() {},
    addTenant() {},
    // 确认按钮
    onSubmit() {
      // 单击确认按钮将派单按钮显示，应答和返回按钮隐藏掉
      console.log("submit!");
      this.dis = true;
      //关闭对话框
      this.dialogFormVisible = false;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped >
.message-device-manage {
  .condition-box {
    padding-top: 20px;
    margin-bottom: 20px;
    display: inline-block;
    //
    /deep/.el-input__inner {
      // border: 0px;
      background-color: #ffffff;
    }
    .form {
      width: 80%;
      margin: 0 auto;
      .el-tooltip {
        width: auto;
      }
      //
      .el-dialog {
        .content {
          margin-top: 0;
          .title {
            padding: 0 20px;
            display: flex;
            justify-content: space-between;

            // margin: 15px 0;
            /deep/.el-input__inner {
              border: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
}
.flex-row-reverse {
  flex-direction: row;
}
// 对话框

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
