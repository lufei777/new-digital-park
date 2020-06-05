<template>
  <div class='message-device-manage panel-container'>
    <!-- 通知方式====》 新增 -->
    <div class="panel">
      <z-form
        :ref="formData.ref"
        :options="formData"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
              <!-- 按钮 -->
            <el-button @click="save" type="primary" >保存</el-button>
            <el-button>返回</el-button>
          </div>
        </template>
      </z-form>
    </div>

  </div>
</template>

<script>
// 字典导入
import { WarningAlerm } from "utils/dictionary";
//报警级别 select
const alarmLevel = WarningAlerm.alarmLevel;
// 弹框类型 select
const dialogType = WarningAlerm.dialogType;
// 时间设置 select
const timeSetting = WarningAlerm.timeSetting;
// t弹框的启用禁用
const enableDisAble = WarningAlerm.enableDisAble;
export default {
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        size: "medium",
        menuPosition: "center",
        menuBtn: false,
        forms: [
          //报警级别 select
          {
            type: "select",
            label: "报警级别",
            span: 6,
            prop: "alarmLevel",
            offset: 9,
            row: true,
            dicData: alarmLevel
          },

          // 弹框 radio
          {
            type: "radio",
            label: "弹窗",
            prop: "enableDisAble",
            span: 6,
            row: true,
            offset: 9,
            dicData: enableDisAble
          },

          // 弹框类型 select
          {
            type: "select",
            label: "弹框类型",
            span: 6,
            prop: "dialogType",
            offset: 9,
            row: true,
            dicData: dialogType
          },

          // 时间设置 select
          {
            type: "select",
            label: "时间设置",
            span: 6,
            prop: "timeSetting",
            offset: 9,
            tip: "秒/次",
            tipPlacement: "right",
            row: true,
            dicData: timeSetting
          },

          // 短信radio
          {
            type: "radio",
            label: "短信",
            prop: "msg",
            span: 6,
            row: true,
            offset: 9,
            dicData: enableDisAble
          },

          // 语音radio
          {
            type: "radio",
            label: "语音",
            prop: "voice",
            span: 6,
            row: true,
            offset: 9,
            dicData: enableDisAble
          },
          //自定义按钮
          {
            prop: "btn",
            span: 8,
            offset:8,
            formslot: true
          }
        ]
      }
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    //保存
    save(){
        this.$router.push('/notificationManger')
    }
  }
};
</script>

<style  scoped lang="less">
</style>
