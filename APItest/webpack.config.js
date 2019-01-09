const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

var config= {
    entry:{ //main是默认入口,也可以是多入口
    	main:'./src/main.js'
    },
    //出口
    output:{
        filename:'./build.js', //指定js文件
        path: path.join(__dirname,'dist')
        //最好是绝对路径
        //代表当前目录的上一级的dist
    },
    module:{
    	// 关于模块配置
        // 一样的功能rules:   webpack2.x之后新加的
        rules: [
        	// 模块规则（配置 loader、解析器等选项）
            {
        		test:/\.css$/,
				loader:['style-loader', 'css-loader'],
	            // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
	            // test 和 include 具有相同的作用，都是必须匹配选项
	            // exclude 是必不匹配选项（优先于 test 和 include）
	            // 最佳实践：
		        // - 只在 test 和 文件名匹配 中使用正则表达式
		        // - 在 include 和 exclude 中使用绝对路径数组
		        // - 尽量避免 exclude，更倾向于使用 include
            },{
				test:/\.(jpg|svg|png|gif)$/,
				loader:'url-loader',
				//顺序是反过来的2!1
				//[name].[ext]内置提供的，因为本身是先读这个文件
				options:{
                    limit: 4096,
                    outputPath: './img',
                    publicPath: './img',
                    name: 'img/[name].[hash:7].[ext]'
				}
            },{//处理ES6的js
                test:/\.js$/,
                loader:'babel-loader',
                //排除 node_modules下的所有
                exclude:/node_modules/,
                options:{
                    presets:['es2015'],//关键字
                    plugins:['transform-runtime'],//函数
                }
            },{
                test:/\.vue$/,
                loader:'vue-loader',//vue-template-compiler是代码上的依赖
            }
        ]
    },
    plugins:[
            //插件的执行顺序是依次执行的
            new htmlWebpackPlugin({
                	template:'./src/index.html',
                }),
            new VueLoaderPlugin(),
                //将src下的template属性描述的文件根据当前配置的output.path，将文件移动到该目录
            new webpack.HotModuleReplacementPlugin()
        ],
    devServer: {
       contentBase: path.join(__dirname, "dist")
   }
};

module.exports = config;