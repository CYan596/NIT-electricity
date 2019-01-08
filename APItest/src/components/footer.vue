<template>
	<div class="footer flex-space-around">
		<router-link to="/home" class='switch flex-center'>首页</router-link>
		<router-link to="/about" class='switch flex-center'>更多</router-link>
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
		methods:{}
	}
</script>

<style scoped>
.footer{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 35px;
	border-top: 1px solid #eee;
}
.switch{
	text-decoration: none;
}

</style>