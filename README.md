#### 项目说明
数字园区项目，现阶段主要开发任务，使用VUE + ElementUI。
>*项目路由后台管理，后台做权限返回特定路由，前台保存所有路由做跳转页面使用*
>*现项目会在浏览器与客户端中使用，会涉及到与客户端(C#)的交互*
>*接口调试需要在config/index.js中做代理，可以在群里询问*
***

#### 软件架构
    VUE + less

#### 文件目录
```bash
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径，主要为index.js，配置资源路径等
|   ├── dev.env.js                              // 开发环境变量
|   ├── index.js                                // 项目一些配置变量
|   └── prod.env.js                             // 生产环境变量
├── dist                                        // 打包文件夹
├── node_modules                                // npm 加载的项目依赖模块
├── src                                         // 源码目录
│   ├── util                                    // 公共抽取封装的js方法
|   ├── less                                    // 公共less
│   ├── components                              // 封装组件
│   ├── pages                                   // 页面存放目录
│   ├── router                                  // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── api                                 // 接口封装
│   │   └── axios                               // axios封装
│   ├── utils                                   
│   ├── vuex                                    // vuex的状态管理
│   │   ├── modules                             // vuex的分组模块
│   │   └── store.js                            // 配置mutations
│   └── App.vue                                 // 页面入口文件
├── index.js                                    // 路由入口文件
├── .babelrc                                    // babel配置文件
├── .postcssrc.js                               // postcss-load-config配置文件，配置自动添加样式前缀等
├── favicon.ico                                 // 图标
├── index.html                                  // 首页入口文件，你可以添加一些 meta 信息或统计代码等
├── package.json                                // 项目配置文件
└── README.md                                   // 项目的说明文档，markdown 格式
```

#### 组件封装
>*注*： 每个人封装了比较通用的组件时，可依次在此说明，供大家使用。
    下面封装的组件、方法都是有局限性的，只适用于项目中很通用的部分，自知很多是需要完善的。
    但会涉及到之前使用的地方，可在原组件上扩充新功能，不要轻易改动别人组件已有的功能。
    若觉得实在不好用，可以重新封装，以后就用新的，旧的有时间再迁移。
   
一、公共组件封装

~~一）CommonTable组件---通用表格+分页。支持修改，删除，多选，排序，导出。~~

    需要对数据进行封装。
    1.传递参数curPage,tableObj。tableObj包括：
    1）labelList对象---prop:属性，name:名称，sort：是否排序，'不传/false'不排序，'custom'排序。
    2）dataList对象 
    3）tableTip 表格提示性文字 不传则不显示()
    4）showExportBtn 是否显示导出按钮 默认不传即不显示
    5）showOperator 是否显示基本的操作（修改/删除）默认不传即不显示
    2.“操作”列需要自定义的，showOperator不传，使用插槽传入自定义部分。
    2.需要特殊的格式化某些列，可以在组件的formatSpecialCol方法中编写逻辑，例如无数据表格显示“--”
    3.！！！事件绑定比较局限，没有使用回调等方法。（后面封装的组件已经逐渐改成使用回调）
    ！！！因此规定父组件：
    1）修改某一行事件名称必须叫editRow
    2）删除某一行事件名称必须叫deleteRow
    3）点击某一行事件名称必须叫rowClick
    4）多选事件名称必须叫handleSelectionChange
    5）导出事件名称必须叫handleExport
  
二）customTree组件---可增删改的树形控件

    参数说明：
    1）treeList  数据
    2）addNodeCallback/delNodeCallback/editCallback/clickNodeCallback------添加/删除/编辑/点击 节点回调
    3）defaultExpandedKey 默认展开的节点
  
三）tree组件---支持搜索、多选、单选

    参数说明
    1）treeList---渲染的tree列表
    2）treeConfig:{  //tree配置
        ref:'treeRef' //默认不传为treeRef
        treeProps:{                         
            label:'floor',
            children: 'nodes',
        },                   
        nodeKey:'floorId', //默认不传为id
        defaultExpandedkeys:[], //默认展开的节点
        defaultCheckedKeys:[],   //默认选中的复选框
        currentKey:'', //默认当前选中的key
        showCheckbox:false,  //是否显示复选框,默认不传则不显示
        showSearch:false,//是否显示搜索框，默认不传则不显示
        onClickTreeNodeCallBack:this.onClickTreeNode, //点击节点的回调
        onCheckTreeNodeCallBack:this.onClickTreeNode,  //点击复选框的回调
    } 
    //treeConfig的treeProps默认不传为：
    {
        label:'text',
        children: 'nodes',
    }

四）treeModal---树形弹框

    参数说明
    1）treeModalConfig:{
        treeList:[], //同tree组件配置
        treeConfig:{ //同tree组件配置
            defaultExpandedkeys:[],
        },
        showModal:false, //是否显示模态框
        onClickSureBtnCallback:this.onClickModalSureBtn, //点击确定按钮时的回调
        onClickCancelBtnCallback:this.onClickModalCancelBtn //点击取消按钮的回调
    }

五）基于ElementUI表格Table和表单Form组件封装（[文档](www.lxhblog.cn)）
   
六）通用导航菜单 commonMenu

    1.传递参数
        1)menuData ：菜单列表
        2)menuConfig,示例：{
                mode:'horizontal', //默认垂直模式
                bgColor:'#fff', //菜单背景色
                textColor:'#606266', //字体颜色
                specialRoute:true, // 此字段是数字园区首页使用。数字园区导航跳转的路由特殊处理，默认不传
                isCollapse:false, //默认不传即展开
                activeIndex:'1' //当前激活菜单，不传默认第一个
                }

二、commonFun公共方法/数据封装  （有些为测试数据，不再此说明，用完可删）

    一）deleteTip 删除提示函数 
        参数说明
    1）that   -->this
    2）deleteId -->要删除的id
    3）msgTip 没有传id时的提示信息
    4）callBack 确定删除的回调
  
三、chartUtils封装 
(基础charts封装，当无法满足需求时，可自己再在自己的页面重新定义特殊化option，与封装组件相同处不必重复写)

    一）handleBarchart柱状图/柱状折线图：
    1.传递参数dom，data。data包括
    1）titleText：可选
    2）legendData：可选
    3）xAxis 横坐标
    4）yAxis y轴对应的name属性
    5）series 数据
    6）showSecondY：是否显示第二个y轴，默认不传即不显示
    
    二）hollowPieChart空心饼图：
    ...大致同上
    1）seriesName
    2）seriesData 
  
#### 项目异同

###### 中钢
    修改的文件：
    1. energyManage/energyShow/rankEnergy  去掉两个饼状图和表格的分项用水/电
    2. energyManage/home/homePage   去掉两个饼状图和表格的分项用水/电
    3. digitalPark/coms/buildMonitor/elevator....   去掉扶梯
    4. components/confitionSelect  只有水电
    5. dataReport
    6. evergySavingSelect
    7. digitalPark/coms/header 仪表盘去掉消息滚动