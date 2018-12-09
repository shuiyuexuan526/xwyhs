<?php
/**验证客户端提交的用户名是否已经存在**/
header('Content-Type: text/plain');

//接收客户端提交的数据
$uname = $_REQUEST['uname'];
//连接数据库
$conn = mysqli_connect('127.0.0.1','root','','xwyhs',3306);

//提交SQL
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT user_id FROM xwyhs_users WHERE user_name='$uname'";
$result = mysqli_query($conn, $sql);

//处理结果集    
if($result===FALSE){    //SQL语法错误
  echo 'sql err:'.$sql;
}else {
  $row = mysqli_fetch_assoc($result);
  if($row===NULL){		//未读取到记录
	echo 'bucunzai';
  }else{				//读取到同名记录
	echo 'cunzai';
  }
}
