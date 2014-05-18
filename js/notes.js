var lastNotes;

$(document).ready(function (){
    getNotes();
    window.setInterval(saveNotes, 30000);
});

function getNotes() {
    $.get( "server/notes/notes", writeNotes, "json");
}

function writeNotes(notes) {
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
    if (notesUpdated) {
        $.post( "server/notes/notes", {'notes': $('#notesInput').val()}, saveNotesResult, "json");
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
