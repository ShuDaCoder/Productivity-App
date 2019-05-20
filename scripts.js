var incompleteTasks = document.getElementById("incomplete-tasks");
var completedTasks = document.getElementById("completed-tasks");
var taskInput = document.getElementById("new-task");
var deleteBtnList = document.getElementsByClassName("delete");
var incompleteItemsArr = [];
var completeItemsArr = [];
const data1 = JSON.parse(localStorage.getItem("incompleteItems"));
if (data1 != null) {
    data1.forEach(item => {
        console.log("Adding a new task... Calling createNewTaskElement");
        incompleteItemsArr.push(item);
        var listItem = createNewTaskElement(item);
        incompleteTasks.appendChild(listItem);

        bindTaskEvent(listItem, taskCompleted);
    })
}
const data2 = JSON.parse(localStorage.getItem("completeItems"));
if (data2 != null) {
    data2.forEach(item => {
        console.log("Adding a new completed task... Calling createNewTaskElement");
        completeItemsArr.push(item);
        var listItem = createNewTaskElement(item);
        completedTasks.appendChild(listItem);
        var checkbox = listItem.querySelector("input[type=checkbox]");
        checkbox.checked = true;
        bindTaskEvent(listItem, taskIncomplete);
    })
}
localStorage.clear();
window.onunload = function() {
    localStorage.setItem("incompleteItems", JSON.stringify(incompleteItemsArr));
    localStorage.setItem("completeItems", JSON.stringify(completeItemsArr));
}

function addTask() {

    console.log("Adding a new task... Calling createNewTaskElement");
    incompleteItemsArr.push(taskInput.value);
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTasks.appendChild(listItem);
    taskInput.value = "";

    bindTaskEvent(listItem, taskCompleted);
    // var li = document.createElement("li");
    // li.appendChild(task);
    // myUL.appendChild(li);
    // myInput.value = "";
    // li.className = "accordion";
    // var div = document.createElement("div");
    // div.className = "panel";
    // var p = document.createElement("p");
    // var text = document.createTextNode("Add timer here");
    // p.appendChild(text);
    // div.appendChild(p);
    // var span = document.createElement("span");
    // var xBtn = document.createTextNode(" \u00D7");
    // li.appendChild(span);
    // span.appendChild(xBtn);
    // myUL.appendChild(div);
    // span.onclick = function(e) {
    //     e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    // }
    // li.onclick = function(e) {
    //     e.target.classList.toggle("active");
    //     var panel = this.nextElementSibling;
    //     if (panel.style.display === "block") {
    //         panel.style.display = "none";
    //     } else {
    //         panel.style.display = "block";
    //     }
    // }
}

function reset() {
    // for(var i =0; i<incompleteTasks.children.length; i++){
    // 	console.log("Removing list item");
    // 	incompleteTasks.removeChild(incompleteTasks.children[i]);
    // 	console.log("Removing array item");
    // 	incompleteItemsArr.pop();
    // }
    // for(var i =0; i<completedTasks.children.length; i++){
    // 	console.log("Removing list item");
    // 	completedTasks.removeChild(completedTasks.children[i]);
    // 	console.log("Removing array item");
    // 	completeItemsArr.pop();
    // }
    while (incompleteTasks.firstChild) {
        incompleteTasks.removeChild(incompleteTasks.firstChild);
    }
    while (completedTasks.firstChild) {
        completedTasks.removeChild(completedTasks.firstChild);
    }
    incompleteItemsArr = [];
    completeItemsArr = [];
}

function taskCompleted() {
    console.log("Task completed...");
    var listItem = this.parentNode;
    var taskString = listItem.querySelector("label");
    var index = incompleteItemsArr.indexOf(taskString.innerText);
    incompleteItemsArr.splice(index, 1);
    completeItemsArr.push(taskString.innerText);
    completedTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskIncomplete);
}

function taskIncomplete() {
    console.log("Task incomplete...");
    var listItem = this.parentNode;
    var taskString = listItem.querySelector("label");
    var index = completeItemsArr.indexOf(taskString.innerText);
    completeItemsArr.splice(index, 1);
    incompleteItemsArr.push(taskString.innerText);
    incompleteTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskCompleted);
}

function deleteTask() {
    console.log("Removing task");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    var taskString = listItem.querySelector("label");
    if (ul.id === "incomplete-tasks") {
        var index = incompleteItemsArr.indexOf(taskString.innerText);
        incompleteItemsArr.splice(index, 1);
    } else {
        var index = completeItemsArr.indexOf(taskString.innerText);
        completeItemsArr.splice(index, 1);
    }

    ul.removeChild(listItem);
}

function editTask() {
    console.log("Editing task");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        var index = incompleteItemsArr.indexOf(label.innerText);
        label.innerText = editInput.value;
        incompleteItemsArr[index] = label.innerText;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
}

function bindTaskEvent(listItem, checkBoxEventHandler) {
    var handleDelete = listItem.querySelector("button.delete");
    var handleEdit = listItem.querySelector("button.edit");
    var handleCheckBox = listItem.querySelector("input[type=checkbox]");
    var handleTimer = listItem.querySelector("#clock");
    handleDelete.onclick = deleteTask;
    handleEdit.onclick = editTask;
    handleTimer.onclick = pomodoroTimer;
    handleCheckBox.onchange = checkBoxEventHandler;
}

function createNewTaskElement(taskString) {
    console.log("Creating new task element...");
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");
    var timerBtn = document.createElement("button");
    label.innerText = taskString;
    checkBox.type = "checkbox";
    editInput.type = "text";
    timerBtn.id = "clock"
    timerBtn.className = "fas fa-clock fa-lg";
    timerBtn.title = "Start timer for this task";
    editBtn.innerText = "Edit";
    editBtn.className = "edit";
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete";
    listItem.appendChild(checkBox);
    listItem.appendChild(timerBtn);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    return listItem;
}

function pomodoroTimer() {
    console.log("Focusing on the timer");
    var listItem = this.parentNode;
    var label = listItem.querySelector("label");
    document.getElementById("currentTask").textContent = "Current task: " + label.innerText;
    document.getElementById("pomTimer").scrollIntoView();
}
var seconds = 1500; // seconds left on the clock
var workTime = 25;
var breakTime = 5;
var isBreak = false;

const status = document.querySelector("#status");
status.textContent = "Work Time";

const startBtn = document.querySelector("#startBtn");
const timerDisplay = document.querySelector("#timerDisplay");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement('audio');
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

var interval = null;

var increment = 5;

var incrementFunctions =
    {"#work-plus": function () { 
    	workTime = Math.min(workTime + increment, 60); workMin.textContent = workTime; if(!isBreak){seconds = workTime *60; timerDisplay.textContent = workTime + ":00";}},
     "#work-minus": function () { 
     	workTime = Math.max(workTime - increment, 5); workMin.textContent = workTime; if(!isBreak){seconds = workTime *60; timerDisplay.textContent = workTime + ":00";}},
     "#break-plus": function () { 
     	breakTime = Math.min(breakTime + increment, 60); breakMin.textContent = breakTime; if(isBreak){seconds = breakTime *60; timerDisplay.textContent = breakTime + ":00";}},
     "#break-minus": function () { 
     	breakTime = Math.max(breakTime - increment, 5); breakMin.textContent = breakTime; if(isBreak){seconds = breakTime *60; timerDisplay.textContent = breakTime + ":00";}}};

for (var key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = incrementFunctions[key];
    }
}


startBtn.onclick = function() {
    if (startBtn.innerText === "Start") {
        clearInterval(interval);
        startBtn.innerText = "Stop";
        interval = setInterval(timer, 100);
    } else {
        clearInterval(interval);
        startBtn.innerText = "Start";
    }

}
resetBtn.onclick = function() {
    clearInterval(interval);
    startBtn.innerText = "Start";
    if(isBreak){
    	timerDisplay.textContent = breakTime + ":00";
    	seconds = breakTime * 60;
    } else {
    	timerDisplay.textContent = workTime + ":00";
    	seconds = workTime * 60;
    }
    
}

function timer() {
    seconds--;
    if (seconds < 0) {
        clearInterval(interval);
        alarm.currentTime = 0;
        alarm.play();
        
        if(isBreak){
        	status.textContent = "Work Time";
        	isBreak = false;
        	seconds = workTime * 60;
        } else {
        	status.textContent = "Break Time";
        	isBreak = true;
        	seconds = breakTime * 60;
        }
    } 
    //Sets text content of timer
    var minutes = Math.floor(seconds / 60);
    var remainderSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    
    
}

// Write the timer. Replace the p element inside the div with timer. After timer completion, add to counter for the task. Keep a finished list.
// on close:
// 	load each to do item entry in the array into the txt file
// on open:
// 	load each to do item into the array