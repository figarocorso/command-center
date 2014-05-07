<?php

require_once("database/Mysql.php");

class PomodorosController
{
    /**
     * Does not expect any parameter and returns the current
     * values for the pomodoro timers into a named array
     */
    public function getIntervals($request) {
        $mysql = new Mysql();

        $intervals = array();
        $intervals["pomodoro"] = $mysql->getValue("pomodoro");
        $intervals["minibreak"] = $mysql->getValue("minibreak");
        $intervals["longbreak"] = $mysql->getValue("longbreak");

        unset($mysql);

        return $intervals;
    }

    /**
     * Sets the given timer value
     * Inside the request there should be two parameters:
     *      timer: the name of the timer we want to update
     *      value: the new value for the timer
     * It will return True if the operation has succeded
     */
    public function postInterval($request) {
        $parameters = $request->parameters();
        if (!isset($parameters["timer"]) or !isset($parameters["value"])) {
            return False;
        }

        $success = False;

        $mysql = new Mysql();
        $success = $mysql->setValue($parameters["timer"], $parameters["value"]);
        unset($mysql);

        return $success ? True : False;
    }
}
?>
