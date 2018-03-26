'use strict'
var crypto = require('crypto')

const _key = '563249b470'

// MD5方法
function MD5(s) {
	return crypto.createHash('md5').update(s, 'utf8').digest('hex')
}
function SHA1(s) {
	return crypto.createHash('sha1').update(s, 'utf8').digest('hex')
}
function SHA256(s) {
	return crypto.createHash('sha256').update(s, 'utf8').digest('hex')
}
function HMAC256(s, key) {
	return crypto.createHmac('sha256', key).update(s, 'utf8').digest('hex');
}
// API参数加密
function cryptoParams(data, type, key) {
	var ps = []
	var i

	for (i in data) {
		ps.push({key: i, val: data[i]})
	}

	// 排序
	ps.sort(function (a, b) {
		return a.key.localeCompare(b.key)
	})

	var t = ''

	if(type){
		for (i in ps) {
			if (ps[i].val != null) {
				t += ps[i].key + '='+ ps[i].val.toString() + '&'
			}
		}
		t = t.substring(0, t.length - 1);
		if (type == 'md5') {
			t = t + '&key=' + key;
			return MD5(t)
		} else if (type == 'sha1') {
			return SHA1(t)
		} else if (type == 'hmacsha256') {
			t = t + '&key=' + key;
			return HMAC256(t, key)
		}
	}else {
		for (i in ps) {
			if (ps[i].val != null) {
				t += ps[i].val.toString()
			}
		}
		return MD5(t + _key)
	}

}

// POST API接口
module.exports = {
	MD5: MD5,
	SHA1: SHA1,
	SHA256: SHA256,
	cryptoParams: cryptoParams
}