import elementResizeDetectorMaker from 'element-resize-detector'

class chartUtils {
  //柱状图处理
  handleBarChart(dom, data, resizeBox) {
    let {legendUi = {}, legendUi: {axisPointer: tooltipAxisPointer = {}} = {}} = data
    let {xAxisUi = {}, xAxisUi:{axisLabel:xAxisLabel = {},axisLine:xAxisLine = {}} = {}} = data
    let {textStyle:xLabelTextStyle = {}} = xAxisLabel
    let {lineStyle:xLineStyle = {}} = xAxisLine

    let {yAxisUi = {}, yAxisUi:{axisLabel:yAxisLabel = {},axisLine:yAxisLine = {}} = {}} = data
    let {textStyle:yLabelTextStyle = {}} = yAxisLabel
    let {lineStyle:yLineStyle = {}} = yAxisLine
    // console.log("1132",xAxisUi,xAxisLabel,xLabelTextStyle)

    let yAxis
    if (!data.showSecondY) {  //是否隐藏第二个y轴，默认不传及隐藏
      yAxis = [{
        type: yAxisUi.type || 'value',
        name: data.yAxis,
        data:data.yAxisData,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: yLineStyle.color || '#333',
            width: 1,
          }
        }
      }]
    } else {
      yAxis = [{
        type: 'value',
        name: data.yAxis,
      }, {
        type: 'value',
        name: 'zzz',
        min: -100,
        max: 100,
      }]
    }

    let option = {
      title: {
        text: data.titleText,
        textStyle: {
          fontSize: 14,
          color: '#008DEA',
        }
      },
      legend: {
        data: data.legendData
      },
      tooltip: {
        trigger: 'axis',
        showDelay: 300,
        axisPointer: {
          type: tooltipAxisPointer.type || 'line'
        },
        formatter: legendUi && legendUi.formatter || ''
      },
      calculable: true,
      color: data.color || ['#4094ff', '#013b4e', '#FAAD14', '#F5222D'],
      xAxis: [{
        type: xAxisUi.type ||'category',
        data: data.xAxis,
        axisLabel: {
          show: xLabelTextStyle.show || true,
          textStyle: {
            color: xLabelTextStyle.color || '',
          }
        },
        axisLine: {
          show: xLineStyle.show || true,  //这里的show用于设置是否显示x轴那一条线 默认为true
          lineStyle: {  //lineStyle里面写x轴那一条线的样式
            color: xLineStyle.color || '#333',
            width: 1,    //轴线的粗细值为0的时候线隐藏
          }
        },
        axisTick: {
          show: false,  //是否显示网状线 默认为true
        },
        splitLine:{
          show:false
        }
      }],
      yAxis: yAxis,
      series: data.series,
    };
    // window.onresize = dom.resize;
    // window.addEventListener("resize", () => {
    //   dom.resize();
    // })
    // if(resizeBox){
    //   let erd = elementResizeDetectorMaker()
    //   erd.listenTo(resizeBox, function () {
    //     dom.resize();
    //   })
    // }
    $(window).resize(function () {
      dom.resize()
    })
    dom.setOption(option, true)
  }

  //空心饼图
  hollowPieChart(dom, data) {
    let {legendUi = {}, legendUi: {textStyle: legendTextStyle = {}} = {}} = data
    let {seriesUi = {}, seriesUi: {label: seriesLabel = {}} = {}} = data
    let {normal: seriesNormal = {}, emphasis: seriesEmphasis = {}} = seriesLabel
    let {titleUi = {}, titleUi: {textStyle: titleTextStyle = {}} = {}} = data
    // console.log("data",data)
    // console.log("1",legendTextStyle,legendUi)
    // console.log(seriesLabel,seriesNormal,seriesEmphasis)
    // console.log(seriesEmphasis.show==false)
    let option = {
      title: {
        text: data.titleText,
        padding: [0, 0],
        textStyle: {
          color: titleTextStyle.color || '#666',
          fontWeight: titleTextStyle.fontWeight || 'bold',
          // align: 'top',
          fontSize: titleTextStyle.fontSize || "14",
        },
        top: titleTextStyle.top | '',
        left: titleTextStyle.left || ''
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        showDelay: 100
      },
      legend: {
        orient: legendUi.orient || 'vertical',
        right: legendUi.right || '3%',
        //只要top字段存在（不管设置与否），则bottom属性不起作用，所以若想设置top，请单独再组件里设置
        // top:legendUi.top || '',
        bottom: legendUi.bottom || '3%',
        data: data.legendData,
        textStyle: {
          fontSize: legendTextStyle.fontSize || 14,
          color: legendTextStyle.color || 'gray'
        },
        formatter: legendUi && legendUi.formatter || ''
      },
      color: data.color || ['#563ad2', '#25e4a3', '#ed5e50', '#66fbf9', "#de8536", "#dab54c", "#325df9"],
      series: [{
        name: data.seriesName ? data.seriesName : '',
        type: 'pie',
        radius: seriesUi.radius || ['40%', '60%'],
        center: seriesUi.center || ['40%', '50%'],
        roseType: seriesUi.roseType,
        avoidLabelOverlap: true,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: seriesEmphasis.show == false ? false : true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          }
        },
        data: data.seriesData
      }]
    };

    $(window).resize(function () {
      dom.resize()
    })
    dom.setOption(option, true)
  }


  //['#4DA1FF', '#83D587', '#FFCE33', '#FF7B8C','#66fbf9',"#dab54c"]
}

export default new chartUtils()
