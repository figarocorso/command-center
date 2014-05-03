<?php
class HtmlView {
    public function render($content) {
        header('Content-Type: text/html; charset=utf8');
        echo $content;

        return true;
    }
}
?>
