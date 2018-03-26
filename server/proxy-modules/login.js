module.exports = function (req, res) {
	let sess = req.session
	res.json({
		phone: sess.phone,
		uid:sess.uid,
		card:sess.card,
		openid:sess.openid,
		spinfoCode:sess.spinfocode
	})
}