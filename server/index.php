<?php
    require 'RestServer.php';

    // Registering a class to load server controllers
    spl_autoload_register('apiAutoload');

    // Handle the request
    $server = new RestServer();

    // Invoke the server method
    $result = $server->handleRequest();

    function apiAutoload($classname)
    {
        if (preg_match('/[a-zA-Z]+Controller$/', $classname)) {
            include __DIR__ . '/controllers/' . $classname . '.php';
            return true;
        } else if (preg_match('/[a-zA-Z]+View$/', $classname)) {
            include __DIR__ . '/views/' . $classname . '.php';
            return true;
        }
    }
?>
