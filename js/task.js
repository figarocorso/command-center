$(document).ready(function (){
    $.get( "server/tasks/tasktitle", writeTaskTitle, "json");
    $.get( "server/tasks/subtasks", writeSubTasks, "json");
});

/* Task title */
function writeTaskTitle(data) {
    if (data) showTaskTitle(data); else showInputTaskTitle();
}

function showInputTaskTitle(taskTitle) {
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
    taskTitle = $('#taskTitleInput').val();
    $.post( "server/tasks/tasktitle", {'taskTitle': taskTitle}, writeTaskTitle, "json");
}

/* Subtasks management */
function writeSubTasks(data) {
    subtasksHtml = "";
    subtasksHtml += "<ul>";
    for (subtask in data) {
        subtasksHtml += "<li>";
        subtasksHtml += subtaskDoneIcon(subtask, data[subtask]["done"]);
        subtasksHtml += "<span>";
        subtasksHtml += data[subtask]["name"];
        subtasksHtml += "</span>";
        subtasksHtml += deleteSubtaskIcon(subtask);
        subtasksHtml += "</li>";
    }
    subtasksHtml += "</ul>";

    $('#subTasks').html(subtasksHtml);
}

function subtaskDoneIcon(taskNumber, done) {
    button = "";

    button += "<button type='button' class='task-action'>";
    button += "<i class='icon-" + done + "' onClick='completeSubtask(" + taskNumber + ")'></i>";
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
    //TODO: Delete subtasks
    $.post( "server/tasks/tasktitle", {'taskTitle': ""}, writeTaskTitle, "json");
}
