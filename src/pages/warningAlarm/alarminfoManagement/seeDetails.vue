<template>
  <!-- 报警信息处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class="condition-box radius-shadow">
      <span style="display:inline-block;margin:20px 60px;font-weight:bold;">报警详情</span>
      <!-- 表单部分 -->
      <div class="form">
        <z-form
          v-model="model"
          :ref="setForms[0].formData.ref"
          :options="setForms[0].formData"
          @submit="submit"
          @reset-change="resetChange"
        >
          <template
            slot="btn"
            slot-scope="obj"
          >
            <div>
              <template v-if="!dis">
                <el-button
                  :size="obj.size"
                  type="primary"
                  @click="open()"
                >应答</el-button>
                <el-button @click="goBack(obj)">返回</el-button>
              </template>

              <el-button
                v-if="dis"
                :size="size"
                type="primary"
                @click="opensendOrder"
              >派单</el-button>
              <el-button @click="clearForm(obj)">关闭报警</el-button>

            </div>
          </template>
        </z-form>

        <!-- 派单对话框 -->
        <!-- 对话框 -->
        <!-- 应答对话框 -->
        <el-dialog
          :visible.sync="dialogFormVisible"
          :show-close='false'
        >
          <div class="content">
            <!-- 按钮==关闭和报警应答 -->
            <div class="title">
              <span v-if="!dis">报警应答</span>
              <span v-else>报警派单</span>
              <el-button @click="closeDialog()">关闭</el-button>
            </div>

            <!-- 应答表单 -->
            <z-form
              v-if="!dis"
              v-model="model"
              :ref="setForms[1].formData.ref"
              :options="setForms[1].formData"
              @submit="submit"
              @reset-change="resetChange"
            >
              <template
                slot='btn'
                slot-scope="obj"
              >
                <div>
                  <el-button
                    type="primary"
                    @click="makeSuer"
                  >确认</el-button>
                  <el-button @click="resetForm">重置</el-button>
                </div>
              </template>
            </z-form>

            <!-- 派单的表单 -->
            <z-form
              v-if="dis"
              v-model="model"
              :ref="setForms[2].formData.ref"
              :options="setForms[2].formData"
              @submit="submit"
              @reset-change="resetChange"
            >
              <template slot='btn'>
                <div>
                  <el-button
                    @click="sure"
                    type="primary"
                  >确认</el-button>
                  <el-button @click="sendRest">重置</el-button>
                </div>
              </template>
            </z-form>

          </div>
        </el-dialog>

      </div>

    </div>

    <!-- 下半部分 -->
    <div class="warehouse-manage-table panel">

      <p style="width:100%;font-weight:bold; margin:20px 60px;">报警动态:</p>
      <div style="margin:0 60px">
        信息展示............
      </div>
    </div>

  </div>
</template>

<script>
// 导入接口
import warningAlarm from "@/service/api/warningAlarm";
import { WarningAlerm } from "utils/dictionary";
// 应答
const alarmResponse = WarningAlerm.alarmResponse;
// 派单===》优先级
const priority = WarningAlerm.priority;
// 派单==》指派
const handingPerson = WarningAlerm.handingPerson;
// 报警状态
const alarmStatus = WarningAlerm.alarmStatus;
// 报警类型
const alarmType = WarningAlerm.alarmType;
export default {
  name: "seeDetails",
  data() {
    return {
      // 传过来的信息
      msg: {},
      //控制派单和应答
      dis: false,
      // 表单的配置项,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      model: {},
      setForms: [
        // 基础表单
        {
          formData: {
            ref: "formData1",
            labelWidth: "100",
            menuPosition: "right",
            menuBtn: false,
            textMode: false,
            // labelPosition: "left",
            forms: [
              //报警名称
              {
                type: "input",
                label: "报警名称",
                placeholder: " ",
                prop: "caption",
                span: 6,
                offset: 1
              },
              // 开始时间
              {
                type: "input",
                label: "开始时间",
                placeholder: " ",
                prop: "startTime",
                span: 6,
                offset: 1
              },
              // 报警描述
              {
                type: "input",
                label: "报警描述",
                placeholder: " ",
                prop: "errorMessage",
                span: 6,
                offset: 1
              },
              // 报警级别
              {
                type: "input",
                label: "报警级别",
                placeholder: " ",
                span: 6,
                offset: 1,
                prop: "eventRank",
                dicUrl: warningAlarm.geteventRanks,
                dicMethod: "get",
                props: {
                  label: "rankName",
                  value: "rankId"
                }
              },
              // 状态
              {
                type: "input",
                label: "状态",
                placeholder: " ",
                prop: "handled",
                span: 6,
                offset: 1,
                dicData:alarmStatus
              },
              // 子系统
              {
                type: "input",
                label: "子系统",
                placeholder: " ",
                prop: "system",
                span: 6,
                offset: 1
              },
              // 设备类型
              {
                type: "input",
                label: "设备类型",
                placeholder: " ",
                span: 6,
                offset: 1,
                prop: "catalogId",
                dicUrl: warningAlarm.getItemsTree,
                dicQuery: { catalogId: "2002" },
                props: {
                  label: "text",
                  value: "id",
                  children: "nodes"
                }
              },
              // 设备
              {
                type: "input",
                label: "设备",
                placeholder: " ",
                prop: "deviceName",
                span: 6,
                offset: 1
              },
              // 设备点位
              {
                type: "input",
                label: "设备点位",
                placeholder: " ",
                prop: "monitorName",
                span: 6,
                offset: 1
              },
              // 报警类型
              {
                type: "input",
                label: "报警类型",
                prop: "state",
                span: 6,
                offset: 1,
                dicData: alarmType
                
              },
              // 位置
              {
                type: "input",
                label: "位置",
                placeholder: " ",
                prop: "equipmentSite",
                span: 6,
                offset: 1
              },
              // 响应时间
              {
                type: "input",
                label: "响应时间",
                prop:'duration',
                placeholder: "0天0小时2分47秒",
                span: 6,
                offset: 1
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
        },
        // 应答表单
        {
          formData: {
            ref: "formData2",
            labelWidth: "100",
            menuPosition: "center",
            menuBtn: false,
            // disabled: true,
            // labelPosition: "left",
            forms: [
              // 设备调试 checkbox
              {
                type: "checkbox",
                prop: "alarmResponse",
                dicData: alarmResponse,
                span: 18,
                offset: 3
              },
              // 备注 textarea
              {
                type: "textarea",
                prop: "bz",
                label: "备注",
                span: 18,
                offset: 3
              },
              {
                prop: "btn",
                span: 14,
                offset: 5,
                formslot: true
              }
            ]
          }
        },

        // 派单的表单
        {
          formData: {
            ref: "formData3",
            labelWidth: "120",
            menuPosition: "center",
            menuBtn: false,
            // disabled: true,
            // labelPosition: "left",
            forms: [
              // 工单标题 input
              {
                type: "input",
                label: "工单标题",
                prop: "title",
                placeholder: "自动回显报警名称,可修改",
                span: 12,
                row: true,
                offset: 5
              },
              // 工单类型 input
              {
                type: "input",
                label: "工单标题",
                prop: "workType",
                span: 12,
                row: true,
                offset: 5
              },
              // 开始时间 input 自动回西安当前时间
              {
                type: "time",
                label: "开始时间",
                prop: "startTime",
                valueDefault: new Date(),
                valueFormat: "yyyy-MM-dd hh:mm:ss",
                format: "yyyy-MM-dd hh:mm:ss",
                span: 12,
                row: true,
                offset: 5
              },
              // 预计结束时间 时间选择器 input
              {
                type: "time",
                label: "预计结束时间",
                prop: "startTime",
                placeholder: "用户可以自己选择",
                valueDefault: new Date(),
                valueFormat: "yyyy-MM-dd hh:mm:ss",
                format: "yyyy-MM-dd hh:mm:ss",
                span: 12,
                row: true,
                offset: 5
              },
              // 优先级 select
              {
                type: "select",
                label: "优先级",
                prop: "priority",
                span: 12,
                row: true,
                offset: 5,
                dicData: priority
              },
              // 地点 自动回显当报警位置 input
              {
                type: "input",
                label: "地点",
                prop: "location",
                placeholder: "自动回显当报警位置",
                span: 12,
                row: true,
                offset: 5
              },
              // 指派 select
              {
                type: "select",
                label: "指派",
                prop: "handingPerson",
                span: 12,
                row: true,
                offset: 5,
                dicData: handingPerson
              },
              // 描述 textarea
              {
                type: "textarea",
                label: "描述",
                prop: "describe",
                span: 12,
                offset: 5
              },
              // 按钮
              {
                prop: "btn",
                span: 12,
                offset: 6,
                formslot: true
              }
            ]
          }
        }

      ]
    };
  },
  created() {
    var query = this.$route.query;
    if (query.flag) {
      this.model = { ...query };
      this.setForms[0].formData.textMode = true;
      if (query.mark) {
        this.open();
      }
    } else {
      this.model = { ...query };
    }
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 派单中的重置按钮
    sendRest() {
      // 获取表单中实例
      var sendForm = this.$refs[this.setForms[2].formData.ref];
      // console.log(sendForm)
      // 清空表单
      sendForm.resetForm();
    },
    // 应答的确认
    resetForm(...args) {
      var zForm = this.$refs[this.setForms[1].formData.ref];
      zForm.resetForm();
    },
    // 报警派单弹窗中的 "确认"按钮
    sure() {
      this.dialogFormVisible = true;
      // 调转到报警信息管理页面
      this.$router.push("/warningalarm/monitorAlarm");
    },
    // 单击'派单'的按钮
    opensendOrder() {
      this.dialogFormVisible = true;
    },
    // 应答中的'确认'
    makeSuer() {
      this.dis = true;
      this.dialogFormVisible = false;
    },
    //   下拉菜单
    handleCommand(command) {
      this.$message("click on item " + command);
    },

    open() {
      this.dialogFormVisible = true;
      console.log(1111);
    },
    //关闭按钮
    closeDialog() {
      this.dialogFormVisible = false;
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
