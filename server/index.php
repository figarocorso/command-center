<?php
    require 'RestServer.php';

    // Registering a class to load server controllers
    spl_autoload_register('apiAutoload');
    function apiAutoload($classname)
    {
        if (preg_match('/[a-zA-Z]+Controller$/', $classname)) {
            include __DIR__ . '/controllers/' . $classname . '.php';
            return true;
    }

    // Handle the request
    $server = new RestServer();
    $server->handleRequest();
?>
