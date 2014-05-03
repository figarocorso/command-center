<?php
class PomodorosController
{
    public function __construct() {
        $this->pomodoro = "10";
        $this->minibreak = "5";
        $this->longbreak = "15";
    }

    public function getIntervals($request) {
        $intervals = array();
        $intervals["pomodoro"] = $this->pomodoro;
        $intervals["minibreak"] = $this->minibreak;
        $intervals["longbreak"] = $this->longbreak;

        return $intervals;
    }
}
?>
