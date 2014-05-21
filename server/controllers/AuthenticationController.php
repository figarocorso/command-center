<?php

require_once("database/Mysql.php");

class AuthenticationController extends BaseController
{
    public function getLogin($request) {
        $parameters = $request->parameters();

        $mysql = new Mysql();
        $username = $mysql->getValue("username");
        $password = $mysql->getValue("password");

        if (isset($parameters["username"]) and isset($parameters["password"])) {
            if ($username == $parameters["username"] and $password == $parameters["password"]) {
                $cookie = $this->generateCookie();
                $mysql->setValue("cookie", $cookie);

                return $cookie;
            }
        }

        return False;
    }

    private function generateCookie() {
        return substr("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" ,mt_rand(0 ,50) ,1) .substr(md5( time()), 1);
    }
}
?>
