<template>
      <div class='panel-container'>
    <div class="eldialog">
      <!-- 标题 -->
      <h2 align='center'>中钢物业管理有限公司收款联系单</h2>
      <!-- 表格上方的文字 -->
      <div class="head_world">
        <div class="item"><span>收款部门：</span>{{content.costDept}}</div>
        <div class="item"><span>日期：</span>{{content.createTime}}</div>
        <div class="item"><span>部门流水号：</span>{{content.collectionCode}}</div>
        <div class="item"><span>财务凭证号：</span>{{content.costDept}}</div>
      </div>
      <!-- 表格 -->
      <div class="table">
        <div class="tabel_in">
          <div class="left">付款单位信息</div>
          <div class="right">开票业务信息</div>
        </div>
        <!-- 相同部分 -->
        <!-- 1 -->
        <div class="sameitem">
          <div class="item_left">
            <div class="one">单位全称</div>
            <div class="two">{{content.payerName}}</div>
          </div>
          <div class="item_right">
            <div class="one">合同号</div>
            <div class="two">{{content.contractNumber}}</div>
          </div>
        </div>
        <!-- 2 -->
        <div class="sameitem">
          <div class="item_left">
            <div class="one">物业项目</div>
            <div class="two"></div>
          </div>
          <div class="item_right">
            <div class="one">开票项目</div>
            <div class="two">{{content.remark}}</div>
          </div>
        </div>
        <!-- 3 -->
        <div class="sameitem">
          <div class="item_left">
            <div class="one"></div>
            <div class="two"></div>
          </div>
          <div class="item_right">
            <div class="one">收款情况</div>
            <div class="two">{{content.costDept}}</div>
          </div>
        </div>
        <!-- 4 -->
        <div class="sameitem">
          <div class="item_left">
            <div class="one">收款金额</div>
            <div class="two">{{content.collectionMoney}}</div>
          </div>
          <div class="item_right">
            <span style="margin-left:20px;font-size:16px">大写：</span><span style="color:blue">{{content.collectionMoney}}</span>
            <!-- <div class="one">合同号</div> -->
            <!-- <div class="two">{{ce}}</div> -->
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
          <div class="f_left">
            <div class="row">
              <div class="l_in fontstyle">业务经办人</div>
              <div class="l_in"></div>
              <div class="l_in fontstyle">财务经办人</div>
              <div class="l_in"></div>
            </div>
            <div
              class="row"
              style="border-top:2px solid black;"
            >
              <div class="l_in fontstyle">业务副负责人</div>
              <div class="l_in"></div>
              <div class="l_in fontstyle">财务负责人</div>
              <div class="l_in"></div>
            </div>
            <!-- ceshi  -->
            <div class="rowitem">
              主管副经理：
            </div>
            <div class="rowitem">
              总经理：
            </div>
          </div>
          <div class="f_right">
            <div class="f_top">
              简要说明
            </div>
            测试数据
          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {content:{
      type:Object
  }},
  data() {
    return {
      ce: "测试数据"
    };
  },
  created(){
      console.log('content',this.content)
  }
};
</script>

<style lang="less" scoped>
.eldialog {
  padding: 0 20px;
  //   background-color: rgb(253, 254, 242);
  height: auto;
  width: 96%;
  .head_world {
    display: flex;
    padding: 0 20px;
    .item {
      flex: 1;
      color: blue;
      height: 30px;
      line-height: 30px;
      text-align: left;
      margin-top: 16px;
      span {
        font-weight: bold;
        font-size: 18px;
        color: black;
      }
    }
  }
  //   表格
  .table {
    margin-top: 20px;
    border: 2px solid black;
    color: black;
    .tabel_in {
      display: flex;
      .left,
      .right {
        flex: 1;
        height: 40;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        //   display: flex;
      }
      .left {
        border-right: 2px solid black;
      }
    }
    // 相同部分
    .sameitem {
      display: flex;
      .item_left,
      .item_right {
        flex: 1;
        height: 40;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
      }
      .item_left {
        display: flex;
        border-top: 2px solid black;
        border-right: 2px solid black;
        .one {
          width: 20%;
          text-align: center;
          border-right: 2px solid black;
        }
        .two {
          width: 80%;
          color: blue;
          text-align: left;
          padding-left: 10px;
        }
      }
      .item_right {
        display: flex;
        border-top: 2px solid black;
        //   border-right:2px solid black;
        .one {
          width: 20%;
          text-align: center;
          border-right: 2px solid black;
        }
        .two {
          width: 80%;
          color: blue;
          text-align: left;
          padding-left: 10px;
        }
      }
    }
    // 底部
    .footer {
      display: flex;
      .f_left {
        width: 60%;
        border-right: 2px solid black;
        border-top: 2px solid black;
        // display: flex;
        .row {
          width: 100%;
          display: flex;
          .l_in {
            width: 25%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-right: 2px solid black;
          }
          .l_in:nth-of-type(4) {
            border-right: none;
          }
        }
        .rowitem {
          height: 80px;
          padding: 10px;
          //   border-right: 2px solid black;
          border-top: 2px solid black;
          font-weight: bold;
          font-size: 18px;
        }
      }
      .f_right {
        width: 40%;
        border-top: 2px solid black;
        // border-right: 2px solid black;
        .f_top {
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: black;
          font-weight: bold;
          border-bottom: 2px solid black;
        }
      }
    }
  }
}
.fontstyle {
  font-weight: bold;
  font-size: 18px;
}
</style>
