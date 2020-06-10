<template>
  <!-- 新增--基本设置 -->
      <div
    id="personal-manage"
    class="panel-container"
  >
    <div class="panel">
      <!-- 步骤条 -->
      <div class="step">
        <el-steps
          :active='active'
          align-center
        >
          <el-step title="基本设置"></el-step>
          <el-step title="参数设置"></el-step>
          <el-step title="通知方式"></el-step>
        </el-steps>
      </div>
      <!--表单的部分--------------------------- -->
      <div class="formPath">
        <z-form
          :ref="settingForms[active-1].formData.ref"
          :options="settingForms[active-1].formData"
          v-model="model"
          @submit="submit"
          @reset-change="resetChange"
        >
        </z-form>
        <!-- 单击确认弹出来的对话框 -->

        <el-dialog
          :visible.sync="dialogFormVisible"
          :show-close='false'
        >
          <strong style="margin:60px;font-size:18px;">重复校验</strong>
          <p class="re_world">下述报警点位规则已存在。要替换它们吗？请勾选要替换的报警点位。</p>
          <!-- 自定义表单区域 -->
          <div class="form_set">
            <z-form
              :ref="settingForms[3].formData.ref"
              :options="settingForms[3].formData"
              v-model="model"
              @submit="submit"
              @reset-change="resetChange"
            >
            </z-form>
          </div>
          <div class="cancel_check">
            <el-button
              @click="goAlarmRules"
              type='primary'
            >确认</el-button>
            <el-button>取消</el-button>
          </div>

        </el-dialog>

      </div>

      <!-- 按钮---------------------------------- -->
      <div class="btn">
        <el-row>
          <el-col
            :span="12"
            :offset="10"
          >
            <!-- 基本设置的按钮 -->
            <template v-if='active === 1'>
              <el-button @click="next">下一步</el-button>
              <el-button
                @click="goBack"
                type="primary"
              >返回</el-button>
            </template>
            <!-- 参数设置的按钮 -->
            <template v-if='active ===2'>
              <el-button @click="next">下一步</el-button>
              <el-button @click="last">上一步</el-button>
            </template>
            <!-- 通知发的那是的按钮 -->
            <template v-if='active === 3'>
              <el-button
                type="primary"
                @click="affirm"
              >确认</el-button>
              <el-button @click="last">上一步</el-button>
            </template>

          </el-col>

        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 导入接口
import warningAlarm from "@/service/api/warningAlarm";
// import CommonFun from "@/utils/commonFun";
import { WarningAlerm } from "utils/dictionary";
// 子系统
const subSystem = WarningAlerm.subSystem;
// 设备类别
const deviceType = WarningAlerm.deviceType;
// 设备名称
const deviceName = WarningAlerm.deviceName;
// 点位类型
const pointType = WarningAlerm.pointType;
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 抑制
const restrain = WarningAlerm.restrain;
// 通知方式
const notificationWay = WarningAlerm.notificationWay;
// 通知组
const notificationGrounp = WarningAlerm.notificationGrounp;
// 弹框类型
const dialogType = WarningAlerm.dialogType;
// 通知人员
const handingPerson = WarningAlerm.handingPerson;
// 时间设置
const timeSetting = WarningAlerm.timeSetting;
// 重复交验中的复选框
const reCheckbox = WarningAlerm.reCheckbox;

export default {
  data() {
    return {
      // 步骤条激活状态
      active: 1,
      // 是否显示对话框
      dialogFormVisible: false,
      disabled: false,
      model: {},
      settingForms: [
        //基本设置
        {
          formData: {
            ref: "formData",
            labelWidth: "100",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            // display:false,
            forms: [
              // 子系统
              {
                type: "select",
                label: "子系统",
                prop: "subSystem",
                span: 6,
                disabled:true,
                offset: 8,
                dicData: subSystem
              },
              // 设备类别
              {
                type: "select",
                label: "设备类别",
                prop: "deviceType",
                span: 6,
                offset: 8,
                dicData: deviceType
              },

              // 设备名称
              {
                type: "select",
                label: "设备名称",
                prop: "deviceName",
                multiple: true,
                tip: "可以多选",
                tipPlacement: "right",
                span: 6,
                offset: 8,
                dicData: deviceName
              },
              // 点位类型
              {
                type: "select",
                label: "点位类型",
                prop: "pointType",
                span: 6,
                offset: 8,
                // display:false,
                dicData: pointType
              }
            ]
          }
        },
        // 参数设置
        {
          formData: {
            ref: "formData",
            labelWidth: "100",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            forms: [
              // 温度监测 input
              {
                type: "input",
                label: "温度监测",
                prop: "tempMonitor",
                span: 6,
                offset: 8
              },
              // 上限input
              {
                type: "input",
                label: "上限",
                prop: "upLimit",
                span: 6,
                offset: 8
              },
              // 下线input
              {
                type: "input",
                label: "下限",
                prop: "downLimit",
                span: 6,
                offset: 8
              },
              // 报警级别select
              {
                type: "select",
                label: "报警级别",
                prop: "eventRank",
                span: 6,
                offset: 8,
                // dicData: alarmLevel
                dicUrl: warningAlarm.geteventRanks,
                dicMethod: "get",
                props: {
                  label: "rankName",
                  value: "rankId"
                }
              },
              // 抑制select
              {
                type: "select",
                label: " 抑制",
                prop: "restrain",
                span: 6,
                offset: 8,
                dicData: restrain
              },
              //   分钟
              {
                type: "input",
                label: "分钟",
                prop: "minute",
                placeholder: "5",
                span: 3
              }
            ]
          }
        },
        // 通知方式
        {
          formData: {
            ref: "formData",
            labelWidth: "100",
            size: "medium",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            forms: [
              // 通知方式select
              {
                type: "select",
                label: "通知方式",
                prop: "notificationWay",
                multiple: true,
                tip: "可以多选",
                row: true,
                span: 6,
                offset: 6,
                dicData: notificationWay
              },
              // 通知组select
              {
                type: "select",
                label: "通知组",
                prop: "notificationGrounp",
                span: 6,
                offset: 6,
                dicData: notificationGrounp
              },

              // 通知人员select
              {
                type: "select",
                label: "通知人员",
                prop: "handingPerson",
                span: 6,
                offset: 2,
                dicData: handingPerson
              },
              // 弹框类型select
              {
                type: "select",
                label: "弹框类型",
                prop: "dialogType",
                span: 6,
                offset: 6,
                dicData: dialogType
              },
              // 时间设置select
              {
                type: "select",
                label: "时间设置",
                prop: "timeSetting",
                span: 6,
                offset: 2,
                dicData: timeSetting,
                tip: "秒/每次",
                tipPlacement: "right"
              }
            ]
          }
        },
        // 重复添加校验规则
        {
          formData: {
            ref: "formData",
            labelWidth: "100",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            forms: [
              // 搜索框
              {
                type: "input",
                label: "",
                placeholder: "请输入关键字",
                prop: "search",
                span: 18
              },
              //  复选框
              {
                type: "checkbox",
                prop: "reCheckbox",
                span: 6,
                offset: 2,
                dicData: reCheckbox
              }
            ]
          }
        }
      ]
    };
  },
  methods: {
    submit() {},
    clearForm(obj) {},
    resetChange() {},
    // check() {},
    goBack() {},
    last() {
      this.active -= 1;
    },
    next() {
      this.active += 1;
    },
    // 确认按钮
    affirm() {
      this.dialogFormVisible = true;
    },
    //单击弹出框的确认按钮
    goAlarmRules() {
      this.$router.push("/warningalarm/alarmRules");
      this.dialogFormVisible = false;
    }
  },
  mounted() {}
};
</script>

<style  scoped lang="less">
.step {
  width: 70%;
  margin: 0 auto;
  margin-top: 40px;
}
.setform {
  margin-top: 100px;
}
.btn {
  margin-top: 4%;
}
.formPath {
  margin-top: 50px;
}
.re_world {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.form_set {
  height: auto;
  padding: 30px;
  width: 40%;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.cancel_check {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
