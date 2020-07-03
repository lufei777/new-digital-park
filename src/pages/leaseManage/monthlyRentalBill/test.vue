<template>
      <div class='panel-container'>
    <div class="panel">
      <span style="margin:10px;display:block">账单摘要</span>
      <!-- 表格部分 -->
      <div class="form">
        <!-- 左 -->
        <div class="left">
          <div class="top"><span>租户：</span>{{1}}</div>
          <div class="mid"><span>账期：</span>{{1}}</div>
          <div class="bottom"><span>上次预付款余额：</span>{{1}}</div>
        </div>
        <!-- 中 -->
        <div class="center">
          <div class="top"><span>合同编号：</span>{{1}}</div>
          <div class="mid">
            <div class="mid_left"><span>收费项目：</span>{{ 1}}</div>
            <div class="mid_right"><span>收费明细：</span>{{ 1}}</div>
          </div>
          <div class="bottom">
            <div class="mid_left"><span>收费项目：</span>{{1}}</div>
            <div class="mid_right"><span>收费项目：</span>{{1}}</div>
          </div>
        </div>
        <!-- 右 -->
        <div class="right">
          <div class="top"><span>租户面积：</span>{{1}}</div>
          <div class="mid"><span>账单金额合计：</span>{{1}}</div>
          <div class="bottom"><span>核定金额：</span>{{1}}</div>
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
                key='index'
              >{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in tableList" :key='item.id'>
              <td v-for="i in item">{{i}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="padding:10px 50px;margin-right:100px;"><span>审核人：{{测试}}</span> <span>经办人：{{测试}} </span></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
};
</script>

<style lang="less"  scoped>
.panel {
  .form {
    width: 100%;
    height: auto;
    border: 1px solid  #cccccc;
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
      }
      .mid {
        border-bottom: 1px solid #ccc;
        // padding: 5px 0;
        padding-left: 8px;
        display: flex;
      }
      .bottom {
        // padding: 5px 0;
        padding-left: 8px;
        display: flex;
        vertical-align: middle;
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
      width: 100%;
      thead {
        // border: 1px solid #cccccc;
        width: 100%;
        tr {
          width: 100%;
          th {
            width: 14.28%;
          }
          //   th:nth-of-type(1){
          //       width:30px;
          //   }
        }
      }
      tbody{
          td{
              text-align: center;
          }
      }
    }
  }
}
</style>