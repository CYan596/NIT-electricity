// B
// $('.close-btn')[0].onclick = function () {
//   $('.close-btn').parents('#p-page0').css('transform', 'translateY(100%)')
// }
// E
var selectArr = $('.select')
var pageArr = $('.page')
var barArr = $('.main-bar-section')
var clickableSecArr = $('.p-section-clickable')
// console.log(clickableSecArr)

// B 可点击框拉取面板
for (let i = 1; i < clickableSecArr.length; i++) {
  clickableSecArr[i].onclick = function () {
    render(i)
    $('#p-page0').css('transform', 'translateY(0)')
  }
}
// E 可点击框拉取面板

// B 拉取缴费详情面板

$('.close-btn')[0].onclick = function () {
  $('.close-btn').parents('#p-page0').css('transform', 'translateY(100%)')
}

// E 拉取缴费详情面板

// B tab栏点击切换

barArr[0].onclick = function () {
  switchScreen(0)
}

barArr[1].onclick = function () {
  switchScreen(1)
}

barArr[2].onclick = function () {
  switchScreen(2)
}

// E tab栏点击切换

function switchScreen (i) {
  $(pageArr[i]).addClass('top').siblings().removeClass('top')
  $(barArr[i]).addClass('active').siblings().removeClass('active')
}

function render (i) {
  $('p-page' + 'i').css('transform', 'translateX(0)')
}

// B 寝室选择
// 寝室选择选项数组生成
var data3 = []
for (var i = 1; i <= 29; i++) {
  if (i < 10) {
    data3.push({
      text: '0' + i + '寝',
      value: 1
    })
  } else {
    data3.push({
      text: i + '寝',
      value: 1
    })
  }
}
console.log(data3)

// var nameEl = clickableSecArr[0]
// var nameEl = document.getElementById('select')
// var nameEl = $('#select')[0]
var nameEl = selectArr.get(0)

var data1 = [
  {
    text: '1A',
    value: 1
  }, {
    text: '1B',
    value: 1
  }, {
    text: '2A',
    value: 1
  }, {
    text: '2B',
    value: 1
  },
  {
    text: '3A',
    value: 1
  },{
    text: '3B',
    value: 1
  },
  {
    text: '4A',
    value: 1
  },{
    text: '4B',
    value: 1
  },
  {
    text: '5A',
    value: 1
  },{
    text: '5B',
    value: 1
  },
  {
    text: '6A',
    value: 1
  },{
    text: '6B',
    value: 1
  },
  {
    text: '7A',
    value: 1
  },{
    text: '7B',
    value: 1
  },
  {
    text: '8A',
    value: 1
  },{
    text: '8B',
    value: 1
  },
  {
    text: '9A',
    value: 1
  },{
    text: '9B',
    value: 1
  },
  {
    text: '10A',
    value: 1
  },{
    text: '10B',
    value: 1
  },
  {
    text: '11A',
    value: 1
  },{
    text: '11B',
    value: 1
  },
  {
    text: '12A',
    value: 1
  },{
    text: '12B',
    value: 1
  },
  {
    text: '13A',
    value: 1
  },{
    text: '13B',
    value: 1
  },
  {
    text: '14A',
    value: 1
  },
  {
    text: '14B',
    value: 1
  },
  {
    text: '15A',
    value: 1
  },
  {
    text: '15B',
    value: 1
  }
];

var data2 = [
  {
    text: '1层',
    value: 1
  },
  {
    text: '2层',
    value: 2
  },
  {
    text: '3层',
    value: 3
  },
  {
    text: '4层',
    value: 4
  },
  {
    text: '5层',
    value: 5
  },
  {
    text: '6层',
    value: 6
  }
];

var picker = new Picker({
  data: [data1, data2, data3],
  selectedIndex: [0, 0, 0],
  title: '选择寝室'
});

picker.on('picker.select', function (selectedVal, selectedIndex) {
  nameEl.innerText = data1[selectedIndex[0]].text + ' ' + data2[selectedIndex[1]].text + ' ' + data3[selectedIndex[2]].text;
})

picker.on('picker.change', function (index, selectedIndex) {
  // console.log(index);
  // console.log(selectedIndex);
});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  // console.log(selectedVal);
  // console.log(selectedIndex);
});

nameEl.addEventListener('click', function () {
  picker.show();
});

// E 寝室选择

// B 记录页面 渲染

var testData = [
  {
    'eid': '6',
    'fee': '41.43018',
    'roomName': '5A207',
    'date': '2018/7/7 21:40'
  }]

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('p2-presentation'))

// 指定图表的配置项和数据
var option = {
  title: {
    text: '测试数据'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  }, 
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option)

// E 记录页面 渲染
