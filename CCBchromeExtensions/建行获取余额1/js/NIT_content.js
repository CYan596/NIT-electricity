var tbody = document.getElementsByTagName('tbody')[33]
var aArr = tbody.getElementsByTagName('a') //a， 内含 标题与文字链接
var tdArr = tbody.getElementsByClassName('timestyle37957') // td，内含 时间
var articleArr = [] // 所有文章的详细信息

for (let i = 0; i < tdArr.length; i++) {
  articleArr[i] = {}
  articleArr[i].title = aArr[i].title
  articleArr[i].time = tdArr[i].innerText
  articleArr[i].href = aArr[i].href
}

console.log(articleArr)
chrome.runtime.sendMessage({
  flag:1,
  articleArr: articleArr
}, function(response) {
  console.log(response);
});

var count = 0

setTimeout(() => {
  location.reload()
}, 86400000);
// for (let j = 0; j < articleArr.length; j++) {
//   const element = array[j];
// }

// var timer = setInterval(() => {
//   if(count < articleArr.length){
//     window.open(articleArr[count].href);
//   }
//   count++
// }, 3000);

