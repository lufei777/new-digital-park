export const CommonDic = {
	sexDic: [
		{
			label: '男',
			value: '1'
		},
		{
			label: '女',
			value: '2'
		},
		{
			label: '保密',
			value: '0'
		}
	],
	booleanDic: [
		{
			label: '是',
			value: 1
		},
		{
			label: '否',
			value: 0
		}
	]
};

// 租赁管理
export const LeaseManageDic = {
	// 是否可出租
	isRent: [
		{
			label: '是',
			value: 1
		},
		{
			label: '否',
			value: 2
		}
	],
	// 总价单位
	PriceType: [
		{
			label: '元/月',
			value: 1
		},
		{
			label: '元/天',
			value: 2
		}
	],
	// 房屋出租状态
	HouseStatus: [
		{
			label: '已租',
			value: 2
		},
		{
			label: '未租',
			value: 1
		}
	],
	//租赁合同  付费周期
	PayCycleType: [
		{
			label: '月付',
			value: 1
		},
		{
			label: '季付',
			value: 2
		}
	],
	//租赁合同  付费计算方式
	PayCountWayType: [
		{
			label: '月',
			value: 1
		},
		{
			label: '日',
			value: 2
		},
		{
			label: '月+日',
			value: 3
		}
	],
	// 审核状态
	checkStatus: [{ label: '已审核', value: 2 }, { label: '待审核', value: 1 }]
};

export const StockDic = {
	stockInApply: [
		{
			label: '采购入库',
			value: 1
		},
		{
			label: '其他入库',
			value: 2
		}
	],

	recordStatus: {
		0: '待验',
		1: '已入库',
		2: '已作废',
		3: '已收回'
	}
};

export const AssetDic = {
	singleCount: [
		{
			label: '是',
			value: 1
		},
		{
			label: '否',
			value: 0
		}
	],

	applyType: {
		1: '资产领用'
	},

	assetStatus: {
		0: '领用'
	}
};
// 人事管理
export const PersonalManageDic = {
	// 员工状态
	employeeStatus: [
		{
			label: '临时',
			value: '1'
		},
		{
			label: '试用',
			value: '2'
		},
		{
			label: '正式',
			value: '3'
		}
	],
	// 员工类型
	employeeType: [
		{
			label: '外包',
			value: '1'
		},
		{
			label: '兼职',
			value: '2'
		},
		{
			label: '全职',
			value: '3'
		}
	],
	// 户口类型
	residenceType: [{ label: '城市', value: '1' }, { label: '农村', value: '2' }],
	// 婚姻状况
	maritalStatus: [{ label: '已婚', value: '1' }, { label: '未婚', value: '2' }],
	// 政治面貌
	politicalStatus: [
		{ label: '中共党员', value: '0' },
		{ label: '中共预备党员', value: '1' },
		{ label: '共青团员', value: '2' },
		{ label: '群众', value: '3' }
	],
	// 教育背景
	educationBackground: [
		{
			label: '本科',
			value: '7'
		},
		{
			label: '硕士研究生',
			value: '8'
		},
		{
			label: '博士研究生',
			value: '9'
		},
		{
			label: '专科（高职、高专、高技）',
			value: '6'
		},
		{
			label: '中技',
			value: '5'
		},
		{
			label: '职校',
			value: '4'
		},
		{
			label: '中专',
			value: '3'
		},
		{
			label: '高级中学',
			value: '2'
		},
		{
			label: '初级中学',
			value: '1'
		},
		{
			label: '小学',
			value: '0'
		}
	],
	// 学位
	degree: [
		{
			label: '学士',
			value: '0'
		},
		{
			label: '硕士',
			value: '1'
		},
		{
			label: '博士',
			value: '2'
		}
	],
	// 健康状况
	healthStatus: [
		{
			label: '优秀',
			value: '1'
		},
		{
			label: '良好',
			value: '2'
		},
		{
			label: '一般',
			value: '3'
		},
		{
			label: '较差',
			value: '4'
		}
	]
};

// 收支管理
export const RevenueExpendManageDic = {
	// 审核类型
	examineType: [{ label: '待审核', value: 0 }, { label: '通过', value: 1 }, { label: '驳回', value: 2 }],
	// 审核状态
	examineState: [
		{ label: '待审核', value: 0 },
		{ label: '已审核', value: 1 },
		{ label: '已驳回', value: 2 },
		{ label: '审核中', value: 3 }
	],
	// 费用名称
	moduleId: [{ label: '租赁', value: 0 }, { label: '服务费', value: 1 }, { label: '专利费', value: 2 }],
	// 资金状态
	moneyState: [{ label: '未到账', value: 0 }, { label: '已到账', value: 1 }, { label: '已逾期', value: 2 }],
	//  收费类型
	tradeType: [{ label: '现金', value: 0 }, { label: '转账', value: 1 }],
	// 收支和指出对应的不同名称
	fields: {
		receivMoney: ['应收金额', '支出金额'],
		recordName: ['收入名称', '支出名称'],
		moduleId: ['收入类型', '支出类型'],
		payName: ['收款方', '支付方'],
		incomeTime: ['入账日期', '支出日期']
	},
	// 收支和指出对应的不同title
	titles: {
		add: ['发起收费', '发起支出'],
		edit: ['编辑收费', '编辑支出']
	}
};

// 停车管理
export const parkingManageDic = {
	isNull: [
		{
			label: '有停车',
			value: 1
		},
		{
			label: '车空位',
			value: 2
		}
	],
	carNumColor: [
		{
			label: '蓝',
			value: 0
		},
		{
			label: '黄',
			value: 1
		},
		{
			label: '白',
			value: 2
		},
		{
			label: '黑',
			value: 3
		},
		{
			label: '未识别',
			value: 99
		}
	],
	carType: [
		{
			label: '小型车',
			value: 1
		},
		{
			label: '大型车',
			value: 2
		}
	],
	carColor: [
		{
			label: '白色',
			value: 0
		},
		{
			label: '黑色',
			value: 1
		},
		{
			label: '红色',
			value: 2
		},
		{
			label: '黄色',
			value: 3
		},
		{
			label: '银灰色',
			value: 4
		},
		{
			label: '蓝色',
			value: 5
		},
		{
			label: '绿色',
			value: 6
		},
		{
			label: '橙色',
			value: 7
		},
		{
			label: '紫色',
			value: 8
		},
		{
			label: '青色',
			value: 9
		},
		{
			label: '粉色',
			value: 10
		},
		{
			label: '棕色',
			value: 11
		},
		{
			label: '未识别',
			value: 99
		},
		{
			label: '其他',
			value: 100
		}
	]
};

export const BooleanDic = {
	isOrNot: [{ label: '是', value: '1' }, { label: '否', value: '2' }]
};

//导出数据
export const ExportDataDic = {
	timeType: [
		{
			label: '年',
			value: 1
		},
		{
			label: '月',
			value: 2
		},
		{
			label: '日',
			value: 3
		}
	]
};

// 资产类别
export const AssetKind = [
	{
		label: '空间',
		value: 'SPACE',
		kind: 0
	},
	{
		label: '设备',
		value: 'DEVICE',
		kind: 1
	},
	{
		label: '服务',
		value: 'SERVICE',
		kind: 2
	},
	{
		label: '监测器',
		value: 'PROBE',
		kind: 3
	},
	{
		label: '控制器',
		value: 'CONTROL',
		kind: 4
	}
];

// 资产类型
export const AssetType = {
	//空间，表示一个房间
	SPACE: {
		kind: 0,
		text: 'SPACE'
	},
	//设备
	DEVICE: {
		kind: 1,
		text: 'DEVICE',
		catalogId: 2002
	},
	//服务器
	SERVICE: {
		kind: 2,
		text: 'SERVICE'
	},
	//监测器
	PROBE: {
		kind: 3,
		text: 'PROBE'
	},
	//控制器
	CONTROL: {
		kind: 4,
		text: 'CONTROL'
	}
};

// 资产状态错误提示
export const AssetState = {
	NORMAL: {
		text: 'NORMAL',
		value: 1,
		desc: '传感器状态正常',
		valueStr: '正常'
	},
	WARNING: {
		text: 'WARNING',
		value: 2,
		desc: '监测值达到告警条件',
		valueStr: '告警'
	},
	ERROR: {
		text: 'ERROR',
		value: 3,
		desc: '数据采集过程中发生错误',
		valueStr: '错误'
	},
	INITIALIZE: {
		text: 'INITIALIZE',
		value: 4,
		desc: '正在获取数据',
		valueStr: '正在初始化'
	},
	FAILURE: {
		text: 'FAILURE',
		value: 5,
		desc: '数据传输通信故障',
		valueStr: '通信故障'
	}
};

// 项目名称
export const ProjectName = {
	ZG: 'zg', // 中钢
	YDCity: 'ydCity', //项目名称，大屏名称
	NORMAL: 'normal', //通用大屏
	NORBULINGKA: 'norbulingka'
};

// 根据项目显示不同的title
export const Title = {
	[ProjectName.ZG]: '中钢大厦数字建筑运管平台',
	[ProjectName.YDCity]: '伊甸城BIM运管平台',
	[ProjectName.NORBULINGKA]: '罗布林卡世界文化遗产监测预警平台'
};
export const electricityManageDic = {
	// 电表用途
	useType: [
		{
			label: '收费',
			value: 2
		},
		{
			label: '自用',
			value: 1
		}
	],
	// 用电收费账单状态
	detailsStatus: [
		{
			label: '通过',
			value: 2
		},
		{
			label: '驳回',
			value: 3
		}
	],
	// 审核状态
	status: [
		{
			label: '待审核',
			value: 2
		},
		{
			label: '已录入',
			value: 0
		},
		{
			label: '审核通过',
			value: 3
		},
		{
			label: '驳回',
			value: 4
		}
	]
};

// 预警报警
export const WarningAlerm = {
	// 报警级别
	// Alarm level
	alarmLevel: [
		{ label: '全部', value: 1 },
		{ label: '普通', value: 2 },
		{ label: '严重', value: 3 },
		{ label: '紧急', value: 4 }
	],
	// 报警状态
	// Alarm status
	alarmStatus: [{ label: '未处理', value: 1 }, { label: '已处理', value: 2 }],
	// 子系统
	// subsystem
	subSystem: [
		{ label: '门禁管理', value: 1 },
		{ label: '环境监测', value: 2 },
		{ label: '视频控制', value: 3 },
		{ label: '变配电', value: 4 }
	],
	// 设备类型
	// device type
	deviceType: [{ label: '门禁', value: 1 }, { label: '温湿度传感器', value: 2 }],
	// 报警类型
	// Alarm type
	alarmType: [{ label: '通讯故障', value: 2 }, { label: '设备运行报警', value: 3 }, { label: '其他类型报警', value: 4 }],
	// 录入类型
	// Input type
	inputType: [{ label: '点表导入', value: 1 }, { label: '手动录入', value: 2 }],
	// 处理人员
	// handling person
	handingPerson: [{ label: '张三', value: 1 }, { label: '李四', value: 2 }, { label: '王五', value: 3 }],
	// 设备名称
	// devicename
	deviceName: [
		{ label: '1#会议室温温度传感器', value: 1 },
		{ label: '2#会议室温温度传感器', value: 2 },
		{ label: '3#会议室温温度传感器', value: 3 }
	],
	// 设备点位
	// equipmentsite
	equipmentSite: [
		{ label: '1#会议室温监测', value: 1 },
		{ label: '2#会议室温监测', value: 2 },
		{ label: '3#会议室温监测', value: 3 }
	],
	// 处理组名称
	grounpName: [{ label: '安保部处理组A', value: 1 }, { label: '安保部处理组B', value: 2 }, { label: '安保部处理组C', value: 3 }],
	// 点位类型
	// Point type
	pointType: [{ label: '温度监测', value: 1 }, { label: '湿度监测', value: 2 }],
	// 抑制
	// restrain
	restrain: [{ label: '抑制', value: 1 }, { label: '不抑制', value: 2 }],
	// 通知方式
	// way of notification
	notificationWay: [{ label: '短信', value: 1 }, { label: '语音', value: 2 }, { label: '弹框', value: 3 }],
	// 通知组
	notificationGrounp: [
		{ label: '环境/严重/处理组A', value: 1 },
		{ label: '环境/严重/处理组B', value: 2 },
		{ label: '环境/严重/处理组C', value: 3 }
	],
	// 弹框类型
	dialogType: [{ label: '自动关闭', value: 1 }, { label: '手动关闭', value: 2 }],
	// 通知人员=== 》处理人员
	// 时间设置
	timeSetting: [
		{ label: '1', value: 1 },
		{ label: '2', value: 2 },
		{ label: '3', value: 3 },
		{ label: '4', value: 4 },
		{ label: '5', value: 5 }
	],
	// 重复交验中的复选框
	reCheckbox: [
		{ label: '1#温湿度传感器', value: 1 },
		{ label: '2#温湿度传感器', value: 2 },
		{ label: '3#温湿度传感器', value: 3 },
		{ label: '4#温湿度传感器', value: 4 },
		{ label: '5#温湿度传感器', value: 5 },
		{ label: '全选', value: 6 }
	],
	// 弹窗的启用禁用
	// Enable disable
	enableDisAble: [{ label: '启用', value: 1 }, { label: '禁用', value: 2 }],
	// 报警应答弹框复选框
	alarmResponse: [
		{ label: '设备调试', value: 1 },
		{ label: '真实故障', value: 2 },
		{ label: '误报', value: 3 },
		{ label: '其他', value: 4 }
	],
	// 优先级
	priority: [{ label: '正常', value: 1 }, { label: '重要', value: 2 }, { label: '紧急', value: 3 }]
};

// 罗布林卡
export const Norbulingka = {
	// 工程分类
	proType: [
		// { label: '未选择', value: 1 },
		{ label: '文物维修', value: 1 },
		{ label: '保护性设施', value: 2 },
		{ label: '现场展示', value: 3 },
		{ label: '环境整治', value: 4 }
	],
	// 类型选择
	typeSelect: [
		{ label: '本体情况', value: 1 },
		{ label: '病害分析', value: 2 },
		{ label: '施工情况', value: 3 },
		{ label: '游客情况', value: 4 },
		{ label: '考古发掘', value: 5 },
		{ label: '其他', value: 6 }
	]
};

export const TaskofficeLocationType = {
	officeLocationType: [
		{
			value: 0,
			label: '公司'
		},
		{
			value: 1,
			label: '现场'
		}
	]
};

export const SystemDic = {
	isHidden: [{
		label: '隐藏',
		value: 1
	}, {
		label: '可见',
		value: 0
	}],

	hiddenStatus: {
		1: '隐藏',
		0: '可见'
	},

	pType: [{
		label: '读权限',
		value: 0
	}, {
		label: '写权限',
		value: 1
	}],

	pTypeStatus: {
		0: '读权限',
		1: '写权限'
	}
};

// 用电管理
export const ElectricityManageDic = {
	// 电表用途
	useType: [
		{
			label: '收费',
			value: 2
		},
		{
			label: '自用',
			value: 1
		}
	],
	// 用电收费账单状态
	// 审核状态
	status: [
		{
			label: '待审核',
			value: 0
		},
		{
			label: '驳回',
			value: 1
		},
		{
			label: '已录入',
			value: 2
		},
		{
			label: '通过',
			value: 3
		}
	]
}
//任务管理
export const TaskManageDic = {
	taskTabs: [{
		text: "全部",
		name: "frist"
	},
	{
		text: "我发起的",
		name: "second"
	},
	{
		text: "我收到的",
		name: "third"
	}],
	taskType: [{
		value: 1,
		label: "巡检任务",
		nodes: []
	},
	{
		value: 2,
		label: "维修任务",
		nodes: []
	},
	{
		value: 3,
		label: "保养任务",
		nodes: []
	},
	{
		value: 4,
		label: "流程任务",
		nodes: []
	},
	{
		value: 5,
		label: "审批任务",
		nodes: []
	},
	{
		value: 6,
		label: "其他任务",
		nodes: []
	}],
	sendTaskStatus: {
		2: "待接",
		3: "处理中",
		4: "已完成",
		5: "挂单中",
	},
	acceptTaskStatus: {
		1: "待派",
		2: "已派",
		3: "处理中",
		4: "已完成",
		5: "挂单中"
	},
	urgentStatus: [{
		value: "1",
		label: '正常'
	},
	{
		value: "2",
		label: '重要'
	},
	{
		value: "3",
		label: '紧急'
	}],
	locationStatus: [{
		value: 0,
		label: '公司'
	},
	{
		value: 1,
		label: '现场'
	}],
	supplementStatus: [{
		value: 0,
		label: '补录'
	},
	{
		value: 1,
		label: '正常'
	}],
	priorityType: [
		{
			value: '1',
			label: '正常'
		},
		{
			value: '2',
			label: '重要'
		},
		{
			value: '3',
			label: '紧急'
		}
	]
}
//维保管理
export const MaintenanceManageDic = {
	maintenanceType: [{
		value: "1",
		label: '高低压变配电系统'
	},
	{
		value: "2",
		label: '消防系统配电设备'
	},
	{
		value: "3",
		label: '给排水系统配电设备'
	}],

	payWayStatus: [{
		value: "1",
		label: '月结'
	},
	{
		value: "2",
		label: '实时结账'
	}],

	payRadio: [{
		value: "0",
		label: '全部'
	},{
		value: "1",
		label: '收费任务'
	},
	{
		value: "2",
		label: '免费任务'
	}],

	taskStatus:[{
		value: "0",
		label: '全部'
	},{
		value: "1",
		label: '待派单'
	},
	{
		value: "2",
		label: '待接单'
	},
	{
		value: "3",
		label: '处理中'
	},
	{
		value: "4",
		label: '挂起中'
	},
	{
		value: "5",
		label: '待审核'
	},
	{
		value: "6",
		label: '已完成'
	},
	{
		value: "7",
		label: '审核不通过'
	},
	{
		value: "8",
		label: '已退回'
	},
	{
		value: "9",
		label: '已关闭'
	}]
}