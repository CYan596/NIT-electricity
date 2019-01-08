const mongoose = require('mongoose');

// 连接数据库
mongoose.connect("mongodb://localhost:27017/mainDB", {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') }
})

// 设计模式
var Schema = mongoose.Schema;
var stuSchema = new Schema({
	stuId:  { type: [Number], index: true },
	stuName: String,
	Dormitory: String,
	DEbalance: [{ balance: String, date: Date }],
	OCPbalance: [{ balance: String, date: Date }],
	hidden: Boolean
	}, {
  		versionKey: false
  	}
  );
// }
// 将文档结构发布为model (模型)
var stuModel = mongoose.model('stuModel', stuSchema);

// mongoose CRUD Test
var testData = new stuModel({
	stuId:  2015100001,
	stuName: '谢信东',
	Dormitory: '',
	DEbalance: [{ balance: '', date: new Date()}],
	OCPbalance: [{ balance: '1561.74', date: new Date()}],
	hidden: false
})

//数据创建、更新

// 增加
// testData.save(function(err, ret){
// 	if(err){
// 		console.log('存储失败：'　+ err)
// 	} else {
// 		console.log(ret)
// 	}
// })

// 包装后的建行接口数据库增加函数
// CCBData数据实例： {"stuId":"2015100419","stuName":"湛佳颖","OCPbalance":"0.00"}
function stuMongoSave(CCBData){
	testData = new stuModel({
		stuId:  parseInt(CCBData.stuId),
		stuName: CCBData.stuName,
		Dormitory: '',
		DEbalance: [{ balance: '20.4', date: new Date()}],
		OCPbalance: [{ balance: CCBData.OCPbalance, date: new Date()}],
		hidden: false
	})
}

// 	testData.save(function(err, ret){
// 		if(err){
// 			console.log('存储失败：'　+ err)
// 		} else {
// 			// console.log(ret)
// 		}
// 	})
// }

// 查
// stuModel.find({
// 	stuId:  2000000001
// }, function(err, ret){
// 	if (err) {
// 		console.log('查询失败：'　+ err)
// 	} else {
// 		console.log(ret.toString())
// 	}
// })

// 删
// stuModel.deleteOne({
// 	stuId: 2000000000
// }, function(err){
// 	if (err) {
// 		console.log('删除失败：'　+ err)
// 	} else {
// 		console.log('删除成功')
// 	}
// })

// 改
// stuModel.findOneAndUpdate({
// 	stuId: 2000000001
// },{
// 	$push:{"DEbalance":{ "balance": "10.4", "date": new Date()}}
// } ,function(err, ret){
// 	if (err) {
// 		console.log('更改失败：'　+ err)
// 	} else {
// 		console.log('更改成功' + ret)
// 	}
// })

// 包装后的建行接口数据库更新/添加函数
// CCBData数据更新实例： {"stuId":"2015100419","stuName":"湛佳颖","OCPbalance":"0.00"}
// 若数据不存在则创建新记录，存在则插入
// 传参示例
// var testData2 = {
// 	stuId:  2015100001,
// 	stuName: '谢信东',
// 	Dormitory: '',
// 	DEbalance: '',
// 	OCPbalance: '',
// 	hidden: false
// }
// stuMongoUpdate(testData2);

function stuMongoUpdate(CCBData){
	stuModel.updateOne({
		stuId: CCBData.stuId
	},{
		$set:{'stuName': CCBData.stuName, 'Dormitory': CCBData.Dormitory, 'hidden': CCBData.hidden},
		$push:{
			'OCPbalance': { 'balance': CCBData.OCPbalance, 'date': new Date()},
			// 'DEbalance': { 'balance': CCBData.DEbalance, 'date': new Date()}
		}
	},{
		upsert: true
	},function(err, ret){
		if (err) {
			console.log('更改失败：'　+ err)
		} else {
			// console.log('更改成功' + ret)
		}
	})
	return 0;
}

// 传入number ID，返回json

function stuMongoFind(params, callback) {
	// 查
	stuModel.findOne({
			stuId:  params
		}, {
			_id: 0
		},function(err, ret){
			if (err) {
				// console.log('查询失败：'　+ err)
				callback(err)
			} else {
				callback(ret)
			}
		})
}
// function stuMongoFind(params) {
// 	// 查
// 	console.log('find')
// 	stuModel.find({
// 			stuId:  params
// 		}, function(err, ret){
// 			if (err) {
// 				// console.log('查询失败：'　+ err)
// 				tool(err)
// 			} else {
// 				tool(ret)
// 			}
// 		})
// }

// function tool(x) {
// 	console.log(x)
// }

// 导出操纵对象至main.js主业务模块代码中使用
exports.stuMongoSave = stuMongoSave;
exports.stuMongoUpdate = stuMongoUpdate;
exports.stuMongoFind = stuMongoFind;