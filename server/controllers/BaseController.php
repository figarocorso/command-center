<?php

require_once("database/Mysql.php");

class BaseController
{
    protected function checkLogin($parameters) {
        $mysql = new Mysql();

        if (!isset($parameters["cookie"])) {
            return False;
        }

        if ($parameters["cookie"] == $mysql->getValue("cookie")) {
            return True;
        }

        return False;
    }
}
?>
