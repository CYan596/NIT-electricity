<template>
	<div class="body">
		<div class="card flex-center" id="board-card">
			<div>
				<p>小程序版本尚在开发中，敬请期待 </p>
				<p>(๑•̀ㅂ•́)و✧</p>
			</div>
		</div>
		<mt-cell title="此项目的开发日志" label="将跳转到知乎，南工助手·更新与开发日志" is-link
		to="https://zhuanlan.zhihu.com/p/54758094"
		></mt-cell>

		<!-- <mt-cell title="建议与意见" label="将跳转到知乎，南工助手·更新与开发日志" is-link
		to="https://zhuanlan.zhihu.com/p/54758094"
		></mt-cell> -->

	</div>
</template>

<script>
	export default{
		//data是一个函数，返回一个对象
		data(){
			return {
			}
		},
		//声明函数，属于组件对象的
		methods:{},
		props:['texttwo']
	}
</script>

<style scoped>
.body{
	/* color: #fff;
	background-color: green;
	height: 50px; */
	background-color: #fff;
	padding: 10px 10px;
}
.card{
	color: #fff;
	padding: 10px;
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
#board-card{
	height: 110px;
	margin-bottom: 10px;
	background-color: #5d85dc;
}
.flex-center{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>