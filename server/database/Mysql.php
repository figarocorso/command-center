<?php

include 'DbConfiguration.php';

class Mysql extends DbConfiguration {

    private $mysqli;

    public function __construct() {
        parent::__construct();
        $this->mysqli = new mysqli( $this->servername, $this->username, $this->password, $this->database);
    }

    public function __destruct() {
        $this->username = NULL;
        $this->password = NULL;

        $this->mysqli->close();
    }

    public function getValue($key) {
        $row = $this->mysqli->query("SELECT command_value FROM command_values WHERE command_key='$key'");
        $result = $row->num_rows ? $row->fetch_array() : $this->insertInitialValue($key);

        return $result["command_value"];
    }

    public function setValue($key, $value) {
        $table = $this->table;
        $success = $this->mysqli->query("UPDATE $table SET command_value='$value' WHERE command_key='$key'");

        return $success;
    }

    /* Private helper methods */

    private function insertInitialValue($key) {
        $initials = parse_ini_file('initials.ini');

        $value = False;
        if (array_key_exists($key, $initials)) {
            $table = $this->table;
            $value = $initials[$key];
            $this->mysqli->query("INSERT INTO $table (command_key, command_value) VALUES ('$key', '$value')");
        }

        return array("command_value" => $value);
    }
}
?>
