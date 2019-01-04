var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(function(todo){
      if (todo.completed === true){
        completedTodos++;      
      }
    });
    
    this.todos.forEach(function(todo){
// Case 1: If everything’s true, make everything false.
      if(completedTodos === totalTodos){
        todo.completed = false;
// Case 2: Otherwise, make everything true.
      }else{
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(position, todo) {
    todoList.changeTodo(position, todo);
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";
      
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createChangeTodoButton(position));
      todoLi.appendChild(this.createChangeTodoField(position));
      todoLi.appendChild(this.createToggleCompletedButton());
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);      
    }, this);
    
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createToggleCompletedButton: function(){
    var toggleCompletedButton = document.createElement("button");
    toggleCompletedButton.textContent = "Completed";
    toggleCompletedButton.className = "toggleCompletedButton";
    return toggleCompletedButton;
  }, 
  createChangeTodoButton: function(position){
    var createChangeTodoButton = document.createElement("button");
    createChangeTodoButton.textContent = "Edit";
    createChangeTodoButton.className = "changeTodoButton";
    createChangeTodoButton.id = "button " + position;
    createChangeTodoButton.hidden = true;
    return createChangeTodoButton;
  },
  createChangeTodoField: function(position){
    var createChangeTodoField = document.createElement("input");
    createChangeTodoField.className = "changeTodoField";
    createChangeTodoField.type = "text";
    createChangeTodoField.id = "field " + position;
    createChangeTodoField.hidden = true;
    return createChangeTodoField;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event){
      var elementClicked = event.target;
      var changeTodoFieldValue = document.getElementById("field " + parseInt(elementClicked.parentNode.id));
      if (elementClicked.className === "deleteButton"){
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }else if(elementClicked.className === "toggleCompletedButton"){
            handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
        }else if(elementClicked.className === "changeTodoButton"){
          handlers.changeTodo(parseInt(elementClicked.parentNode.id), changeTodoFieldValue.value);
        }else if(elementClicked.className === ""){
          var field = document.getElementById("field " + parseInt(elementClicked.id));
          var button = document.getElementById("button " + parseInt(elementClicked.id));
          if(field.hidden === true){
            field.hidden = false;
          }else{
            field.hidden = true;
          }
          if(button.hidden === true){
          button.hidden = false;
          }else{
          button.hidden = true;
          }
        }
    });
  },
  
};
view.setUpEventListeners();









