<?php

require_once("database/Mysql.php");

class PomodorosController
{
    /**
     * Does not expect any parameter and returns the current
     * values for the pomodoro configuration into a named array
     */
    public function getConfiguration($request) {
        $mysql = new Mysql();

        $configuration = array(  "pomodoro",
                            "minibreak",
                            "longbreak",
                            "pomodoro_alert",
                            "minibreak_alert",
                            "longbreak_alert"
                          );

        $intervals = array();
        foreach ($configuration as $configurationKey) {
            $intervals[$configurationKey] = $mysql->getValue($configurationKey);
        }

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
