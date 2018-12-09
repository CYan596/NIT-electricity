<template>
	<div>
		<mt-header fixed title="南工校园助手-API测试页"></mt-header>
	</div>
</template>   

<script>
	import connect from '../connector.js';

	export default{
		//data是一个函数，返回一个对象
		data(){
			return {
			}
		},
		//声明函数，属于组件对象的
		methods:{
		 	callDaddy(){
                //发射信号
                connect.$emit('phone','62分钟来');
            }
		},
		//接受父组件值参数的设置
        props:['textone'],
	}
</script>

<style>
</style>