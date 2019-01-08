<template>
	<div class="body">
		<div id="header">
			<p class="header-p">南工助手</p>
		</div>

		<!-- <div class="card" id="weather-card"></div> -->
		<div class="card" id="info-card">

			<div class="flex-between-center">
				<div class="left flex-center-column">
					<div class="card-font-light width-max">
						学号：{{stuId}}
					</div>
					<div class="width-max">
						一卡通余额: <span class="card-font-dark">{{stuInfo.OCPbalance}}</span>
					</div>
				</div>
				<div class="separator"></div>
				<div class="right flex-center-column">
					<div class="card-font-light width-max">
						寝室号：{{dormitory}}
					</div>
					<div class="width-max">
						电费余额: <span class="card-font-dark">{{stuInfo.DEbalance}}</span>
					</div>
				</div>
			</div>

			<div class="anchor">
				<img :src="libs.NITLogo" alt="logo" :width="90">
			</div>

			<div class="rotundity"></div>

			<mt-button type="primary"  v-on:click="popup" id="setting">编辑个人信息</mt-button>

			<mt-popup	v-model="popupVisible" popup-transition="popup-fade">
				<!-- 弹出框内容 -->
					<mt-field label="寝室号" placeholder="例：5a207" v-model="popupForm.dormitory"></mt-field>
					<mt-field label="学号" placeholder="请输入学号"  v-model="popupForm.stuId"></mt-field>
					<!-- <mt-cell title="电费余额" value="请先输入寝室号"></mt-cell>
					<mt-cell title="一卡通余额" value="请先输入学号"></mt-cell> -->

					<div id='home-submit-Btn' class="flex-center" @click="popupVisible = false">
						<mt-button type="primary" style="width:75%;height:30px;background-color:#5387f4">确定</mt-button>
					</div>
			</mt-popup>
		</div>



	</div>
</template>

<script>


	export default{
		//data是一个函数，返回一个对象.
		data(){
			return {
				popupForm:{
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
					NITLogo:'../libs/NITLogo.png'
				},
				popupVisible:false //home弹窗
			}
		},
		//声明函数，属于组件对象的
		methods:{
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
			}
		},
		// 1、监听学号及寝室号输入框，若位数达到即发起请求获取数据
		watch:{
			'popupForm.dormitory': function(newVal){
				console.log('dormitory变化')
				const ElectricityFeeUrl ='http://60.205.183.30:8080/onepig/electricity/ElectricityAction_getElectricityFee.action';
				var params = new URLSearchParams();
				var buildingName = '',
					roomName = '',
					vueThis = this

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
					return false;
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
					let DEbalance = response.data
					vueThis.stuInfo.DEbalance = DEbalance + '度'
				})
				.catch(function (error) {
					console.log(error);
					console.log(response);

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
					console.log(response);
					let OCPbalanceArr = response.data.OCPbalance
					vueThis.stuInfo.OCPbalance = OCPbalanceArr[OCPbalanceArr.length - 1].balance + '元'
				})
				.catch(function (error) {
					console.log(error);
				});

				// 获取一卡通余额
			}
		},
		mounted:function () {
			// console.log("mounted生命周期函数")
			if(localStorage.getItem('stuId')&&localStorage.getItem('domitary')) {
				console.log('已获取到本地存储');
				this.popupForm.dormitory = localStorage.getItem('domitary')
				this.popupForm.stuId = localStorage.getItem('stuId')
			} else {
				console.log('未获取到本地存储');
			}
		}
	}
</script>

<style scoped>
.body{
	/* background-color: green; */
	height: 50px;
	padding: 10px;
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
.card{
	margin: 10px 0 0 0;
	border: 1px solid #dbdbdb;
	border-radius: 6px;
	box-shadow: 4px 4px 6px rgba(0,0,0,.1);
}
.card .card-font-dark{
	font-weight: bold;
	font-size: 18px;
	/* text-shadow: 0px 0px 6px rgba(0,0,0,.1); */
}
.card .card-font-light{
	font-weight: 100;
	font-size: 12px;
}
#weather-card{
	height: 100px;
}
#info-card{
	position: relative;
	padding: 10px;
	height: 90px;
	background-color: #5387f4;
	overflow: hidden;
}
#info-card > .anchor{
	position: absolute;
	right: 6px;
	bottom: 2px;
	z-index: 1;
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
	margin-top: 10px;
	height: 26px;
	background-color:#5387f4;
	color: #fff;
	font-size: 12px;
	border:2px solid #fff;
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
	height: 45px;
	width: 45%;
	color: #fff;
}
/* #info-card .left{
}
#info-card .right{

} */
.width-max{
	width: 100%;
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

</style>