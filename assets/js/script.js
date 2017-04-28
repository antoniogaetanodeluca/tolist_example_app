var toDo = function(){

  var data, year, day, month, id;
  data = new Date();
  year = data.getFullYear();
  day = data.getDay();
  month = data.getMonth();

  var toDoObject = [];

  var getTodoList = function(){
    try {
      $.ajax ({
        url: 'json.php',
        method: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        success: function (jsonData) {
          toDoObject = jsonData;
        }
      });
      return toDoObject;
    } catch(e) {
      console.log(e);
    }
  };

  var updateToDoList = function(obj){
    try {
      $.ajax({
        method: "POST",
        data: {json:JSON.stringify(obj)},
        url: "json.php",
        success: function(jsonRes){
        },
        error: function(){
          console.log("error json call!");
        }
      });
    } catch(e) {
      console.log(e);
    }
  };

  var showToDoList = function(){
    try {
      var ul_list = document.getElementById("todo_list");
      var li, li_title, li_year, li_description, li_content;
      ul_list.innerHTML = "";
      var obj = getTodoList();
      obj.forEach(function (k){
        li = document.createElement("li");
        li.id = k.id;
        li_title = k.title;
        li_description = k.description;
        li_year = k.date[2];
        li_content = "<div class='todo_item'><span class='title'><h2>"+li_title+"</h2></span><span class='date'>"+li_year+"</span><span class='description'><p>"+li_description+"</p></span><button class='delete_todo btn btn-success'><i class='fa fa-check' aria-hidden='true'></i><span class='cta-text'> done</span></button><button class='drop_todo btn btn-danger hidden'>delete</button></div>";
        li.innerHTML = li_content;
        ul_list.appendChild(li);
      });
    } catch(e) {
      console.log(e);
    }
  };

  var addToDo = function(title_todo, description_todo){
    try {
      id = Math.floor(Math.random() * 100);
      var toDo = {
        id: id,
        title: title_todo,
        description: description_todo,
        date: [day, month, year],
        completed: false
      }
      toDoObject.unshift(toDo);
      updateToDoList(toDoObject);
    console.log(toDoObject);
    } catch(e) {
      console.log(e);
    }
  };

  var deleteToDo = function(id){
    try {
      for ( var i = 0; i < toDoObject.length; i++){
        if(toDoObject[i].id == id){
          toDoObject.splice(i, 1);
          $("#todo_list").find("li#" + id).remove();
          if($("#todo_list").find("li").length === 0){
            $("#todo_list").text("Nothing to do. Take you first note, now!");
            $("#submit_todo").removeAttr("disabled");
            $("#hide_completed_todo").addClass("hidden");
          }
        }
      }
    } catch(e) {
      console.log(e);
    }
  };

  var toDoCompleted = function(id, state){
    try {
      var obj = getTodoList();
      obj.forEach(function(k){
        if(id == k.id){
          if(state === "completed"){
            var toDoCompleted = {
              id: id,
              title: k.title,
              descriprion: k.descriprion,
              date: k.date,
              completed: true
            }
          } else {
            var toDoCompleted = {
              id: id,
              title: k.title,
              descriprion: k.descriprion,
              date: k.date,
              completed: false
            }
          }
          $.ajax({
            method: "POST",
            data: {json: JSON.stringify(toDoCompleted)},
            url: "json.php",
            success: function(jsonresponse){
              console.log(jsonresponse);
            },
            error: function(){
              console.log("error!");
            }
          });
        }
      });
    } catch(e) {
      console.log(e);
    }
  };

  var toggleCompleted = function(state, id, completedArray){
    try {
      var btnId = "#"+id;
      if(state === "hide"){
        $(btnId).find("i").removeClass("fa-eye-slash").addClass("fa-eye");
        $(btnId).find(".cta-text").text(" show completed");
        $("#todo_list li.completed").each(function (){
          $(this).addClass("hidden");
        });
      } else {
        $(btnId).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
        $(btnId).find(".cta-text").text(" hide completed");
        $("#todo_list li.completed").each(function (){
          $(this).removeClass("hidden");
        });
      }
      console.log(completedArray);
    } catch(e) {
      console.log(e);
    }
  }

  return {
    addToDo: addToDo,
    deleteToDo: deleteToDo,
    showToDoList: showToDoList,
    getTodoList: getTodoList,
    toDoCompleted: toDoCompleted,
    toggleCompleted: toggleCompleted
  }

}

document.addEventListener("DOMContentLoaded", function(e){

  var myApp = new toDo;

  myApp.showToDoList();

  var submit_todo = document.getElementById("submit_todo");
  var delete_todo = document.getElementsByClassName("delete_todo");

  // add new todo
  submit_todo.addEventListener("click", function(e){
    e.preventDefault();
    var title_todo = document.getElementById("title_todo").value;
    var description_todo = document.getElementById("description_todo").value;
    var form_todo = document.getElementById("form_todo");
    if( (title_todo.length < 3) || (title_todo.value = "") ){
      // here a function that checks for required inputs
    } else if ( (description_todo.length < 4) || (description_todo.value = "") ){
      // here a function that checks for required inputs
    } else {
      myApp.addToDo(title_todo, description_todo);
    }
    myApp.showToDoList();
  });

  $("#todo_list").on("click", ".delete_todo", function(e){
    var toDo_id = $(this).parents("li").attr("id");
    var state = null;
    $(this).parents("li").toggleClass("completed");
    if( $("#todo_list li.completed").length > 0){
      $("#hide_completed_todo").removeClass("hidden");
    } else {
      $("#hide_completed_todo").addClass("hidden");
    }
    if($(this).parents("li").hasClass("completed")){
      state = "completed";
      $(this).find(".cta-text").text(" modify"); // change text from "done" to "modify"
      $(this).removeClass("btn-success").addClass("btn-primary"); // change Bootrstrap class from "btn-succe" to "btn-primary"
      $("#submit_todo").attr("disabled", "disabled"); // set btn ADD attribute to "disabled" to avoid form submit
      $(this).find("i.fa").removeClass("fa-check").addClass("fa-pencil");
      $(this).parents("li").find(".todo_item span.title").addClass("text-completed");
      $(this).parents("li").find(".drop_todo").removeClass("hidden");
    } else {
      state = "uncompleted";
      $(this).find(".cta-text").text(" done");
      $(this).removeClass("btn-primary").addClass("btn-success");
      $("#submit_todo").removeAttr("disabled"); // restore btn ADD attribute to "disabled"
      $(this).find("i.fa").removeClass("fa-pencil").addClass("fa-check");
      $(this).parents("li").find(".todo_item span.title").removeClass("text-completed");
      $(this).parents("li").find(".drop_todo").addClass("hidden");
    }
    myApp.toDoCompleted(toDo_id, state);
  });

  //delete completed todo
  $("#todo_list").on("click", ".drop_todo", function() {
    var toDoId = $(this).parents("li").attr("id");
    myApp.deleteToDo(toDoId);
  });

  //show - hide completed todos
  $("#hide_completed_todo").on("click", function(){
    var completedArray = []; // store completed todo's ID
    var completedToDoId = null;
    var state = null;
    var btnID = $(this).attr("id");
    $(this).toggleClass("completed");
    if($(this).hasClass("completed")){
      $("#todo_list li.completed").each(function (){
        completedToDoId = $(this).attr("id");
        completedArray.push(completedToDoId);
      });
      state = "hide";
    } else {
      state = "show";
    }
    myApp.toggleCompleted(state, btnID, completedArray);
  });







});
