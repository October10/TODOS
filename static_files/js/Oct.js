var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    return element
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    return elements
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var ajax = function(method, path, data, responseCallback) {
    // 发送登录数据
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            var data = JSON.parse(r.response)
            responseCallback(data)
        }
    }
    // 处理 data
    data = JSON.stringify(data)
    // 发送请求
    r.send(data)
}
