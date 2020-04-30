import elementResizeDetectorMaker from 'element-resize-detector'
class chartUtils {
  //柱状图处理
  handleBarChart(dom,data,resizeBox){
      let yAxis
      if(!data.showSecondY){  //是否隐藏第二个y轴，默认不传及隐藏
        yAxis=[{
          type: 'value',
          name: data.yAxis,
        }]
      }else{
        yAxis=[{
          type: 'value',
          name: data.yAxis,
        },{
          type:'value',
          name:'zzz',
          min:-100,
          max:100,
        }]
      }
    let option = {
      title: {
        text: data.titleText,
        textStyle:{
          fontSize: 14,
          color:'#008DEA',
          fontFamily:'MicrosoftYaHei'
        }
      },
      legend: {
        data: data.legendData
      },
      tooltip:{
        trigger: 'axis',
        showDelay:300
      },
      calculable: true,
      color:['#4094ff','#013b4e','#FAAD14','#F5222D'],
      xAxis: [{
        type: 'category',
        data: data.xAxis
      }],
      yAxis: yAxis,
      series: [{
        data:data.series,
        type:'line',
        areaStyle:{}
      }],

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
    $(window).resize(function(){
      dom.resize()
    })
    dom.setOption(option, true)
  }

  //空心饼图
  hollowPieChart(dom, data) {
    let { legendUi={},legendUi:{textStyle:legendTextStyle={}}={} } = data
    let { seriesUi={},seriesUi:{label:seriesLabel={}}={}} = data
    let {normal:seriesNormal={},emphasis:seriesEmphasis={}} = seriesLabel
    let { titleUi={},titleUi:{textStyle:titleTextStyle={}}={}} = data
    // console.log("data",data)
    // console.log("1",legendTextStyle,legendUi)
    // console.log(seriesLabel,seriesNormal,seriesEmphasis)
    // console.log(seriesEmphasis.show==false)
    let option = {
      title: {
        text: data.titleText,
        left: titleUi.left || "4%",
        padding: [24, 0],
        textStyle: {
          color: '#666666FF',
          fontWeight:titleTextStyle.fontWeight || '500',
          align: 'top',
          fontSize:titleTextStyle.fontSize || ""
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        showDelay:100
      },
      legend: {
        orient: legendUi.orient || 'vertical',
        right: legendUi.right || '3%',
        //只要top字段存在（不管设置与否），则bottom属性不起作用，所以若想设置top，请单独再组件里设置
        // top:legendUi.top || '',
        bottom:legendUi.bottom || '3%',
        data: data.legendData,
        textStyle:{
          fontSize:legendTextStyle.fontSize || 14,
          color:legendTextStyle.color || 'gray'
        },
        formatter:legendUi && legendUi.formatter || ''
      },
      color: data.color || ['#563ad2', '#25e4a3', '#ed5e50', '#66fbf9',"#de8536", "#dab54c","#325df9"],
      series: [{
        name:data.seriesName?data.seriesName:'',
        type: 'pie',
        radius:seriesUi.radius || ['40%', '60%'],
        center:seriesUi.center || ['40%','50%'],
        roseType: seriesUi.roseType,
        avoidLabelOverlap: true,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show:seriesEmphasis.show==false?false:true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          }
        },
        data: data.seriesData
      }]
    };

    $(window).resize(function(){
      dom.resize()
    })
    dom.setOption(option, true)
  }

  //实心饼图
  handlePieChart(dom,data,resizeBox){
    let option = {
      title : {
        text: data.titleText,
        x:'left',
        textStyle:{
          fontSize: 14,
          color:'#008DEA',
          fontFamily:'MicrosoftYaHei'
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        showDelay:300
      },
      legend: {
        orient: 'vertical',
        left: data.legend,
        top:50,
        data: data.legendData,
        textStyle:{
          color:data.textStyleColor?data.textStyleColor:''
        }
      },
      color: data.color?data.color:['#4DA1FF', '#83D587', '#FFCE33', '#FF7B8C'],
      series : [
        {
          name: data.seriesName?data.seriesName:'',
          type: 'pie',
          radius : '50%',
          center: ['50%', '60%'],
          data:data.series,
        }
      ]
    };
    $(window).resize(function(){
      dom.resize()
    })

    dom.setOption(option, true)

  }
}
export default new chartUtils()
