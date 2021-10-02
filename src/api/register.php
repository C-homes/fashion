<?php
header("Content-type:text/html;charset=utf-8");  
$con = mysqli_connect('localhost','root','123456','fashion');

  $userid = $_POST['phone'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  print_r($userid);
  print_r($username);
  print_r($password);
  $sql = "SELECT * FROM `userlist` WHERE `userid`='$userid' AND `password`='$password'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }

  $row = mysqli_fetch_assoc($res);

  if(!$row)
  {
    $addSql = "INSERT INTO `userlist` VALUES ('$userid', '$username', '$password')";

    $addRes = mysqli_query($con,$addSql);
    if(!$addRes)
    {
        die('数据库链接错误' . mysqli_error($con));
    }
    print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
  }
  else
  {
    print_r(json_encode(array('code'=>$addRes,"msg"=>"添加失败"),JSON_UNESCAPED_UNICODE));
  }
?>