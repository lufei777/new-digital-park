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
```

注：下面封装的组件、方法都是有局限性的，只适用于项目中很通用的部分，自知很多是需要完善的，不要跟我杠。
    不要轻易改动，因为可能会涉及到之前使用的地方。
    若觉得实在不好用，可以重新封装，以后就用新的，旧的有时间慢慢改。
    
   
一、公共组件封装
一）.CommonTable组件---通用表格+分页。支持修改，删除，多选，排序，导出。
    需要对数据进行封装。
1.传递参数curPage,tableObj。tableObj包括：
  1）labelList对象---prop:属性，name:名称，sort：是否排序，'不传/false'不排序，'custom'排序。
  2）dataList对象 
  3）tableTip 表格提示性文字 不传则不显示()
  4）showExportBtn 是否显示导出按钮 默认不传即不显示
  5）showOpertor 是否显示基本的操作（修改/删除）默认不传即不显示
2.“操作”列需要自定义的，showOpertor不传，使用插槽传入自定义部分。
2.需要特殊的格式化某些列，可以在组件的formatSpecialCol方法中编写逻辑，例如无数据表格显示“--”
3.！！！事件绑定比较局限，没有使用回调等方法。（后面封装的组件已经逐渐改成使用回调）
  ！！！规定父组件：
  1）修改某一行事件名称必须叫editRow
  2）删除某一行事件名称必须叫deleteRow
  3）点击某一行事件名称必须叫rowClick
  4）多选事件名称必须叫handleSelectionChange
  5）导出事件名称必须叫handleExport
  
二）.customTree组件---可增删改的树形控件
    参数说明：
  1）treeList  数据
  2）addNodeCallback/delNodeCallback/editCallback/clickNodeCallback------添加/删除/编辑/点击 节点回调
  3）defaultExpandedKey 默认展开的节点

二、commonFun公共方法封装

三、chartUtils封装 
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


