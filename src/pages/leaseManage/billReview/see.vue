<template>
      <div class='panel-container'>
    <div
      class="panel"
      v-if="billArr"
    >
      <div class="top">
        <span style="margin:10px;display:block">账单摘要</span>
        <el-button
          type='text'
          @click="goback()"
        >返回</el-button>
      </div>
      <!-- 表格部分 -->
      <div class="form">
        <!-- 左 -->
        <div class="left">
          <div class="top"><span>租户：</span>{{billArr.tenantName}}</div>
          <div class="mid"><span>账期：</span>{{billArr.billTime}}</div>
          <div class="bottom"><span>上次预付款余额：</span>{{billArr.lastPrepay}} 元</div>
        </div>
        <!-- 中 -->
        <div class="center">
          <div class="top"><span>合同编号：</span>{{billArr.contractNumber}}</div>
          <div class="mid">
            <div class="mid_left"><span>收费项目：</span>{{ billArr.chargeItems}}</div>
            <div class="mid_right"><span>收费明细：</span>{{ billArr.chargeDetailed}}</div>
          </div>
          <div class="bottom">
            <div class="mid_left"><span>本次冲抵额：</span>{{billArr.offsset}} 元</div>
            <div class="mid_right"><span>本次预存款余额：</span>{{billArr.prepay}} 元</div>
          </div>
        </div>
        <!-- 右 -->
        <div class="right">
          <div class="top"><span>租户面积：</span>{{billArr.houseArea}}</div>
          <div class="mid"><span>账单金额合计：</span>{{billArr.billTotalAmount}} 元</div>
          <div class="bottom"><span>核定金额：</span>{{billArr.approvedAmount}} 元</div>
        </div>
      </div>
      <span style="margin:30px 0px 10px 10px;display:block">账单明细</span>
      <!-- 下半部分代码 -->
      <div class="bottom_form">
        <!-- 表头 -->
        <table
          cellspacing='0'
          border="1px"
        >
          <thead>
            <tr>
              <th
                v-for="(item ,index) in headList"
                :key='index'
              >{{ item }}</th>
            </tr>
          </thead>
          <!-- 表体 -->
          <tbody>
            <tr
              v-for="(item) in billdetailArr"
              :key='item.id'
              v-if="off"
              v-cloak
            >
              <td
                v-for="i,idex in item"
                :key='idex'
              >{{i}}</td>
            </tr>
            <tr
              style="text-align:center !important;font-weight:bold;height:30px;line-height:30px;"
              v-else
              v-cloak
            >
              暂无数据!
            </tr>
          </tbody>
        </table>
      </div>
      <div style="padding:10px 50px;margin-right:100px;"><span>审核人：{{1}}</span> <span>经办人：{{1}} </span></div>
    </div>
  </div>
</template>

<script>
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
export default {
  data() {
    return {
      id: "",
      // 账单摘要
      billArr: null,
      // 账单明细
      billdetailArr: [],
      off: true,
      headList: [
        "序号",
        "科目类型",
        "起始日期",
        "截止日期",
        "账单金额(元)",
        "冲抵金额(元)",
        "备注"
      ],
      tableList: [
        {
          id: 1,
          type: "测试",
          start: "2012",
          end: "",
          money: "1250",
          cdmoney: "200",
          bz: "测试数据"
        },
        {
          id: 2,
          type: "测试",
          start: "2012",
          end: "2020",
          money: "1250",
          cdmoney: "200",
          bz: "测试数据"
        },
        {
          id: 3,
          type: "",
          start: "2012",
          end: "2020",
          money: "1250",
          cdmoney: "200",
          bz: "测试数据"
        },
        {
          id: 4,
          type: "测试",
          start: "2012",
          end: "2020",
          money: "1250",
          cdmoney: "200",
          bz: "测试数据"
        },
        {
          id: 5,
          type: "测试",
          start: "2012",
          end: "",
          money: "1250",
          cdmoney: "200",
          bz: "测试数据"
        },
        {
          id: 6,
          type: "",
          start: "2012",
          end: "2020",
          money: "1250",
          cdmoney: "200",
          bz: ""
        }
      ]
    };
  },
  methods: {
    async tabledata() {
      let { data } = await LeaseManageApi.queryMonthBillList({
        billNumber: this.id
      });
      //   debugger;
      console.log("数据", data[0]);
      this.billArr = data[0];
      let count = 1;
      let newarr = [];
      if (Object.values(data[0].oaDetails).length !== 0) {
        data[0].oaDetails.forEach(item => {
          newarr.push({
            id: count++,
            subjectType: item.subjectType,
            startTime: item.startTime,
            endTime: item.endTime,
            billAmount: item.billAmount,
            offset: item.offset,
            codeName: item.codeName
          });
        });
        this.billdetailArr = newarr;
        if (Object.values(this.billdetailArr).length === 0) {
          this.off = false;
        }
      }

      console.log(" this.billArr", this.billArr);
    },
    // 返回
    goback(){
      this.$router.back()
    }
  },
  created() {
    this.id = this.$route.query.billNumber;
    this.tabledata();
  }
};
</script>

<style lang="less"  scoped>
.panel {
  .top{
    display: flex;
    justify-content: space-between;
  }
  .form {
    width: 100%;
    height: auto;
    border: 1px solid #cccccc;
    // border-top: 1px solid #cccccc;
    // border-bottom: 1px solid #cccccc;
    display: flex;
    .right,
    .center,
    .left {
      flex: 1;
      //   padding: 5px 0;
      border-right: 1px solid #cccccc;
      .top {
        border-bottom: 1px solid #ccc;
        // padding: 5px 0;
        padding-left: 8px;
        height: 40px;
        line-height: 40px;
        text-align: left;
        span {
          font-weight: bold;
          font-size: 18px;
          color: black;
        }
      }
      .mid {
        border-bottom: 1px solid #ccc;
        // padding: 5px 0;
        padding-left: 8px;
        display: flex;
        height: 40px;
        line-height: 40px;
        text-align: left;
        span {
          font-weight: bold;
          font-size: 18px;
          color: black;
        }
      }
      .bottom {
        // padding: 5px 0;
        padding-left: 8px;
        display: flex;
        vertical-align: middle;
        height: 40px;
        line-height: 40px;
        text-align: left;
        span {
          font-weight: bold;
          font-size: 18px;
          color: black;
        }
      }
      .mid_left,
      .mid_right {
        flex: 1;
      }
      .mid_left {
        border-right: 1px solid #cccccc;
        padding: 0;
      }
      .mid_right {
        padding: 0 5px;
      }
    }
    .right {
      border-right: none;
    }
  }
  .bottom_form {
    width: 100%;
    height: auto;
    table {
      //   border: 1px solid #ccc;
      width: 100%;
      thead {
        // border: 1px solid #cccccc;
        width: 100%;
        tr {
          height: 60px;
          line-height: 60px;
          text-align: center;
          width: 100%;
          //   border: 1px solid #ccc;
          th {
            // border: 1px solid black;
            width: 14.28%;
            color: black;
            font-size: 18px;
          }
          //   th:nth-of-type(1){
          //       width:30px;
          //   }
        }
      }
      tbody {
        tr {
          height: 30px;
          line-height: 30px;
          text-align: center;
          td {
            // border: 1px solid #ccc;
            text-align: center;
          }
        }
      }
    }
  }
}
[v-cloak] {
  display: none;
}
</style>