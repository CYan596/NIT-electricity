// B load
$(window).ready(function () {

// B
// E

var selectArr = $('.select')
var pageArr = $('.page')
var barArr = $('.main-bar-section')
var pullUsefullArr = $('.pull-usefull') //所有可调取页面的可点击元素
var loading = $('#loading')
var tips = $('#common-tips')
var closeBtnArr = $('.close-btn')
var locationArr = ['5A', '207']
var fee = $('#fee') //费用节点
var loadFont = $('#p1-animation').children('#wordart1')

// B 动画相关事件
loading[0].addEventListener('animationend', function () {
  loading.removeClass('loading-animation')
})
tips[0].addEventListener('animationend', function () {
  tips.removeClass('tips-animation')
})
loadingActive()


// E 动画相关事件
// B 可点击框,拉取面板
for (let i = 0; i < pullUsefullArr.length; i++) {
  console.log(i)
  pullUsefullArr[i].onclick = function () {
    render(i)
    $('#p-page' + (i + 1)).css('transform', 'translateY(0)')
    // if ((i + 1) == 3) {
    // }
  }
  
    closeBtnArr[i].onclick = function () {
      $(closeBtnArr[i]).parents('.pull-box').css('transform', 'translateY(100%)')
    } 
  // else {
  //   closeBtnArr[i-1].onclick = function () {
  //     $(closeBtnArr[i-1]).parents('#p-page' + i).css('transform', 'translateY(100%)')
  //   }
  // }
}


  // console.log(closeBtnArr)
$('#p3-NITPayment')[0].onclick = function () {
    window.open("http://pay.nit.edu.cn/");
}

// E 可点击框,拉取面板

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
// 本地Picker数据初始化

var data1 = []
for (var i = 1; i <= 15; i++) {
  data1.push({
    text: i + '栋' + 'A',
    value: i + 'A'
  })
  data1.push({
    text: i + '栋' + 'B',
    value: i + 'B'
  })
}
var data2 = []
for (var i = 1; i <= 6; i++) {
  data2.push({
    text: i + '层',
    value: i
  })
}

var data3 = []
for (var i = 1; i <= 29; i++) {
  if (i < 10) {
    data3.push({
      text: '0' + i + '寝',
      value: '0' + i
    })
  } else {
    data3.push({
      text: i + '寝',
      value: i
    })
  }
}

// var nameEl = pullUsefullArr[0]
// var nameEl = document.getElementById('select')
// var nameEl = $('#select')[0]
var nameEl = selectArr.get(0)
var pickerIndex = []
localPickerInit()


var picker = new Picker({
  data: [data1, data2, data3],
  selectedIndex: pickerIndex,
  title: '选择寝室'
});

picker.on('picker.select', function (selectedVal, selectedIndex) {
  nameEl.innerText = data1[selectedIndex[0]].text + ' ' + data2[selectedIndex[1]].text + ' ' + data3[selectedIndex[2]].text;
})

picker.on('picker.change', function (index, selectedIndex) {
  // console.log('index' + index);
  // console.log(selectedIndex);
  // loadingActive()
});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log('selectedVal:' + selectedVal);
  console.log('selectedIndex:' + selectedIndex);
  loadingActive()
  // console.log(selectedIndex)
  var str1 = JSON.stringify(selectedIndex);   
  localStorage.setItem("localPickerIndex", str1); 
  var arr1 = [selectedVal[0], selectedVal[1].toString() + selectedVal[2]]
  getData(arr1)
});

nameEl.addEventListener('click', function () {
  picker.show();
});

// 本地数据读取
var localPickerIndex
function localPickerInit () {
  // 1.读取本地localPikerData
  // localPickerIndex = parseInt(localStorage.getItem("localPickerIndex"))
  if(localStorage.getItem("localPickerIndex") == null) {
    console.log('无用户数据缓存')
    pickerIndex = [0, 0, 0]
    locationArr = [data1[0].value, data2[0].value + data3[0].value]  
    console.log(locationArr)
    getData(locationArr)
  }
  else{
    console.log('有用户数据缓存')
// 2.若有，直接替换PickerIndex
    var str2 = localStorage.getItem("localPickerIndex");
    // console.log(str2)
    // pickerIndex = JSON.parse(str2))
    pickerIndex = JSON.parse(str2);
    nameEl.innerText = data1[pickerIndex[0]].text + ' ' + data2[pickerIndex[1]].text + ' ' + data3[pickerIndex[2]].text;
    
    // 请求参数拼接
    locationArr = [data1[pickerIndex[0]].value, data2[pickerIndex[1]].value.toString() + data3[pickerIndex[2]].value]  
    getData(locationArr)
    // console.log(locationArr)
  }

  // 3、若无，用户选择后存储到本地
}

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
                text: '每日用电（测试用图表，开发中）',
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
    tipsActive('设置成功')
    console.log(1)
    configButtonState['b0'] = !configButtonState['b0']
  } else {
    $(this).toggleClass('on')
    tipsActive('关闭成功')
    console.log(2)
    configButtonState['b0'] = !configButtonState['b0']
  }
}


// loading动画激活，及loading事件
function loadingActive () {
  loading.addClass('loading-animation')
}
// tip动画激活，及tip事件
function tipsActive (str1) {
  tips.addClass('tips-animation')
  tips.children('.wrap').html(str1)
}
  

// E UI逻辑

// B 跨域请求
/*var f = function(data){
        alert(data.name);
      }*/
function getData (locationArr) {
  var feeUrl = 'http://60.205.183.30:8080/onepig/electricityServlet?method=getFee&buildingName='+ locationArr[0] +'&roomName='+locationArr[1]
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    // alert(xhr.responseText);
    feeUpdate (xhr.responseText)
  };
  xhr.open('get',feeUrl , true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send();
}

// E 跨域请求

// B 获取月度电费数据
// var messageTest = {"roomName":"5A207", "warningValue":"20", "on":"1"}
// getMonthFee()

// function getMonthFee () {
//   var xhr = new XMLHttpRequest();
//   $.ajax({
//     url:'http://60.205.183.30:8080/onepig/activateWarning?method=activateWarning',
//     type:'post',
//     dataType:'text',
//     message: messageTest.toString(),
//     success:function(msg){
//       if(msg=='1'){
//           console.log('成功');
//       }else{
//           console.log('失败')
//       }
//     }
//   })

// }
// E 获取月度电费数据

// B 更新电量显示
function feeUpdate (str) {
  var num = parseFloat(str)
  num = num.toFixed(1)
  if (isNaN(num)) {
    fee.addClass('normal-font')
    fee.html('无电费数据')
  }
  else{
    fee.removeClass('normal-font')
    fee.html(num)
    // loadFont.fadeOut()
  }
}
// E 更新电量显示

// Bmob PV数据存储测试
// 数据存储类别
var browser = navigator.appName
var b_version = navigator.appVersion
var version = parseFloat(b_version)

console.log(browser)
console.log(b_version)


Bmob.initialize("5fd1df2b91ff8b7a0987c2a05784a76c", "0b303f2990ad571937d2c980638a5a82");
// 创建Bmob.Object子类
var PV = Bmob.Object.extend("PV");
// 创建该类的一个实例
var PV = new PV();
// 添加数据，第一个入口参数是Json数据

// 数据保存
// 传入信息
saveData()
function saveData () {
    // PV.save({
    //     userMessage: message,
    // }, {
    //   success: function() {
    //     console.log('添加成功')
    //   },
    //   error: function() {
    //     console.log('添加失败')
    //   }
    // });
    PV.save({
      PV: '+1',
      b_version: b_version,
      platfor: navigator.platform,
    }, {
      success: function (gameScore) {
        console.log('添加成功')
      },
      error: function (gameScore, error) {
        console.log('添加失败')
      }
    })
  }

// Bmob PV数据存储测试

})
// E load

