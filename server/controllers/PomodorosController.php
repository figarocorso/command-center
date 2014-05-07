<?php

require_once("database/Mysql.php");

class PomodorosController
{
    public function getIntervals($request) {
        $mysql = new Mysql();

        $intervals = array();
        $intervals["pomodoro"] = $mysql->getValue("pomodoro");
        $intervals["minibreak"] = $mysql->getValue("minibreak");
        $intervals["longbreak"] = $mysql->getValue("longbreak");

        unset($mysql);

        return $intervals;
    }

}
?>
