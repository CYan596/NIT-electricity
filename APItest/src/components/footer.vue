<template>
	<div class="footer flex-space-around">
		<router-link to="/home" class='switch flex-center-column'>
			<img :src="libs.homeLogo" :width="20"></img>
			<span class="font-light">首页</span>
		</router-link>
		<router-link to="/about" class='switch flex-center-column'>
			<img :src="libs.moreLogo" :width="20"></img>
			<span class="font-light">更多</span>
		</router-link>
	</div>
</template>

<script>
	export default{
		//data是一个函数，返回一个对象
		data(){
			return {
				libs:{
					NITLogo:'../libs/NITLogo.png',
					homeLogo:'../libs/shouye.svg',
					moreLogo:'../libs/gengduo.svg',
				}
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
	width: 100%;
}
.switch .font-light{
	color: #333;
	font-size: 12px;
}

</style>