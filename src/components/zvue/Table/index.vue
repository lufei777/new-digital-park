<template>
  <div class="el-table-wrapper" :style="{height:wrapperHeight}">
    <div
      v-if="options.customTop"
      ref="customTop"
      :style="{textAlign:options.customTopPosition || 'right',height:'auto',padding:'0 20px 20px'}"
    >
      <slot
        :name="topSlotName"
        :size="uiConfig.size"
        :columnConfig="columnConfig"
        :allData="allData"
        :tableShowData="tableShowData"
        :selectedData="selectedData"
      ></slot>
    </div>

    <!-- stripe 
    border-->
    <el-table
      highlight-current-row
      header-row-class-name="el-table-header"
      cell-class-name="el-table-cell"
      ref="dataBaseTable"
      :row-key="rowKey"
      :row-style="{height:'50px'}"
      :cell-style="{padding:'0px'}"
      :header-cell-style="{padding:'0px',height:'50px'}"
      :key="key"
      :data="tableShowData"
      :height="tableHeight"
      :size="uiConfig.size"
      v-loading="loading"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @sort-change="sortChange"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @select="select"
    >
      <!-- 多选 -->
      <el-table-column
        fixed="left"
        type="selection"
        width="37"
        v-if="uiConfig.selection"
        :selectable="_selectable"
      ></el-table-column>

      <!-- 索引 -->
      <el-table-column
        fixed="left"
        type="index"
        v-if="uiConfig.showIndex"
        :index="uiConfig.showIndex.handler"
        :width="uiConfig.showIndex.width || 50"
        :align="uiConfig.showIndex.align || 'center'"
      >
        <template slot="header">{{uiConfig.showIndex.label || "序号"}}</template>
      </el-table-column>

      <!-- 使用column组件会导致多选索引顺序错位 -->
      <!-- <column :columnConfig="columnConfig">
        <template v-for="col in columnConfig">
          <template slot-scope="{column}" :slot="`${col.prop}Header`">
            <slot :name="`${col.prop}Header`" :column="column"></slot>
          </template>
          <template :slot="col.prop" slot-scope="{scopeRow}">
            <slot :name="col.prop" :scopeRow="scopeRow"></slot>
          </template>
        </template>
      </column>-->

      <!-- 正常列 -->
      <template v-for="col in columnConfig">
        <el-table-column
          v-if="!col.hide"
          :key="col.label"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :fixed="col.fixed"
          :sortable="col.sortable || false"
          :align="col.align || 'left'"
          show-overflow-tooltip
        >
          <!-- 列标题slot -->
          <template v-if="col.headerSlot" slot="header">
            <slot :name="`${col.prop}Header`" :column="col"></slot>
          </template>
          <!-- 内容 -->
          <template slot-scope="scopeRow">
            <form-temp
              v-if="cellEditFlag(scopeRow.row,col)"
              v-model="scopeRow.row[col.prop]"
              :column="col"
              :size="isMediumSize"
              :dic="DIC[col.prop]"
              :upload-before="col.uploadBefore"
              :upload-after="col.uploadAfter"
              :disabled="col.disabled"
              @click.native.stop
            ></form-temp>
            <slot
              v-else-if="col.slot"
              :name="col.prop"
              :label="handleShowLabel(scopeRow.row,col,DIC[col.prop])"
              :scopeRow="scopeRow"
              :row="scopeRow.row"
              :size="isMediumSize"
              :dic="DIC[col.prop]"
            ></slot>
            <template v-else>
              <span v-html="_columnFormatter(scopeRow,col)"></span>
            </template>
          </template>
        </el-table-column>
      </template>

      <!-- 列操作 -->
      <el-table-column
        v-if="btnConfig"
        :fixed="btnConfig.fixed"
        :prop="btnConfig.prop"
        :label="btnConfig.label"
        :width="btnConfig.width"
        :align="btnConfig.align || 'left'"
      >
        <!-- 搜索框 -->
        <template v-if="uiConfig.searchable" slot="header">
          <el-input v-model="searchVal" size="mini" placeholder="检索" />
        </template>
        <!-- 按钮 -->
        <template slot-scope="scopeRow">
          <el-button
            type="text"
            :size="isMediumSize"
            @click.stop="_rowCell(scopeRow.row,scopeRow.$index)"
            v-if="vaildBoolean(parentOption.editBtn,false)"
          >{{_editBtnText(scopeRow.row,scopeRow.index)}}</el-button>
          <el-button
            v-if="scopeRow.row.$cellEdit && vaildBoolean(parentOption.calcelBtn,true)"
            type="text"
            :size="isMediumSize"
            @click.stop="_rowCanel(scopeRow.row,scopeRow.$index)"
          >取 消</el-button>
          <!-- 操作列的slot -->
          <slot
            v-if="options.operation"
            :name="operationSlotName"
            :scopeRow="scopeRow"
            :size="isMediumSize"
          ></slot>
          <template v-for="btn in btnConfig.btns">
            <!-- :size="btn.size || uiConfig.size" -->
            <!-- 基础模式，如删除，编辑。参数为scopeRow -->
            <el-button
              v-if="btn.type === 'basic' || !btn.type"
              :size="btn.size || isMediumSize"
              type="text"
              :key="btn.label"
              @click.stop="btn.handler(scopeRow)"
            >
              <i v-if="btn.icon" :class="btn.icon"></i>
              {{btn.label}}
            </el-button>
            <!-- 带下拉按钮，参数为scopeRow -->
            <z-dropdown
              v-if="btn.type === 'dropDown'"
              :size="btn.size || isMediumSize"
              :key="btn.label"
              :dropDown="btn"
              :carryData="scopeRow"
              :style="{display:'inline-block'}"
            />
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div :ref="paginationSlotName" v-if="uiConfig.pagination" class="table-pagination">
      <z-pagination
        :key="`${options.ref}_pagination`"
        :paginationConfig="uiConfig.pagination"
        :currentPage="paginationObj.currentPage"
        :pageSize="paginationObj.pageSize"
        :total="uiConfig.pagination.total || tableData.length"
        :handleSizeChange="_handleSizeChange"
        :handleCurrentChange="_handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import formTemp from "../Form/formtemp";
// import column from "./components/column";
import props from "./common/props";
import { PLACEHOLDER } from "./global/variable";
import init from "../Form/common/init";
import { validatenull, asyncValidator } from "../Form/utils/validate";
import { deepClone, vaildData, vaildBoolean } from "../Form/utils/util";

import { detail } from "../Form/utils/detail";

// 默认log
const LOG = {
  error: {
    tableData: {
      TypeError: "数组数据类型必须是数组"
    },
    pagination: {
      RequestError: "服务端分页请求错误"
    }
  }
};

//默认uiConfig
const defaultUiConfig = {
  /**
   * height: "300px" 设定按照设定值来规定table高度
   *         "auto"  根据内容自适应
   *          不设置  根据父级计算高度
   */
  size: "medium",
  pagination: {
    // sizes
    layout: "total, ->, prev, pager, next, jumper",
    pageSizes: [10],
    pageSize: 10,
    currentPage: 1
  }
};

// 默认btnConfig
const defaultBtnConfig = {
  prop: "operation",
  label: "操作",
  fixed: "right",
  width: 100
};

//单双击冲突timer
let dblclickTimer = null;
let paginationTimer = null;

//点击事件屏蔽列
let preventClick = ["selection", "operation", undefined];

// 设置默认值
const _objKeysForeach = (obj, cb) => {
  Object.keys(obj).forEach((key, index) => {
    cb(key, obj[key], index);
  });
};
const setDefaultValue = (defaultOptions, options) => {
  _objKeysForeach(defaultOptions, (key, value, index) => {
    if (!options.hasOwnProperty(key)) {
      options[key] = _.cloneDeep(value);
    } else {
      if (typeof value === "object" && typeof options[key] === "object") {
        setDefaultValue(value, options[key]);
      }
    }
  });
};

export default {
  name: "zTable",
  mixins: [props(), init("crud")],
  components: { formTemp },
  provide() {
    return {
      crud: this
    };
  },
  data() {
    let _this = this;
    return {
      topSlotName: "custom-top",
      operationSlotName: "operation",
      paginationSlotName: "tablePagination",
      selectedData: [], //表格当前多选数据
      allData: [], //保存数组原始数据，用来复原数据
      tableData: [], //表格传入数据，用作分页使用
      tableShowData: [], //表格实际展示数据
      tableMethods: {}, //触发方法
      methodsQueue: [], //方法队列，因为可能是ajax请求的数据，所以需要在加载未成功前缓存方法，加载成功后再执行
      key: 1, //在doLayout中改变，为保证每次Table都是重新渲染
      loading: false, //是否呈加载状态
      currentPage: 1, // 内部使用
      pageSize: Number.POSITIVE_INFINITY, // 内部使用
      searchVal: "",
      tableHeight: undefined,
      layoutHeight: [], //高度数组，用来决定整体高度
      // 规则
      formRules: {},
      formCellRules: {},
      formCascaderList: [],
      formIndexList: []
    };
  },
  created() {
    const options = this.options;
    /**
     * 事件配置处理
     */
    this.tableMethods = options.tableMethods ? options.tableMethods : {};
    //如果行单击和行双击都设置了，则需要解决事件冲突
    if (
      (this.tableMethods.rowClick && this.tableMethods.rowDblclick) ||
      (this.$listeners["row-click"] && this.$listeners["row-dblclick"])
    ) {
      this.clickConflict = true;
    }

    //服务器模式
    this.isServerMode = options.serverMode;

    //ui配置处理
    if (options.uiConfig && options.uiConfig.pagination === true) {
      this.options.uiConfig.pagination = {};
    }

    this._tableInit();
    this.handleLoadDic();
  },
  mounted() {
    this.$nextTick(() => {
      this._computedLayoutHeight();
    });
  },
  methods: {
    deepClone,
    vaildData,
    validatenull,
    asyncValidator,
    vaildBoolean,
    /**
     * 内部使用方法
     */
    _tableInit(reload) {
      //服务器模式处理
      // console.log(this.currentPage, this.pageSize);
      if (this.isServerMode) {
        this._loadServerMode(this.isServerMode.data);
      } else {
        //如果是刷新表格，如果data为空，说明是在外部使用ajax请求数据，则出现加载动画，3秒后加载动画关闭
        if (reload || !this.options.data || this.options.data.length === 0) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }

        this._setTableData(this.options.data);
      }
    },
    // 检索
    _getFilterTableData() {
      return this.allData.filter((row, index) => {
        //如果开启搜索则进行检索，否则直接返回true
        if (this.uiConfig.searchable) {
          //获取要检索的prop
          let filterColumnConfig = Array.isArray(this.uiConfig.searchable)
            ? this.uiConfig.searchable
            : this.columnConfig;
          //如果列中有一项符合则返回  问题
          return filterColumnConfig.some((col, colIndex) => {
            //如果设置了筛选项，则不用再从prop中读取，其值即为prop
            let currentProp = col.prop ? col.prop : col;

            //如果不存在，则跳过
            if (!row[currentProp]) return false;

            let isMatch =
              typeof row[currentProp] === "number"
                ? row[currentProp] == this.searchVal.toLowerCase()
                : row[currentProp]
                    .toLowerCase()
                    .includes(this.searchVal.toLowerCase());

            return !this.searchVal || isMatch;
          });
        } else {
          return true;
        }
      });
    },
    // 获取分页数据
    _getPatinationData() {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      let paginationConfig = this.uiConfig.pagination;

      if (paginationConfig) {
        //如果采用服务端分页模式
        if (this.isServerMode) {
          this._loadServerMode({
            [this.pageSizeKey]: pageSize,
            [this.pageNumKey]: currentPage
          });
        } else {
          //如果不是服务器模式
          // 如果tableData.length >= total，说明allData是全部数据，使用tableData分页即可
          if (this.tableData.length >= this.uiConfig.pagination.total) {
            let currentIndex = currentPage * pageSize;
            this.tableShowData = this.tableData.slice(
              currentIndex - pageSize,
              currentIndex
            );
          } else {
            // 否则直接显示设置数据
            this.tableShowData = this.tableData;
          }
        }
      } else {
        this.tableShowData = this.tableData;
      }

      this.searchVal = "";
    },
    // 加载服务端数据
    _loadServerMode(data) {
      let _this = this;
      //加载中开始
      this.loading = true;

      let serverMode = this.isServerMode;
      let url = this.isServerMode.url;
      this._axios({
        mehtod: this.isServerMode.type,
        url: url,
        data: data
      })
        .then(res => {
          this._setTableData(res[this.listKey]);
          this.setPaginationTotal(res[this.totalKey]);
        })
        .catch(err => {
          //加载中结束
          this.loading = false;
          throw err;
        })
        .finally(() => {
          //加载中结束
          this.loading = false;
        });
    },
    // AXIOS
    _axios({ mehtod = "get", url = "", data = {} }) {
      if (url instanceof Function) {
        return url(data);
      } else if (typeof url === "string") {
        return this.$axios({ mehtod, url, data });
      }
    },
    //放进方法队列
    _pushInMethodsQueue(fn, params) {
      this.methodsQueue.push({
        fn: fn,
        params: params
      });
    },
    // 计算高度
    _computedLayoutHeight() {
      // 如果是根据内容自适应
      if (this.uiConfig.height === "auto") return;

      // 拿到设置高度
      let _height = this.uiConfig.height
        ? parseFloat(this.uiConfig.height)
        : this.$el.parentNode.clientHeight;

      // 放进layout数组中
      this.layoutHeight.push(_height);

      // 计算组件中$refs的高度
      for (const key in this.$refs) {
        if (this.$refs.hasOwnProperty(key)) {
          const element = this.$refs[key];
          if (element.clientHeight) {
            _height = _height - element.clientHeight;
          }
        }
      }

      // 分页有20px的margin-top
      this.tableHeight = _height - 20;
    },
    //set
    _setCurrentRowData(row) {
      //设置当前选中行
      this.currentRowData = row;
    },
    _setTableData(data) {
      if (!(data instanceof Array)) return;
      if (this.isServerMode) {
        this.tableShowData = data;
      } else {
        this.tableData = data;
      }
      this.allData = data;
      // 设置总页数为null，这样在数据更新后没有手动设置total，会自动读取数据长度
      // this.setPaginationTotal(null);
    },
    //分页模式，每页显示数量变化时触发
    _handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._handlerPagination(pageSize, this.currentPage);
    },
    //分页模式，切换页时触发
    _handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this._handlerPagination(this.pageSize, currentPage);
    },
    // 分页点击调用
    _handlerPagination(pageSize, currentPage) {
      this.uiConfig.pagination.handler &&
        this.uiConfig.pagination.handler(pageSize, currentPage, this);
    },
    // 当前行是否可多选
    _selectable: function(row, index) {
      if (typeof this.tableMethods.selectable == "function") {
        return this.tableMethods.selectable(row, index);
      } else {
        return true;
      }
    },

    /**
     * 以下行编辑
     */
    _editBtnText(row, index) {
      return row.$cellEdit === true ? "保 存" : "编 辑";
    },
    formRulesInit() {
      this.formRules = {};
      this.propOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
        if (ele.rules && ele.cell) this.formCellRules[ele.prop] = ele.rules;
      });

      let _self = this;
      _.map(this.propOption, (item, key) => {
        if (item.rules && item.disabled !== false && item.display !== false) {
          let currentRules = item.rules;
          // 必填时自动生成message
          if (
            validatenull(currentRules.validator) &&
            (!currentRules.message || currentRules.message.trim().length === 0)
          ) {
            if (currentRules.required) {
              currentRules.message = `必填，请填写${item.label}`;
            }
          }
          // 添加进rules
          if (_.isArray(currentRules)) {
            _self.$set(_self.formRules, item.prop, currentRules);
            _self.$set(_self.formCellRules, item.prop, currentRules);
          } else if (_.isObject(currentRules)) {
            _self.$set(_self.formRules, item.prop, [currentRules]);
            _self.$set(_self.formCellRules, item.prop, [currentRules]);
          }
        }
      });
    },
    _rowCell(row, index) {
      if (row.$cellEdit) {
        this._rowCellUpdate(row, index);
      } else {
        this._rowCellEdit(row, index);
      }
    },
    //单元格新增
    _rowCellAdd(obj = {}) {
      const len = this.tableShowData.length;
      this.tableShowData.push(
        this.deepClone(
          Object.assign(
            this.tableForm,
            {
              $cellEdit: true,
              $index: len
            },
            obj
          )
        )
      );
      this.formIndexList.push(len);
    },
    //行取消
    _rowCanel(row, index) {
      if (this.validatenull(row[this.rowKey])) {
        this.tableShowData.splice(index, 1);
        return;
      }
      this.formCascaderList[index].$cellEdit = false;
      //设置行数据
      this.$set(this.tableShowData, index, this.formCascaderList[index]);

      this.formIndexList.splice(this.formIndexList.indexOf(index), 1);
    },
    // 单元格编辑
    _rowCellEdit(row, index) {
      row.$cellEdit = true;
      this.$set(this.tableShowData, index, row);
      //缓冲行数据
      this.formCascaderList[index] = this.deepClone(row);

      setTimeout(() => {
        this.formIndexList.push(index);
      }, 1000);
    },
    //单元格更新
    _rowCellUpdate(row, index) {
      this.btnDisabled = true;
      this.asyncValidator(this.formCellRules, row)
        .then(res => {
          this.$emit(
            "row-update",
            row,
            index,
            () => {
              row.$cellEdit = false;
              this.$set(this.tableShowData, index, row);
            },
            () => {
              this.btnDisabled = false;
            }
          );
        })
        .catch(errors => {
          errors[0].message = `第${index + 1}行：${errors[0].message}`;
          this.$message.warning(errors[0]);
        });
    },
    // 由于slot-scope和formatter不能共存只能如此
    _columnFormatter(scopeRow, currentColumn) {
      let row = scopeRow.row;
      let column = scopeRow.column;

      if (typeof currentColumn.formatter === "function") {
        return currentColumn.formatter(row, column);
      } else {
        return this._globalColumnFormatter(row, column, currentColumn);
      }
    },
    // 全局初始化
    _globalColumnFormatter(row, column, currentColumn) {
      let value = row[column.property];
      if (typeof value === "string" && value.trim().length === 0) {
        return "--";
      }
      if (!value) {
        return "--";
      }
      return this.handleDetail(
        row,
        currentColumn,
        this.DIC[currentColumn.prop]
      );
    },
    cellEditFlag(row, column) {
      return row.$cellEdit && column.slot !== true && column.cell;
    },
    handleDetail(row, column, DIC) {
      let result = row[column.prop];
      result = detail(row, column, this.tableOption, DIC);
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    handleShowLabel(row, column, DIC) {
      let result = "";
      result = detail(row, column, this.tableOption, DIC);
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    },

    /**
     * table触发方法
     */
    //行单击事件
    rowClick(row, column, e) {
      //如果是操作列则不执行
      if (
        preventClick.includes(column.property) ||
        preventClick.includes(column.type)
      )
        return;
      this._setCurrentRowData(row);

      clearTimeout(dblclickTimer);
      dblclickTimer = setTimeout(
        () => {
          this.tableMethods.rowClick &&
            this.tableMethods.rowClick(row, column, e);

          this.$emit("row-click", row, column, e);
        },
        this.clickConflict ? 200 : 0
      );
    },
    //行双击事件
    rowDblclick(row, column, e) {
      //如果是操作列则不执行
      if (
        preventClick.includes(column.property) ||
        preventClick.includes(column.type)
      ) {
        return;
      }
      this._setCurrentRowData(row);

      clearTimeout(dblclickTimer);
      this.tableMethods.rowDblclick &&
        this.tableMethods.rowDblclick(row, column, e);

      this.$emit("row-dblclick", row, column, e);
    },
    //单选选择当前行
    setCurrentRow(index) {
      if (this.loading) {
        this._pushInMethodsQueue(this.setCurrentRow, [index]);
        return;
      }

      this.$refs.dataBaseTable.setCurrentRow(this.tableShowData[index]);

      this._setCurrentRowData(this.tableShowData[index]);
    },
    //多选选择当前项
    toggleSelection(rowsIndex, selectedArr) {
      if (this.loading) {
        this._pushInMethodsQueue(this.toggleSelection, [
          rowsIndex,
          selectedArr
        ]);
        return;
      }
      /**
       * rowsIndex为  [0,2,5]形式的行标号
       * selectedArr为 [true,false]形式的boolean数组，表明对应行选中与否
       */
      if (selectedArr) {
        for (let index = 0; index < rowsIndex.length; index++) {
          const row = this.tableShowData[rowsIndex[index]];
          const rowSelected = selectedArr[index];
          if (!row) continue;
          this.$refs.dataBaseTable.toggleRowSelection(row, rowSelected);
        }
      } else {
        for (let index = 0; index < rowsIndex.length; index++) {
          const row = this.tableShowData[rowsIndex[index]];
          if (!row) continue;
          this.$refs.dataBaseTable.toggleRowSelection(row);
        }
      }
    },
    //多选切换全选状态
    toggleAllSelection() {
      this.$refs.dataBaseTable.toggleAllSelection();
    },
    //点击排序触发
    sortChange(sortObj) {
      //如果排序没有，则恢复数据
      if (!sortObj.order) {
        this.tableData = this.allData;
        return;
      }
      //如果有排序方法，则执行
      if (this.tableMethods.sortChange) {
        this.tableMethods.sortChange(sortObj, this);
      }

      //如果采用服务端分页模式
      if (this.isServerMode) {
        let currentPage = this.currentPage;
        let pageSize = this.pageSize;

        this._loadServerMode({
          [this.pageSizeKey]: pageSize,
          [this.pageNumKey]: currentPage,
          [this.orderTypeKey]:
            sortObj.order == "ascending" ? this.ascKey : this.descKey,
          [this.orderPropKey]: sortObj.prop
        });
      }

      this.$emit("sort-change", sortObj, this);
    },
    // 当勾选数据行的checkbox时触发
    select(selection, row) {
      if (this.tableMethods.select) {
        this.tableMethods.select(selection, row, this);
      }

      this.$emit("select", selection, row, this);
    },
    // 当勾选全选checkbox时触发
    selectAll(selection) {
      if (this.tableMethods.selectAll) {
        this.tableMethods.selectAll(selection, this);
      }

      this.$emit("select-all", selection, this);
    },
    // 当选择项发生变化时触发该事件
    selectionChange(selection) {
      this.selectedData = selection;
      if (this.tableMethods.selectionChange) {
        this.tableMethods.selectionChange(selection, this);
      }

      this.$emit("selection-change", selection, this);
    },
    //多选清除选择项
    clearSelection() {
      this.$refs.dataBaseTable.clearSelection();
    },
    //重新布局
    doLayout() {
      this.$refs.dataBaseTable.doLayout();
      this.key++;
    },
    //以下方法未添加
    toggleRowExpansion() {},
    // 清除排序
    clearSort() {
      this.$refs.dataBaseTable.clearSort();
      this.tableData = this.allData;
    },
    // 清除过滤
    clearFilter(columnKey) {
      this.$refs.dataBaseTable.clearFilter(columnKey);
    },
    sort() {},

    /**
     * 外部调用方法
     */
    //get
    // 获取表格多选框选中数据
    getSelectedData() {
      //多选获取当前选中值
      return this.selectedData;
    },
    // 获取当前表格单击选中数据
    getCurrentRowData() {
      //单选获取当前选中行
      return this.currentRowData;
    },
    // 获取表格全部数据
    getTableData() {
      if (this.isServerMode) {
        return this.getTableShowData();
      } else {
        return this.tableData;
      }
    },
    // 获取表格当前显示数据
    getTableShowData() {
      return this.tableShowData;
    },
    //set
    // 设置表格数据
    setData(data) {
      this._setTableData(data);
    },
    // 设置分页每页显示条数
    setPaginationPageSize(pageSize) {
      this.pageSize = pageSize;
    },
    // 设置分页显示当前第几页
    setCurrentPage(pageNum) {
      this.currentPage = pageNum;
    },
    // 设置数据总条数，计算页数使用
    setPaginationTotal(totalNum) {
      this.uiConfig.pagination.total = totalNum;
    },
    // 设置列配置
    setColumnConfig(columnConfig) {
      this.columnConfig = columnConfig;
    },
    //refresh
    refreshTable() {
      this._tableInit(true);
      this.doLayout();
    }
  },
  computed: {
    columnConfig: {
      get() {
        if (this.options.columnConfig) {
          return this.options.columnConfig;
        } else {
          console.error("表格列配置为必须项");
          return;
        }
      },
      set(columnConfig) {
        this.options.columnConfig = columnConfig;
      }
    },
    btnConfig() {
      // 如果有operation，则代表要使用slot的列操作，权重为最高
      let operation = this.options.operation;
      if (operation) {
        if (typeof operation === "boolean") {
          this.options.btnConfig = defaultBtnConfig;
        } else if (typeof operation === "object") {
          // 设置默认值
          setDefaultValue(defaultBtnConfig, operation);
          this.options.btnConfig = operation;
        }
      }
      return this.options.btnConfig ? this.options.btnConfig : false;
    },
    uiConfig() {
      let uiConfig = this.options.uiConfig || {};
      // 设置默认值
      setDefaultValue(defaultUiConfig, uiConfig);
      // 初始化currentPage和pageSize
      this.currentPage = uiConfig.pagination.currentPage;
      this.pageSize = uiConfig.pagination.pageSize;
      //如果没有配置的pagination，则使用默认的配置项
      return uiConfig;
    },
    wrapperHeight() {
      if (this.layoutHeight.length === 0) return;

      let layoutHeight = this.layoutHeight.reduce((last, next) => {
        return last + (next ? parseFloat(next) : 0);
      }, 0);
      // console.log(layoutHeight + "px");
      return layoutHeight + "px";
    },
    paginationObj() {
      const { currentPage, pageSize } = this;
      return { currentPage, pageSize };
    },
    parentOption() {
      return this.tableOption || {};
    },
    columnFormOption() {
      let list = [];
      if (this.isGroup) {
        this.groupOption.forEach(ele => {
          if (!ele.column) return;
          ele.column.forEach(column => {
            list.push(column);
          });
        });
      } else {
        list = this.propOption;
      }
      return list;
    },
    propOption() {
      let result = [];
      const safe = this;
      function findProp(list) {
        if (!Array.isArray(list)) return;
        list.forEach(ele => {
          if (ele.prop) {
            result.push(ele);
          }
          if (ele.children) {
            safe.isChild = true;
            findProp(ele.children);
          }
        });
      }
      findProp(this.columnConfig);
      return result;
    },
    isGroup() {
      return !this.validatenull(this.tableOption.group);
    }
  },
  watch: {
    //开启服务器模式且已经加载完毕，执行已经保存的方法队列
    loading(val) {
      if (!val && this.methodsQueue.length > 0) {
        this.$nextTick(() => {
          this.methodsQueue.forEach(element => {
            element.fn.apply(this, element.params);
          });
          // this.methodsQueue = [];如果在这里清除，调用刷新方法后无法再次执行
        });
      }
    },
    //检索
    searchVal(val) {
      let filterData = this._getFilterTableData();
      if (!this.searchVal) {
        this.isServerMode
          ? (this.tableShowData = filterData)
          : (this.tableData = filterData);
      } else {
        this.tableShowData = filterData;
      }
    },
    //如果开启分页，则根据设置的分页规则进行分页，后期还需要添加ajax服务器分页
    paginationObj: {
      deep: true,
      handler: function(newVal, oldVal) {
        if (this.uiConfig.pagination.handler) {
          return;
        }
        if (oldVal.pageSize != Number.POSITIVE_INFINITY) {
          //为防止在极短的时间内重复请求
          clearTimeout(paginationTimer);
          paginationTimer = setTimeout(() => {
            this._getPatinationData();
          }, 0);
        }
      }
    },
    //动态监测tableConfig.data的改变，有可能外部ajax改变data值
    "options.data"(val) {
      this._setTableData(val);
    },
    tableData(newVal, oldVal) {
      if (newVal instanceof Array) {
        this._getPatinationData();
        //加载中结束
        this.loading = false;
      } else {
        this.$notify({
          type: "error",
          message: LOG.error.tableData.TypeError
        });
      }
    }
  }
};
</script>
<style lang='less'>
@headerBgc: #f4f6fc;
@headerTextColor: #666;
@TableFontFamily: "Microsoft YaHei";
@TableFontSize: 14px;

.el-table-wrapper {
  font-family: @TableFontFamily;
  font-size: @TableFontSize;
  width: 100%;
  .el-table {
    .el-table__fixed-right-patch {
      background-color: @headerBgc;
      border: 1px solid #e5eaf2;
      border-left: 0px;
    }
    .el-table__header,
    .el-table__body {
      border: 1px solid #e5eaf2;
      border-bottom: 0px;
    }
    .el-table__header {
      border-right: 0px;
    }
    .el-table__body {
      border-top: 0px;
    }
    // 去除多选宽度不够会显示省略号
    .el-table-column--selection {
      text-overflow: inherit !important;
      .cell {
        text-overflow: inherit !important;
      }
    }
    // 列标题
    .el-table-header {
      th {
        background-color: @headerBgc !important;
        color: @headerTextColor;
        font-weight: bold;
      }
      button {
        width: auto !important;
      }
    }
    .el-table-cell {
      color: #666;
      font-weight: 400;
      button {
        width: auto !important;
      }
    }
    // 当前行
    .current-row {
      td {
        background-color: #f5fafb !important;
      }
      .edit-row-input {
        display: block;
      }
      .edit-row-input + span {
        display: none;
      }
    }
    // 下拉
    .el-dropdown {
      margin-left: 10px;
      font-size: 12px;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon--right {
        margin-left: 0;
      }
    }
    .edit-row-input {
      display: none;
    }
  }
  // 分页
  .table-pagination {
    margin-top: 20px;
    color: #bababa;
    background-color: #f4f5f7;
    .btn-prev,
    .btn-next,
    ul.el-pager li {
      background-color: inherit;
    }
  }
  // 编辑
  .z-input-number,
  .el-cascader,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-select {
    width: 100% !important;
  }
}
</style>