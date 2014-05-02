<?php
/**
 * Parses a HTTP request
 */

class Request {
    public function __construct() {
        $this->action = $this->parseAction();
        list($this->module, $this->method) = $this->parsePath();
        $this->parameters = $this->parseParameters();
    }

    /* Getters */
    public function action() {
        return $this->action;
    }

    public function method() {
        return $this->method;
    }

    public function module() {
        return $this->module;
    }

    public function parameters() {
        return $this->parameters;
    }

    /* Parsing functions */
    private function parseAction() {
        return isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : False;
    }

    private function parsePath() {
        if (! isset($_SERVER['REQUEST_URI'])) {
            return array(False, False);
        }

        $slicedUri = explode('/', $_SERVER['REQUEST_URI']);
        //FIXME: Hardcoded!
        return array($slicedUri[3], $slicedUri[4]);
    }

    private function parseParameters() {
        $getParameters = $this->parseGetParameters();

        $body = file_get_contents("php://input");
        $contentType = $this->getContentType();

        if ($contentType == "application/json") {
                $decodedParameters = json_decode($body);
                $this->format = "json";
        } else if ($contentType == "application/x-www-form-urlencoded") {
                parse_str($body, $decodedParameters);
                $this->format = "html";
        }

        $postParameters = $this->processDecodedParameters($decodedParameters);

        return array_merge($getParameters, $postParameters);;
    }

    /* Helper functions */
    private function parseGetParameters() {
        $parameters = array();

        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $parameters);
        }

        return $parameters;
    }

    private function getContentType() {
        $contentType = false;

        if(isset($_SERVER['CONTENT_TYPE'])) {
            $contentType = $_SERVER['CONTENT_TYPE'];
        }

        return $contentType;
    }

    private function processDecodedParameters($decoded) {
        $processed = array();

        if($decoded) {
            foreach($decoded as $parameterName => $parameterValue) {
                $processed[$parameterName] = $parameterValue;
            }
        }

        return $processed;
    }
}
?>

