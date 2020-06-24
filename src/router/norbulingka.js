// 罗布林卡的项目的路由配置
// 遗产要素======================================================
// 藏品档案
const Heritage = () => import('../pages/norbulingka/heritage/index.vue');
// 添加 ， 编辑 ， 详情页面
const AddDetail = () => import('../pages/norbulingka/heritage/addDetail.vue');
// 项目工程======================================================
// 保护工程记录
const ProtectRecord = () => import('../pages/norbulingka/engineering/index.vue');
// 添加 编辑	详情
const DetailEdit = () => import('../pages/norbulingka/engineering/detaileEdit.vue');
// 日常巡查======================================================
// 日常巡查记录
const RoutinInspections = () => import('../pages/norbulingka/routineInspections/index.vue');
// 实测录入======================================================
// [汇总信息,本体情况,病害分析,施工情况,考古发掘,游客情况,其他]
// 实测录入清单Home
const Home = () => import('../pages/norbulingka/theMeasuredInput/index.vue');
// 汇总信息
const SummaryInfo = () => import('../pages/norbulingka/theMeasuredInput/othersPath/summaryInformation.vue');
// 本地情况
const Ontology = () => import('../pages/norbulingka/theMeasuredInput/othersPath/ontology.vue');
// 病害分析
const Analysis = () => import('../pages/norbulingka/theMeasuredInput/othersPath/analysis.vue');
// 施工情况
const Construction = () => import('../pages/norbulingka/theMeasuredInput/othersPath/construction.vue');
// 考古发掘
const Archaeological = () => import('../pages/norbulingka/theMeasuredInput/othersPath/Archaeological.vue');
// 游客情况
const Tourists = () => import('../pages/norbulingka/theMeasuredInput/othersPath/tourists.vue');
// 其他
const Others = () => import('../pages/norbulingka/theMeasuredInput/othersPath/others.vue');
// 监测报告======================================================
// 遗产评估
const HeritageEvaluation = () => import('../pages/norbulingka/monitoringReport/index.vue');
export default [
	{
		path: '/norbulinka',
		name: 'norbulinka',
		component: () => import('@/pages/commonProject/coms/commonIndex'),
		// component:() => import('../pages/norbulingka'),
		redirect: '/heritage',
		children: [
			// 遗产要素======================================================

			{
				// 藏品档案
				path: '/heritage',
				name: 'Heritage',
				// meta: { title: '藏品档案' },
				meta: { title: '遗产要素' },
				component: Heritage
			},
			{
				// 藏品档案==》编辑，详情，添加
				path: '/addeditdetail',
				name: 'AddDetail',
				meta: { title: '添加藏品档案' },
				component: AddDetail
			},
			// 项目工程======================================================
			{
				// 保护工程记录
				path: '/protectrecord',
				name: 'ProtectRecord ',
				meta: { title: '项目工程' },
				component: ProtectRecord
			},
			{
				// （添加  编辑  详情）
				path: '/detailedit',
				name: 'DetailEdit',
				// meta: { title: '添加保护工程' },
				component: DetailEdit
			},
			// 日常巡查======================================================

			{
				// 日常巡查记录
				path: '/routininspections',
				name: 'RoutinInspections',
				meta: { title: '日常巡查记录' },
				component: RoutinInspections
			},
			{
				// 日常巡查记录的模板==编辑，详情，添加
				path: '/editdetailadd',
				name: 'editdetailadd',
				// meta: { title: '添加日常巡查记录' },
				component: () => import('../pages/norbulingka/routineInspections/editdetailadd.vue')
			},

			// 监测报告======================================================
			// 遗产评估
			{
				path: '/heritageevaluation',
				name: 'HeritageEvaluation',
				meta: { title: '遗产评估' },
				component: HeritageEvaluation
			},
			// 实测录入=====================================================
			{
				path: '/inputhome',
				name: 'Home',
				component: Home,
				// redirect: '/summaryinfo',
				redirect: '/ontology',
				children: [
					// {
					// 	// 汇总信息
					// 	path: '/summaryinfo',
					// 	mate: { title: '汇总信息' },
					// 	name: 'SummaryInfo',
					// 	component: SummaryInfo
					// },
					// {
					// 	// 汇总信息 ==== 详请和编辑逻辑错误 修正中
					// 	path: '/inputinfo',
					// 	name: 'inputinfo',
					// 	component: () => import('../pages/norbulingka/theMeasuredInput/templatePath/inputInfo.vue')
					// },

					{
						// 本体情况
						path: '/ontology',
						name: 'Ontology',
						meta: { title: '本体情况' },
						component: Ontology
					},
					{
						// 病害分析Analysis
						path: '/analysis',
						name: 'Analysis',
						meta: { title: '病害分析' },
						component: Analysis
					},
					{
						// 病害分析Analysis ====》编辑 ，详情 ，添加
						path: '/temanalysis',
						name: 'temanalysis',
						component: () => import('../pages/norbulingka/theMeasuredInput/templatePath/temAnalysis.vue')
					},
					{
						// 施工情况
						path: '/construction',
						name: 'Construction',
						meta: { title: '施工情况' },
						component: Construction
					},
					{
						// 施工情况的模板 ====》编辑 ，详情 ，添加
						path: '/temconstruction',
						name: 'temconstruction',
						component: () =>
							import('../pages/norbulingka/theMeasuredInput/templatePath/temconstruction.vue')
					},
					{
						// 考古发掘
						path: '/archaeological',
						name: 'Archaeological',
						meta: { title: '考古发掘' },
						component: Archaeological
					},
					{
						// 考古发掘====》编辑 ，详情 ，添加
						path: '/temarchaeological',
						name: 'temarchaeological',
						component: () =>
							import('../pages/norbulingka/theMeasuredInput/templatePath/temArchaeological.vue')
					},
					{
						// 游客情况
						path: '/tourists',
						name: 'Tourists',
						meta: { title: '游客情况' },
						component: Tourists
					},
					{
						// 游客情况====》编辑 ，详情 ，添加
						path: '/temtourists',
						name: 'temtourists',
						meta: { title: '游客情况' },
						component: () => import('../pages/norbulingka/theMeasuredInput/templatePath/temtourists.vue')
					},
					{
						// 其他
						path: '/others',
						name: 'Others',
						meta: { title: '其他' },
						component: Others
					},
					{
						// 其他====》编辑 ，详情 ，添加
						path: '/temothers',
						name: 'temothers',
						component: () => import('../pages/norbulingka/theMeasuredInput/templatePath/temothers.vue')
					},
					{
						//本体情况====》 编辑 详情 添加的模板
						path: '/temontolagy',
						name: 'temontolagy',
						component: () => import('../pages/norbulingka/theMeasuredInput/templatePath/temOntology.vue')
					}
				]
			}
		]
	}
];
