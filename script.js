const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showList();

let taskList = [];

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    taskList = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Add a new task
function addTask() {
  const inputBox = document.getElementById('input-box');
  const taskText = inputBox.value.trim();
  if (taskText === '') return;

  taskList.push({ text: taskText, completed: false });
  inputBox.value = '';
  saveTasks();
  renderTasks();
}

// Render tasks in the UI
function renderTasks() {
  const listContainer = document.getElementById('list-container');
  listContainer.innerHTML = '';

  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add('checked');
    }

    li.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement('span');
    span.textContent = '×';
    span.addEventListener('click', (e) => {
      e.stopPropagation();
      taskList.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    listContainer.appendChild(li);
  });
}

// Load tasks when the page loads
window.onload = loadTasks;