var secondUpdater;

$(document).ready(function (){
    $.get( "server/pomodoros/intervals", loadInitialData);
});

function loadInitialData(data) {
    updatePomodoroDisplay('pomodoro', data["pomodoro"]);
    updatePomodoroDisplay('minibreak', data["minibreak"]);
    updatePomodoroDisplay('longbreak', data["longbreak"]);
    $('#minutes').text(data["pomodoro"] - 1);
}

function startCountdown($timer) {
    setAndStart($('#' + $timer + '-value').text() - 1);
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
    $('.interval-settings').show(500);
    $('#configurePomodoro').hide(500);
}

function hideConfiguration() {
    $('.interval-settings').hide(500);
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

function updatePomodoroDisplay(display, minutes) {
    $('#' + display + '-value').text(minutes);
    $('#' + display + 'Range').attr('value', minutes);
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
    endPomodoro();
    $('#youtubeVideo').show(400);
    $('#youtubeFrame').attr('src', 'http://www.youtube.com/embed/_uYHNWc-UCg?rel=0&autoplay=1');
}


/* Bool functions */

function minuteChange() {
    return $('#seconds').text() == 0;
}

function lastMinute() {
    return $('#minutes').text() == 0;
}
