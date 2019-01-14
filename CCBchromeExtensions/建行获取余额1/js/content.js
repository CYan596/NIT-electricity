// console.log('1')
var COMMInput = document.getElementById('COMM')
var btn1 = document.getElementById('step_next1111')
var BANK_COD = document.getElementById('BANK_COD')
var queryStep1 = document.getElementsByClassName('pbd_step_1')[0]
var queryStep2 = document.getElementsByClassName('pbd_step_2')[0]
// var queryStep3 = document.getElementsByClassName('pbd_step_3')[0]
// var queryStep4 = document.getElementsByClassName('pbd_step_4')[0]
// console.log(queryStep1.className.split(/\s+/)[2])
// console.log(queryStep2.className.split(/\s+/)[2])
var stuInfo = {
	stuId: 2015101972,
	stuName: '朱柯青',
	OCPbalance: 1.1,
}

// var stuInfo = {
// 	stuId:  2015100001,
// 	stuName: '谢信东',
// 	Dormitory: '',
// 	DEbalance: [{ balance: '', date: new Date()}],
// 	OCPbalance: [{ balance: '', date: new Date()}],
// 	hidden: false
// }

// 页面状态判断
var ccbConfig = {
	pageState: []
}

if(queryStep1){
	ccbConfig.pageState = [(queryStep1.className.split(/\s+/)[2]=='on'),(queryStep2.className.split(/\s+/)[2]=='on')]
}else{
	ccbConfig.pageState = [false, false, true]
};

// console.log(ccbConfig.pageState)
// console.log(queryStep3.className.split(/\s+/)[2])
// console.log(queryStep4.className.split(/\s+/)[2])

// var OPUN_COD = document.getElementById('OPUN_COD')
// var OPUN_COD = document.getElementById('BANK_COD')
var queryQueue = []
// BANK_COD.value = '360000'
// BANK_COD.value = '360100'
// BANK_COD.value = '05013'
// 1. 判断是否在填信息页面
setTimeout(step, 700)
function step(){
	if(ccbConfig.pageState[0]&&BANK_COD.value==''){  //在填信息页面且未填入省份
		console.log('在填信息页面且未填入省份')
		setTimeout(step, 15000)
	}else if(ccbConfig.pageState[0]&&BANK_COD.value!==''){ //在填信息页面且已经填入省份
		console.log('在填信息页面且已经填入省份')
		chrome.runtime.sendMessage({flag :4}, function(response) { //获取background给的ID
		    COMMInput.value = response
			btn1.click()
		});
	}else if(ccbConfig.pageState[1]){ //已经获取到信息
		stuInfo = {
			stuId: document.getElementsByTagName('td')[4].innerText,
			stuName: document.getElementsByTagName('th')[6].innerText,
			Dormitory: '',
			OCPbalance: document.getElementsByTagName('td')[6].innerText,
			DEbalance: '',
      hidden: false
	}


		chrome.runtime.sendMessage({
			flag:3,
			stuInfo
		}, function(response) {});

		// console.log(stuInfo)

		// let balance = document.getElementsByTagName('td')[6].innerText
		// console.log(document.getElementsByTagName('td')[4].innerText + '的余额为：' + balance)
		document.getElementById('step_prev1111').click()
		// COMMInput.value = queryQueue.shift()
		// btn1.click()
	}else if(ccbConfig.pageState[2]){ // 系统忙，请稍后再试
		history.go(-1)
	}
}