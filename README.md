#### 为了方便大家共同协作，共同规范项目，项目可以有一个长期良好的发展，不至于后期难以维护。所以在此声明一份文档来说明项目架构
***
文件目录
---
```bash
├── build                                       // webpack配置文件
|   ├── build.js
|   ├── check-versions.js
|   ├── utils.js
|   ├── vue-loader.conf.js                      // vue-loader，用于vue文件分割.vue文件的html，css，js结构
|   ├── webpack.base.conf.js                    // 主要配置使用的各种loader
|   ├── webpack.dev.conf.js                     // 配置devtool，devServer，hot，plugins等
|   └── webpack.prod.conf.js                    // 此处为开发者配置，构建时使用此配置
├── config                                      // 项目打包路径，主要为index.js，配置资源路径等
|   ├── dev.env.js                              // 开发环境变量
|   ├── index.js                                // 项目一些配置变量
|   └── prod.env.js                             // 生产环境变量
├── dist                                        // 构建完成的项目，目录可在@/config/index.js/build中修改
├── node_modules                                // npm 加载的项目依赖模块
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── util                                    // 公共抽取封装的js方法
|   ├── less                                    //公共less
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   ├── footer                              // 底部公共组件
│   │   └── header                              // 头部公共组件
│   ├── pages                                   // 页面存放目录
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   ├── router2                             // 路由配置
│   │   └── router1                             // 路由配置
│   ├── static                                  // 静态资源目录，如图片、字体等
│   │   ├── lib                                 // 引用外部静态库
│   │   ├── image                               // 图片
│   │   └── fonts                               // 字体
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
│   ├── vuex                                    // vuex的状态管理
│   │   ├── modules                             // vuex的分组模块
│   │   └── store.js                            // 配置mutations
│   ├── App.vue                                 // 页面入口文件
│   ├── energyMain.js                                 // 程序入口文件，加载各种公共组件
├── index.js                                   // 路由入口文件
├── .babelrc                                    // babel配置文件
├── .postcssrc.js                               // postcss-load-config配置文件，配置自动添加样式前缀等
├── favicon.ico                                 // 图标
├── index.html                                  // 首页入口文件，你可以添加一些 meta 信息或统计代码等
├── package.json                                // 项目配置文件
└── README.md                                   // 项目的说明文档，markdown 格式

一、CommonTable组件---通用表格+分页。需要对数据进行封装。
1.传递参数curPage,tableObj。tableObj包括：
  1）labelList对象---prop:属性，name:名称，sort：是否排序，'不传/false'不排序，'custom'排序。
  2）dataList对象 
  3）tableTip 表格提示性文字 不传则不显示
  4）hideExportBtn 是否显示导出按钮 默认不传即显示
2.需要格式化某些列，可以在组件的formatSpecialCol方法中编写逻辑

二、chartUtils封装 
(基础charts封装，当无法满足需求时，可自己再在自己的页面重新定义特殊化option，与封装组件相同处不必重复写)

I.handleBarchar柱状图/柱状折线图：
1.传递参数dom，data。data包括
  1）titleText：可选
  2）legendData：可选
  3）xAxis 横坐标
  4）yAxis y轴对应的name属性
  5）series 数据
  6）showSecondY：是否显示第二个y轴，默认不传即不显示
  
II.hollowPieChart空心饼图：
 ...大致同上
  1）seriesName
  2）seriesData 
```
