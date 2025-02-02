document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            addTodoToList(todo.text, todo.completed);
        });
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed'),
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodoToList(todoText, completed = false) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todoText}</span>
            <button>Delete</button>
        `;
        if (completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTodos();
        });
        li.querySelector('button').addEventListener('click', function(e) {
            e.stopPropagation();
            li.remove();
            saveTodos();
        });
        todoList.appendChild(li);
    }

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (todoInput.value.trim() !== '') {
            addTodoToList(todoInput.value.trim());
            saveTodos();
            todoInput.value = '';
        }
    });

    loadTodos();
});
