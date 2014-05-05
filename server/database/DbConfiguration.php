<?php

/**
 * This database classes need a database with these tables:
 * CREATE TABLE command_values (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, command_key VARCHAR(255), command_value VARCHAR(255));
 */
class DbConfiguration {
    protected $serverName;
    protected $userName;
    protected $passCode;
    protected $dbName;

    function Dbconfig() {
        $this -> serverName = 'localhost';
        $this -> userName = 'root';
        $this -> passCode = 'foobar';
        $this -> dbName = 'commandcenter';
    }
}
?>
