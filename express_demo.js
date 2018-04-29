var fs = require('fs')
var bodyParser = require('body-parser')
// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()

var todoList = []

// app.use 用来构建中间件
// 配置静态文件目录
app.use(express.static('static_files'))
// 把前端发过来的数据自动用 json 解析
app.use(bodyParser.json())

var sendHtml = (path, response) => {
    var options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, (error, data) => {
        // 在回调函数中用 response.send 函数返回数据给浏览器
        // response.send(data) 这里的 data 是 ajax 里面的 r.response
        response.send(data)
    })
}

var sendJSON = (response, data) => {
    var r = JSON.stringify(data)
    response.send(r)
}

// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是要发给浏览器的响应
app.get('/', (request, response) => {
    var path = 'index.html'
    sendHtml(path, response)
})

app.get('/todo/all', (requrest, response) => {
    sendJSON(response, todoList)
})

var todoAdd = (todo) => {
    // 给新增的 todo 加上 id 属性
    // 如果 todoList.length 为 0，todo 的 id 就是 1
    // 如果 todoList.length 大于 0，todo 的 id 为 todoList 中最后一个元素的 id+1
    if (todoList.length == 0) {
        todo.id = 1
    } else {
        var lastTodo = todoList[todoList.length - 1]
        todo.id = lastTodo.id + 1
    }
    // 给新增的 todo 加上完成状态属性
    todo.done = false
    todoList.push(todo)
    return todo
}

var todoDelete = (id) => {
    id = Number(id)
    // 在 todoList 中找到 id 对应的数据, 删除掉
    var index = -1
    for (var i = 0; i < todoList.length; i++) {
        var t = todoList[i]
        if (t.id == id) {
            index = i
            break
        }
    }
    // 判断 index 来查看是否找到了相应的数据，并删除
    if (index > -1) {
        // 用 splice 函数会改变原数组，并随删除值组成一个新数组返回，所以要加 [0]
        var t = todoList.splice(index, 1)[0]
        return t
    } else {
        return {}
    }
}

var todoUpdate = (id) => {
    id = Number(id)
    // 在 todoList 中找到 id 对应的数据
    var index = -1
    for (var i = 0; i < todoList.length; i++) {
        var t = todoList[i]
        if (t.id == id) {
            // 找到了
            index = i
            break
        }
    }
    // 判断 index 来查看是否找到了相应的数据，改变其完成状态
    if (index > -1) {
        var t = todoList[index]
        var finish = t.done
        if (finish) {
            t.done = false
        } else {
            t.done = true
        }
        return t
    } else {
        return {}
    }
}

app.post('/todo/add', (request, response) => {
    var form = request.body
    var todo = todoAdd(form)
    sendJSON(response, todo)
})

app.get('/todo/delete/:id', (request, response) => {
    // 动态路由 :id 的变量是通过 request.params.名字 的方式拿到，类型永远是 string
    var id = request.params.id
    var todo = todoDelete(id)
    sendJSON(response, todo)
})

app.get('/todo/update/:id', (request, response) => {
    var id = request.params.id
    var todo = todoUpdate(id)
    sendJSON(response, todo)
})

// listen 函数的第一个参数是需要监听的端口
// 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8000, () => {
    var host = server.address().address
    var port = server.address().port
})
