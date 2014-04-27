var secondUpdater;

$(document).ready(function (){
    updatePomodoroDisplay('pomodoro', $('#pomodoroRange').attr('value'));
    updatePomodoroDisplay('minibreak', $('#minibreakRange').attr('value'));
    updatePomodoroDisplay('longbreak', $('#longbreakRange').attr('value'));
});

function startPomodoro() {
    setAndStart($('#pomodoro-value').text() - 1);
}

function endPomodoro() {
    window.clearInterval(secondUpdater);
}

function startMiniBreak() {
    setAndStart($('#minibreak-value').text() - 1);
}

function startLongBreak() {
    setAndStart($('#longbreak-value').text() - 1);
}

/* Helper functions */

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
}

function decreaseSeconds() {
    $('#seconds').text($('#seconds').text() - 1);
    if ($('#seconds').text() < 10) { $('#seconds').text("0" + $('#seconds').text()); }
    if (lastMinute()  && minuteChange()) { pomodoroEnd(); }
}

function updateMinutes() {
    if (minuteChange()) {
        $('#minutes').text($('#minutes').text() - 1);
        if ($('#minutes').text() < 10) { $('#minutes').text("0" + $('#minutes').text()); }
        $('#seconds').text(59);
    }
}

function pomodoroEnd() {
    console.log("Current pomodoro has ended.");
}


/* Bool functions */

function minuteChange() {
    return $('#seconds').text() == 0;
}

function lastMinute() {
    return $('#minutes').text() == 0;
}
