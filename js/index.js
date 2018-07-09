// B

// E
var pageArr = $('.page')
var barArr = $('.main-bar-section')
console.log(barArr)

// B tab栏点击切换

barArr[0].onclick = function () {
  $(pageArr[0]).addClass('top').siblings().removeClass('top')
}

barArr[1].onclick = function () {
  $(pageArr[1]).addClass('top').siblings().removeClass('top')
}

barArr[2].onclick = function () {
  $(pageArr[2]).addClass('top').siblings().removeClass('top')
}

// E tab栏点击切换
