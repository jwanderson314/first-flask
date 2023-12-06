let taskInput = document.getElementById("new-task");
//let addButton = document.querySelector("button");
let addButton = document.getElementById("submit");
let incompleteTasks = document.getElementById("incomplete-tasks");
let completedTasks = document.getElementById("completed-tasks");
let clearButton = document.getElementById("clear");
let clearIButton = document.getElementById("clear-image")

console.log("taskInput:", taskInput);
console.log("addButton:", addButton);
console.log("incompleteTasks:", incompleteTasks);
console.log("completedTasks:", completedTasks);
console.log("clearButton:", clearButton);
let createNewTask = function (taskName) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  checkBox.type = "checkBox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskName;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};
let addTask = function () {
  if (taskInput.value == "") {
    alert("Task to be added should not be empty!");
    return;
  }
  let listItem = createNewTask(taskInput.value);
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

let editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};
let deleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};
let taskCompleted = function () {
  let listItem = this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function () {
  let listItem = this.parentNode;
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};
addButton.addEventListener("click", addTask);
let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector('input[type="checkbox"]');
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

let clear = function () {
  incompleteTasks.innerHTML = "";
  completedTasks.innerHTML = "";
};
clearButton.addEventListener("click", clear);

const toggleTheme = document.getElementById("toggleTheme");
const container = document.querySelector(".container");
const submitf = document.getElementById("submitf");
const getRandomSkin = document.getElementById("generate-skin");
const image = document.getElementById("skinImage");

// toggleTheme.addEventListener("click", function () {

//   fetch("/toggle_theme", { method: "POST" })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       document.body.classList.toggle("dark-theme", data.dark_mode);
//       console.log(document.body.style.backgroundColor);
//       console.log(document.body.style.backgroundColor + 1);
//       if (document.body.style.backgroundColor == "rgb(128, 128, 128)")
//         document.body.style.backgroundColor = "rgb(255, 255, 255)";
//       else document.body.style.backgroundColor = 808080;
//     });
// });

toggleTheme.addEventListener('click', function() {
  // Implement your dark mode logic here
  document.body.classList.toggle('dark-theme');
  

})

getRandomSkin.addEventListener('click', function() {
  fetch("/fort", {
    method: "POST"
  })
  .then((response) => response.json())
      .then((data) => {
        // Assuming the response contains a 'tasks' key with a list of tasks
        let image_url = data.image_url;
        let skin_name = data.skin_name;
        let item = createNewTask(skin_name)
        incompleteTasks.appendChild(item);
        bindTaskEvents(item, taskCompleted);
        console.log(image);
        image.src = image_url;
        // window.addEventListener("DOMContentLoaded", () => {
        //   // Change the src attribute to the new image URL or file path
        //   image.src = 'https://fortnite-api.com/images/cosmetics/br/cid_029_athena_commando_f/featured.png';
        // });

        
        

        
       

       
      })
    


})

document.addEventListener("DOMContentLoaded", function () {
  clear.addEventListener("click", function () {
    
  })

})

document.addEventListener("DOMContentLoaded", function () {
  submitf.addEventListener("click", function () {
    
    let input = document.getElementById("file1");
    let file = input.files[0];
    console.log(input.files[0])

    let formData = new FormData();
    formData.append("file", file);

    fetch("/data", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response contains a 'tasks' key with a list of tasks
        let incompleteTasksraw = data.incompleted_Tasks;
        let completeTasksraw = data.completed_Tasks;

        console.log(data)

        // Clear existing tasks
        

        // Add tasks to incompleteTasks
        incompleteTasksraw.forEach((task) => {
          
          let listItem = createNewTask(task)
         
          incompleteTasks.appendChild(listItem);
          bindTaskEvents(listItem, taskCompleted);
        });

        completeTasksraw.forEach((task) => {
          
          let listItem = createNewTask(task)
          
          completedTasks.appendChild(listItem);
          bindTaskEvents(listItem, taskIncomplete);
        });
      })
      .catch((error) => {
        console.error("Error uploading Excel file:", error);
        alert("Error uploading Excel file. Please try again.");
      });
      input.value="";
  });
});
