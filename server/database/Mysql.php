<?php

include 'DbConfiguration.php';

class Mysql extends DbConfiguration {

    private $mysqli;

    public function __construct() {
        parent::__construct();
        $this->mysqli = new mysqli( $this->servername, $this->username, $this->password, $this->database);
    }

    public function dbDisconnect() {
        $this->mysqli = NULL;
    }

    public function getValue($key) {
        $row = $this->mysqli->query("SELECT command_value FROM command_values WHERE command_key='$key'");
        $result = $row->fetch_array();

        return $result["command_value"];
    }
}
?>
