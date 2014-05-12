<?php

require_once("database/Mysql.php");

class TasksController
{
    public function getTasktitle($request) {
        $mysql = new Mysql();

        return $mysql->getValue("tasktitle");
    }
}
?>
