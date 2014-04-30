<?php
/**
 * Handles HTTP request invoking the proper PHP function (we must load
 * those functional classes before sending HTTP request)
 */
class RestServer {
    public function handleRequest() {
        echo("I am a big cow");
    }
}
?>
