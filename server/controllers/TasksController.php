<?php

require_once("database/Mysql.php");

class TasksController
{
    const SUBTASKS_GLUE = '[separator]';

    public function getTasktitle($request) {
        $mysql = new Mysql();

        return $mysql->getValue("tasktitle");
    }

    public function postTasktitle($request) {
        $parameters = $request->parameters();

        if (!isset($parameters['tasktitle'])) {
            return False;
        }

        $mysql = new Mysql();
        $mysql->setValue("tasktitle", $parameters['tasktitle']);

        return $mysql->getValue("tasktitle");
    }

    public function getSubtasks($request) {
        $mysql = new Mysql();
        $subtasks = $mysql->getValue("subtasks");

        return $this->parseSubtasks($subtasks);
    }

    public function postSubtasks($request) {
        $parameters = $request->parameters();

        if (!isset($parameters['subtasks'])) {
            return False;
        }

        $subtasksString = $this->convertSubtasksToString($parameters['subtasks']);

        $mysql = new Mysql();
        $mysql->setValue("subtasks", $subtasksString);

        return $mysql->getValue("subtasks");
    }


    /* Private helper functions */

    private function parseSubtasks($subtasksString) {
        if ($subtasksString == "") {
            return "";
        }

        $subtasks = explode(self::SUBTASKS_GLUE, $subtasksString);

        $subtasksArray = array();
        foreach ($subtasks as $subtask) {
            $done = substr($subtask, 0, 3);
            $done = (strpos($done, 'd') === FALSE) ? "undone" : "done";
            $name = ucfirst(substr($subtask, 3));
            $subtasksArray[] = array("done" => $done, "name" => $name);
        }

        return $subtasksArray;
    }

    private function convertSubtasksToString($subtasksArray) {
        if ($subtasksArray == "") {
            return "";
        }

        $subtasks = array();

        foreach ($subtasksArray as $subtask) {
            $done = ($subtask["done"] == "done") ? "[d]" : "[u]";
            $subtasks[] = $done . $subtask["name"];
        }

        return implode(self::SUBTASKS_GLUE, $subtasks);
    }
}
?>
