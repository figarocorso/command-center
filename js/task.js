$(document).ready(function (){
    $.get( "server/tasks/tasktitle", writeTaskTitle, "json");
});

function writeTaskTitle(data) {
    if (data) {
        showTaskTitle(data);
    } else {
        showInputTaskTitle();
    }
}


/* Task title */
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


/* Task completion */
function completeTask() {
    //TODO: Delete subtasks
    $.post( "server/tasks/tasktitle", {'taskTitle': ""}, writeTaskTitle, "json");
}
