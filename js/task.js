$(document).ready(function (){
    $.get( "server/tasks/tasktitle", writeTaskTitle, "json");
    getAndPlaceSubtasks();
});

/* Task title */
function writeTaskTitle(data) {
    if (data) showTaskTitle(data); else showInputTaskTitle();
}

function showInputTaskTitle(taskTitle) {
    slideNewTaskInput();

    inputValue = taskTitle ? taskTitle : "";

    inputString = "";
    inputString += "<form name='taskTitleForm' action='javascript:setTaskTitle()'>";
    inputString += "<label>";
    inputString += "<input type='text' class='input-text' name='tasktitle' id='taskTitleInput' ";
    inputString += "value='" + inputValue + "'>";
    inputString += "<button type='button' class='task-action' onClick='setTaskTitle()'>";
    inputString += "<i class='icon-save'></i>";
    inputString += "</button>";
    inputString += "</label>";
    inputString += "</form>";

    $('#taskTitle').html(inputString);

    return inputString;
}

function showTaskTitle(data) {
    titleDiv = "";
    titleDiv += "<h1>";
    titleDiv += "<span onClick=\"showInputTaskTitle(\'" + data + "\')\">";
    titleDiv +=    data;
    titleDiv += "</span>";
    titleDiv += "<button type='button' class='task-action'>";
    titleDiv += "<i class='icon-remove' onClick='completeTask()'></i>";
    titleDiv += "</button>";
    titleDiv += "</h1>";

    $('#taskTitle').html(titleDiv);

    return titleDiv;
}

function setTaskTitle() {
    slideNewTaskInput();
    taskTitle = $('#taskTitleInput').val();
    $.post( "server/tasks/tasktitle", {'taskTitle': taskTitle}, writeTaskTitle, "json");
}

/* Subtasks management */
function getAndPlaceSubtasks() {
    $.get( "server/tasks/subtasks", writeSubTasks, "json");
}

function writeSubTasks(data) {
    subtasksHtml = "";
    subtasksHtml += "<ul>";
    for (subtask in data) {
        subtasksHtml += subtaskLiCode(parseInt(subtask)+1, data[subtask]["done"], data[subtask]["name"]);
    }
    subtasksHtml += "</ul>";

    $('#subTasks').html(subtasksHtml);
}

function subtaskLiCode(number, done, name) {
    subtaskClass = (done == "done") ? 'line-through' : '';
    subtasksLi = "";

    subtasksLi += "<li>";
    subtasksLi += subtaskDoneIcon(number, done);
    subtasksLi += "<span class='" + subtaskClass + "'>";
    subtasksLi += name;
    subtasksLi += "</span>";
    subtasksLi += deleteSubtaskIcon(number);
    subtasksLi += "</li>";

    return subtasksLi;
}

function subtaskDoneIcon(taskNumber, done) {
    buttonClass = (done == "done") ? "task-state" : "task-action";
    buttonIcon = (done == "done") ? "icon-done" : "icon-undone";

    button = "";
    button += "<button type='button' class='" + buttonClass + "' id='doneButton'>";
    button += "<i class='" + buttonIcon + "' onClick='completeSubtask(" + taskNumber + ")'></i>";
    button += "</button>";

    return button;
}

function deleteSubtaskIcon(taskNumber) {
    button = "";

    button += "<button type='button' class='task-action'>";
    button += "<i class='icon-remove' onClick='deleteSubtask(" + taskNumber + ")'></i>";
    button += "</button>";

    return button;
}

/* Task completion */
function completeTask() {
    $('#subTasks li').each(function() {
        $(this).remove();
    });

    sendUpdatedSubtasks();
    $.post( "server/tasks/tasktitle", {'taskTitle': ""}, writeTaskTitle, "json");
}

function sendUpdatedSubtasks() {
    subtasks = getSubtasksFromDOM();
    $.post( "server/tasks/subtasks", {'subtasks': subtasks}, getAndPlaceSubtasks, "json");
}

function getSubtasksFromDOM() {
    subtasks = new Array();

    $('#subTasks li').each(function(index) {
        done = ($(this).find('i').attr('class') == "icon-done") ? "done" : "undone";
        name = $(this).find('span').text();
        subtasks.push({"name": name, "done": done});
    });

    return (subtasks.length == 0) ? "" : subtasks;
}

function completeSubtask(taskNumber) {
    $('#subTasks li:nth-child(' + taskNumber + ') > #doneButton').toggleClass("task-state task-action");
    $('#subTasks li:nth-child(' + taskNumber + ') > #doneButton i').toggleClass("icon-done icon-undone");

    sendUpdatedSubtasks();
}

function deleteSubtask(taskNumber) {
    $('#subTasks li:nth-child(' + taskNumber + ')').remove();

    sendUpdatedSubtasks();
}

/* Adding subtask */
function addSubtask() {
    number = $('#subTasks ul li').length + 1;
    done = "undone";
    name = $('#newSubtask').val();

    newSubtask = subtaskLiCode(number, done, name);
    $('#subTasks ul').append(newSubtask);

    cleanNewSubtaskInput();
    sendUpdatedSubtasks();
}

function cleanNewSubtaskInput() {
    $('#newSubtask').val("");
}

function slideNewTaskInput() {
    $('.newSubtask').slideToggle();
}
