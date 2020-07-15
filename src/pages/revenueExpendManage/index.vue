<template>
  <div class="revenue-expend-index">
    <commonIndex @hooks:beforecreated="setMenuList" />
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";

export default {
  name: "RevenueExpendIndex",
  components: {
    commonIndex
  },
  data() {
    return {};
  },
  methods: {
    setMenuList() {
      let menuList = {
        "id": 187,
        "pid": 134,
        "name": "收支管理",
        "level": 2,
        "status": 2,
        "routeAddress": "/revenueExpendManage",
        "childNode": [
          {
            "id": 188,
            "pid": 187,
            "name": "收入记录",
            "level": 3,
            "status": 1,
            "routeAddress": "/incomeRecord",
            "childNode": [
              {
                "id": 350,
                "pid": 188,
                "name": "收入列表",
                "level": 4,
                "status": 1,
                "routeAddress": "/incomeRecord",
                "childNode": [],
                "firstMenuId": 134,
                "secondMenuId": 187
              },
              {
                "id": 348,
                "pid": 188,
                "name": "收费通知单",
                "level": 4,
                "status": 1,
                "routeAddress": "/chargenote",
                "childNode": [],
                "firstMenuId": 134,
                "secondMenuId": 187,
                "icon": "",
                "clientType": "0"
              },
              {
                "id": 349,
                "pid": 188,
                "name": "收费联系单",
                "level": 4,
                "status": 1,
                "routeAddress": "/paymentlist",
                "childNode": [],
                "firstMenuId": 134,
                "secondMenuId": 187,
                "icon": "",
                "clientType": "0"
              }
            ],
            "firstMenuId": 134,
            "secondMenuId": 187,
            "icon": "iconshourujilu",
            "clientType": "0"
          },
          {
            "id": 189,
            "pid": 187,
            "name": "收费管理",
            "level": 3,
            "status": 1,
            "routeAddress": "/chargeManage",
            "childNode": [
              {
                "id": 189350,
                "pid": 189,
                "name": "全部收费",
                "level": 4,
                "status": 1,
                "routeAddress": "/chargeManage",
                "childNode": [],
                "firstMenuId": 134,
                "secondMenuId": 187
              }
            ],
            "firstMenuId": 134,
            "secondMenuId": 187,
            "icon": "iconshoufeiguanli",
            "clientType": "0"
          },
          {
            "id": 190,
            "pid": 187,
            "name": "支出预算",
            "level": 3,
            "status": 1,
            "routeAddress": "/expensesBudget",
            "childNode": [],
            "firstMenuId": 134,
            "secondMenuId": 187,
            "icon": "iconzhichuyusuan",
            "clientType": "0"
          },
          {
            "id": 192,
            "pid": 187,
            "name": "支出记录",
            "level": 3,
            "status": 1,
            "routeAddress": "/expenditureRecord",
            "childNode": [],
            "firstMenuId": 134,
            "secondMenuId": 187,
            "icon": "iconwj-zcjl",
            "clientType": "0"
          },
          {
            "id": 193,
            "pid": 187,
            "name": "报表管理",
            "level": 3,
            "status": 1,
            "routeAddress": "/reportManage",
            "childNode": [],
            "firstMenuId": 134,
            "secondMenuId": 187,
            "icon": "iconyingjiguanli",
            "clientType": "0"
          }
        ],
        "firstMenuId": 0,
        "secondMenuId": 0,
        "icon": "iconshouzhiguanli",
        "clientType": "0"
      };
      localStorage.setItem("menuList", JSON.stringify(menuList));
    }
  }
};
</script>

<style lang="less">
</style>
