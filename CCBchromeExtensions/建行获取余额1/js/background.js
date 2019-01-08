// 查询范围 2015100001 - 2015103480
// 查询范围 2016100001 - 2016103574
// 查询范围 2017100001 - 2017103577
// 查询范围 2018100001 - 2018103735
// 插件基础配置
var crawlerConfig = {
	currentID: 2017103574,
	buffer: []
}

var localConfig = {
	url: 'http://localhost:3000/ccb'
}

// 接收来自content的信息，返回phone
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(JSON.stringify(request) !== "{}"){
			postData(request, localConfig.url)
			// console.log(request)
    //如果返回对象为空，则传回需要查询的学生id
    }else {
			sendResponse(getStuID());
    }
});

// 将数据传输到mainServer
// data 需要传输的对象
// 目的URL
function postData(data, url) {
	// 数据传输
	// 创建XMLHttpRequest实例
	var xhr;
	if (window.XMLHttpRequest){
	  xhr = new XMLHttpRequest();
	}else{
	  xhr = new ActiveXObject("Microsoft.XMLHTTP");//IE6, IE5
	}

	//监听接收服务器传回的数据
	xhr.onreadystatechange = function(){
	  if (xhr.readyState == 4){   // 判断请求响应过程阶段，4 阶段代表已接收到数据
	    if (xhr.status >=200 && xhr.status < 300 || xhr.status == 304) {  // 校验HTTP状态码
	      // console.log(xhr.responseText);   // 输出响应的文本
	    } else {
	      console.error(xhr.status, xhr.statusText); // 打印其他HTTP状态码
	    }
	  }
	};

	var dataString = JSON.stringify(data)
	// console.log(data)
	xhr.open('post', url, true);
	// xhr.setRequestHeader("Content-Type", "http:127.0.0.1:80/data");
	xhr.send(dataString);
}

//获取当前查询的stuID
function getStuID() {
	console.log('getStuID')
	// 若缓冲区有值，优先查询缓冲区ID
	let id = 0
	if(crawlerConfig.buffer.length!==0){
		// console.log('crawlerConfig.buffer.pop')
		return crawlerConfig.buffer.pop()
	}
// 查询范围 2015100001 - 2015103480
// 查询范围 2016100001 - 2016103574
// 查询范围 2017100001 - 2017103577
// 查询范围 2018100001 - 2018103735
	// id = crawlerConfig.currentID
	switch (crawlerConfig.currentID)
	{
	case 2015103480: crawlerConfig.currentID = 2016100000;
		break;
	case 2016103574: crawlerConfig.currentID = 2017100000;
		break;
	case 2017103577: crawlerConfig.currentID = 2018100000;
		break;
	case 2018103735: crawlerConfig.currentID = 2015100000;
		break;
	}
	// console.log(id)
	return 	crawlerConfig.currentID++
	// 若缓冲区无值,进行顺序更新
}