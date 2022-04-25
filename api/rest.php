<?php

require_once(__DIR__ . "/config.php");

$allowed_methods = array(
    'signup','login','get_user','send_message','get_message',
);

class User{
    public static function Signup(){
        $db = new Connect();
        $data = json_decode(file_get_contents('php://input'));
        $first_name = $data->first_name;
        $last_name = $data->last_name;
        $email = $data->email;
        $password = $data->password;
        
        $checkdata = $db->prepare("SELECT * FROM user WHERE email='$email'");
        $checkdata->execute();
        $out = $checkdata->fetch(PDO::FETCH_ASSOC);

        if(isset($out['email'])){
            if ($out['email'] === $email) {
                echo JSON(array(
                    'status' => '422',
                    'error' => 'error',
                    'message' => 'User already exist'
                ));
            }
            else {
                $postdata = $db->prepare("insert into user(first_name,last_name,email,password) values('$first_name','$last_name','$email','$password')");
                if($postdata->execute() == 1){
                    echo JSON(array(
                        'status' => '200',
                        'message' => 'Registered Successfully'
                    ));
                }
            }
        } else {
            $postdata = $db->prepare("insert into user(first_name,last_name,email,password) values('$first_name','$last_name','$email','$password')");
            if($postdata->execute() == 1){
                echo JSON(array(
                    'status' => '200',
                    'message' => 'Registered Successfully'
                ));
            }
        }
    }
    public static function Login(){
        $db = new Connect();
        $data = json_decode(file_get_contents('php://input'));
        $email = $data->email;
        $password = $data->password;
        
        $checkdata = $db->prepare("SELECT * FROM user WHERE email='$email'");
        $checkdata->execute();
        $out = $checkdata->fetch(PDO::FETCH_ASSOC);
        if(isset($out['email'])){
            if ($out['email'] === $email && $out['password'] === $password) {
                $body = JSON(array(
                    'fname' => $out['first_name'],
                    'lname' => $out['last_name'],
                    'email' => $out['email'],
                    // 'password' => $out['password'],
                    'id' => $out['id']
                ));
                echo JSON(array(
                    'status' => '200',
                    'data' => json_decode($body)
                ));
            } else {
                echo JSON(array(
                    'status' => '422',
                    'error' => 'error',
                    'message' => 'Invallid Password'
                ));
            }
        } else {
            echo JSON(array(
                'status' => '404',
                'error' => 'error',
                'message' => 'User not found'
            ));
        }
    }
    public static function GetUser(){
        $db = new Connect();

        $list = array();
        $checkdata = $db->prepare("SELECT * FROM user ORDER BY id");
        $checkdata->execute();
        while($out = $checkdata->fetch(PDO::FETCH_ASSOC)){
            $list[$out['id']] = array(
                'id' => $out['id'],
                'fname' => $out['first_name'],
                'lname' => $out['last_name'],
                'email' => $out['email'],
            );
        }
        echo JSON(array(
            'list' => $list
        ));
    }
    public static function SendMessage(){
        $db = new Connect();
        $data = json_decode(file_get_contents('php://input'));
        $sender_id = $data->sender_id;
        $receiver_id = $data->receiver_id;
        $text = $data->text;
        $time = $data->time;

        $postdata = $db->prepare("insert into message(sender_id,receiver_id,text,time) values('$sender_id','$receiver_id','$text','$time')");
        if($postdata->execute() == 1){
            $list = array();
            $checkdata = $db->prepare("SELECT * FROM message WHERE sender_id='$sender_id' AND receiver_id='$receiver_id' UNION SELECT * FROM message WHERE sender_id='$receiver_id' AND receiver_id='$sender_id' ORDER BY id");
            $checkdata->execute();
            while($out = $checkdata->fetch(PDO::FETCH_ASSOC)){
                $list[$out['id']] = array(
                    'id' => $out['id'],
                    'sender_id' => $out['sender_id'],
                    'receiver_id' => $out['receiver_id'],
                    'text' => $out['text'],
                    'time' => $out['time'],
                );
            } 
            echo JSON(array(
                'list' => $list
            ));
        }
    }
    public static function GetMessage(){
        $db = new Connect();
        $data = json_decode(file_get_contents('php://input'));
        $sender_id = $data->sender_id;
        $receiver_id = $data->receiver_id;

        $list = array();
        $checkdata = $db->prepare("SELECT * FROM message WHERE sender_id='$sender_id' AND receiver_id='$receiver_id' UNION SELECT * FROM message WHERE sender_id='$receiver_id' AND receiver_id='$sender_id' ORDER BY id");
        $checkdata->execute();
        while($out = $checkdata->fetch(PDO::FETCH_ASSOC)){
            $list[$out['id']] = array(
                'id' => $out['id'],
                'sender_id' => $out['sender_id'],
                'receiver_id' => $out['receiver_id'],
                'text' => $out['text'],
                'time' => $out['time'],
            );
        } 
        echo JSON(array(
            'list' => $list
        ));
    }
}
?>
