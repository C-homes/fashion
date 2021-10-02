<?php
    $userid = $_GET['userid'];
    $goodid = $_GET['goodid'];

    $con = mysqli_connect('localhost','root','123456','fashion');

    $sql = "DELETE FROM `car` WHERE `userid` = '$userid' AND `goodid`='$goodid'";


    $res = mysqli_query($con,$sql);


    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }

    print_r(json_encode(array('code'=>$res,'msg'=>'删除成功'),JSON_UNESCAPED_UNICODE));
?>