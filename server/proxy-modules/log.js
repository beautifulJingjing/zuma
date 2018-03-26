/**
 * Created by yr on 2017/8/28.
 */
module.exports = function (req, res, next) {
	//爬虫过滤
	if (/Googlebot/i.test(req.headers['user-agent']))
		return;
	var trace = res.trace,data = req.query,
		send = '';
	switch (data.type) {
		case 'visit':
			trace.visit();
			break;
		case 'event':
			trace.event();
			//统计访问密度
			/*if(res.pushinfo.set.toString() == "0") {
			 if (/doDown|doSetRing|doSetRings|doFreeGet|doOpenServe/i.test(req.query.name || req.body.name)) {
			 density.setDense(res.locals.spinfocode);
			 send = req.app.locals.density[res.locals.spinfocode];
			 }
			 }*/
			break;
		case 'error':
			trace.error();
			break;
		default:
			trace.other();
			break;
	}
	res.send({});
}