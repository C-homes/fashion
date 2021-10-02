<?php
    $goodid = $_POST['id'];
    $userid = $_POST['userid'];
    $type = $_POST['type'];
    $con = mysqli_connect('localhost','root','123456','fashion');
    print_r( $goodid);

    $sql = "SELECT *  FROM  `car`  WHERE `userid` = '$userid' AND `goodid` = '$goodid'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);

    if(!$row){
        
        $addSql = "INSERT INTO `car` VALUES (null, '$type', '$goodid', '1','$userid')";

        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }else{

        $goodnum = ++$row['goodnum'];
        $updat = "UPDATE `car` SET `goodnum` = '$goodnum' WHERE `userid` = '$userid' AND `goodid` = '$goodid'";

        $updataRes = mysqli_query($con,$updat);

         if(!$updataRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$updataRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }
?>