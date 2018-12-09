<?php
header('Content-Type:text/html');
//接收提交信息
$uname=$_REQUEST['uname'];
$upwd=$_REQUEST['upwd'];
$umail=$_REQUEST['umail'];
$uphone=$_REQUEST['uphone'];
$conn=mysqli_connect('127.0.0.1','root','','xwyhs',3306);
mysqli_query($conn,'SET NAMES UTF8');
$sql = "SELECT user_id FROM xwyhs_users WHERE user_name='$uname'";
$result = mysqli_query($conn, $sql);   
if($result===FALSE){    //SQL语法错误
  echo 'sql err:'.$sql;
}else {
  $row = mysqli_fetch_assoc($result);
  if($row===NULL){		//未读取到记录
	  $sql="INSERT INTO xwyhs_users VALUES(NULL,'$uname','$upwd','$umail','$uphone')";
		$result=mysqli_query($conn,$sql);
		if($result===FALSE){ //SQL语法错误
			echo '执行失败！请检查SQL：'.$sql;
		}else {  //执行成功
			echo '恭喜你,注册成功!';
		}
  }else{				
	return;
  }
}
