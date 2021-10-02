<?php
    $goodid = $_GET['goodid'];
    $num = $_GET['num'];
    $userid = $_GET['userid'];

    $con = mysqli_connect('localhost','root','123456','fashion');

    $sql = "UPDATE `car` SET `num` = '$num' WHERE `userid`= '$userid' AND `goodid` = '$goodid'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接失败'  . mysqli_error($con));
    }

    print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));

?>