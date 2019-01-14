<template>
	<div class="body">
		<!-- <div id="header">
			<p class="header-p">南工助手</p>
		</div> -->

		<!--B 通知条 -->

		<!--E 通知条 -->


		<div class="card" id="info-card">
			<div class="flex-between-center">
				<div class="left flex-center-column">
					<p class=" width-max">
						学号：{{stuId}}
					</p>
					<p class=" width-max">
						姓名：{{stuInfo.stuName}}
					</p>
					<p class="width-max">
						一卡通余额: <span class="card-font-dark">{{stuInfo.OCPbalance}}</span>
					</p>
				</div>
				<div class="separator"></div>
				<div class="right flex-center-column">
					<p class=" width-max">
						寝室号：{{dormitory}}
					</p>
					<p class="width-max">
						电费余额: <span class="card-font-dark">{{stuInfo.DEbalance | capitalize}}</span>
					</p>
				</div>
			</div>

			<!-- <div class="anchor">
				<img :src="libs.NITLogo" alt="logo" :width="90">
			</div>

			<div class="rotundity"></div> -->

			<img :src="libs.bianjiLogo" alt="" width="22" v-on:click="popup" id="setting">

			<mt-popup	v-model="popupVisible" popup-transition="popup-fade">
				<!-- 弹出框内容 -->
					<mt-field label="寝室号" placeholder="例：1A101" v-model="popupForm.dormitory"></mt-field>
					<mt-field label="学号" placeholder="例：2015100001"  v-model="popupForm.stuId" ></mt-field>
					<!-- <mt-cell title="电费余额" value="请先输入寝室号"></mt-cell>
					<mt-cell title="一卡通余额" value="请先输入学号"></mt-cell> -->
					<!-- @keyup.enter="onEnter" -->
					<div id='home-submit-Btn' class="flex-center" @click="popupVisible = false">
						<mt-button type="primary"  style="width:75%;height:30px;background-color:#5387f4">确定</mt-button>
					</div>
			</mt-popup>

		</div>

		<!--B 小应用 -->
		<div class="card flex-start-center" id="app-card">

			<div class="app flex-center-column" id="appEat" @click="stateID.appEat = true;appEatData.timerStatus='暂停'">
				<img :src="libs.chifanLogo" alt="app" width="32">
				<span class="font-s">今日吃啥</span>
			</div>

			<div class="app flex-center-column" id="" @click="stateID.appXiaoli = true">
					<img :src="libs.riliLogo" alt="" width="32">
					<span class="font-s">校历</span>
			</div>

			<div class="app flex-center-column" id="" @click="stateID.appDitu = true">
				<img :src="libs.dituLogo" alt="" width="32">
				<span class="font-s">地图</span>
			</div>

			<mt-popup class="flex-center-column font-bold font-l"	v-model="stateID.appEat" popup-transition="popup-fade">
				<!-- 今日吃啥 -->
				{{appEatData.randomCate}}
				<!-- xxx暂停 -->
				<mt-button type="primary" @click="appEatPause" class="font-s" style="margin-top: 25px;width:75%;height:30px;background-color:#5387f4">
					{{appEatData.timerStatus}}
				</mt-button>
			</mt-popup>

			<mt-popup class="width-max"	v-model="stateID.appXiaoli" popup-transition="popup-fade">
				<!-- 校历 -->
				<img :src="libs.xiaoli" alt="" width="100%">
			</mt-popup>
			<mt-popup class="width-max"	v-model="stateID.appDitu" popup-transition="popup-fade">
				<!-- 地图 -->
				<img :src="libs.guihuatu" alt="" width="100%">
			</mt-popup>
		</div>
		<!--E 小应用 -->

		<!--B 信息流 -->
		<div id="home-tab-nav" class="flex-center-column font-bold">
				<!-- <div class="nav-button-left flex-center  active">校务通知</div>
				<div class="nav-button-right flex-center">信息聚合</div> -->
			<!-- 校务通知 -->
			<div class="title">校务通知</div>
			<div class="decorate"></div>
		</div>

		<mt-tab-container v-model="stateID2.active" class="home-tab">
			<!-- 校务通知信息流 -->
			<mt-tab-container-item id="tab-container1">

				<!-- <div class="card-feed"  position="right" @click="stateID.cardFeed1 = true">
					<div class="left flex-center" >
						<img :src="libs.xuexiaoLogo" alt="" width="28">
					</div>
					<div class="right">
						<p><span>教务部</span>2019-01-07</p>
						<p>关于2018-2019-2学期专门用途英语（ESP）课程选课的通知</p>
					</div>
				</div> -->

				<!-- stateID.cardFeed1 = true; -->
				<div v-for="i in articleList">

					<div class="card-feed"  position="right" v-on:click="windowOpen(i.href)">
						<div class="left flex-center" >
							<img :src="libs.xuexiaoLogo" alt="" width="28">
						</div>
						<div class="right">
							<p><span>教务处</span>{{i.time}}</p>
							<p>{{i.title}}</p>
						</div>
					</div>

				</div>

				<!-- <mt-popup
					v-model="stateID.cardFeed1"
					position="right" class="card-feed-popup">
					<mt-header title="通知详情">
						<mt-button icon="back" @click="stateID.cardFeed1 = false" slot="left">返回</mt-button>
					</mt-header>
					cardFeed1
				</mt-popup> -->

			</mt-tab-container-item>
			<!-- 信息聚合 -->
			<mt-tab-container-item id="tab-container2">

			</mt-tab-container-item>
		</mt-tab-container>
		<!--E 信息流 -->


	</div>
</template>

<script>


	export default{
		//data是一个函数，返回一个对象.
		data(){
			return {
				popupForm:{ // 编辑表单中的学号/寝室号
					dormitory:'',
					stuId:''
				},
				dormitory:'', // 寝室号
				stuId:'', // 学号
				stuInfo:{
					stuName:'', //姓名
					DEbalance:'', //寝室电费余额
					OCPbalance:'' //一卡通余额
				},
				libs:{
					NITLogo:'../libs/NITLogo.png',
					homeLogo:'../libs/shouye.svg',
					moreLogo:'../libs/gengduo.svg',
					chifanLogo:'../libs/chifan.svg',
					dituLogo:'../libs/ditu.svg',
					riliLogo:'../libs/rili.svg',
					guihuatu:'../libs/guihuatu.jpg',
					xiaoli: '../libs/xiaoli.png',
					xuexiaoLogo: '../libs/xuexiao.svg',
					bianjiLogo: '../libs/bianji.svg'
				},
				stateID:{ // 弹窗部件状态标识
					appEat: false,
					appCalendar: false,
					appXiaoli: false,
					appDitu: false,
					cardFeed1: false
				},
				stateID2:{ // 非弹窗部件状态标识
					active: 'tab-container1',
				},
				appEatData:{
					randomCate: '',
					randomInterval: '',
					timerStatus: '暂停'
				},
				popupVisible: false, // home弹窗
				articleList: [], // 文章列表数组
				cateArr:[ // 今日吃啥随机数组
					'鲅鱼香菜',
					'牛肉香菜',
					'肉三鲜水饺',
					'牛肉面',
					'牛肉石锅拌饭',
					'麻辣香锅',
					'年糕',
					'宽粉',
					'青笋鸡公煲',
					'红烧肉',
					'炸鸡腿',
					'干煸土豆片',
					'麻婆豆腐',
					'黄瓜腐竹',
					'鱼香米线',
					'玉米粉',
					'黄焖鸡',
					'炒年糕',
					'炸酱面',
					'刀削面'
				]
			}
		},
		computed:{
      asyncData:function () {
        return this.articleList||''
      }
    },
		//声明函数，属于组件对象
		methods:{
			windowOpen(href){
				window.open(href)
			},
			getDormitoryFee(){
				var params = {
			      method: 'getFee',
			      buildingName:'5A',
			      roomName:'207'
			    }
				this.$axios.get('http://60.205.183.30:8080/onepig/electricityServlet',{
					params: {
				      method: 'getFee',
				      buildingName:'5A',
				      roomName:'207'
				    }
				})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
					console.log(response);
				});
			},
			popup(){
				this.popupVisible = true
			},
			randomNum(minNum,maxNum){
				switch(arguments.length){
						case 1:
								return parseInt(Math.random()*minNum+1,10);
						break;
						case 2:
								return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
						break;
								default:
										return 0;
								break;
				}
			},
			appEatPause(){ // appEat随机的暂停与重启
				let vueThis = this
				const timer = this.appEatData.randomInterval
				if(timer){	// 定时器启动状态
					clearInterval(this.appEatData.randomInterval)
					this.appEatData.randomInterval = null
					vueThis.appEatData.timerStatus = '开始'
				}else {  // 定时器关闭状态
					this.appEatData.randomInterval = setInterval(() => {
					let randomNum = vueThis.randomNum(0, vueThis.cateArr.length - 1)
					vueThis.appEatData.randomCate = vueThis.cateArr[randomNum]
					vueThis.appEatData.timerStatus = '暂停'
					}, 150);
				}
				// console.log(this.appEatData.randomInterval)
			}
		},
		// 1, 监听学号及寝室号输入框，若位数达到即发起请求获取数据
		watch:{
			'popupForm.dormitory': function(newVal){
				// console.log('dormitory变化')
				// const ElectricityFeeUrl ='http://60.205.183.30:8080/onepig/electricity/ElectricityAction_getElectricityFee.action';
				const ElectricityFeeUrl = 'http://60.205.183.30:8080/onepig/electricity/ElectricityAction.action'
				var params = new URLSearchParams();
				var buildingName = '',
					roomName = ''
				let vueThis = this

				console.log(vueThis);

				if (newVal.length==5){ //判断寝室号是否合法
					buildingName = newVal.slice(0, 2),
					roomName = newVal.slice(2, 5)

					this.dormitory = newVal
					localStorage.setItem('domitary', newVal);

				}else if (newVal.length==6) {
					buildingName = newVal.slice(0, 3),
					roomName = newVal.slice(3, 6)

					this.dormitory = newVal
					localStorage.setItem('domitary', newVal)

				}else{
					console.log('参数不合法')
					return 1;
				}

				params.append('method', 'getFee');       //要传给后台的参数值 key/value
				params.append('buildingName', buildingName);
				params.append('roomName', roomName);

				this.$axios({
				    method: 'get',
				    url:ElectricityFeeUrl,
				    params:params
				}).then(function (response) {
					console.log(response);
					let DEbalance
					if(response.data.statusCode == 'DORMITORY_ILLEGAL'){
						console.log(vueThis);

						vueThis.$toast({
							message: '请输入正确的寝室号',
							position: 'center',
							duration: 3000
						});
						// alert('请输入正确的寝室号')
					}else if(response.data.statusCode == 'SUCCESS'){
						DEbalance = response.data.fee
					  vueThis.stuInfo.DEbalance = DEbalance + '度'

						vueThis.$toast({
							message: '更新成功 ╭( ･ิ ω･ิ )╯',
							position: 'top',
							duration: 2500
						});
					}

				})
				.catch(function (error) {
					console.log(error);
					console.log(response);
					vueThis.$toast({
							message: '电波无法到达哟 _(:3」∠)_',
							position: 'center',
							duration: 4000
						});
				});
			},
			'popupForm.stuId': function(newVal){
				console.log('stuId发生了变化')

				const stuFeeUrl ='http://119.23.242.116:3000/basicdata';
				var params = new URLSearchParams();
				var studentId = '',
				vueThis = this

				if (newVal.length==10){ //判断参数是否合法
					studentId = vueThis.stuId = newVal
					localStorage.setItem('stuId', newVal);
				}else{
					console.log('参数不合法')
					return false;
				}

				params.append('stuId', newVal);

				this.$axios({
				    method: 'get',
				    url:stuFeeUrl,
				    params:params
				}).then(function (response) {

					if(!response.data){
						vueThis.$toast({
							message: '请输入正确的学号',
							position: 'center',
							duration: 5000
						});
					}else {
						console.log(response);
						let OCPbalanceArr = response.data.OCPbalance
						vueThis.stuInfo.OCPbalance = OCPbalanceArr[OCPbalanceArr.length - 1].balance + '元'
						vueThis.stuInfo.stuName = response.data.stuName

						vueThis.$toast({
							message: '更新成功 ╭( ･ิ ω･ิ )╯',
							position: 'top',
							duration: 3000
						});
					}
				})
				.catch(function (error) {
					console.log(error);
					vueThis.$toast({
							message: '电波无法到达哟 _(:3」∠)_',
							position: 'center',
							duration: 4000
						});
				});

				// 获取一卡通余额
			}
			,'stateID.appEat':function(newVal){
				let vueThis = this

				if (newVal) {
					// 启动随机渲染函数
					vueThis.appEatData.randomInterval = setInterval(() => {
						let randomNum = vueThis.randomNum(0, vueThis.cateArr.length - 1)
						vueThis.appEatData.randomCate = vueThis.cateArr[randomNum]
					}, 150);
					// clearInterval(vueThis.appEatData.randomInterval);

				}else {
					// 关闭定时器
					console.log('关闭定时器')
					clearInterval(vueThis.appEatData.randomInterval);
				}
			}
		},
		mounted:function () {

			let vueThis = this
			console.log(vueThis.popupForm.dormitory)
			if(localStorage.getItem('stuId')&&localStorage.getItem('domitary')&&!vueThis.popupForm.dormitory) {
				// console.log('已获取到本地存储并且未加载');
				this.popupForm.dormitory = localStorage.getItem('domitary')
				this.popupForm.stuId = localStorage.getItem('stuId')

			} else {
				// console.log('未获取到本地存储');
				vueThis.$toast({
					message: '第一次使用需先编辑个人信息哦 _(:3」∠)_',
					position: 'top',
					duration: 4000
				});
				vueThis.popupVisible = true

			}

			// 返回键锁定功能
			let counter = 0; // 返回键点击次数
			if (window.history && window.history.pushState) {
				window.onpopstate = function(event) {
					// alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
					// counter++
					// history.pushState(null, null, document.URL)
					// for (var prop in vueThis.stateID) {
					// 	vueThis.stateID[prop] = false
					// }
					// console.log(counter)
					// console.log(vueThis.stateID)
				};
			}
			window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
			window.history.forward(1);

			// 信息流数据初始化
			//
			this.$axios.get('http://119.23.242.116:3000/articleList')
				.then(function (response) {
					console.log(response);
					vueThis.articleList = response.data
				})
				.catch(function (error) {
					console.log(error);
					console.log(response);
				});
		}
	}
</script>

<style scoped>
.body{
	/* background-color: green; */
	height: 50px;
	padding: 10px;
	font-size: 14px;
}
.circle{
	border-radius: 100%;
}
.separator{
	height: 50px;
	width: 1px;
	border-right: 1px dotted #dbdbdb;
	/* background-color: #dbdbdb; */
}
#home-submit-Btn{
	position: relative;
	margin: 120px auto 0 auto;
}
#header{
	padding-bottom: 10px;
	border-bottom: 1px solid #dbdbdb;
}
.header-p{
	font-size: 20px;
	color: #666666;
	text-align: center;
}
.flex-center{
	display: flex;
	justify-content: center;
	align-items: center;
}
.flex-center-column{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.flex-right{
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.flex-between-center{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.flex-start-center{
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.card{
	margin: 10px 0 0 0;
	/* border: 1px solid #dbdbdb; */
	border-radius: 6px;
	box-shadow: 4px 4px 6px rgba(0,0,0,.1);
}
.card .card-font-dark{
	font-weight: bold;
	/* font-size: 18px; */
	color: #ffcb16;
	/* text-shadow: 0px 0px 6px rgba(0,0,0,.1); */
}
.card .card-font-s{
	font-weight: 100;
	font-size: 12px;
}
.font-s{
	font-size: 12px;
}
.font-l{
	font-size: 16px;
}
.font-bold{
	/* font-size: 14px; */
	font-weight: bold;
}
#weather-card{
	height: 100px;
}
#info-card{
	position: relative;
	margin-top: 0;
	padding: 10px;
	height: 90px;
	/* background-color: #5387f4; */
	overflow: hidden;
	background: linear-gradient(#42a1ec,#0070c9);
}
#info-card > .anchor{
	position: absolute;
	right: 6px;
	bottom: 2px;
	z-index: 1;
}
#info-card .edit .circle{
	width: 50px;
	height: 50px;
	background: #f2f2f2;
}
#info-card > .rotundity{
	position: absolute;
	right: -167px;
	bottom:  -361px;
	width: 400px;
	height:400px;
	background: #efefef;
	border-radius: 100%;
}
#info-card > #setting{
	margin-top: 6px;
	height: 26px;
	width: 20px;
	/* background-color:#5387f4; */
	color: #fff;
	font-size: 12px;
	/* border:2px solid #fff; */
}
/* #info-card > .rotundity-top{
	position: absolute;
	right: -100;
	bottom: -150;
	width: 200px;
	height:200px;
	background: #fff;
	border-radius: 100%;
} */
#info-card .left, #info-card .right{
	/* height: 45px; */
	width: 45%;
	color: #fff;
}
#info-card .left p, #info-card .right p{
	margin: 1.5px 0 0 0;
	letter-spacing:1px;
	font-weight: 600;
}
/* #info-card .left{
}
#info-card .right{

} */
.width-max{
	width: 100% !important;
}
.mint-popup{
	border-radius: 6px;
	width: 75%;
	padding: 10px;
}
.mint-popup button{
	width: 75%;
	height: 30px;
}
#app-card{
	padding: 0 10px;
	height: 60px;
	background: #fefefe;
}
.app{
	width: 48px;
	height: 54px;
	margin-right: 5px;
	/* border:1px solid #5387f4; */
	border-radius: 3px;
}
.app .font-s{
	padding-top: 4px;
}
#appEat{
}
.home-tab{
	/* width: 96%; */
	margin: 0 auto 40px auto;
	/* padding: 6px; */
	/* border:1px solid #ccc; */
	/* border-radius: 6px; */
	box-shadow: 4px 4px 6px rgba(0,0,0,.1);
	background-color: #fff;
}
#home-tab-nav{
	color: #555;
	padding: 10px 0 5px 0;
	margin: 10px 0 0 0;
	background-color: #fff;
	border-radius: 4px 4px 0 0;
	letter-spacing: 1.3px;
	box-shadow: 4px 4px 6px rgba(0,0,0,.1);

}
#home-tab-nav .title{
	/* border-bottom: 1px #5387f4 solid; */
	font-size:16px;
}
#home-tab-nav .decorate{
	margin-top: 4px;
	width: 16px;
	height: 3.5px;
	background-color: #5387f4;
	border-radius: 2px;
}
#home-tab-nav .nav-button-left,#home-tab-nav .nav-button-right{
	height: 24px;
	width: 49%;
	border: 1px solid #ccc;
}
#home-tab-nav .nav-button-left{
	border-radius: 4px 0 0 4px;
	border-right: none;
}
#home-tab-nav .nav-button-right{
	border-radius: 0 4px 4px 0;
	border-left: none;
}
.nav-button-right.active,.nav-button-left.active{
	background-color: #b5b5b5;
	color: #fff;
	box-shadow: 0 0 2px rgba(0,0,0,.1) inset;
}
/*B 信息流卡片 */
.card-feed-popup{
	width: 100%;
	height: 100%;
	border-radius: 0;
	padding: 0;
}
.mint-tab-container{
	border-radius: 0 0 6px 6px;
}
.card-feed{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 10px 0;
	/* height: 20px; */
	border-bottom: 1px solid #eee;
}
.card-feed .left{
	width: 15%;
}
.card-feed .right{
	display: inline;
	width: 82%;
}
.card-feed p{
	color: #666;
	font-size: 14px;
}
.card-feed .right p:first-child{
	text-align: right;
	margin-bottom: 3px;
}
.card-feed .right span{
	font-size: 14px;
	float: left;
	color: #333;
}
/*E 信息流卡片 */
</style>