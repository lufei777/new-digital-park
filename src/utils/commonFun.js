class commonFun {
  //this,删除的id,没有id时的提示信息，点击确定的回调函数
  deleteTip(that,deleteId,msgTip,callBack){
    if(!deleteId){
      that.$message({
        type: 'warning',
        message: msgTip,
        duration:1000
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

  productList=[
    {id:1,name:'能源管理',url:'/#/energy',bgUrl:'nygl.png'},
    {id:2,name:'资产管理',url:'/#/assetManage',bgUrl:'zcgl.png'},
    {id:3,name:'能源管理',bgUrl:'nygl.png'},
    {id:4,name:'通行管理',bgUrl:'nygl.png'},
    {id:5,name:'经营管理',bgUrl:'nygl.png'},
    {id:6,name:'综合安防',bgUrl:'nygl.png'},
    {id:7,name:'应急指挥',bgUrl:'nygl.png'},
    {id:8,name:'资产管理',bgUrl:'nygl.png'},
    {id:9,name:'能源管理',bgUrl:'nygl.png'},
    {id:10,name:'资产管理',bgUrl:'nygl.png'},
    {id:11,name:'能源管理',bgUrl:'nygl.png'},
    {id:22,name:'资产管理',bgUrl:'nygl.png'},
    {id:13,name:'能源管理',bgUrl:'nygl.png'},
    {id:14,name:'资产管理',bgUrl:'nygl.png'},
    {id:15,name:'能源管理',bgUrl:'nygl.png'},
    {id:16,name:'资产管理',bgUrl:'nygl.png'},
    {id:17,name:'能源管理',bgUrl:'nygl.png'},
    {id:18,name:'资产管理',bgUrl:'nygl.png'}]

  navList = [{
    id:'1',name:'首页',children:[]
  },{
    id:'2',name:'运维',children:[{
      id:'3',name:'综合安防',children:[{
        id:'16',name:'threeDemo1',children:[]
      },{
        id:'17',name:'threeDemo2',children:[]
      }]
    },{
      id:'4',name:'应急指挥',children:[{
        id:'18',name:'threeDemo3',children:[]
      },{
        id:'19',name:'threeDemo4',children:[]
      }]
    }]
  },{
    id:'5',name:'经营',children:[{
      id:'13',name:'测试1',children:[]
    },{
      id:'14',name:'测试2',children:[]
    }]
  },{
    id:'6',name:'服务',children:[]
  },{
    id:'7',name:'办公',children:[]
  }]
}
export default new commonFun()
