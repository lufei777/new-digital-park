<template>
  <!-- 收费 -->
      <div class='panel-container'>
    <el-row>
      <el-col
        :span="6"
        :offset="18"
      >
        <el-button
          type="info"
          plain
          @click="close"
        >关闭</el-button>
        <el-button
          type="info"
          plain
          v-print="'#printTest'"
        >打印</el-button>
      </el-col>
    </el-row>
    <div class="box" id="printTest">
      <h2 align='center'>中钢国际广场收费通知单</h2>
      <p><span>账期：</span>{{2019.09}}</p>
      <!-- 表格上方的4个信息展示 -->
      <div class="tabel_top">
        <div class="top">
          <div class="item">
            <div class="item_left">
              <span>客户名称：</span>{{print.tenantName}}
            </div>
            <div class="item_left">
              <span>通知单号：</span>{{print.noticeNumber}}
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <span>合同编号：</span>{{print.contractNumber}}
            </div>
            <div class="item_left">
              <span>发单时间：</span>{{print.billTime}}
            </div>
          </div>
        </div>
      </div>
      <!-- 表格部分 -->
      <z-table
        :ref='tableOptions.ref'
        :options='tableOptions'
      > </z-table>
      <!-- 合计 -->
      <div class="sum">
        <div class="sum_item"><span>上次预付款:</span>{{2555}}￥</div>
        <div class="sum_item"><span>本次扣款额:</span>{{2555}}￥</div>
        <div class="sum_item"></div>
      </div>
      <!-- 说明部分 -->
      <div class="instructions">
        <div class="instructions_left"><span>说明:</span></div>
        <div class="instructions_right">
          <div>1.春江潮水连海平，海上明月共潮生，滟滟随波千万里，何处春江无月明.......</div>
        </div>
      </div>

      <!-- 底部 -->
      <div class="footer">
        <z-form
          :ref="formOptions.ref"
          :options="formOptions"
          v-model="model"
          @submit="submit"
          @reset-change="resetChange"
        ></z-form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    print: {
      type: Object
    }
  },
  data() {
    return {
      model: {},
      list: null,
      tableOptions: {
        ref: "tabel",
        border: true,
        customTop: true,
        customTopPosition: "right",
        // operation: {
        //   width: 150
        // },
        // serverMode: {
        //   url: "",
        //   data: ""
        // },
        data: [

        ],
        showSummary: true,
        sumColumnList: [{ name: "receivableAmount", type: "sum" }],
        columnConfig: [
          { label: "收费项目", prop: "costProjectName" },
          { label: "起始日期", prop: "startTime" },
          { label: "截止日期", prop: "endTime" },
          { label: "应收金额", prop: "receivableAmount" },
          { label: "备注", prop: "bz" }
        ],
        uiConfig: {
          height: "auto",
          // 是否多选
          selection: false,
          //   是否显示索引
          showIndex: {
            width: 150
          }
        }
        // btnConfig: { width: 100 }
      },
      formOptions: {
        ref: "form",
        menuPosition: "right",
        menuBtn: false,
        labelWidth: "100",
        textMode: true,
        forms: [
          // 制表人
          {
            type: "input",
            label: "制表人",
            span: 6,
            prop: "noticeType"
          },
          //审核人
          {
            type: "input",
            prop: "year",
            label: "审核人",
            valueFormt: "yyyy",
            format: "yyyy",
            span: 6
          },
          //签发人
          {
            type: "input",
            prop: "month",
            label: "签发人",
            // offset: 1,
            span: 6
          },
          // 接收人
          {
            type: "input",
            prop: "chargeStatue",
            label: "接收人",
            span: 6
            // offset: 1,
            // row: true
          },
          // 接受日期
          {
            type: "input",
            prop: "kpStatue",
            label: "接受日期",
            span: 6
            // offset: 1,
            // row: true
          }
          //   // 收费通知单号
          //   {
          //     type: "input",
          //     prop: "chargeNumber",
          //     label: "收费通知单号",
          //     span: 6
          //   },
        ]
      }
    };
  },
  methods: {
    submit(model, hide) {},
    close(){
      this.$emit('comprint')
    },
    resetChange() {},
    // 获取父组件传递过来的值
    getProps() {
      this.model = this.print;
      this.$nextTick(() => {
        this.$refs[this.tableOptions.ref].setData(this.print.chargeNoticeVos);
      });
    }
  },
  created() {
    this.getProps();
  }
};
</script>

<style lang="less" scoped>
.box {
  background-color: rgb(255, 255, 255);
  height: auto;
  width: 100%;
  p {
    padding: 10px 0;
    background-color: rgb(212, 231, 248);
    height: 36px;
    line-height: 36px;
    text-align: center;
    span {
      font-size: 18px;
      font-weight: bold;
      color: black;
    }
  }
  //   表格上方的信息展示
  .tabel_top {
    width: 100%;
    .top {
      width: 100%;
      .item {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .item_left {
          height: 36px;
          line-height: 36px;
          text-align: left;
          span {
            color: black;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }
  // 翻页隐藏
  /deep/.el-pagination {
    display: none;
  }
  //   合计
  .sum {
    width: 100%;
    display: flex;
    margin-top: -20px;
    .sum_item {
      border: 1px solid #cccccc;
      flex: 1;
      height: 36px;
      line-height: 36px;
      text-align: left;
      padding-left: 5px;
      span {
        font-size: 18px;
        color: black;
        font-weight: bold;
      }
    }
  }
  //   说明部分
  .instructions {
    display: flex;
    width: 100;
    // padding: 5px;
    border-right: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    .instructions_left {
      width: 8%;
      height: 100px;
      text-align: right;
      span {
        display: inline-block;
        padding: 5px;
      }
    }
    .instructions_right {
      width: 92%;
      height: 100px;
      padding: 5px;
    }
  }
  //  底部
  .footer {
    display: flex;
    margin-top: 20px;
    margin-bottom: 100px;
    .footer_item {
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: left;
      margin-top: 20px;
      padding-left: 15px;
      span {
        font-size: 18px;
        color: black;
        font-weight: bold;
      }
    }
  }
}
</style>
