var cookieName = 'command_center';

function setCookie(value) {
    checkRequestResponse(value);
    document.cookie = cookieName + "=" +  value;
    repeatInitialRequests();
}

function getCookie() {
    cookie = document.cookie;
    cookie = cookie.split('=');

    return cookie[1];
}

function login() {
    username = $('#usernameInput').val();
    password = $('#passwordInput').val();
    serverCall($.get, "authentication", "login", {'username': username, 'password': password}, setCookie);
}

function serverCall(requestMethod, module, controllerMethod, parameters, callback) {
    parameters['cookie'] = getCookie();
    requestMethod("server/"+module+"/"+controllerMethod, parameters, callback, "json");
}

function checkRequestResponse(data) {
    if (data === false) {
        $('.module').hide();
        $('.login').show();
    } else {
        $('.module').show();
        $('.login').hide();
    }
}

function doNothing() {
}

function repeatInitialRequests() {
    getNotes();
    serverCall($.get, "pomodoros", "configuration", {}, loadInitialData);
    serverCall($.get, "tasks", "tasktitle", {}, writeTaskTitle);
    getAndPlaceSubtasks();
}
