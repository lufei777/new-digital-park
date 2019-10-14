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

注： 每个人封装了比较通用的组件时，可依次在此说明，供大家使用。
    下面封装的组件、方法都是有局限性的，只适用于项目中很通用的部分，自知很多是需要完善的。
    但会涉及到之前使用的地方，可在原组件上扩充新功能，但麻烦不要轻易改动别人组件已有的功能。
    若觉得实在不好用，可以重新封装，以后就用新的，旧的有时间再迁移。
    
   
一、公共组件封装

一）CommonTable组件---通用表格+分页。支持修改，删除，多选，排序，导出。
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
  
三）login组件---老系统中所有的登录都是一样的，重构时可使用此组件。
    参数说明：
  1）url --- 成功后跳转到的页面路由
  
四）treeModal---树形弹框
    参数说明
  1）tip---提示信息
  2）showTree ---弹框的关闭显示控制
  3）cancelCallback---点击取消时的回调
  3）sureCallback ---点击确定时的回调

五）、自定义表格Table组件封装
-  功能说明
    - 本地数据渲染表格
    - 服务端数据渲染表格
    - 自定义分页
        - 可自定义分页布局，包括不限于，分页页数，跳转等
    - 自定义排序
        - 可使用方法返回数据自定义排序
    - 自定义操作
        - 基本按钮，删除等
        - 特殊按钮，目前只有下拉
    - 自定义单选、多选
    - 自定义索引
        - 开启索引必须开启多选，不然会出现莫名的bug
    - 检索、可自定义检索字段
    - 自定义方法
        - 行单击
        - 行双击
    - 以下待实现
        - 单元格单击
        - 列标题单击，右击
        - 列筛选
        - 多级表头
        - 自定义模板
        - 表格内树
        - 表尾合计

- 数据配置说明
  ```javaScript
  tableConfig:{
      ref:String,
      
      //以下两个参数二选一
      data:Array, -> 表格需要展示的数据
      serverMode:{    -> 服务端模式，数据、分页从服务端请求
          url:String || Function -> (String表明请求的链接，Function返回一个Promise对象的方法),
          data:Object, -> 请求时要发送的数据
          type:String -> (get or post)
      },
      //以上两个参数二选一
      
      columnConfig:[
          {
              prop:String -> 该列字段名
              label:String -> 该列显示的标题
              fixed:String -> (left, right，详情为ElementUI规范)
              sortable:Boolean || "custom" -> (Boolean表明是否可排序，custom表明自定义排序)
              hide:Boolean -> 该列是否隐藏
              formatter:function(row,column){
                  row -> 该行全部数据
                  column -> 该列属性
                  return String||Number; -> 要显示的
              },
              width:Number -> 显示的宽度
          }
      ],
      uiConfig:{
          height:Number || String -> 表格高度(400 or 400px)
          selection:Boolean -> 是否多选
          searchable:Array -> ["name","sex"]需要筛选字段的prop
          pagination:Boolea || Object -> (Boolean是否开启分页,Object{
              layout:"total,->,sizes,prev"等，elementUI官方格式
              pageSizes:Number[] -> 每页显示个数选择器的选项设置
          })
          showIndex:Boolean || Object -> (是否显示索引,Object{
              //自定义索引
              handler:function(index){
                  return index + 1;
              }
          })
      },
      btnConfig:{ -> 列操作
          prop:"operation",
          label:String -> 要显示的列名
          fixed:"right"
          width:Number
          btns:[
              {
                  type:String -> (basic基础按钮，只有点击事件。dropdown -> 下拉按钮),
                  label:String -> 要显示的名字
                  handler:function(row){}
              },{
                  type:"dropDown",
                  label
                  handler
                  icon:String -> 显示的图标
                  showMore:Boolean -> 是否显示下拉箭头
                  menus:[
                      {
                          label:String,
                          handler:function(scope){
                              scope row
                                    column
                                    _self -> 表格，可调用刷新方法
                          }
                      }
                  ]
              }
          ]
      },
      tableMethods:{
          rowClick:Function
          rowDblClick:Function -> 看清楚方法名
          sortChange:function(sortObj,$table){  -> 自定义排序时调用方法
              $table -> 可调用设置数据方法
              return Array
          }
      }
      
  }
  ```
- 使用说明
   - ref是用来标识每一个table组件的，相当于id，同一个页面内，不可重复
      - 使用
         - this.$refs[tableConfig.ref] 后跟方法，目前方法有:
            - setCurrentRow(Number) 单选某一行
            - toggleSelection(Number[](,Boolean[])) Number[]表明多选选中某几行，Boolean[]可选，表明下标行是否选中
            - doLayout() 重新渲染表格布局，在弹窗中或动画结束后调用表格时，可能需要调用此方法重新渲染一下表格
            - getSelectedData():Array 获取多选选中数据
            - getCurrentRowData():Object 获取单选选中数据
            - clearSelection() 清除多选选中
            - getTableData():Array 获取表格数据，如果是本地，则获取全部数据，如果是服务端，则获取当前显示数据
            - getTableShowData():Array 获取表格当前显示数据
            - setTableData(Array) 设置表格数据，如果是本地，则设置表格全部数据，如果是服务端，则设置当前显示数据，如分页
            - refreshTable() 刷新表格
   - 引入组件后，<Table :ref="tableConfig.ref" :tableConfig="tableConfig">
                    <template solt="custom-top" slot-scope="scopeObj">
                        //这里是自定义表格上部，可以是按钮，input框等
                        //scopeObj里有，columnConfig 列配置,allData 表格全部数据,tableShowData 表格目前显示数据
                        //如果需要再返回数据，请和刘晓航协商
                    </template>
                </Table>
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


