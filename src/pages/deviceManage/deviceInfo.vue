<template>
  <div class="panel-container">
    <el-container>
      <el-aside :style="{height:contentHeight}" v-loading="asideLoad" class="panel common-aside">
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="true">
          <z-tree :options="treeOptions" :data="treeData" @node-click="nodeClick">
            <template #menu="{Tree}">
              <div class="zvue-tree_item" @click="clearTreeSelect(Tree)">清空选择</div>
            </template>
          </z-tree>
        </el-scrollbar>
      </el-aside>
      <el-container class="common-container">
        <el-header class="panel" height="auto">
          <z-form
            :ref="formOptions.ref"
            :options="formOptions"
            v-model="model"
            @submit="searchDevice"
            @handle-pagination="handlePagination"
          >
            <template #btn="{disabled,size}">
              <div>
                <el-button
                  :size="size"
                  :disabled="disabled"
                  type="primary"
                  @click="() => { Form.submit() }"
                >搜索</el-button>
                <el-button :size="size" :disabled="disabled" @click="() => { Form.resetForm() }">清除</el-button>
              </div>
            </template>
          </z-form>
        </el-header>
        <el-main style="padding:0px;">
          <div class="panel">
            <z-table
              :load="load"
              :ref="tableOptions.ref"
              :options="tableOptions"
              @row-click="deviceRowClick"
            >
              <template #custom-top="{selectedData,size}">
                <div>
                  <el-button :size="size" type="primary" @click="add">新增</el-button>
                  <z-upload
                    onlyButton
                    v-model="fileList"
                    buttonText="批量导入"
                    :showFileList="false"
                    :action="uploadAction"
                    :accept="['xls', 'xlsx', 'csv']"
                    :uploadAfter="uploadAfter"
                  ></z-upload>
                  <el-button
                    :size="size"
                    :disabled="!selectedData.length"
                    type="primary"
                    @click="bulkDel(selectedData)"
                  >批量删除</el-button>
                  <el-button
                    :size="size"
                    :disabled="!selectedData.length"
                    type="primary"
                    @click="bulkExport(selectedData)"
                  >批量导出</el-button>
                </div>
              </template>
              <template #operation="{row,column,index,isEdit,size}">
                <el-button :size="size" type="text" @click="edit(row)">编辑</el-button>
                <el-button :size="size" type="text">定位</el-button>
                <el-button :size="size" type="text" @click="del(row)">删除</el-button>
              </template>
            </z-table>
          </div>

          <div class="panel">
            <!-- 设备详情，设备维修记录 -->
            <el-tabs v-loading="load" value="deviceDetail">
              <el-tab-pane label="设备详情" name="deviceDetail">
                <z-form v-model="deviceDetailModel" :options="deviceDetailForm"></z-form>
              </el-tab-pane>
              <el-tab-pane label="设备维修记录" name="deviceMaintain">
                <z-table :options="deviceMaintainlTable">
                  <template #custom-top="{selectedData,size}">
                    <div>
                      <el-button :size="size" type="primary" @click="addMaintain">添加维护</el-button>
                      <el-button
                        :size="size"
                        :disabled="!selectedData.length"
                        type="primary"
                        @click="delMaintain(selectedData)"
                      >删除记录</el-button>
                    </div>
                  </template>
                  <template #operation="{row}">
                    <el-button type="text" @click="editMaintain(row)">修改</el-button>
                  </template>
                </z-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 新增选择设备 -->
    <el-drawer
      title="添加设备"
      ref="typeDrawer"
      :visible.sync="deviceTypeDrawer"
      @close="$refs[deviceTypeForm.ref].resetForm()"
    >
      <div style="display:flex;justify-content:center;">
        <z-form
          :ref="deviceTypeForm.ref"
          :options="deviceTypeForm"
          v-model="addModel"
          @submit="addDeviceNext"
        >
          <template #btn="{size,disabled}">
            <div>
              <el-button
                :size="size"
                :disabled="disabled"
                type="primary"
                @click="$refs[deviceTypeForm.ref].submit()"
              >下一步</el-button>
              <el-button
                :size="size"
                :disabled="disabled"
                @click="$refs.typeDrawer.closeDrawer()"
              >取消</el-button>
            </div>
          </template>
        </z-form>
      </div>
    </el-drawer>
    <el-drawer
      title="设备详情"
      size="80%"
      :append-to-body="true"
      :visible.sync="innerDrawer"
      @close="$refs[deviceInfoForm.ref].resetForm()"
    >
      <div style="display:flex;justify-content:center;">
        <z-form
          v-model="deviceInfoModel"
          :ref="deviceInfoForm.ref"
          :options="deviceInfoForm"
          @submit="deviceInfoSubmit"
        ></z-form>
      </div>
    </el-drawer>
    <!-- 添加编辑维护记录 -->
    <el-drawer
      title="维护记录"
      ref="maintainDrawer"
      size="40%"
      :visible.sync="maintainDrawer"
      @close="$refs[deviceMaintainForm.ref].resetForm()"
    >
      <div style="display:flex;justify-content:center;">
        <z-form
          :ref="deviceMaintainForm.ref"
          :options="deviceMaintainForm"
          v-model="deviceMaintainModel"
          @submit="deviceMaintainSubmit"
        ></z-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommonFun from 'utils/commonFun'
import { AssetType } from 'utils/dictionary';
import commonApi from 'api/common';
import deviceManageApi from 'api/deviceManage';
import { validNotChinese } from 'utils/validate';
import { getUserInfo } from 'utils/auth';
const DEVICE = AssetType.DEVICE;
// 新增设备
let assetAddUrl = '/vibe-web/asset/assetAdd';
// 编辑设备
let assetEditUrl = '/vibe-web/asset/assetEdit';
// 新增维护
let addMaintenaceUrl = '/vibe-web/addMaintenace';
// 编辑维护
let updateMaintenaceUrl = '/vibe-web/updateMaintenace';

let valueFormat = "yyyy-MM-dd HH:mm:ss";
export default {
  data() {
    const userInfo = getUserInfo();
    return {
      // 导入设备excel
      fileList: [],
      uploadAction: '/vibe-web/im/deviceData',

      // 设备树和设备List的loading
      asideLoad: false,
      load: false,

      // 根据设备树，空间树进行查询设备列表
      catalogs: [],
      spaceIds: [],

      // 主页设备树
      treeOptions: {
        highlightCurrent: true,
        accordion: true,
        props: {
          label: 'text',
          children: 'nodes'
        }
      },
      treeData: [],
      // 主页搜索表单
      model: {},
      formOptions: {
        ref: 'form',
        labelWidth: 70,
        menuBtn: false,
        forms: [
          {
            label: '编号',
            prop: 'id',
            span: 4
          },
          {
            label: '标题',
            prop: 'caption',
            span: 4
          },
          {
            label: '名称',
            prop: 'name',
            span: 5
          },
          {
            type: "tree",
            label: "空间位置",
            prop: "spaceId",
            clearable: true,
            width: 100,
            span: 6,
            props: {
              label: "floor",
              value: "floorId",
              children: "nodes"
            },
            change: ({ value }) => {
              if (value === '') {
                this.spaceIds = [];
              }
            },
            nodeClick: (data, node, $tree) => {
              this.spaceIds = [];
              this.getIdsByNode(this.spaceIds, node);
            }
          },
          {
            prop: 'btn',
            notModel: true,
            formslot: true,
            width: 54,
            span: 5
          }
        ]
      },
      // 主页设备List
      tableOptions: {
        ref: 'table',
        operation: {
          width: 150
        },
        data: [],
        columnConfig: [
          {
            label: '编号',
            prop: 'id'
          },
          {
            label: '标题',
            prop: 'caption'
          },
          {
            label: '分类',
            prop: 'kind'
          },
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '存放地点',
            prop: 'spaceCaption'
          },
          {
            label: '保管人',
            prop: 'userName'
          },
          {
            label: '启用时间',
            prop: 'enabing_date'
          },
          {
            label: '使用年限',
            prop: 'use_year'
          }
        ],
        uiConfig: {
          selection: true,
          height: 'auto',
          pagination: {
            handler: this.handlePagination
          }
        }
      },

      // 设备新增抽屉
      deviceTypeDrawer: false,
      // 设备详情信息抽屉
      innerDrawer: false,

      // 新增设备表单
      addModel: {},
      deviceTypeForm: {
        ref: 'deviceTypeForm',
        menuBtn: false,
        itemSpan: 24,
        width: '80%',
        forms: [
          {
            label: '设备类型',
            prop: 'typeName',
            type: 'select',
            clearable: true,
            dicUrl: deviceManageApi.assetTypeList,
            dicQuery: { id: DEVICE.kind },
            props: {
              label: 'text',
              value: 'name'
            },
            rules: {
              required: true
            }
          },
          {
            label: "空间位置",
            prop: "parentId",
            type: "tree",
            clearable: true,
            props: {
              label: "floor",
              value: "floorId",
              children: "nodes"
            },
            rules: {
              required: true
            }
          },
          {
            prop: 'btn',
            notModel: true,
            formslot: true,
            width: 54,
            span: 24
          }
        ]
      },
      // 设备信息表单
      deviceInfoModel: {},
      // 设备信息默认表单
      deviceInfoForms: [
        {
          label: 'id',
          prop: 'id',
          hide: true
        },
        {
          "label": "标题",
          "prop": "caption",
          rules: {
            required: true
          }
        },
        {
          "label": "名称",
          "prop": "name",
          rules: {
            required: true,
            validator: validNotChinese
          }
        },
        {
          "label": "设备制造日期",
          "prop": "production_date",
          type: "date",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd",
          rules: {
            required: true
          },
        },
        {
          "label": "设备采购日期",
          "prop": "purchase_date",
          type: "datetime",
          format: "yyyy-MM-dd HH:mm:ss",
          valueFormat,
          tip: '选择制造日期后，再填写此项',
          rules: {
            required: true
          },
          pickerOptions: {
            disabledDate: (time) => {
              let date = this.deviceInfoModel.production_date;
              if (date) {
                return time.getTime() < new Date(date).getTime();
              } else {
                return !date;
              }
            }
          }
        },
        {
          "label": "设备保修日期",
          "prop": "warranty_date",
          type: "date",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd",
          tip: '选择制造日期后，再填写此项',
          pickerOptions: {
            disabledDate: (time) => {
              let date = this.deviceInfoModel.production_date;
              if (date) {
                return time.getTime() < new Date(date).getTime();
              } else {
                return !date;
              }
            }
          }
        },
        {
          "label": "设备启用日期",
          "prop": "enabing_date",
          type: "date",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd",
          tip: '选择采购日期后，再填写此项',
          pickerOptions: {
            disabledDate: (time) => {
              let date = this.deviceInfoModel.purchase_date;
              if (date) {
                return time.getTime() < new Date(date).getTime();
              } else {
                return !date;
              }
            }
          }
        },
        {
          "label": "型号规格",
          "prop": "specification"
        },
        {
          "label": "资产类型",
          "prop": "models"
        },
        {
          "label": "增加方式",
          "prop": "increse_way"
        },
        {
          "label": "国际编码",
          "prop": "international_code"
        },
        {
          "label": "详情配置",
          "prop": "detail_config"
        },
        // TODO
        // NOTE 使用部门 保管人员 的prop会导致错误
        {
          "label": "使用部门",
          "prop": "using_department",
          type: "select",
          defaultValue: "",
          dicUrl: deviceManageApi.deptList,
          props: {
            value: 'id',
            label: 'name'
          }
        },
        {
          "label": "使用状态",
          "prop": "using_state"
        },
        {
          "label": "生产厂家",
          "prop": "vendor"
        },
        {
          "label": "保管人员",
          "prop": "keepers",
          type: "select",
          defaultValue: "",
          dicUrl: deviceManageApi.userNameList,
          props: {
            value: 'id',
            label: 'text'
          },
          defaultValue: userInfo.id
        },
        {
          "label": "数量",
          "prop": "quantity",
          type: 'number',
          minRows: 0
        },
        {
          "label": "单价",
          "prop": "price",
          type: 'number',
          minRows: 0,
          precision: 2
        },
        {
          "label": "单位",
          "prop": "deviceUnit",
          rules: {
            validator: (rule, value, callback) => {
              if (typeof value === 'number') {
                callback(new Error('不能是数字'))
              } else {
                callback();
              }
            }
          }
        },
        {
          "label": "金额",
          "prop": "amount",
          minRows: 0,
          precision: 2
        },
        {
          "label": "维修间隔月",
          "prop": "maintenance_interval"
        },
        {
          "label": "使用年限",
          "prop": "use_year",
          type: 'number',
          minRows: 0
        },
        {
          "label": "原值",
          "prop": "original_value",
          type: 'number'
        },
        {
          "label": "残值",
          "prop": "salvage_value",
          type: 'number'
        },
        {
          "label": "残值率",
          "prop": "salvage",
          type: 'number'
        },
        {
          "label": "折旧方法",
          "prop": "depreciation_method"
        },
        {
          "label": "描述",
          "prop": "memo"
        }
      ],
      deviceInfoForm: {
        ref: 'deviceInfoForm',
        itemSpan: 8,
        width: '90%',
        labelWidth: 110,
        forms: []
      },

      // 设备详情
      deviceDetailModel: {},
      deviceDetailForm: {
        menuBtn: false,
        textMode: true,
        labelWidth: 100,
        itemSpan: 6,
        forms: [
          {
            label: '编号',
            prop: 'id'
          },
          {
            label: '状态',
            prop: 'state'
          },
          {
            label: '标题',
            prop: 'caption'
          },
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '型号规格',
            prop: 'specification'
          },
          {
            label: '生产厂家',
            prop: 'vendor'
          },
          {
            label: '设备采购日期',
            prop: 'purchase_date'
          },
          {
            label: '描述',
            prop: 'memo',
            span: 24
          }
        ]
      },

      // 设备维修记录
      maintainFlag: 'add',
      maintainDrawer: false,
      deviceMaintainlTable: {
        ref: 'deviceMaintainlTable',
        operation: true,
        data: [],
        columnConfig: [
          {
            label: '维护编号',
            prop: 'id'
          },
          {
            label: '维护内容',
            prop: 'maintenance_content'
          },
          {
            label: '维护类型',
            prop: 'maintenance_type_str'
          },
          {
            label: '维护时间',
            prop: 'maintenance_time'
          },
          {
            label: '维护人员',
            prop: 'maintenance_person_str'
          },
          {
            label: '备注',
            prop: 'remark'
          },
          {
            label: '图片',
            prop: 'picture',
            type: 'img'
          }
        ],
        uiConfig: {
          selection: true,
          height: 'auto'
        }
      },
      deviceMaintainModel: {},
      deviceMaintainForm: {
        ref: 'deviceMaintainForm',
        width: '90%',
        forms: [
          {
            prop: 'id',
            hide: true
          },
          {
            label: '维护类型',
            prop: 'maintenance_type',
            type: 'select',
            dicUrl: deviceManageApi.maintenaceTypeList,
            props: {
              label: 'text',
              value: 'id'
            },
            rules: {
              required: true
            }
          },
          {
            label: '维护内容',
            prop: 'maintenance_content'
          },
          {
            label: '维护备注',
            prop: 'remark'
          },
          {
            label: '完成时间',
            prop: 'maintenance_time',
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat
          },
          {
            label: '负责人',
            prop: 'maintenance_person',
            type: "select",
            dicUrl: deviceManageApi.userNameList,
            defaultValue: userInfo.id,
            props: {
              label: 'text',
              value: 'id'
            },
            rules: {
              required: true
            }
          },
          {
            type: "upload",
            listType: "picture-img",
            label: "图片",
            prop: "photoFile",
            span: 24,
            autoUpload: false,
            accept: ["jpg", "jpeg", "png"],
            rules: {
              required: true
            },
            change: (...args) => {
              console.log("data -> ...args", ...args)
            }
          }
        ]
      }
    }
  },
  computed: {
    currentAssetId() {
      return this.Table.currentRowData.id;
    },
    assetUrl() {
      let url = assetEditUrl;
      if (this.innerDrawer) {
        if (this.deviceTypeDrawer) {
          url = assetAddUrl;
        }
      }
      return url;
    },
    maintainUrl() {
      return this.maintainFlag === 'add' ? addMaintenaceUrl : updateMaintenaceUrl;
    },
    contentHeight() {
      return this.$store.state.digitalPark.contentHeight + 'px';
    },
    Table() {
      return this.$refs[this.tableOptions.ref];
    },
    Form() {
      return this.$refs[this.formOptions.ref];
    },
    // 查询列表发送的数据
    deviceListParam() {
      let res = { assetVo: Object.assign({ kind: DEVICE.text }, this.model) }
      if (this.catalogs.length) {
        res.catalogs = this.catalogs
      }
      if (this.spaceIds.length) {
        res.spaceIds = this.spaceIds
      }
      return res;
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    // 请求连接
    fetch() {
      this.fetchDeviceTree();
      this.fetchDeviceList();
      this.fetchSpaceTree();
    },
    // 加载空间树
    fetchSpaceTree() {
      commonApi.getAllFloorOfA3().then(res => {
        this.deviceTypeForm.forms[1].dicData = res;

        this.Form.setColumnByProp("spaceId", {
          dicData: res
        });
      });
    },
    // 加载设备树
    fetchDeviceTree() {
      this.asideLoad = true;
      commonApi.getEnergyListAll({ catalogId: DEVICE.catalogId }).then(res => {
        this.treeData = res;
      }).finally(() => {
        this.asideLoad = false;
      })
    },
    // 加载设备列表
    fetchDeviceList(page) {
      this.load = true;
      deviceManageApi.searchDevices(this.deviceListParam, { page: page }).then(res => {
        this.load = false;
        this.Table.setData(res.rows);
        this.Table.setTotal(res.total);
        // 默认选中第一个
        this.Table.setCurrentRow(0);
      }).finally(() => {
        this.load = false;
      })
    },
    // 上方表单搜索
    searchDevice(model, done) {
      done();
      this.fetchDeviceList();
    },
    // 左侧设备树点击
    nodeClick(data, node) {
      this.catalogs = [];
      this.getIdsByNode(this.catalogs, node);
      this.fetchDeviceList();
    },
    // 设备树取消选择
    clearTreeSelect(Tree) {
      this.catalogs = [];
      Tree.setCurrentKey(null);
      this.fetchDeviceList();
    },
    // 设备列表行点击
    deviceRowClick(row) {
      if (row) {
        this.getDetailMaintain(row.id);
      } else {
        this.clearDetailMaintain();
      }
    },
    // 设备列表翻页
    handlePagination(pageSize, currentPage, $table) {
      this.fetchDeviceList(currentPage);
    },

    /**
     * 设备详情 设备维护记录
     */
    getDetailMaintain(id) {
      // 维护记录
      this.getDeviceMaintain(id || this.currentAssetId)
      // 设备详情
      this.getDeviceDetail(id || this.currentAssetId)
    },
    // 设别详情
    getDeviceDetail(id) {
      deviceManageApi.getAsset({
        kind: DEVICE.text,
        id
      }).then(res => {
        this.deviceDetailModel = res.data;
      }).catch(err => {
        this.deviceDetailModel = {};
      })
    },
    // 设备维护列表
    getDeviceMaintain(id) {
      deviceManageApi.queryMaintenaceByDeviceId({
        page: 1,
        deviceId: id
      }).then(res => {
        const deviceMaintainlTable = this.deviceMaintainlTable;
        // 如果data的长度不为0，则有值，取其中的maintenaceBean进行显示，否则赋值为空
        if (res.data.length) {
          deviceMaintainlTable.data = res.data.map(item => item.maintenaceBean);
        } else {
          deviceMaintainlTable.data = res.data;
        }
      }).catch(err => {
        deviceMaintainlTable.data = [];
      })
    },
    // 清空
    clearDetailMaintain() {
      this.deviceMaintainlTable.data = [];
      this.deviceDetailModel = {};
    },

    /**
     * 设备信息列表操作
     */
    // 新增
    add() {
      this.deviceTypeDrawer = true;
    },
    // 行删除
    del(row) {
      this.deleteDevice(row.id);
    },
    // 批量删除
    bulkDel(selectedData) {
      let ids = selectedData.map(item => item.id).join(',');
      this.deleteDevice(ids);
    },
    // 删除操作
    deleteDevice(ids) {
      this.delInfo().then(() => {
        deviceManageApi.deleteAsset({
          ids
        }).then(res => {
          this.$message.success('删除成功');
          this.fetchDeviceList();
        })
      })
    },
    // 导出操作
    bulkExport(selectedData) {
      let ids = selectedData.map(item => item.id).join(',');
      let exportUrl = '/vibe-web/findAsset/printQrcode?ids=' + ids;
      let exportA = document.createElement('a');
      exportA.href = exportUrl;
      exportA.click();
      exportA = null;
    },
    // 编辑 
    // TODO 保管人 和 使用部门特殊处理
    edit(row) {
      let { typeName } = row;
      deviceManageApi.toDeviceEdit({ id: row.id }).then(res => {
        if (res?.using_department) {
          res.using_department = res.using_department.id;
        }
        if (res?.keepers) {
          res.keepers = res.keepers.id;
        }
        delete res.parent;
        delete res.valueList;

        this.deviceInfoModel = res;
        this.getPropsByTagName(typeName, 'edit');
      })
    },
    // 导入成功操作
    uploadAfter(data, hide, done) {
      done()
    },

    /**
     * 设备信息抽屉操作
     */
    // 新增提交
    addDeviceNext(model, done) {
      this.deviceInfoModel = {};
      this.getPropsByTagName(this.addModel.typeName).finally(() => {
        done();
      })
    },
    // 编辑提交
    // TODO 设备信息编辑传参修改
    deviceInfoSubmit(model, done) {
      let data = Object.assign({}, this.addModel, this.deviceInfoModel);

      // 保管人员 和 维修部门特殊修改
      data['kind'] = DEVICE.text
      data['using_department.id'] = data.using_department
      data['keepers.id'] = data.keepers

      delete data.keepers
      delete data.using_department

      this._axiosFormData(this.assetUrl, data).then(res => {
        this.$message.success('操作成功');
        // 弹出编辑抽屉
        this.innerDrawer = false;
        this.deviceTypeDrawer = false;

        this.fetchDeviceList();
      }).finally(() => {
        done();
      })
    },

    /**
     * 设备详情，设备维护
     */
    // 添加维护记录抽屉
    addMaintain() {
      this.maintainFlag = 'add';
      this.maintainDrawer = true;
      this.deviceMaintainModel.deviceIds = this.currentAssetId;
    },
    // 设备维护记录修改
    editMaintain(row) {
      this.maintainFlag = 'edit';
      this.maintainDrawer = true;
      this.deviceMaintainModel.deviceIds = this.currentAssetId;

      this.deviceMaintainModel = row;
    },
    // 新增设备维护
    deviceMaintainSubmit(model, done) {
      // 添加 maintenaceBean.  字段
      let formData = new FormData();

      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          let element = model[key];
          if (!['photoFile', 'deviceIds', 'id'].includes(key)) {
            formData.append(`maintenaceBean.${key}`, element);
          } else {
            formData.append(key, element);
          }
        }
      }

      this.$axios({
        url: this.maintainUrl,
        method: 'POST',
        data: formData
      }).then(res => {
        this.maintainDrawer = false;
        this.getDeviceMaintain(this.currentAssetId)
      }).finally(() => {
        done();
      })
    },
    // 删除设备维护记录
    delMaintain(selectedData) {
      let ids = selectedData.map(item => item.id).join(',');
      this.delInfo().then(() => {
        deviceManageApi.deleteMaintenace({ ids }).then(res => {
          this.$message.success('删除成功');
          this.getDeviceMaintain(this.currentAssetId)
        })
      })
    },

    // 根据设备类型获取特定props
    getPropsByTagName(typeName) {
      return new Promise((resolve, reject) => {
        deviceManageApi.getFormProperty({
          kind: DEVICE.text,
          typeName
        }).then(res => {
          // 拿到返回的数据进行处理
          let extraForms = res.map(item => {
            this.deviceInfoModel[item.name] = item.value;
            return {
              label: item.caption,
              prop: item.name,
            }
          })
          // 添加额外的forms属性
          this.deviceInfoForm.forms = this.deviceInfoForms.concat(extraForms);
          // 弹出编辑抽屉
          this.innerDrawer = true;
          resolve();
        }).catch(err => reject(err));
      })
    },
    //Form Data形式传递参数
    _axiosFormData(url, data, method = 'post') {
      return this.$axios({
        url,
        method,
        data,
        transformRequest: [this.getPostFormData],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    getPostFormData(data) {
      let ret = ''
      for (let key in data) {
        let item = data[key];
        if (typeof item === 'undefined' || item == null) {
          item = '';
        }
        if (item instanceof File) {
          ret += encodeURIComponent(key) + '=' + item + '&'
        } else {
          ret += encodeURIComponent(key) + '=' + encodeURIComponent(item) + '&'
        }
      }
      return ret
    },
    delInfo() {
      return this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
    },
    /**
     * 根据node获取ids
     */
    getIdsByNode(arr, node, childrenKey = 'childNodes', idKey = 'id') {
      arr.push(node[idKey]);
      if (node[childrenKey] && Object.prototype.toString.call(node[childrenKey]) === '[object Array]') {
        node[childrenKey].forEach((item) => {
          this.getIdsByNode(arr, item, idKey);
        });
      }
    }
  },
  watch: {
  },
}
</script>
<style lang="less" scoped>
.common-aside {
  position: fixed;
  width: @menuWidth;
  margin-bottom: 0;
}
.common-container {
  // margin-left: 20px;
  margin-left: @menuWidth - 10px + (4 * @contentMarginLeft);
}
</style>
