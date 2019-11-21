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
    "name2": "space",
    "name": "根节点\t",
    "catalog": null,
    "routeAddress": null,
    "sequence": 1,
    "icon": 'iconshouye',
    "permisionList": [],
    "childNode": [{
      "id": 11,
      "parent": 1,
      "name2": "space",
      "name": "首页",
      "catalog": null,
      "routeAddress": "/energy/homePage",
      "sequence": 1,
      "icon": 'iconshouye',
      "permisionList": ["首页"],
      "childNode": []
    }, {
      "id": 2,
      "parent": 1,
      "name2": "space",
      "name": "能耗展示",
      "catalog": null,
      "routeAddress": "/energy/timeEnergy",
      "sequence": 1,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 21,
        "parent": 2,
        "name2": "space",
        "name": "分时能耗",
        "catalog": null,
        "routeAddress": "/energy/timeEnergy",
        "sequence": 1,
        "icon": '',
        "permisionList": ["分时能耗"],
        "childNode": []
      }, {
        "id": 22,
        "parent": 2,
        "name2": "space",
        "name": "分项能耗",
        "catalog": null,
        "routeAddress": "/energy/categoryEnergy",
        "sequence": 2,
        "icon": '',
        "permisionList": ["分项能耗"],
        "childNode": []
      }, {
        "id": 23,
        "parent": 2,
        "name2": "space",
        "name": "能耗排名",
        "catalog": null,
        "routeAddress": "/energy/rankEnergy",
        "sequence": 3,
        "icon": '',
        "permisionList": ["能耗排名"],
        "childNode": []
      }]
    }, {
      "id": 3,
      "parent": 1,
      "name2": "space",
      "name": "统计分析",
      "catalog": null,
      "routeAddress": "/deviceAnalysis",
      "sequence": 2,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 31,
        "parent": 3,
        "name2": "space",
        "name": "设备分析",
        "catalog": null,
        "routeAddress": "/deviceAnalysis",
        "sequence": 1,
        "icon": '',
        "permisionList": ["设备状态分析"],
        "childNode": []
      }, {
        "id": 32,
        "parent": 3,
        "name2": "space",
        "name": "相关性分析",
        "catalog": null,
        "routeAddress": "/correlationAnalysis",
        "sequence": 2,
        "icon": '',
        "permisionList": ["相关分析"],
        "childNode": []
      }, {
        "id": 33,
        "parent": 3,
        "name2": "space",
        "name": "统计对比",
        "catalog": null,
        "routeAddress": "/statisCompare",
        "sequence": 3,
        "icon": '',
        "permisionList": ["统计对比"],
        "childNode": []
      }, {
        "id": 34,
        "parent": 3,
        "name2": "space",
        "name": "往期统计",
        "catalog": null,
        "routeAddress": "/historyStatis",
        "sequence": 4,
        "icon": '',
        "permisionList": ["往期统计"],
        "childNode": []
      }, {
        "id": 35,
        "parent": 3,
        "name2": "space",
        "name": "能耗对比分析",
        "catalog": null,
        "routeAddress": "/energy/compare",
        "sequence": 5,
        "icon": '',
        "permisionList": [],
        "childNode": [{
          "id": 36,
          "parent": 35,
          "name2": "space",
          "name": "空间对比",
          "catalog": null,
          "routeAddress": "/energy/zoomCompare",
          "sequence": 1,
          "icon": '',
          "permisionList": ["空间对比"],
          "childNode": []
        }, {
          "id": 37,
          "parent": 35,
          "name2": "space",
          "name": "同比环比分析",
          "catalog": null,
          "routeAddress": "/energy/tbhbAnalysis",
          "sequence": 2,
          "icon": '',
          "permisionList": ["同比环比分析"],
          "childNode": []
        }, {
          "id": 38,
          "parent": 35,
          "name2": "space",
          "name": "能耗类型对比",
          "catalog": null,
          "routeAddress": "/energy/typeCompare",
          "sequence": 3,
          "icon": '',
          "permisionList": ["能耗类型对比"],
          "childNode": []
        }]
      }]
    }, {
      "id": 4,
      "parent": 1,
      "name2": "space",
      "name": "节能诊断",
      "catalog": null,
      "routeAddress": "/energy/waterDiffer",
      "sequence": 3,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 41,
        "parent": 4,
        "name2": "space",
        "name": "水量异常突增诊断",
        "catalog": null,
        "routeAddress": "/energy/waterDiffer",
        "sequence": 1,
        "icon": '',
        "permisionList": ["水量异常突增诊断"],
        "childNode": []
      }, {
        "id": 42,
        "parent": 4,
        "name2": "space",
        "name": "夜间用水跑冒滴漏诊断",
        "catalog": null,
        "routeAddress": "/energy/nightWater",
        "sequence": 2,
        "icon": '',
        "permisionList": ["夜间用水跑冒滴漏诊断"],
        "childNode": []
      }, {
        "id": 43,
        "parent": 4,
        "name2": "space",
        "name": "用电量异常突增诊断",
        "catalog": null,
        "routeAddress": "/energy/elecDiffer",
        "sequence": 3,
        "icon": '',
        "permisionList": ["用电量异常突增诊断"],
        "childNode": []
      }, {
        "id": 44,
        "parent": 4,
        "name2": "space",
        "name": "夜间用电浪费诊断",
        "catalog": null,
        "routeAddress": "/energy/nightElec",
        "sequence": 4,
        "icon": '',
        "permisionList": ["夜间用电浪费诊断"],
        "childNode": []
      }, {
        "id": 45,
        "parent": 4,
        "name2": "space",
        "name": "电流向及线损分析",
        "catalog": null,
        "routeAddress": "/energy/elecAnalysis",
        "sequence": 5,
        "icon": '',
        "permisionList": ["电流向及线损分析"],
        "childNode": []
      }]
    }, {
      "id": 5,
      "parent": 1,
      "name2": "space",
      "name": "人工采集",
      "catalog": null,
      "routeAddress": "/manMadeCollect",
      "sequence": 4,
      "icon": 'iconshouye',
      "permisionList": ["人工采集"],
      "childNode": [{
        "id": 71,
        "parent": 7,
        "name2": "space",
        "name": "人工采集列表",
        "catalog": null,
        "routeAddress": "/manMadeCollect",
        "sequence": 1,
        "icon": '',
        "permisionList": ["空间报表查看"],
        "childNode": []
      }, {
        "id": 72,
        "parent": 7,
        "name2": "space",
        "name": "自动采集列表",
        "catalog": null,
        "routeAddress": "/autoCollect",
        "sequence": 2,
        "icon": '',
        "permisionList": ["分项报表查看"],
        "childNode": []
      }]
    }, {
      "id": 6,
      "parent": 1,
      "name2": "space",
      "name": "设备表记",
      "catalog": null,
      "routeAddress": "/deviceRecord",
      "sequence": 5,
      "icon": 'iconshouye',
      "permisionList": ["设备表记查看", "设备表导入"],
      "childNode": []
    }, {
      "id": 7,
      "parent": 1,
      "name2": "space",
      "name": "数据报表",
      "catalog": null,
      "routeAddress": "/spaceReport",
      "sequence": 6,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 71,
        "parent": 7,
        "name2": "space",
        "name": "空间能耗报表",
        "catalog": null,
        "routeAddress": "/spaceReport",
        "sequence": 1,
        "icon": '',
        "permisionList": ["空间报表查看"],
        "childNode": []
      }, {
        "id": 72,
        "parent": 7,
        "name2": "space",
        "name": "分项能耗报表",
        "catalog": null,
        "routeAddress": "/categoryReport",
        "sequence": 2,
        "icon": '',
        "permisionList": ["分项报表查看"],
        "childNode": []
      }]
    }, {
      "id": 10,
      "parent": 1,
      "name2": "space",
      "name": "系统管理",
      "catalog": null,
      "routeAddress": "/userManage",
      "sequence": 8,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 101,
        "parent": 10,
        "name2": "space",
        "name": "用户管理",
        "catalog": null,
        "routeAddress": "/userManage",
        "sequence": 1,
        "icon": 'iconshouye',
        "permisionList": ["用户查看", "添加用户", "修改用户", "重置密码", "导出用户信息"],
        "childNode": []
      }, {
        "id": 104,
        "parent": 10,
        "name2": "space",
        "name": "角色管理",
        "catalog": null,
        "routeAddress": "/roleManage",
        "sequence": 2,
        "icon": 'iconshouye',
        "permisionList": ["角色查询", "角色修改", "角色添加", "角色删除"],
        "childNode": []
      }, {
        "id": 102,
        "parent": 10,
        "name2": "space",
        "name": "组织机构",
        "catalog": null,
        "routeAddress": "/departmentManage",
        "sequence": 3,
        "icon": 'iconshouye',
        "permisionList": ["组织机构查看", "组织机构添加", "组织机构修改", "组织机构删除"],
        "childNode": []
      }, {
        "id": 103,
        "parent": 10,
        "name2": "space",
        "name": "空间管理",
        "catalog": null,
        "routeAddress": "/spaceManage",
        "sequence": 4,
        "icon": 'iconshouye',
        "permisionList": ["空间查看", "空间添加", "空间修改", "空间删除"],
        "childNode": []
      }, {
        "id": 105,
        "parent": 10,
        "name2": "space",
        "name": "操作日志",
        "catalog": null,
        "routeAddress": "/operatorLog",
        "sequence": 6,
        "icon": 'iconshouye',
        "permisionList": ["日志查看"],
        "childNode": []
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
    location.href = OLDPROJECTHOME + '?forward=' + routeAddress.split('@')[1]; */

    sessionStorage.setItem('vibe_menuList', JSON.stringify(item));
    router.push('/vibe-web')
  }

}
export default new commonFun()
