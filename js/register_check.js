/******注册验证********/
/******验证码******/
	var font="";
	var arr=[];
	var ctx=c1.getContext('2d');
	function getNum(min,max){
		var num=Math.floor(Math.random()*(max-min+1)+min);
		return num;
	}
	function rc(min,max){
		var r=getNum(min,max);
		var g=getNum(min,max);
		var b=getNum(min,max);
		return "rgb("+r+","+g+","+b+")";
	}
	c1.style.background=rc(180,255);
	c1.style.verticalAlign="middle";
	draw();
	function draw(){
		var str="ABCDEFGHIJKLMNOPQRSTUVWXYZ3456789";
		for(var i=0,x=getNum(10,30);i<5;i++,x+=20){
			ctx.font=""+getNum(20,30)+"px SimHei";
			ctx.fillStyle= rc(0,180);
			var txt=str[getNum(0,str.length-1)];
			y=getNum(20,40);
			var deg=getNum(-45,45)
			ctx.translate(x,y);
			ctx.rotate(deg*Math.PI/180);
			ctx.fillText(txt,0,0);
			ctx.rotate(-deg*Math.PI/180);
			ctx.translate(-x,-y);
			ctx.beginPath();
			ctx.moveTo(getNum(0,150),getNum(0,80));
			ctx.lineTo(getNum(0,150),getNum(0,80));
			ctx.strokeStyle=rc(0,180);
			ctx.stroke();
			arr.push(txt);
		}
		for(var i=0;i<100;i++){
			ctx.beginPath();
			ctx.arc(getNum(0,150),getNum(0,80),getNum(0,2),0,2*Math.PI);
			ctx.fillStyle=rc(0,255);
			ctx.fill();
		}
		font=arr.join('');
	}
	a1.onclick=function(e){
		e.preventDefault();
		ctx.clearRect(0,0,150,80);
		c1.style.background=rc(180,255);
		draw();
	}
/**********用户名验证***********/
	$('.uname').blur(function(){
    var n = this.value;
    if(!n){ //输入为空，无需验证
			$('.unameMsg').html('用户名不能为空！').css('color','#e4393c');
      return;
    }else{
			$.get('data/register_check_uname.php',{"uname":n},function(data){
				if(data=="bucunzai"){
					$('.unameMsg').html("用户名验证成功").css('color','#0a0');
				}else if(data=="cunzai"){
					$('.unameMsg').html("该用户名已被占用").css('color','#e4393c');
				}	
			});
		}
 });
/********密码验证***********/
	$('.pwd').blur(function(){
    var n = this.value;
    if(!n){ //输入为空，无需验证
			$('.pwd-sp').html('密码不能为空！').css('color','#e4393c');
      return;
    }
		var reg=/^[a-zA-Z]\w{6,18}$/;
		if(reg.test(n)){
			$('.pwd-sp').html('密码设置成功！').css('color','#0a0');
		}else{
			$('.pwd-sp').html('格式不正确,必须大或小写字母开头,含6-18位字母数字或下划线')
      .css('color','#e4393c');
		}
	});
/**********确认密码验证**************/
$('.repwd').blur(function(){
    var n = this.value;
    if(!n){ 
			$('.repwd-sp').html('请输入密码！').css('color','#e4393c');
      return;
    }
		if(n===$(".pwd").val()){
			$('.repwd-sp').html('密码确认成功！').css('color','#0a0');
		}else{
			$('.repwd-sp').html('两次输入的密码不相同，请重新输入！')
      .css('color','#e4393c');
		}
	});
/********手机号码验证*********/
$('.phone').blur(function(){
    var n = this.value;
    if(!n){ 
			$('.phone-sp').html('需要填写手机号码！').css('color','#e4393c');
      return;
    }
		var reg=/^1[3,5,7,8][0-9]\d{8}$/;
		if(reg.test(n)){
			$('.phone-sp').html('手机设置成功！').css('color','#0a0');
		}else{
			$('.phone-sp').html('手机号码格式不正确')
      .css('color','#e4393c');
		}
	});
/**********邮箱验证*************/
$('.mail').blur(function(){
	var n = this.value;
    if(!n){ 
		$('.mail-sp').html('邮箱不能为空！').css('color','#e4393c');
      return;
    }
	var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if(reg.test(n)){
		$('.mail-sp').html('邮箱设置成功！').css('color','#0a0');
	}else{
		$('.mail-sp').html('邮箱格式不正确').css('color','#e4393c');
	}
	});
/*********验证码验证************/
$('.test').blur(function(){
    var n = this.value;
    if(!n){ 
			$('.test-sp').html('请输入验证码！').css('color','#e4393c');
      return;
    }
	if(n==font){
		$('.test-sp').html('验证成功！').css('color','#0a0');
	}else{
		$('.test-sp').html('验证码错误,重新输入!').css('color','#e4393c');
	}
});
/*********手机验证码******phoneTe-sp******/
$('.phoneTe').blur(function(){
    var n = this.value;
    if(!n){ 
			$('.phoneTe-sp').html('请输入手机验证码！').css('color','#e4393c');
      return;
    }
});
/********提交按钮DISABLED状态**********/
$(':checkbox').click(function(){
	if($(this)[0].checked){
		$('.btn_re').attr('disabled',false);
	}else{
		$('.btn_re').attr('disabled',true);
	}
});
/**********提交按钮*************/
$('.btn_re').click(function(){
	var uname=$('.uname').val();
	var pwd=$('.pwd').val();
	var repwd=$('.repwd').val();
	var phone=$('.phone').val();
	var email=$('.mail').val();
	if(uname==''||pwd==''||repwd==''||phone==''||email==''){
		$(this).attr('type','button');
		$('.unameMsg').html('用户名不能为空！').css('color','#e4393c');
		$('.pwd-sp').html('密码不能为空！').css('color','#e4393c');
		$('.phone-sp').html('需要填写手机号码！').css('color','#e4393c');
		$('.mail-sp').html('邮箱不能为空！').css('color','#e4393c');
		return;
	}else{
		$(this).attr('type','submit');
		$.post("data/add_userMsg.php",{"uname":uname,"upwd":pwd,
			"uphone":phone,"umail":email,});
		$('form').attr('action','index.html');
		window.alert("恭喜您，注册成功！请点击登录");
		localStorage.setItem('uname',uname);
	}
});

	
