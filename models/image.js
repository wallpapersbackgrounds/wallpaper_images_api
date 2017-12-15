var mongoose=require('mongoose');

var imgSchema=new mongoose.Schema({
  appName:{type:String,default:'Name',lowercase:true,required: true },
  imgUrl:{type:String,unique:true,dropDups:true,required: true }
});
module.exports=mongoose.model('img',imgSchema);
