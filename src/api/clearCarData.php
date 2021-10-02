<?php
    $userid = $_GET['userid'];

    $con = mysqli_connect('localhost','root','123456','fashion');

    $sql = "DELETE FROM `car` WHERE  `userid` = '$userid'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        echo json_encode(array("code"=>false,"msg"=>"删除数据失败"));
    }else{
        echo json_encode(array("code"=>$res,"msg"=>"删除数据成功"));
    }
?>