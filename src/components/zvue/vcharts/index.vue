<template>
  <component
    ref="myCharts"
    width="100%"
    height="100%"
    :is="componentId"
    :data="options.chartData"
    :grid="options.grid"
    :colors="options.colors"
    :visualMap="options.visualMap"
    :dataZoom="options.dataZoom"
    :toolbox="options.toolbox"
    :title="options.title"
    :legend="options.legend"
    :yAxis="options.yAxis"
    :xAxis="options.xAxis"
    :radar="options.radar"
    :tooltip="options.tooltip"
    :axisPointer="options.axisPointer"
    :brush="options.brush"
    :geo="options.geo"
    :timeline="options.timeline"
    :graphic="options.graphic"
    :series="options.series"
    :backgroundColor="options.backgroundColor"
    :textStyle="options.textStyle"
    :animation="options.animation"
    :settings="options.settings"
    :extend="options.extend"
    :events="options.events"
    :legend-visible="options.legendVisible"
    :tooltip-visible="options.tooltipVisible"
    :init-options="options.initOptions"
    :theme-name="options.themeName"
    :theme="options.theme"
    :set-option-opts="options.setOptionOpts"
    :log="options.log"
    :loading="loading"
    :data-empty="dataEmpty"
  ></component>
</template>
<script>
// ready 图表渲染完成后触发，每次渲染都会触发一次3
// ready-once 只会在首次渲染完成后触发

const EMPTY_DATA = {
  columns: [],
  rows: []
};

export default {
  name:'zCharts',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ...this.options,
      chartWidth: "",
      loading: false,
      dataEmpty: false
    };
  },
  mounted() {
    this._chartInit();
    this.charts = this.$refs["myCharts"];
  },
  methods: {
    _chartInit() {
      // 服务器模式
      if (this._isServerMode()) {
        this._getServerData();
      } else {
        this.chartData = this.options.chartData;
      }
    },
    _isServerMode() {
      let chartData = this.options.chartData;
      return (
        chartData.serverMode &&
        (typeof CharacterData.rows === "undefined" ||
          chartData.rows.length === 0)
      );
    },
    _getServerData() {
      this.loading = true;

      let serverMode = this.options.chartData.serverMode;
      let url = serverMode.url;
      let dataSrc = serverMode.dataSrc;

      if (url instanceof Function) {
        //如果使用方法来进行分页请求
        url(serverMode.data)
          .then(res => {
            var data = res[dataSrc];
            if (data.length) {
              this._setchartData({
                rows: data
              });
            } else {
              this._setchartData(EMPTY_DATA);
            }
            //加载中结束
            this.loading = false;
          })
          .catch(err => {
            //加载中结束
            this.loading = false;
            this.dataEmpty = true;
            throw err;
          });
      } else {
        //ajax请求type和url
        let type = serverMode.type.toLowerCase();
        this.$axios({
          method: type,
          url: url,
          data: serverMode.data
        })
          .then(res => {
            var data = res.data[dataSrc];
            if (data.length) {
              this._setchartData({
                rows: data
              });
            } else {
              this._setchartData(EMPTY_DATA);
            }
            //加载中结束
            this.loading = false;
          })
          .catch(err => {
            //加载中结束
            this.loading = false;
            this.dataEmpty = true;
            throw err;
          });
      }
    },
    _afterConfig(options) {
      console.log(options);
      return options;
    },
    _setchartData({ columns, rows }) {
      this.options.chartData = {
        columns: columns || this.options.chartData.columns,
        rows
      };
    },
    resize() {
      this.charts.echarts.resize();
    },
    refreshByData(data) {
      if (data instanceof Array) {
        this._setchartData({ rows: data });
      }
    }
  },
  computed: {
    componentId() {
      return "ve-" + this.options.type;
    }
  },
  watch: {
    "options.chartData"(newvalue, oldvalue) {
      if (!(newvalue.rows instanceof Array) || newvalue.rows.length === 0) {
        this.dataEmpty = true;
      } else {
        this.dataEmpty = false;
      }
    }
  }
};
</script>
