<?php

require_once("database/Mysql.php");

class NotesController extends BaseController
{
    public function getNotes($request) {
        $parameters = $request->parameters();
        if (!$this->checkLogin($parameters)) {
            return False;
        }

        $mysql = new Mysql();

        return $mysql->getValue("notes");
    }

    public function postNotes($request) {
        $parameters = $request->parameters();
        if (!$this->checkLogin($parameters)) {
            return False;
        }

        if (!isset($parameters['notes'])) {
            return False;
        }

        $mysql = new Mysql();
        $mysql->setValue("notes", $parameters['notes']);

        return $mysql->getValue("notes");
    }
}
?>
