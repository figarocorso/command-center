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
    inputString += "<label>";
    inputString += "<input type='text' class='input-text' name='email' id='taskTitleInput' ";
    inputString += "value='" + inputValue + "'>";
    inputString += "<span class='button' onClick='setTaskTitle()'>Set!</span>";
    inputString += "</label>";

    $('#taskTitle').html(inputString);

    return inputString;
}

function showTaskTitle(data) {
    titleDiv = "";
    titleDiv += "<h1>";
    titleDiv += "<span onClick=\"showInputTaskTitle(\'" + data + "\')\">";
    titleDiv +=    data;
    titleDiv += "</span>";
    titleDiv += "<span id='completeTask' class='taskActionButton'>";
    titleDiv += "<img src='img/delete.png' width='15px' onClick='completeTask()'/>";
    titleDiv += "</span>";
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
