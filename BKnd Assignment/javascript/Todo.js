
var form = document.querySelector('form');
var toDoList = document.querySelector('ul');
var clearButton = document.getElementById('clear');
var input = document.querySelector('#user-todo');
var todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

localStorage.setItem('todos', JSON.stringify(todosArray));

var storage = JSON.parse(localStorage.getItem('todos'));


form.addEventListener('submit', function(e) {
    e.preventDefault();
    todoMaker(input.value);
    todosArray.push(input.value);
    localStorage.setItem('todos', JSON.stringify(todosArray));
    input.value = '';
});

var todoMaker = function(text) {
var todo = document.createElement('li');
todo.textContent = text;
toDoList.appendChild(todo);
}

storage.forEach(element => {

    todoMaker(element);
    
});


clearButton.addEventListener('click', function() {
    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.firstChild);
        localStorage.clear();
    }
});