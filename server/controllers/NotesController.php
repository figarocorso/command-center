<?php

require_once("database/Mysql.php");

class NotesController
{
    public function getNotes($request) {
        $mysql = new Mysql();

        return $mysql->getValue("notes");
    }

    public function postNotes($request) {
        $parameters = $request->parameters();

        if (!isset($parameters['notes'])) {
            return False;
        }

        $mysql = new Mysql();
        $mysql->setValue("notes", $parameters['notes']);

        return $mysql->getValue("notes");
    }
}
?>
