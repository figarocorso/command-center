<?php
/**
 * Handles HTTP request invoking the proper PHP function (we must load
 * those functional classes before sending HTTP request)
 */

require_once 'Request.php';

class RestServer {
    public function handleRequest() {
        $request = new Request();
        $this->exitIfBadRequest($request);
        $result = $this->invokeControllerMethod($request);
        $this->returnResults($request, $result);

        return $result;
    }

    private function exitIfBadRequest($request) {
        if (! $request->success()) {
            //FIXME: Return error data
            return False;
            exit;
        }
    }

    private function invokeControllerMethod($request) {
        $controllerName = $request->module() . 'Controller';
        if (class_exists($controllerName)) {
            $controller = new $controllerName();
            $actionName = $request->action() . $request->method();

            if (method_exists($controller, $actionName)) {
                return $controller->$actionName($request);
            }
        }

        return False;
    }

    private function returnResults($request, $results) {
        $viewName = ucfirst($request->format()) . 'View';
        if(class_exists($viewName)) {
            $view = new $viewName();
            $view->render($results);
        }
    }
}
?>
