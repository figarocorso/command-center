<?php

include 'DbConfiguration.php';

class Mysql extends DbConfiguration {

    public $connectionString;
    public $dataSet;
    private $sqlQuery;

    protected $databaseName;
    protected $hostName;
    protected $userName;
    protected $passCode;

    function __construct() {
        $this->connectionString = NULL;
        $this->sqlQuery = NULL;
        $this->dataSet = NULL;

        $databaseParameters = new DbConfiguration();
        $this->databaseName = $databaseParameters->dbName;
        $this->hostName = $databaseParameters->serverName;
        $this->userName = $databaseParameters->userName;
        $this->passCode = $databaseParameters->passCode;
        $databaseParameters = NULL;
    }

    function dbConnect()    {
        $this->connectionString = mysql_connect($this->serverName, $this->userName, $this->passCode);
        mysql_select_db($this->databaseName, $this->connectionString);

        return $this->connectionString;
    }

    function dbDisconnect() {
        $this->connectionString = NULL;
        $this->sqlQuery = NULL;
        $this->dataSet = NULL;
        $this->databaseName = NULL;
        $this->hostName = NULL;
        $this->userName = NULL;
        $this->passCode = NULL;
    }
}
?>
