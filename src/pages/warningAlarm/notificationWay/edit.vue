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
              @click="clearForm(obj)"
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
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 禁用，启用
const enableDisAble = WarningAlerm.enableDisAble
// 通知方式
const notificationWay = WarningAlerm.notificationWay
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
          // 报警级别
          {
            type: "select",
            label: "报警级别",
            placeholder: " ",
            prop: "alarmLevel",
            span: 10,
            offset: 1,
            dicData: alarmLevel
          },
          // 弹窗类型
          {
            type: "select",
            label: "弹窗类型",
            placeholder: " ",
            prop: "dialogType",
            span: 10,
            offset: 1,
            dicData: notificationWay
          },
          // 语音
          {
            type: "select",
            label: "语音",
            placeholder: " ",
            prop: "voice",
            span: 10,
            offset: 1,
            dicData: enableDisAble
          },
          //   短信
          {
            type: "select",
            label: "短信",
            placeholder: " ",
            prop: "msg",
            span: 10,
            offset: 1,
            dicData: enableDisAble
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
      var formArr = this.$route.query
      if(formArr){
          this.model = {...formArr}
      }
  },
  methods: {
    // 确认
      onClickSearchBtn(obj){
          this.$router.push('/warningalarm/notificationManger')
      },
    // 返回
    clearForm(obj){
        this.$router.push('/warningalarm/notificationManger')
    },
    submit() {},
    resetChange() {},

    batchDels() {},
    addTenant() {},
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
