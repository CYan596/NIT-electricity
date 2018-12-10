<template>
	<div class="body">
		<mt-field label="寝室号" placeholder="例：5a207" v-model="dormitory"></mt-field>
		<mt-field label="学号" placeholder="请输入学号"  v-model="stuNum"></mt-field>
		<mt-cell title="电费余额" value="请先输入寝室号"></mt-cell>
		<mt-cell title="一卡通余额" value="请先输入学号"></mt-cell>
		
		<div id='home-submit-Btn' class="flex-center">
			<mt-button type="primary" width="20" disabled>查询</mt-button>
		</div>
	</div>
</template>   

<script>
	

	export default{
		//data是一个函数，返回一个对象.
		data(){
			return {
				dormitory:'',
				stuNum:''
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
				});
			},
			getStuNumFee(){

			}
		},
		// 1、监听学号及寝室号输入框，若位数达到即发起请求获取数据
		watch:{
			'dormitory': function(newVal){
				console.log('dormitory变化')
				const ElectricityFeeUrl ='http://60.205.183.30:8080/onepig/electricity/ElectricityAction_getElectricityFee.action';
				var params = new URLSearchParams();
				var buildingName = '',
					roomName = ''

				if (newVal.length==5){
					buildingName = newVal.slice(0, 2),
			    	roomName = newVal.slice(2, 5)
			    }else if (newVal.length==6) {
					buildingName = newVal.slice(0, 3),
			    	roomName = newVal.slice(3, 6)
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
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			'stuNum': function(newVal){
				// 获取一卡通余额
				console.log('stuNum发生了变化')
			}
		}	
	}
</script>

<style scoped>
.body{
	background-color: green;
	height: 50px;
}
#home-submit-Btn{
	position: relative;
	margin: 120px auto 0 auto;

}
</style>