var mongoose=require('mongoose');
var schema=mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	body:{
		type:String,
		required:true
	},
	modified:{
		type:Date,
		default:Date.now
	},
	user_id:{
		type:String
	}
});
module.exports=mongoose.model("Blog",schema);