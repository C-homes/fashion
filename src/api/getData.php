<?php
  $con = mysqli_connect('localhost','root','123456','fashion');
  $start = $_GET['start'];
  $len = $_GET['len'];
  $type = $_GET['type'];
  $s = ($start-1)*$len;
  $sql = "SELECT * FROM $type LIMIT $s,$len";
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