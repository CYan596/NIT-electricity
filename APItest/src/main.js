// 引入vue
import Vue　from 'vue'
import VueRouter from 'vue-router';

//引入主体
import App from './app.vue'
import Home from './components/home.vue'
import About from './components/about.vue'

// 引入HTTP操作库
import Axios from 'axios';
//给Vue原型挂载一个属性
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = Axios;

// 全局axios
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios,axios);

//引入mint.ui样式
import MintUi from 'mint-ui'
//引入样式
import 'mint-ui/lib/style.css'
// use实际操作
// 1、 组件库，在内部注册了各种全局组件
// 2、 插件，挂载属性，为了方便this，可以使用到其功能
// 安装插件
Vue.use(VueRouter); //挂载属性
Vue.use(MintUi)

import { Toast, Loadmore, MessageBox, Popup} from 'mint-ui';
Vue.$toast = Vue.prototype.$toast = Toast

if (module.hot) {
  module.hot.accept();
}

// 创建路由对象并配置路由规则
let router = new VueRouter({
	routes:[
		// 一个个对象
		{path: '/home',component: Home},
		{path: '/',component: Home},
		{path: '/about',component: About}
	]
})

// 创建一个Vue的实例，一般一个项目就是一个vue实例来完成显示
new Vue({
	el:'#app', // 目的地
 	router: router,
	render:function(creater){ // 渲染的内容
		return creater(App) // App包含template/script/style，最终生成DOM结构
	}
})