let html = `<div class="tips hide " id="alert">
<div class="shadow"></div>
<p></p>
</div>`
let ele = document.createElement('div')
let timer

ele.innerHTML = html

ele = ele.childNodes[0]

var textNode = ele.children[1]
window.tips = show

function show(msg) {
	ele.className = ele.className.replace(/[\s]hide[\s]/g, '')
	textNode.textContent = msg
	setCloseTimer()
}

function setCloseTimer() {
	clearTimeout(timer)
	timer = setTimeout(function () {
		close()
	}, 2000)
}

function close() {
	ele.className = ele.className + ' hide '
}

const tips = {
	install: function (vue) {
		document.body.appendChild(ele)
		vue.prototype.$tips = function (msg) {
			show(msg)
		}
	}
}
export default tips
