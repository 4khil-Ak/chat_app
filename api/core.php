<?php
    function JSON($arr = array()){
        return @json_encode($arr,128);
    }

    function apiError($msg) {
        echo JSON(array(
            'error' => true,
            'response' => $msg
        ));
    }

    function camelcase($str,$delimeter = "_"){
        return str_replace($delimeter,"",ucwords($str,$delimeter));
    }

?>