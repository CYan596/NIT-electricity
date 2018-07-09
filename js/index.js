// B

// E
var pageArr = $('.page')
var barArr = $('.main-bar-section')
console.log(barArr)

// B tab栏点击切换

barArr[0].onclick = function () {
  switchScreen(0)
  // $(pageArr[0]).addClass('top').siblings().removeClass('top')
}

barArr[1].onclick = function () {
  switchScreen(1)
  // $(pageArr[1]).addClass('top').siblings().removeClass('top')
}

barArr[2].onclick = function () {
  switchScreen(2)
  // $(pageArr[2]).addClass('top').siblings().removeClass('top')
}

// E tab栏点击切换

function switchScreen (i) {
  $(pageArr[i]).addClass('top').siblings().removeClass('top')
  $(barArr[i]).addClass('active').siblings().removeClass('active')
}


