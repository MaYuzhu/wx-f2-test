import F2 from '@antv/wx-f2'; 
var _ = require('../../utils/underscore.js');
// 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
//当图表渲染出来之后，数据发生改变需要更新图表数据时，可采用chart.changeData(data)；

let chart = null;

function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  const data = [
    // { year: '1951 年', sales: 38 },
    // { year: '1952 年', sales: 52 },
    // { year: '1956 年', sales: 61 },
    // { year: '1957 年', sales: 145},
    // { year: '1958 年', sales: 48 },
    // { year: '1959 年', sales: 38 },
    // { year: '1960 年', sales: 38 },
    // { year: '1962 年', sales: 38 },

    { year: "2010-01-10", type: "能源", value: 99.9 },


    { year: "2010-01-10", type: "金属", value: 96.6 },
  

    { year: "2010-01-10", type: "农副产品", value: 96.2 },
  

    { year: "2010-02-10", type: "能源", value: 96.7 },
  

    { year: "2010-02-10", type: "金属", value: 91.1 },
  

    { year: "2010-02-10", type: "农副产品", value: 93.4 },
  

    { year: "2010-03-10", type: "能源", value: 100.2 },
  

    { year: "2010-03-10", type: "金属", value: 99.4 },
  

    { year: "2010-03-10", type: "农副产品", value: 91.7 },
  

    
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    date: {
      range: [0, 1],
      type: 'timeCat',
      mask: 'MM-DD'
    },
    value: {
      max: 100,
      tickCount: 4
    },
    
    // sales: {
    //   tickCount: 5
    // }
  });
  chart.guide().line({ // 绘制辅助线
    start: ['min', 95],
    end: ['max', 95],
    style: {
      stroke: '#FF4D4F',
      lineDash: [2]
    }
  });
  chart.guide().text({ // 绘制辅助文本
    position: ['max', 95],
    content: '预警值： 95',
    offsetY: -5,
    style: {
      fill: '#FF4D4F',
      textAlign: 'end',
      textBaseline: 'bottom'
    }
  });
  // chart.tooltip({
  //   showItemMarker: false,
  //   onShow(ev) {
  //     const { items } = ev;
  //     items[0].name = null;
  //     items[0].name = items[0].title;
  //     items[0].value = '¥ ' + items[0].value;
  //   }
  // });
  
  chart.tooltip({
    
    custom: true, // 自定义 tooltip 内容框
    onChange: function onChange(obj) {
      var legend = chart.get('legendController').legends.top[0];
      var tooltipItems = obj.items;
      var legendItems = legend.items;
      var map = {};
      legendItems.map(function (item) {
        map[item.name] = _.clone(item);
      });
      tooltipItems.map(function (item) {
        var name = item.name;
        var value = item.value;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(_.values(map));
    },
  })
  
  chart.line().position('year*value').color('type');
  chart.render();
  return chart;
}




Page({
  data: {
    salesTrendData: {
      lazyLoad: true   //延迟加载
    },
    opts: {
      onInit: initChart
    }
  },
  onLoad(){
    wx.request({
      url: 'https://weixin.zktop.com/jingshen/tsd/getBuildDevsData.shtml',
      header: {
        'content-type': 'application/json',

      },
      dataType: "json",
      jsonp: "callback",
      data: {
        'timetype': 'hour',
        'starttime': '2019-04-28 13:07:22',
        'endtime': '2019-04-29 13:07:22',
        'buildcode': '1308F0001'
      },
      success: res =>{
        console.log(res)
      }
    })
  },

  onReady() {
  }

});