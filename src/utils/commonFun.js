import energyProportionAnalysis from '../pages/digitalPark/coms/energyProportionAnalysis'
import energyElectricityProportion from '../pages/digitalPark/coms/energyElectricityProportion'
import operateIncome from '../pages/digitalPark/coms/operateIncome'
import buildingStatusProportion from '../pages/digitalPark/coms/buildingStatusProportion'
import assetTypeProportion from '../pages/digitalPark/coms/assetTypeProportion'
import energyConsumptionRanking from '../pages/digitalPark/coms/energyConsumptionRanking'
import buildingEarlyWarningAlarm from '../pages/digitalPark/coms/buildingEarlyWarningAlarm'
import operateExpenditure from '../pages/digitalPark/coms/operateExpenditure'
import assetGrowthStatistics from '../pages/digitalPark/coms/assetGrowthStatistics'
import taskRanking from '../pages/digitalPark/coms/taskRanking'
import attendanceDetail from '../pages/digitalPark/coms/attendanceDetail'
import taskPersonTask from '../pages/digitalPark/coms/taskPersonTask'
import TestModuleOne from '../pages/digitalPark/coms/TestModuleOne'
import TestModuleTwo from '../pages/digitalPark/coms/TestModuleTwo'
import TestModuleThree from '../pages/digitalPark/coms/TestModuleThree'
import emergencies from '../pages/digitalPark/coms/emergencies'
import escapeRoutes from '../pages/digitalPark/coms/escapeRoutes'
import saleStatistics from '../pages/digitalPark/coms/saleStatistics'
import inventoryAnalysis from '../pages/digitalPark/coms/inventoryAnalysis'
import messageRelease from '../pages/digitalPark/coms/messageRelease'
import router from '@/router'

class commonFun {
  exportComs = {
    energyProportionAnalysis,
    energyElectricityProportion,
    operateIncome,
    buildingStatusProportion,
    assetTypeProportion,
    energyConsumptionRanking,
    buildingEarlyWarningAlarm,
    operateExpenditure,
    assetGrowthStatistics,
    taskRanking,
    attendanceDetail,
    taskPersonTask,
    TestModuleOne,
    TestModuleTwo,
    TestModuleThree,
    emergencies,
    escapeRoutes,
    saleStatistics,
    inventoryAnalysis,
    messageRelease
  }
  //this,删除的id,没有id时的提示信息，点击确定的回调函数
  deleteTip(that, deleteId, msgTip, callBack) {
    if (!deleteId) {
      that.$message({
        type: 'warning',
        message: msgTip,
        duration: 1000
      });
      return;
    }
    that.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      callBack()
    }).catch(() => {
      that.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
  }

  menuData = {
    "id": 1,
    "parent": 0,
    "name": "space",
    "caption": "根节点\t",
    "catalog": null,
    "url": null,
    "sequence": 1,
    "icon": null,
    "permisionList": [],
    "children": [{
      "id": 11,
      "parent": 1,
      "name": "space",
      "caption": "首页",
      "catalog": null,
      "url": "/energy/homePage",
      "sequence": 1,
      "icon": null,
      "permisionList": ["首页"],
      "children": []
    }, {
      "id": 2,
      "parent": 1,
      "name": "space",
      "caption": "能耗展示",
      "catalog": null,
      "url": "/energy/timeEnergy",
      "sequence": 1,
      "icon": null,
      "permisionList": [],
      "children": [{
        "id": 21,
        "parent": 2,
        "name": "space",
        "caption": "分时能耗",
        "catalog": null,
        "url": "/energy/timeEnergy",
        "sequence": 1,
        "icon": null,
        "permisionList": ["分时能耗"],
        "children": []
      }, {
        "id": 22,
        "parent": 2,
        "name": "space",
        "caption": "分项能耗",
        "catalog": null,
        "url": "/energy/categoryEnergy",
        "sequence": 2,
        "icon": null,
        "permisionList": ["分项能耗"],
        "children": []
      }, {
        "id": 23,
        "parent": 2,
        "name": "space",
        "caption": "能耗排名",
        "catalog": null,
        "url": "/energy/rankEnergy",
        "sequence": 3,
        "icon": null,
        "permisionList": ["能耗排名"],
        "children": []
      }]
    }, {
      "id": 3,
      "parent": 1,
      "name": "space",
      "caption": "统计分析",
      "catalog": null,
      "url": "/deviceAnalysis",
      "sequence": 2,
      "icon": null,
      "permisionList": [],
      "children": [{
        "id": 31,
        "parent": 3,
        "name": "space",
        "caption": "设备分析",
        "catalog": null,
        "url": "/deviceAnalysis",
        "sequence": 1,
        "icon": null,
        "permisionList": ["设备状态分析"],
        "children": []
      }, {
        "id": 32,
        "parent": 3,
        "name": "space",
        "caption": "相关性分析",
        "catalog": null,
        "url": "/correlationAnalysis",
        "sequence": 2,
        "icon": null,
        "permisionList": ["相关分析"],
        "children": []
      }, {
        "id": 33,
        "parent": 3,
        "name": "space",
        "caption": "统计对比",
        "catalog": null,
        "url": "/statisCompare",
        "sequence": 3,
        "icon": null,
        "permisionList": ["统计对比"],
        "children": []
      }, {
        "id": 34,
        "parent": 3,
        "name": "space",
        "caption": "往期统计",
        "catalog": null,
        "url": "/historyStatis",
        "sequence": 4,
        "icon": null,
        "permisionList": ["往期统计"],
        "children": []
      }, {
        "id": 35,
        "parent": 3,
        "name": "space",
        "caption": "能耗对比分析",
        "catalog": null,
        "url": "/energy/compare",
        "sequence": 5,
        "icon": null,
        "permisionList": [],
        "children": [{
          "id": 36,
          "parent": 35,
          "name": "space",
          "caption": "空间对比",
          "catalog": null,
          "url": "/html/energyNew/energy_ranking.html",
          "sequence": 1,
          "icon": null,
          "permisionList": ["空间对比"],
          "children": []
        }, {
          "id": 37,
          "parent": 35,
          "name": "space",
          "caption": "同比环比分析",
          "catalog": null,
          "url": "/html/energyNew/energy_ranking.html",
          "sequence": 2,
          "icon": null,
          "permisionList": ["同比环比分析"],
          "children": []
        }, {
          "id": 38,
          "parent": 35,
          "name": "space",
          "caption": "能耗类型对比",
          "catalog": null,
          "url": "/html/energyNew/energy_ranking.html",
          "sequence": 3,
          "icon": null,
          "permisionList": ["能耗类型对比"],
          "children": []
        }]
      }]
    }, {
      "id": 4,
      "parent": 1,
      "name": "space",
      "caption": "节能诊断",
      "catalog": null,
      "url": "/energy/waterDiffer",
      "sequence": 3,
      "icon": null,
      "permisionList": [],
      "children": [{
        "id": 41,
        "parent": 4,
        "name": "space",
        "caption": "水量异常突增诊断",
        "catalog": null,
        "url": "/energy/waterDiffer",
        "sequence": 1,
        "icon": null,
        "permisionList": ["水量异常突增诊断"],
        "children": []
      }, {
        "id": 42,
        "parent": 4,
        "name": "space",
        "caption": "夜间用水跑冒滴漏诊断",
        "catalog": null,
        "url": "/energy/nightWater",
        "sequence": 2,
        "icon": null,
        "permisionList": ["夜间用水跑冒滴漏诊断"],
        "children": []
      }, {
        "id": 43,
        "parent": 4,
        "name": "space",
        "caption": "用电量异常突增诊断",
        "catalog": null,
        "url": "/energy/elecDiffer",
        "sequence": 3,
        "icon": null,
        "permisionList": ["用电量异常突增诊断"],
        "children": []
      }, {
        "id": 44,
        "parent": 4,
        "name": "space",
        "caption": "夜间用电浪费诊断",
        "catalog": null,
        "url": "/energy/nightElec",
        "sequence": 4,
        "icon": null,
        "permisionList": ["夜间用电浪费诊断"],
        "children": []
      }, {
        "id": 45,
        "parent": 4,
        "name": "space",
        "caption": "电流向及线损分析",
        "catalog": null,
        "url": "/energy/elecAnalysis",
        "sequence": 5,
        "icon": null,
        "permisionList": ["电流向及线损分析"],
        "children": []
      }]
    }, {
      "id": 5,
      "parent": 1,
      "name": "space",
      "caption": "人工采集",
      "catalog": null,
      "url": "/manMadeCollect",
      "sequence": 4,
      "icon": null,
      "permisionList": ["人工采集"],
      "children": [{
        "id": 71,
        "parent": 7,
        "name": "space",
        "caption": "人工采集列表",
        "catalog": null,
        "url": "/manMadeCollect",
        "sequence": 1,
        "icon": null,
        "permisionList": ["空间报表查看"],
        "children": []
      }, {
        "id": 72,
        "parent": 7,
        "name": "space",
        "caption": "自动采集列表",
        "catalog": null,
        "url": "/autoCollect",
        "sequence": 2,
        "icon": null,
        "permisionList": ["分项报表查看"],
        "children": []
      }]
    }, {
      "id": 6,
      "parent": 1,
      "name": "space",
      "caption": "设备表记",
      "catalog": null,
      "url": "/deviceRecord",
      "sequence": 5,
      "icon": null,
      "permisionList": ["设备表记查看", "设备表导入"],
      "children": []
    }, {
      "id": 7,
      "parent": 1,
      "name": "space",
      "caption": "数据报表",
      "catalog": null,
      "url": "/spaceReport",
      "sequence": 6,
      "icon": null,
      "permisionList": [],
      "children": [{
        "id": 71,
        "parent": 7,
        "name": "space",
        "caption": "空间能耗报表",
        "catalog": null,
        "url": "/spaceReport",
        "sequence": 1,
        "icon": null,
        "permisionList": ["空间报表查看"],
        "children": []
      }, {
        "id": 72,
        "parent": 7,
        "name": "space",
        "caption": "分项能耗报表",
        "catalog": null,
        "url": "/categoryReport",
        "sequence": 2,
        "icon": null,
        "permisionList": ["分项报表查看"],
        "children": []
      }]
    }, {
      "id": 10,
      "parent": 1,
      "name": "space",
      "caption": "系统管理",
      "catalog": null,
      "url": "/userManage",
      "sequence": 8,
      "icon": null,
      "permisionList": [],
      "children": [{
        "id": 101,
        "parent": 10,
        "name": "space",
        "caption": "用户管理",
        "catalog": null,
        "url": "/userManage",
        "sequence": 1,
        "icon": null,
        "permisionList": ["用户查看", "添加用户", "修改用户", "重置密码", "导出用户信息"],
        "children": []
      }, {
        "id": 104,
        "parent": 10,
        "name": "space",
        "caption": "角色管理",
        "catalog": null,
        "url": "/roleManage",
        "sequence": 2,
        "icon": null,
        "permisionList": ["角色查询", "角色修改", "角色添加", "角色删除"],
        "children": []
      }, {
        "id": 102,
        "parent": 10,
        "name": "space",
        "caption": "组织机构",
        "catalog": null,
        "url": "/departmentManage",
        "sequence": 3,
        "icon": null,
        "permisionList": ["组织机构查看", "组织机构添加", "组织机构修改", "组织机构删除"],
        "children": []
      }, {
        "id": 103,
        "parent": 10,
        "name": "space",
        "caption": "空间管理",
        "catalog": null,
        "url": "/spaceManage",
        "sequence": 4,
        "icon": null,
        "permisionList": ["空间查看", "空间添加", "空间修改", "空间删除"],
        "children": []
      }, {
        "id": 105,
        "parent": 10,
        "name": "space",
        "caption": "操作日志",
        "catalog": null,
        "url": "/operatorLog",
        "sequence": 6,
        "icon": null,
        "permisionList": ["日志查看"],
        "children": []
      }]
    }]
  }

  incomeList = [{
    name: "代收款项",
    id: 1,
    unit: "元",
    value: 350000,
  }, {
    name: "经营收入",
    id: 2,
    unit: "元",
    value: 46000,
  }, {
    name: "财务收入",
    id: 3,
    unit: "元",
    value: 38000,
  }, {
    name: "主收入收款",
    id: 4,
    unit: "元",
    value: 39000,
  }]

  deviceStatusList = [{
    name: "正常",
    id: 1,
    value: 520,
  }, {
    name: "未知",
    id: 2,
    value: 310,
  }, {
    name: "警告",
    id: 3,
    value: 200,
  }, {
    name: "错误",
    id: 4,
    value: 300,
  }]

  // 跳转链接
  loadOldPage(item) {
    /* sessionStorage.setItem('park_home_Page', location.href);
    location.href = OLDPROJECTHOME + '?forward=' + url.split('@')[1]; */

    sessionStorage.setItem('vibe_menuList', JSON.stringify(item));
    router.push('/vibe-web')
  }

}
export default new commonFun()
