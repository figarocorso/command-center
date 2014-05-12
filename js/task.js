$(document).ready(function (){
    $.get( "server/tasks/tasktitle", writeTaskTitle, "json");
});

function writeTaskTitle(data) {
    console.log(data);
    if (data) {
        taskTitleInput = showTaskTitle(data);
    } else {
        taskTitleInput = showInputTaskTitle();
    }

    $('#taskTitle').append(taskTitleInput);
}


/* Task title */
function showInputTaskTitle(taskTitle) {
    inputValue = taskTitle ? taskTitle : "";
    return "<label><input type='text' class='input-text' name='email' id='email' value='" + inputValue + "'><span class='button'>Start!</span></label>";
}

function showTaskTitle(data) {
    $titleDiv =  "<h1>";
    $titleDiv +=    data;
    $titleDiv += "<span id='editTask' class='taskActionButton'>";
    $titleDiv += "[editar]";
    $titleDiv += "</span>";
    $titleDiv += "</h1>";

    return $titleDiv;
}
