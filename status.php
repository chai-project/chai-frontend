<?php
    $output = shell_exec("pgrep -a 'python'");

    function status($name) {
        global $output;
        echo "$name <span class=";
        if (strpos($output, $name) !== false) {
            echo "'status online'";
        } else {
            echo "'status offline'";
        }
        echo "></span>";
    }

    status("chapp-battery");
    echo "&nbsp;&nbsp";
    status("chapp-api");
    echo "&nbsp;&nbsp";
    status("chapp-plug/service");
    echo "&nbsp;&nbsp";
    status("chapp-plug/api");
?>
