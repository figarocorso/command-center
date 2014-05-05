<?php
/**
 * This database classes need a database with these tables:
 * CREATE TABLE command_values (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, command_key VARCHAR(255), command_value VARCHAR(255));
 */
class DbConfiguration {
    function __construct() {
        $this->servername = 'localhost';
        $this->username = 'root';
        $this->password = 'foobar';
        $this->database = 'commandcenter';

        $this->table = 'command_values';
    }
}
?>
