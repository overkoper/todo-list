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
    var alert = document.getElementById("alert");
    if(addTodoTextInput.value === ""){
      alert.classList.remove("hidden");
    }else{
    alert.classList.add("hidden");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
    }
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
        todoTextWithCompletion = todo.todoText;
        todoLi.classList.add("completed");
      } else {
        todoTextWithCompletion = todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createChangeTodoField(position));
      todoLi.appendChild(this.createChangeTodoButton(position));
      todoLi.appendChild(this.createToggleCompletedButton());
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);    
    }, this);
    
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement("img");
    deleteButton.src="icons/x-mark.svg";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createToggleCompletedButton: function(){
    var toggleCompletedButton = document.createElement("img");
    toggleCompletedButton.src = "icons/check-mark.svg"
    toggleCompletedButton.className = "toggleCompletedButton";
    return toggleCompletedButton;
  }, 
  createChangeTodoButton: function(position){
    var createChangeTodoButton = document.createElement("img");
    createChangeTodoButton.src = "icons/pencil.svg"
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
      var alert = document.getElementById("alert");
      if (elementClicked.className === "deleteButton"){
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
          alert.classList.add("hidden");
      }else if(elementClicked.className === "toggleCompletedButton"){
            handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            alert.classList.add("hidden");
        }else if(elementClicked.className === "changeTodoButton"){
          if(changeTodoFieldValue.value === ""){
            alert.classList.remove("hidden");
          }else{
          handlers.changeTodo(parseInt(elementClicked.parentNode.id), changeTodoFieldValue.value);
          alert.classList.add("hidden");
          }
        }else if(elementClicked.className === ""){
          var field = document.getElementById("field " + parseInt(elementClicked.id));
          var button = document.getElementById("button " + parseInt(elementClicked.id));
          alert.classList.add("hidden");
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









