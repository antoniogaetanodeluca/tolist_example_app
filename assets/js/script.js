var toDo = function(){

  var data, year, day, month, id;
      data = new Date();
      year = data.getFullYear();
      day = data.getDay();
      month = data.getMonth();

  var toDoObject = [
    {
      id: "123",
      title: "First To Do",
      description: "Lorem Ipsum dolor sit amet",
      date: [day, month, year]
    },
    {
      id: "456",
      title: "Second To Do",
      description: "Lorem Ipsum dolor sit amet 2",
      date: [day, month, year]
    }
  ]

  return {
    getToDoList: function(){
      return toDoObject;
    },
    addToDo: function(title_todo, description_todo){
      id = Math.floor(Math.random() * 100);
      var todo = {
        id: id,
        title: title_todo,
        description: description_todo,
        date: [day, month, year]
      }
      toDoObject.push(todo);
    }
  }

}

document.addEventListener("DOMContentLoaded", function(e){

  function addClass(el, className){

  }

  var myApp = new toDo;

  var li, li_title, li_year, li_description, li_node, li_content;
  var ul_list = document.getElementById("todo_list");
  var submit_todo = document.getElementById("submit_todo");


  submit_todo.addEventListener("click", function(e){
    e.preventDefault();
    var title_todo = document.getElementById("title_todo").value;
    var description_todo = document.getElementById("description_todo").value;
    var form_todo = document.getElementById("form_todo");

    if( (title_todo.length >= 4) && (description_todo.length >= 5)){
      myApp.addToDo(title_todo, description_todo);
      
    } else {

    }

    console.log(myApp.getToDoList());

  });


  // var obj = myApp.getToDoList();
  // obj.forEach(function (k){
  //   li = document.createElement("li");
  //   li_title = k.title;
  //   li_description = k.description;
  //   li_year = k.date[2];
  //   li_content = "<div class='todo_item'><span class='title'><h2>"+li_title+"</h2></span><span class='date'>"+li_year+"</span><span class='description'><p>"+li_description+"</p></span></div>";
  //   li.innerHTML = li_content;
  //   ul_list.appendChild(li);
  // });
  //
  // console.log(myApp.getToDoList());


});
