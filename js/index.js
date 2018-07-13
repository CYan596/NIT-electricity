// B load
$(window).ready(function () {

// B
// E

var selectArr = $('.select')
var pageArr = $('.page')
var barArr = $('.main-bar-section')
var clickableSecArr = $('.p-section-clickable')
var loading = $('#loading')


// B 开场动画
loading[0].addEventListener('animationend', function () {
  loading.removeClass('loading-animation')
})
loadingActive()

// E 开场动画

// B 可点击框拉取面板
for (let i = 1; i < clickableSecArr.length; i++) {
  clickableSecArr[i].onclick = function () {
    render(i)
    $('#p-page' + i).css('transform', 'translateY(0)')
  }
  if ($('.close-btn')[i-1] !== undefined) {
    $('.close-btn')[i-1].onclick = function () {
      $('.close-btn').parents('#p-page' + i).css('transform', 'translateY(100%)')
    }
  }
}


// E 可点击框拉取面板

// B 面板内通用组件



// E 面板内通用组件

// B tab栏点击切换

barArr[0].onclick = function () {
  switchScreen(0)
}

barArr[1].onclick = function () {
  switchScreen(1)

  Recordrenderer()
}

barArr[2].onclick = function () {
  switchScreen(2)
}

// E tab栏点击切换

function switchScreen (i) {
  $(pageArr[i]).addClass('top').siblings().removeClass('top')
  $(barArr[i]).addClass('active').siblings().removeClass('active')
  $(barArr[i]).children('.fa').addClass('animation').end().siblings().children('.fa').removeClass('animation')
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

// 记录页面渲染函数
function Recordrenderer () {
  // 动态设置用电记录表宽高
var presentationSizeObj = {
  x: $('#page2').css('width'),
  y: $('#page2').css('height')
}
$('#p2-presentation').css({'width': presentationSizeObj.x,'height': (parseInt(presentationSizeObj.y) - 1) + 'px' })
// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('p2-presentation'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '每日用电',
                subtext: '以下是近一个月的每日用电记录(单位：元)',
                left:'center',
                textStyle: {
                  fontSize: '18',
                  color: '#333'
                },
                padding: [
                    12,  // 上
                    0, // 右
                    0,  // 下
                    0, // 左
                ]
                // backgroundColor: '#f00'
            },
            tooltip: {
              show: true
            },
            legend: {
                data:['当日电费']
            },
            xAxis: {
               
            },
            yAxis: {
            data: ["7-12","7-11","7-10","7-9","7-8","7-7","7-6","7-5","7-4","7-3","7-2","7-1","6-30"]
            },
            series: [{
                // name: '当日电费',
                type: 'bar',
                data: [7.2, 14.2, 7.5, 6.3, 1.7, 12.2, 10, 7.7, 6.9, 13.9, 11.9, 3.9, 1.9],
                barWidth: 15
            }],
            textStyle: {
              color: 'rgba(3, 3, 3, 1)'
        },
        itemStyle: {
          // 设置扇形的颜色
          color: '#59c996'
          // shadowBlur: 15,
      }
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
// E 记录页面 渲染



}


// B UI逻辑
//groove-button 变换逻辑
// config-button状态对象
var configButtonState = {
  b0 : false ,
  b1 : false 
}
// console.log(configButtonState[0])
$('.groove')[0].onclick = function () {

  if (configButtonState['b0'] == false) {
    $(this).toggleClass('on')
  }
}


// loading动画激活
function loadingActive () {
  loading.addClass('loading-animation')
}

// E UI逻辑

// B 跨域请求
/*var f = function(data){
        alert(data.name);
      }*/
// var xhr = new XMLHttpRequest();
// xhr.onload = function(){
//   alert(xhr.responseText);
// };
// xhr.open('get', 'http://60.205.183.30:8080/onepig/electricityServlet?method=getFee&buildName=5A_2_0_5&roomName=5A207', true);
// // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// xhr.send();
// E 跨域请求

})
// E load

