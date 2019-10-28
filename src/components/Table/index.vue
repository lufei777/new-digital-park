<template>
  <div class="el-table-wrapper" :style="{
    height:wrapperHeight
  }">
    <div ref="customTop" style="height:auto;">
      <slot
        name="custom-top"
        :columnConfig="columnConfig"
        :allData="allData"
        :tableShowData="tableShowData"
      ></slot>
    </div>

    <el-table
      ref="dataBaseTable"
      :data="tableShowData"
      v-loading="loading||false"
      :height="tableHeight"
      :key="key"
      :size="uiConfig.size"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :header-cell-style="{padding:'0px'}"
      row-key="id"
      border
      stripe
      highlight-current-row
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @sort-change="sortChange"
    >
      <!-- 多选 -->
      <el-table-column fixed="left" v-if="uiConfig.selection" type="selection" width="37"></el-table-column>

      <!-- 索引 -->
      <el-table-column
        fixed="left"
        v-if="uiConfig.showIndex"
        type="index"
        :index="uiConfig.showIndex.handler"
        width="37"
      ></el-table-column>

      <!-- 正常列 -->
      <!-- <tableColumn :columnConfig="columnConfig" /> -->
      <template v-for="col in columnConfig">
        <el-table-column
          v-if="!col.hide"
          :key="col.label"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :fixed="col.fixed"
          :sortable="col.sortable||false"
          :formatter="col.formatter"
          show-overflow-tooltip
          align="right"
        >
          <!-- <template slot-scope="scopeRow"></template> -->
        </el-table-column>
      </template>

      <!-- 列操作 -->
      <el-table-column
        :fixed="btnConfig.fixed"
        :prop="btnConfig.prop"
        :label="btnConfig.label"
        :width="btnConfig.width"
        :align="uiConfig.searchable ? 'center' : 'right'"
      >
        <!-- 搜索框 -->
        <template v-if="uiConfig.searchable" slot="header">
          <el-input v-model="searchVal" size="mini" placeholder="检索" />
        </template>
        <!-- 按钮 -->
        <template slot-scope="scopeRow">
          <template v-for="btn in btnConfig.btns">
            <!-- 基础模式，如删除，编辑。参数为scopeRow -->
            <el-button
              v-if="btn.type === 'basic' || !btn.type"
              size="small"
              type="text"
              :key="btn.label"
              @click.stop="btn.handler(scopeRow)"
            >
              <i v-if="btn.icon" :class="btn.icon"></i>
              {{btn.label}}
            </el-button>
            <!-- 带下拉按钮，参数为scopeRow -->
            <dropDown
              v-if="btn.type === 'dropDown'"
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
    <div ref="tablePagination" v-if="uiConfig.pagination" class="table-pagination">
      <pagination
        :paginationConfig="uiConfig.pagination"
        :total="uiConfig.pagination.total||tableData.length"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
// import tableColumn from "./tableColumn";
import pagination from "./pagination";
import dropDown from "./dropDown";

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
  pagination: {
    layout: "->, total, sizes, prev, pager, next, jumper",
    pageSizes: [5, 10, 20],
    currentPage: 1
  }
};
//单双击冲突timer
let dblclickTimer = null;
let paginationTimer = null;

//点击事件屏蔽列
let preventClick = ["selection", "operation"];

export default {
  props: {
    tableConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    // tableColumn,
    pagination,
    dropDown
  },
  data() {
    return {
      allData: [], //保存数组原始数据，用来复原数据
      tableData: [], //表格传入数据，用作分页使用
      tableShowData: [], //表格实际展示数据
      tableMethods: {}, //触发方法
      methodsQueue: [], //方法队列，因为可能是ajax请求的数据，所以需要在加载未成功前缓存方法，加载成功后再执行
      key: 1, //在doLayout中改变，为保证每次Table都是重新渲染
      loading: false, //是否呈加载状态
      currentPage: 1,
      pageSize: Number.POSITIVE_INFINITY,
      searchVal: "",
      layoutHeight: [] //高度数组，用来决定整体高度
    };
  },
  created() {
    /**
     * 事件配置处理
     */
    this.tableMethods = this.tableConfig.tableMethods;
    //如果行单击和行双击都设置了，则需要解决事件冲突
    if (this.tableMethods.rowClick && this.tableMethods.rowDblclick) {
      this.clickConflict = true;
    }

    //服务器模式
    this.isServerMode = this.tableConfig.serverMode;

    //ui配置处理
    if (this.tableConfig.uiConfig.pagination === true) {
      this.tableConfig.uiConfig.pagination = {};
    }
    //分页
    if (this.uiConfig.pagination) {
      this.currentPage = this.uiConfig.pagination.currentPage;
      this.pageSize = this.uiConfig.pagination.pageSizes[0];
    }

    this._tableInit();
  },
  mounted() {
    this.$nextTick(() => {
      this.computedLayoutHeight();
    });
  },
  methods: {
    /**
     * 内部使用方法
     */
    _tableInit(reload) {
      //服务器模式处理
      if (this.isServerMode) {
        this._loadServerMode(this.isServerMode.data);
      } else {
        //如果是刷新表格，如果data为空，说明是在外部使用ajax请求数据，则出现加载动画，3秒后加载动画关闭
        if (
          reload ||
          !this.tableConfig.data ||
          this.tableConfig.data.length === 0
        ) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 3000);
        }

        this.setTableData(this.tableConfig.data);
      }
    },
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
    _getPatinationData() {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      let _this = this;
      let paginationConfig = this.uiConfig.pagination;

      if (paginationConfig) {
        //加载开始
        this.loading = true;
        //如果采用服务端分页模式
        if (this.isServerMode) {
          this._loadServerMode({
            pageSize: pageSize,
            pageNum: currentPage
          });
        } else {
          //如果不是服务器模式
          let currentIndex = currentPage * pageSize;
          this.tableShowData = this.tableData.slice(
            currentIndex - pageSize,
            currentIndex
          );
        }
      } else {
        this.tableShowData = this.tableData;
      }

      this.searchVal = "";
    },
    _loadServerMode(sendData) {
      //加载中开始
      this.loading = true;

      let serverMode = this.isServerMode;
      let url = this.isServerMode.url;

      if (url instanceof Function) {
        //如果使用方法来进行分页请求
        url(sendData).then(res => {
          this.setTableData(res.list);
          this.uiConfig.pagination.total = res.total;
          //加载中结束
          this.loading = false;
        });
      } else {
        //ajax请求type和url
        let type = this.isServerMode.type.toLowerCase();

        this.$axios[type](url, sendData)
          .then(res => {
            console.log(res);
            res = res.data;
            this.setTableData(res.data);
            this.uiConfig.pagination.total = res.total;
            //加载中结束
            this.loading = false;
          })
          .catch(err => {
            throw err;
          });
      }
    },
    //放进方法队列
    _pushInMethodsQueue(fn, params) {
      this.methodsQueue.push({
        fn: fn,
        params: params
      });
    },
    computedLayoutHeight() {
      this.layoutHeight.push(this.uiConfig.height);
      for (const key in this.$refs) {
        if (this.$refs.hasOwnProperty(key)) {
          const element = this.$refs[key];
          this.layoutHeight.push(element.offsetHeight);
        }
      }
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
      this.setCurrentRowData(row);

      clearTimeout(dblclickTimer);
      dblclickTimer = setTimeout(
        () => {
          this.tableMethods.rowClick &&
            this.tableMethods.rowClick(row, column, e);
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
      )
        return;
      this.setCurrentRowData(row);

      clearTimeout(dblclickTimer);
      this.tableMethods.rowDblclick &&
        this.tableMethods.rowDblclick(row, column, e);
    },
    //列操作下拉方法
    handleCommand(command, currentMenu) {
      //下拉回调执行
      command(currentMenu.$attrs);
    },
    //单选选择当前行
    setCurrentRow(index) {
      if (this.loading) {
        this._pushInMethodsQueue(this.setCurrentRow, [index]);
        return;
      }

      this.$refs.dataBaseTable.setCurrentRow(this.tableShowData[index]);

      this.setCurrentRowData(this.tableShowData[index]);
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
    //多选清除选择项
    clearSelection() {
      this.$refs.dataBaseTable.clearSelection();
    },
    //分页模式，每页显示数量变化时触发
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    //分页模式，切换页时触发
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
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
    },
    //重新布局
    doLayout() {
      this.$refs.dataBaseTable.doLayout();
      this.key++;
    },
    //以下方法未添加
    toggleRowExpansion() {},
    clearSort() {},
    clearFilter() {},
    sort() {},

    /**
     * 外部调用方法
     */
    //get
    getSelectedData() {
      //多选获取当前选中值
      return this.$refs.dataBaseTable.selection;
    },
    getCurrentRowData() {
      //单选获取当前选中行
      return this.currentRowData;
    },
    getTableData() {
      if (this.isServerMode) {
        return this.tableShowData;
      } else {
        return this.tableData;
      }
    },
    getTableShowData() {
      return this.tableShowData;
    },
    //set
    setCurrentRowData(row) {
      //设置当前选中行
      this.currentRowData = row;
    },
    setTableData(data) {
      if (!(data instanceof Array)) return;
      if (this.isServerMode) {
        this.tableShowData = data;
      } else {
        this.tableData = data;
      }
      this.allData = data;
    },
    //refresh
    refreshTable() {
      this._tableInit(true);
      this.doLayout();
    }
  },
  computed: {
    columnConfig() {
      return this.tableConfig.columnConfig;
    },
    btnConfig() {
      return this.tableConfig.btnConfig;
    },
    uiConfig() {
      //如果没有配置的pagination，则使用默认的配置项
      if (this.tableConfig.uiConfig.pagination) {
        var defaultKeys = Object.keys(defaultUiConfig.pagination);
        for (let index = 0; index < defaultKeys.length; index++) {
          const element = defaultKeys[index];
          if (!this.tableConfig.uiConfig.pagination[element]) {
            this.tableConfig.uiConfig.pagination[element] =
              defaultUiConfig.pagination[element];
          }
        }
      }
      return this.tableConfig.uiConfig;
    },
    wrapperHeight() {
      let layoutHeight = this.layoutHeight.reduce((last, next) => {
        return last + (next ? parseFloat(next) : 0);
      }, 0);
      return layoutHeight + "px";
    },
    tableHeight() {
      return this.uiConfig.height;
    },
    paginationObj() {
      const { currentPage, pageSize } = this;
      return {
        currentPage,
        pageSize
      };
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
    "tableConfig.data"(val) {
      this.setTableData(val);
      //关闭加载
      this.loading = false;
    },
    tableData(newVal, oldVal) {
      if (newVal instanceof Array) {
        this._getPatinationData();
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
.el-table-wrapper {
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
}
</style>