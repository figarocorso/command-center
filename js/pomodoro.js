var secondUpdater = window.setInterval(function() {
    decreaseSeconds();
    updateMinutes();
}, 1000);

/* Helper functions */

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
