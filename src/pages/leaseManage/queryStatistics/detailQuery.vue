<template>
  <!-- 租赁月账单明细查询 -->
  <div class="lease-contract panel-container">
    <div class="condition-box radius-shadow">
      <z-form
        :ref="leaseContractForm.ref"
        :options="leaseContractForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              :disabled="obj.disabled"
              type="primary"
              @click="onClickSearchBtn(obj)"
            >查询</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="clearForm(obj)"
            >重置</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <div
      class="lease-contract-table panel"
      id="printTest"
      ref='print'
    >
      <el-dialog
        v-dialogDrag
        ref="dialog__wrapper"
        :visible.sync="dialogTableVisible"
        :modal='true'
      >
        <!-- 自定义按钮弹框 -->
        <div class="inlineshow">
          <span style="margin:15px 20px;display:block;color:red"> 单击按钮 自定义显示列</span>
          <el-button
            v-for="col,index in btnList"
            size='min'
            :key="col.prop"
            :type="col.hide ?'danger': 'primary'"
            @click="switchHide(col)"
          >{{col.label}}</el-button>
        </div>

      </el-dialog>
      <z-table
        :ref="leaseContractTable.ref"
        :options="leaseContractTable"
      >
        <template
          slot="custom-top"
          slot-scope="scopeObj"
        >
          <div
            class="el-table-button-group"
            style="height:40px;"
          >
            <!-- @click="printHtml" -->
            <!-- v-print="'printTest'" -->
            <el-button-group>
              <el-button
                type="primary"
                v-print="'printTest'"
              >打印</el-button>
              <!-- <el-button
                type='primary'
                @click="print"
              >
                打印
              </el-button> -->
              <el-button
                type="primary"
                @click="exportFile(obj)"
              >导出</el-button>
              <el-button
                type="primary"
                @click="testCustomTopObj(scopeObj)"
              >自定义显示</el-button>

            </el-button-group>
          </div>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
import Vue from "vue";
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};
Vue.directive("dialogDrag", {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector(".el-dialog__header");
    const dragDom = el.querySelector(".el-dialog");
    dialogHeaderEl.style.cursor = "move";

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes("%")) {
        styL =
          +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
        styT =
          +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
      } else {
        styL = +sty.left.replace(/\px/g, "");
        styT = +sty.top.replace(/\px/g, "");
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;

        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
export default {
  name: "monthrentalbill",
  data() {
    let _this = this;
    return {
      // 打印设置
      // 自定义按钮
      btnList: [],
      dialogTableVisible: false,
      // 显示和隐藏控制
      showorhide: false,
      title: "2020年 5-7 月租赁月账单查询",
      model: {},
      leaseContractForm: {
        ref: "leaseContractForm",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        submitBtn: false,
        emptyBtn: false,
        forms: [
          // 年
          {
            label: "年",
            type: "year",
            span: 6,
            prop: "year",
            valueFormat: "yyyy"
            // format:'yyyy'
          },
          //   {
          //     label: "时间日期范围",
          //     prop: "daterange",
          //     type: "daterange",
          //     span: 10,
          //     valueFormat: "yyyy-MM-dd HH:mm:ss",
          //     startPlaceholder: "时间日期开始范围自定义",
          //     endPlaceholder: "时间日期结束范围自定义"
          //   },

          // 月
          {
            label: "月",
            type: "month",
            span: 6,
            prop: "month",
            valueFormat: "MM",
            format: "MM"
          },

          //  租户名称
          {
            label: "租户名称",
            type: "input",
            span: 6,
            prop: "tenantName"
          },
          {
            prop: "btn",
            span: 6,
            pull: 6,
            formslot: true
            // width: 20
          }
        ]
      },
      leaseContractTable: {
        ref: "leaseContractTable",
        customTop: true,
        // 操作设置
        // operation: {
        //   width: 200
        // },
        // props: {
        //   rowKey: "contractId"
        // },
        data: [],
        columnConfig: [],
        serverMode: {
          url: LeaseManageApi.queryMonthBillDetailed,
          data: pageInfo
        },
        propsHttp: {
          list: "data",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        uiConfig: {
          height: "auto", //"", //高度
          selection: false, //是否多选
          showIndex: {
            width: 50
          }
        }
      },
      currentPage: 1,
      contractIds: ""
    };
  },
  computed: {
    Form() {
      return this.$refs[this.leaseContractForm.ref];
    },
    Table() {
      return this.$refs[this.leaseContractTable.ref];
    }
  },
  methods: {
    printHtml() {
      this.$print(this.$refs.print, { "no-print": ".el-table-button-group" });
    },
    testCustomTopObj(scopeObj) {
      this.dialogTableVisible = !this.dialogTableVisible;
      this.btnList = scopeObj.columnConfig;

      console.log(scopeObj);
    },
    showSetBtn() {
      // this.show = !show;
      console.log(111);
      this.showorhide = !this.showorhide;
      console.log(this.showorhide);
    },
    switchHide(col) {
      let tableRefs = this.$refs;
      if (col.hide) {
        this.$set(col, "hide", !col.hide);
      } else {
        this.$set(col, "hide", true);
      }
      tableRefs[this.leaseContractTable.ref].doLayout();
    },

    submit(model, hide) {
      hide();
      this.leaseContractTable.serverMode.data = Object.assign(
        _.cloneDeep(pageInfo),
        model
      );
      this.$refs[this.leaseContractTable.ref].refreshTable();
    },
    resetChange() {},
    clearForm(...args) {
      this.$refs[this.leaseContractForm.ref].resetForm();
    },
    async contractList() {
      let labelList = [
        { label: "账单编号", prop: "billNumber", showOverflowTooltip: false },
        {
          label: "合同编码",
          prop: "contractNumber",
          showOverflowTooltip: false
        },
        { label: "合同名称", prop: "contractName", showOverflowTooltip: false },
        { label: "账期", prop: "billTime" },
        { label: "租户名称", prop: "tenantName" },
        { label: "账单金额", prop: "billCost" },
        { label: "租金", prop: "leaseCost" },
        { label: "物业费", prop: "propertyFeeCost" },
        { label: "电费", prop: "electricityFeesCost" },
        { label: "水费", prop: "waterCost" },
        { label: "维修费", prop: "maintenanceCost" },
        { label: "会议费", prop: "meetingCost" },
        { label: "视频会议费", prop: "videoMeetingCost" },
        { label: "停车券费", prop: "stopCatCost" },
        { label: "停车月租", prop: "stopCatMonthCost" },
        { label: "公务车有偿使用", prop: "officialVehicleCost" }
      ];
      this.leaseContractTable.columnConfig = labelList;
    },

    // 导出
    exportFile(obj) {
      // /oaApi/month/bill/exportMonthBillDetailed
      //  let url = '/oaApi/stockDeal/exportRecord'
      let url = "/oaApi/month/bill/exportMonthBillDetailed";
      let params = "";
      let arr = this.$refs[this.leaseContractTable.ref].getSelectedData();
      let stockRecordIds = arr.length ? arr.map(item => item.id) : "";
      for (let key in this.leaseContractTable.serverMode.data) {
        if (key != pageInfo) {
          params +=
            key + "=" + this.leaseContractTable.serverMode.data[key] + "&";
        }
      }
      params += "stockRecordIds=" + stockRecordIds;
      CommonFun.exportMethod({ url, params });

      // LeaseManageApi.exportMonthBillDetailed().then(res =>{
      //   console.log(res)
      // })
    },
    // 搜索
    onClickSearchBtn(...args) {
      this.Form.submit();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.contractList();
    },
    showDeleteTip() {
      CommonFun.deleteTip(
        this,
        this.contractIds,
        "请至少选择一条信息！",
        this.sureDelete,
        this.cancelDelete
      );
    },
    //生成
    generate(obj) {
      console.log(obj);
    },
    // 新增
    addContract() {
      this.$router.push({ path: "addmothly" });
    },
    // 更新
    editRow() {},
    // 作废
    delRow() {}
  },
  created() {
    // this.$nextTick(() => {
    //   var body = document.querySelector(".el-table");
    //   body.setAttribute("id", "#printTest");
    //   console.log(body);
    // });
  },
  mounted() {
    this.contractList();
    // 获取table中的表格部分 按钮部分不需要
    // this.$nextTick(() => {
    //   var body = document.querySelector(".el-table");
    //   body.setAttribute("id", "#printTest");
    //    console.log(body);
    // });
    // body.classList.add('#printTest')
    // this.printObj.id= '#printTest'
  }
};
</script>

<style lang="less" scoped>
.lease-contract {
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 20px;
    // background: pink;
  }
  .lease-contract-table {
    background: @white;
    padding: 20px;
    .operator-box {
      background: @white;
      .el-button {
        margin-left: 20px;
      }
    }
    // 按钮位置控制
    /deep/.zvue-table-body {
      // margin-top: 74px;
    }
  }
  // .el-input {
  //   width: 180px!important;
  // }
}
.tab-title {
  width: 57%;
  height: 50px;
  line-height: 50px;

  span {
    color: red;
    font-size: 14px;
  }

  em {
    font-style: normal;
    font-size: 20px;
  }
}
.showbtn {
  width: 100%;
  height: auto;
  display: none;
  position: relative;
  .inbtn {
    height: 80px;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0px;
    z-index: 100;
    // .el-table-button-group {
    //   // margin-bottom: 60px;
    //   /deep/.tr_line{
    //     display: inline-block;
    //   }
    // }
  }
}
.inlineshow {
  // display: inline-block;
  .el-button {
    margin: 10px 2px;
  }
}
// table {
//   td {
//     cursor: pointer;
//     padding: 5px 10px;
//   }
//   td:hover {
//     background-color: rgb(0, 141, 234);
//     color: white;
//   }
// }
</style>