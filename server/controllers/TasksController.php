<?php

require_once("database/Mysql.php");

class TasksController
{
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
}
?>
