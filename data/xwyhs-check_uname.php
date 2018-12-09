<?php
header('Content-Type:application/json');
$uname=$_REQUEST['uname'];
$upwd=$_REQUEST['upwd'];
$conn=mysqli_connect('127.0.0.1','root','','xwyhs',3306);
mysqli_query($conn,"SET NAMES UTF8");
$sql="SELECT user_id FROM xwyhs_users WHERE user_name='$uname' AND user_pwd='$upwd'";
$result=mysqli_query($conn,$sql);
$output=['code'=>0,'msg'=>''];
if($result===FALSE){
	$output['code']=-1;
	$output['msg']='执行失败！请检查SQL:'.$sql;
}else{
	$row=mysqli_fetch_assoc($result);
	if($row===NULL){
		$output['code']=-2;
		$output['msg']='用户名或密码输入错误';
	}else{
		$output['code']=1;
		$output['msg']='用户名和密码都正确';
	}
}
echo json_encode($output);