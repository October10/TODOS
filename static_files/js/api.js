var apiGet = (path, data, callback) => {
    var url = 'http://localhost:8000' + path
    ajax('GET', url, data, callback)
}

var apiPost = (path, data, callback) => {
    var url = 'http://localhost:8000' + path
    ajax('POST', url, data, callback)
}

// 载入
var apiTodoAll = (callback) => {
    var path = '/todo/all'
    var data = {}
    apiGet(path, data, callback)
}

// 增加
var apiTodoAdd = (value, callback) => {
    var path = '/todo/add'
    var data = {
        task: value
    }
    apiPost(path, data, callback)
}

// 删除
var apiTodoDelete = (id, callback) => {
    var path = '/todo/delete/' + id
    var data = {}
    apiGet(path, data, callback)
}

// 标记完成
var apiTodoUpdate = (id, callback) => {
    var path = '/todo/update/' + id
    var data = {}
    apiGet(path, data, callback)
}
