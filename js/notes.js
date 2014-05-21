var lastNotes;

$(document).ready(function (){
    getNotes();
    window.setInterval(saveNotes, 15000);
});

function getNotes() {
    serverCall($.get, "notes", "notes", {}, writeNotes);
}

function writeNotes(notes) {
    checkRequestResponse(notes);
    lastNotes = notes;
    $('#notesInput').val(notes);
}

function showNotesStatus() {
    $('#notesStatus').slideToggle().delay(2000).slideToggle();
}

function notesUpdated() {
    currentNotes = $('#notesInput').val();
    result = lastNotes != currentNotes;
    lastNotes = currentNotes;

    return result;
}

function saveNotesResult(data) {
    if (data) {
        $('#notesStatus').html("Notes saved successfully");
        showNotesStatus();
    }
}

function saveNotes() {
    if (notesUpdated()) {
        serverCall($.post, "notes", "notes", {'notes': $('#notesInput').val()}, saveNotesResult);
    }
}

function selectAll() {
    $('#notesInput').select();
}

function cleanNotes() {
    backup = $('#notesInput').val();
    $('#notesInput').val("");
    saveNotes();
}
