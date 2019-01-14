<template>
	<div>
		<!-- <headerVue></headerVue> -->
		<footerVue></footerVue>

    <router-view></router-view>

	</div>
</template>

<script>
	import headerVue from './components/header.vue';
	import footerVue from './components/footer.vue';
	import connect from './connector.js';
	import homeVue from './components/home.vue';
	import aboutVue from './components/about.vue';


	export default{
		//data是一个函数，返回一个对象
		data(){
			return {
				value:true
			}
		},
		//声明函数，属于组件对象的
		methods:{
		},
		// 声明
		components:{
			headerVue:headerVue,
			footerVue:footerVue,
			aboutVue:aboutVue
		}
	}
</script>

<style>
*{
	padding: 0;
	margin: 0;
	font-family: 'Microsoft YaHei';
}
body{
	/* padding-top: 40px; */
	background-color: #f2f2f2;
}
mt-switch {
	margin-top: 30px;
}
.flex-center{
	display: flex;
	justify-content: center;
	-ms-align-items: center;
	align-items: center;
}
.flex-center-column{
	display: flex;
	flex-direction: column;
	justify-content: center;
	-ms-align-items: center;
	align-items: center;
}
.flex-space-between{
	display: flex;
	justify-content: space-between;
	-ms-align-items: center;
	align-items: center;
}
.flex-space-around{
	display: flex;
	justify-content: space-around;
	-ms-align-items: center;
	align-items: center;
}
a[title='站长统计']{
	display: none;
}




/* css reset */
/* html {
overflow-x:auto;
overflow-y:scroll;
}
body, dl, dt, dd, ul, ol, li, pre, form, fieldset, input, p, blockquote, th, td {
font-weight:400;
margin:0;
padding:0;
}
h1, h2, h3, h4, h4, h5 {
margin:0;
padding:0;
}
body {
background-color:#FFFFFF;
color:#666666;
font-family:Helvetica,Arial,sans-serif;
font-size:12px;
text-align:left;
}
select {
font-size:12px;
}
table {
border-collapse:collapse;
}
fieldset, img {
border:0 none;
}
fieldset {
margin:0;
padding:0;
}
fieldset p {
margin:0;
padding:0 0 0 8px;
}
legend {
display:none;
}
address, caption, em, strong, th, i {
font-style:normal;
font-weight:400;
}
table caption {
margin-left:-1px;
}
hr {
border-bottom:1px solid #FFFFFF;
border-top:1px solid #E4E4E4;
border-width:1px 0;
clear:both;
height:2px;
margin:5px 0;
overflow:hidden;
}
ol, ul {
list-style-image:none;
list-style-position:outside;
list-style-type:none;
}
caption, th {
text-align:left;
}
q:before, q:after, blockquote:before, blockquote:after {
content:””;
} */
</style>