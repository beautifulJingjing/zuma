/**
 * Created by yr on 2018/3/21.
 */
module.exports = function(req,res){
	console.log(req.body)
	res.json({
		header:{
			code:200,
		}
	})
}