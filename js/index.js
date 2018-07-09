// B
$('.close-btn')[0].onclick = function () {
  $('.close-btn').parents('#p-page0').css('transform', 'translateX(100%)')
  // alert('1')
}
// E
var pageArr = $('.page')
var barArr = $('.main-bar-section')
var clickableSecArr = $('.p-section-clickable')
console.log(clickableSecArr)

// B 可点击框拉取面板
for (let i = 0; i < clickableSecArr.length; i++) {
  clickableSecArr[i].onclick = function () {
    // render(i)
    // alert('1')
    $('#p-page0').css('transform', 'translateX(0)')
  }
}
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


