<?php
$con = mysqli_connect('localhost','root','123456','fashion');

  $id = $_GET['id'];
  $type = $_GET['type'];
  $sql = "SELECT * FROM $type WHERE `goodid`='$id'";
  $res = mysqli_query($con,$sql);
  if(!$res){
    die('数据查询错误' . mysqli_error($con));
  }
  $arr = array();
  $row = mysqli_fetch_assoc($res);
  while($row){
      array_push($arr,$row);
      $row = mysqli_fetch_assoc($res);
  }
  print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>
