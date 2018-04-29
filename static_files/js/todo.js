var templateTodo = (todo) => {
                log('123todo', todo, typeof todo)
    var task = todo.task
    var id = todo.id
    var state = ''
    if (todo.done == false) {
        state = ''
    } else if (todo.done == true){
        state = ' done'
    }
            log('123todo', task, id, state)
    var t = `
        <div class="todo-cell${state}" data-id="${id}">
            <button class="todo-done">完成</button>
            <button class="todo-delete">删除</button>
            <span class="todo-task">${task}</span>
        </div>
    `
    return t
}

var insertTodo = (todo) => {
    var container = e('#id-todo-container')
    var html = templateTodo(todo)
    appendHtml(container, html)
}

var insertTodos = (todos) => {
    if (todos.length > 0) {
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i]
            insertTodo(todo)
        }
    }
}

// 载入所有的 todos 并插入到页面中
var loadTodos = () => {
    apiTodoAll(function(todos) {
        log('载入所有 todos', todos)
        insertTodos(todos)
    })
}

var bindEventAdd = () => {
    // 绑定 add 按钮的事件委托
    var container = e('#id-todo-form')
    container.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-add')) {
            // 获取 input 的输入
            var input = e('#id-input-todo')
            var value = input.value
            apiTodoAdd(value, function(todo) {
                log('创建成功', todo)
                // 往页面中插入被创建的 todo
                insertTodo(todo)
            })
        }
    })
}

var bindEventDelete = () => {
    // 绑定 delete 按钮的事件委托
    var container = e('#id-todo-container')
    container.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-delete')) {
            // 拿到 todoId，在事件中调用 apiTodoDelete, 传入 todoId
            var todoCell = self.closest('.todo-cell')
            var todoId = todoCell.dataset.id
            apiTodoDelete(todoId, function(todo) {
                log('删除成功', todo)
                // 删除成功后, 删除页面元素
                todoCell.remove()
            })
        }
    })
}

var bindEventUpdate = () => {
    // 绑定 keydown 事件, 当用户按键的时候被触发
    var container = e('#id-todo-container')
    container.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-done')) {
            // 发送 update 的请求
            var todoCell = self.closest('.todo-cell')
            var todoId = todoCell.dataset.id
            apiTodoUpdate(todoId, function(todo) {
                log('更新成功', todo)
                // 同步更新页面元素
                todoCell.classList.toggle('done')
            })
        }
    })
}

var bindEvents = () => {
    bindEventAdd()
    bindEventDelete()
    bindEventUpdate()
}

var __main = () => {
    bindEvents()
    loadTodos()
}

__main()
