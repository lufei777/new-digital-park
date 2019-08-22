class commonData {
  menuData={
    "id":1,
    "parent":0,
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
        "url": "/energy/homepage",
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
        "url": "/energy",
        "sequence": 1,
        "icon": null,
        "permisionList": [],
        "children": [{
          "id": 21,
          "parent": 2,
          "name": "space",
          "caption": "分时能耗",
          "catalog": null,
          "url": "/html/energyNew/energy_time-share.html",
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
          "url": "/html/energyNew/energy_subentry.html",
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
          "url": "/html/energyNew/energy_ranking.html",
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
        "url": "/html/energyNew/electricity_table.html",
        "sequence": 3,
        "icon": null,
        "permisionList": [],
        "children": [{
          "id": 41,
          "parent": 4,
          "name": "space",
          "caption": "水量异常突增诊断",
          "catalog": null,
          "url": "/html/energyNew/water_table.html",
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
          "url": "/html/energyNew/water_night.html",
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
          "url": "/html/energyNew/electricity_table.html",
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
          "url": "/html/energyNew/elec_night.html",
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
          "url": "/html/unauthorized.html",
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
        "url": "/html/energyms/handle_list.html",
        "sequence": 4,
        "icon": null,
        "permisionList": ["人工采集"],
        "children": []
      }, {
        "id": 6,
        "parent": 1,
        "name": "space",
        "caption": "设备表记",
        "catalog": null,
        "url": "html/deviceMeter/deviceMeter_index.html",
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
        "url": "/html/energyms/dataReport_building.html",
        "sequence": 6,
        "icon": null,
        "permisionList": [],
        "children": [{
          "id": 71,
          "parent": 7,
          "name": "space",
          "caption": "空间能耗报表",
          "catalog": null,
          "url": "/html/energyms/dataReport_building.html",
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
          "url": "/html/energyms/dataReport_building.html?openid=sub",
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
        "url": "/html/people/people_index.html",
        "sequence": 8,
        "icon": null,
        "permisionList": [],
        "children": [{
          "id": 101,
          "parent": 10,
          "name": "space",
          "caption": "用户管理",
          "catalog": null,
          "url": "/html/people/people_index.html",
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
          "url": "/html/people/role_index.html",
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
          "url": "/html/department/department_index.html",
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
          "url": "/html/space/space_index.html",
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
          "url": "/html/log/logs.html",
          "sequence": 6,
          "icon": null,
          "permisionList": ["日志查看"],
          "children": []
        }]
      }]
  }
}
export default new commonData()
