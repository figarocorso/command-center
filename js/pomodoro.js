var secondUpdater;
var currentTimer;

$(document).ready(function (){
    currentTimer = "";
    serverCall($.get, "pomodoros", "configuration", {}, loadInitialData);
});

function loadInitialData(data) {
    checkRequestResponse(data);
    updatePomodoroDisplay('pomodoro', data["pomodoro"], data["pomodoro_alert"]);
    updatePomodoroDisplay('minibreak', data["minibreak"], data["minibreak_alert"]);
    updatePomodoroDisplay('longbreak', data["longbreak"], data["longbreak_alert"]);
    $('#minutes').text(data["pomodoro"] - 1);
}

function startCountdown(timer) {
    currentTimer = timer;

    setAndStart($('#' + timer + '-value').text() - 1);
    showEndAndHideStarts();
}

function endPomodoro() {
    window.clearInterval(secondUpdater);
    $('#end').hide(50,
        function () {$('#start').show(50,
        function () {$('#minibreak').show(50,
        function () {$('#longbreak').show(50); $('#longbreak').css('display', 'block');})})});
    $('#minutes').text(document.getElementById('pomodoroRange').value - 1);
}

function showConfiguration() {
    $('.interval-settings').slideToggle();
    $('#configurePomodoro').hide(500);
}

function hideConfiguration() {
    $('.interval-settings').slideToggle();
    $('#configurePomodoro').show(500);
}

/* Helper functions */
function showEndAndHideStarts() {
    $('#youtubeVideo').hide(400);
    $('#youtubeFrame').attr('src', '');
    $('#longbreak').hide(100,
        function (){ $('#minibreak').hide(50,
        function (){ $('#start').hide(50,
        function (){ $('#end').show(50); $('#end').css('display', 'block');})})});
}

function setAndStart(minutes) {
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    window.clearInterval(secondUpdater);
    secondUpdater = window.setInterval(countDown, 1000);
    $('#minutes').text(minutes);
    $('#seconds').text('59');
}

function countDown() {
    decreaseSeconds();
    updateMinutes();
}

function updateTimerValue(timer, value) {
    serverCall($.post, "pomodoros", "interval", {'timer': timer, 'value': value}, doNothing);
    updatePomodoroDisplay(timer, value);
}

function updateVideoAlert(timer) {
    videoId = $('#' + timer + 'EndAlert').val();
    serverCall($.post, "pomodoros", "interval", {'timer': timer + '_alert', 'value': videoId}, doNothing);
}

function updatePomodoroDisplay(display, minutes, alertVideo) {
    $('#' + display + '-value').text(minutes);
    $('#' + display + 'Range').attr('value', minutes);
    $('#' + display + 'EndAlert').val(alertVideo);
}

function decreaseSeconds() {
    $('#seconds').text($('#seconds').text() - 1);
    if ($('#seconds').text() < 10) { $('#seconds').text("0" + $('#seconds').text()); }
    if (lastMinute()  && minuteChange()) { pomodoroHasEnded(); }
}

function updateMinutes() {
    if (minuteChange()) {
        $('#minutes').text($('#minutes').text() - 1);
        if ($('#minutes').text() < 10) { $('#minutes').text("0" + $('#minutes').text()); }
        $('#seconds').text(59);
    }
}

function pomodoroHasEnded() {
    videoId = $('#' + currentTimer + 'EndAlert').val();
    currentTimer = "";

    endPomodoro();

    $('#youtubeVideo').show(400);
    $('#youtubeFrame').attr('src', 'http://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1');
}


/* Bool functions */

function minuteChange() {
    return $('#seconds').text() == 0;
}

function lastMinute() {
    return $('#minutes').text() == 0;
}
