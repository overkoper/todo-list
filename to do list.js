var todos = ["item 1", "item 2", "item 3"];
function displayTodos(){
    console.log("My to do list:", todos);
};
function addTodos(todo){
    todos.push(todo);
    displayTodos();
};
function removeTodos(position){
    todos.splice(position, 1);
    displayTodos();
};
function editTodos(location, change){
    todos[location] = change;
    displayTodos();
};