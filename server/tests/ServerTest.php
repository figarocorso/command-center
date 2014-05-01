<?php

require '../RestServer.php';

class StackTest extends PHPUnit_Framework_TestCase
{
    public function testCreateServer() {
        $server = new RestServer();

        return $server;
    }

    /**
     * @depends testCreateServer
     */
    public function testSimpleRequest($server) {
        $this->assertEquals('ok', $server->handleRequest());

        return $server;
    }
}
?>
