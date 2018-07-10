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
// for (let i = 0; i < clickableSecArr.length; i++) {
//   clickableSecArr[i].onclick = function () {
//     render(i)
//     alert('1')
//     $('#p-page0').css('transform', 'translateY(0)')
//   }
// }
// E 可点击框拉取面板

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

// 测试
// var nameEl = clickableSecArr[0]
// var nameEl = document.getElementById('select')
// var nameEl = $('#select')[0]
var nameEl = selectArr.get(0)

var data1 = [
  {
    text: '1栋',
    value: 1
  }, {
    text: '2栋',
    value: 1
  },
  {
    text: '3栋',
    value: 1
  },
  {
    text: '4栋',
    value: 1
  },
  {
    text: '5栋',
    value: 1
  },
  {
    text: '6栋',
    value: 1
  },
  {
    text: '7栋',
    value: 1
  },
  {
    text: '8栋',
    value: 1
  },
  {
    text: '9栋',
    value: 1
  },
  {
    text: '10栋',
    value: 1
  },
  {
    text: '11栋',
    value: 1
  },
  {
    text: '11栋',
    value: 1
  },
  {
    text: '13栋',
    value: 1
  },
  {
    text: '14栋',
    value: 1
  }
];

var data2 = [
  {
    text: 'A1层',
    value: 1
  },
  {
    text: 'A2层',
    value: 2
  },
  {
    text: 'A3层',
    value: 3
  },
  {
    text: 'A4层',
    value: 4
  },
  {
    text: 'A5层',
    value: 5
  },
  {
    text: 'A6层',
    value: 6
  },
  {
    text: 'B1层',
    value: 7
  },
  {
    text: 'B2层',
    value: 8
  },
  {
    text: 'B3层',
    value: 9
  },
  {
    text: 'B4层',
    value: 10
  },
  {
    text: 'B5层',
    value: 11
  },
  {
    text: 'B6层',
    value: 12
  }
];

var data3 = [
  {
    text: '01寝',
    value: 1
  }, {
    text: '02寝',
    value: 2
  },
  {
    text: '03寝',
    value: 3
  }, {
    text: '04寝',
    value: 4
  },
  {
    text: '05寝',
    value: 4
  },
  {
    text: '06寝',
    value: 4
  },
  {
    text: '07寝',
    value: 4
  },
  {
    text: '08寝',
    value: 4
  },
  {
    text: '09寝',
    value: 4
  },
  {
    text: '10寝',
    value: 4
  },
  {
    text: '11寝',
    value: 4
  },
  {
    text: '12寝',
    value: 4
  },
  {
    text: '13寝',
    value: 4
  },
  {
    text: '14寝',
    value: 4
  },
  {
    text: '15寝',
    value: 4
  },
  {
    text: '16寝',
    value: 4
  }
];

var picker = new Picker({
  data: [data1, data2, data3],
  selectedIndex: [0, 1, 2],
  title: '选择寝室'
});

picker.on('picker.select', function (selectedVal, selectedIndex) {
  nameEl.innerText = data1[selectedIndex[0]].text + ' ' + data2[selectedIndex[1]].text + ' ' + data3[selectedIndex[2]].text;
})

picker.on('picker.change', function (index, selectedIndex) {
  console.log(index);
  console.log(selectedIndex);
});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedVal);
  console.log(selectedIndex);
});

nameEl.addEventListener('click', function () {
  picker.show();
});