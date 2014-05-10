$(document).ready(function (){
    $.get( "server/tasks/tasktitle", writeTaskTitle, "json");
});

function writeTaskTitle(data) {
    console.log(data);
    if (!data) {
        showInputTaskTitle();
    } else {
        showTaskTitle();
    }
}


/* Task title */
function showInputTaskTitle() {
    taskTitleInput = "<label><input type='text' class='input-text' name='email' id='email'><span class='button'>Start!</span></label>";
    $('#taskTitle').append(taskTitleInput);
}
