/*广告图片数组*/
var images=[//大图
{"i":0,"img":"images/01/b-1.jpg"},
{"i":1,"img":"images/01/b-2.jpg"},
{"i":2,"img":"images/01/b-3.jpg"},
{"i":3,"img":"images/01/b-4.jpg"},
{"i":4,"img":"images/01/b-5.jpg"},
{"i":5,"img":"images/01/b-6.jpg"},
{"i":6,"img":"images/01/b-7.jpg"}
];

/****轮播对象*****/
var slider={
  LIWIDTH:0,//保存每个li的宽度
  DISTANCE:0,//保存轮播移动的总距离
  DURATION:300,//保存轮播的总时间
  STEPS:100,//保存轮播的总步数
  interval:0,//保存每步轮播的时间间隔
  step:0,//保存每步轮播的步长
  timer:null,//保存当前轮播的序号
  moved:0,//保存本次轮播已经移动的步数
  WAIT:3000,//保存自动轮播之间的时间间隔
  canAuto:true,//保存能否启动自动轮播
  init:function(){
    this.interval=this.DURATION/this.STEPS;
    this.LIWIDTH=parseFloat(getComputedStyle($(".slider")[0]).width);
    this.updateView();//更新页面
    var me=this;
		  $(".indexs").on('mouseover',"li",function(){
				if(!$(this).hasClass("hover")){
					clearTimeout(me.timer);
					me.updateView();
					me.timer=null;
					me.moved=0;
					$(".imgs").css('left',"");
					me.move($(this).html()-$(".indexs>li.hover").html());
				}
      });
    $(".slider").mouseover(function(){me.canAuto=false;});
    $(".slider").mouseout(function(){me.canAuto=true;});
    this.autoMove();//启动自动轮播
  },
  autoMove:function(){//启动自动轮播
    this.timer=setTimeout(//启动一次性定时器
      function(){
        if(this.canAuto){//如果canAuto是true
          this.move(1);//调用move，移动1次
        }else{
          this.autoMove();//重新等待
        }
      }.bind(this),this.WAIT
    );
  },
  move:function(n){//启动一个轮播
    this.DISTANCE=n*this.LIWIDTH;//n*LIWIDTH，保存在DISTANCE属性中
    this.step=this.DISTANCE/this.STEPS;
    if(n<0){//如果是右移
      //删除images结尾的n个元素,拼接到images开头,将结果保存回images
      images=images.splice(images.length+n,-n).concat(images);
      this.updateView();//更新页面
      //设置id为imgs的元素的left为n*LIWIDTH
      $(".imgs").css('left',n*this.LIWIDTH+"px");
    }
//启动一次性定时器，设置任务为moveStep(提前绑定this),间隔为interval
    this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
  },
  moveStep:function(n){//移动一步
    var left=parseFloat(getComputedStyle($(".imgs")[0]).left);
//设置id为imgs的元素的left为left-step
    $(".imgs").css('left',left-this.step+"px");
    this.moved++;//moved+1
    //如果moved<STEPS,就启动一次性定时器
    if(this.moved<this.STEPS){
      this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
    }else{
      this.timer=null;
      this.moved=0;
      if(n>0){//左移
        //删除images开头的n个元素，将删除的结果拼接到images结尾，
				//将结果保存回images
        images=images.concat(images.splice(0,n));
        this.updateView();//更新界面
      }
      //将id为imgs的元素的left清除
      $(".imgs").css('left',"");
      this.autoMove();//启动自动轮播:
    }
  },
  updateView:function(){
    for(var i=0,html1="",html2="";i<images.length;i++){
      html1+='<li><a href="#"><img src="'+images[i].img+'"><a></li>';
      html2+="<li>"+(i+1)+"</li>";
    }
    $(".imgs").html(html1);
    $(".indexs").html(html2);
    //设置id为imgs的元素的宽为:images数组的元素个数*LIWIDTH
    $(".imgs").css('width',images.length*this.LIWIDTH+"px");
    //找到id为indexs下的和images数组中第1个元素的i属性对应的li,设置其class为hover
		//因为前面的都删除拼接了，所以当前元素永远为images[0]
    $(".indexs>li:nth-child("+(images[0].i+1)+")").addClass("hover");
  },
}
window.onload=function(){slider.init();};

/****************用户登录*********************/
$(".u-top1>li:nth-child(3)").click(function(){
	$("div.login").fadeToggle("slow","linear");
});

/****淡入淡出*****/
$("ul.planLeft>li").mouseover(function(){
		$(this).children().children("img").fadeToggle("slow","linear");
});

/****标题******/
	function fSize(){
		var size=parseInt(Math.random()*30+20)+"px";
		return size;
	}
	function bnum(){
		var size=parseFloat(Math.random()*1300)+"px";
		return size;
	}
	function snum(){
		var size=parseFloat(Math.random()*500)+"px";
		return size;
	}
	function getColor(){
			var r=parseInt(Math.random()*256);
			var g=parseInt(Math.random()*256);
			var b=parseInt(Math.random()*256);
			return "rgb("+r+","+g+","+b+")";
	}
	$(".titles h3 i").mouseover(function(){
		$(this).css("font-size",fSize()).css("color",getColor);
	});
	$(".titles b").mouseover(function(){
			$(this).find("img").fadeIn("slow","linear");
	});
	$(".titles b").mouseout(function(){
			$(this).find("img").fadeOut("slow","linear");
	});
	setInterval(function(){$(".movePic>img").each(function(){
		$(this).fadeIn("1000").animate({ 
		left: bnum(),
		top: snum(), 
	}, 5000 );});},1000);

	/****#planBox>h2>a****/
	$("#planBox").mouseover(function(){
		$("#planBox>h2>a").html("关于@计划").css("color",getColor());
	});
	$("#planBox").mouseout(function(){
		$("#planBox>h2>a").html("ABOUT PLAN");
	});
	/*****#foot_box li h3******/
	$('#foot_box li h3').mouseover(function(){
		$(this).css("background","#00ffff").css("color","#fff");
	});
	$('#foot_box li h3').mouseout(function(){
		$(this).css("background","#fff").css("color","#000");
	});

	/******#nav>ul>li>b*******/
	var arr1=['光敏婚纱','婚礼摄影','夏威夷当地','专辑','摄影师','店铺一览'];
	var arr2=['Photo Wedding','Wedding','Location','Album','Photographer','Shop List'];
	$("#nav>ul>li").mouseover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(this).children('a').html(arr1[$(this).index()]).css('color',getColor());
	});
	$("#nav>ul>li").mouseout(function(){
		$(this).children('a').html(arr2[$(this).index()]);
	});
	/********p.fixP**********/
	$("p.fixP").mouseover(function(){
			$(this).children().addClass("active");
	});
	$("p.fixP").mouseout(function(){
			$(this).children().removeClass("active");
	});
	/**************楼层****************/
	$(function(){
    $('#floors').onePageNav();
	});
	$('#floors li').mouseover(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	$('#floors li').mouseout(function(){
		$(this).removeClass("active");
	});
	/********遮罩层现大图***********/
	$('.album').on('click','a',function(){
		$('#bigMask').css('display','block');
		var n=$(this).index()+1;
/**********
		$('.bigMaskPic>img:nth-child('+n+')').addClass('active')
			.siblings().removeClass('active');
		$('.iconS1').click(function(){
			if(n!=4){
				$('.bigMaskPic>img:nth-child('+(n+1)+')').addClass('active')
					.siblings().removeClass('active');
				n++;
			}else{
				$('.bigMaskPic>img:nth-child('+(n-1)+')').addClass('active')
					.siblings().removeClass('active');
				n--;
			}
		});
		$('.iconS2').click(function(){
			if(n!=1){
				$('.bigMaskPic>img:nth-child('+(n-1)+')').addClass('active')
					.siblings().removeClass('active');
				n--;
			}else{
				$('.bigMaskPic>img:nth-child('+(n+1)+')').addClass('active')
					.siblings().removeClass('active');
				n++;
			}
		});
******************/
		$('.bigMaskPic>img:nth-child('+n+')').fadeIn("100","linear")
					.siblings().hide();
		$('.iconS1').click(function(){
			if(n!=4){
				$('.bigMaskPic>img:nth-child('+(n+1)+')').fadeIn("500","linear")
					.siblings().hide();
				n++;
			}else{
				$('.bigMaskPic>img:nth-child('+(n-1)+')').fadeIn("500","linear")
					.siblings().hide();
				n--;
			}
		});
		$('.iconS2').click(function(){
			if(n!=1){
				$('.bigMaskPic>img:nth-child('+(n-1)+')').fadeIn("500","linear")
					.siblings().hide();
				n--;
			}else{
				$('.bigMaskPic>img:nth-child('+(n+1)+')').fadeIn("500","linear")
					.siblings().hide();
				n++;
			}
		});
	});
	$('#bigMask span.iconS3').click(function(){
		$('#bigMask').css('display','none');
	});
	/*************登录验证****************/
$(".bt-load").click(function(){
	var requestData=$(".form-load").serialize();
	$.get('data/xwyhs-check_uname.php?'+requestData,function(data){
		$(".form-load p").html(data.msg);
		if(data.code=='1'){
			$(".login").fadeOut(500);
			var uname=$("input[name='uname']").val();
			localStorage.setItem('uname',uname);
			$("#top .u-top1>li.login-fir").html('退出').css('color','#fff')
				.next().css('display','none');
			$("h3.unam").css('display','inline-block').html("欢迎回来！"+uname);
		}
	});
});
/*****************点击退出************************/
	if($("#top .u-top1>li.login-fir").html('退出')){
		$("#top .u-top1>li.login-fir").click(function(){
			$(this).html('登录').css('color','#fff')
				.next().css('display','block');
			$("h3.unam").css('display','none').html('');
			localStorage.clear();
		});
	}
/*************花瓣洒落*****************/
 $(document).snowfall('clear');
	$(document).snowfall({
			image: "images/huaban.png",
			flakeCount:200,
			minSize: 10,
			maxSize: 25
	});
$(document).ready(function(){
	setTimeout(function(){
		$('div.flowers').fadeOut("slow");
	},30000);
});
	/*********页面大小发生变化时**********/
	$(window).resize(function(){
  $('div.flowers').hide();
});
/**********注册成功跳转**************/
if(localStorage.getItem('uname')){
	$("#top .u-top1>li.login-fir").html('退出').css('color','#fff')
				.next().css('display','none');
	$("h3.unam").css('display','inline-block').html("欢迎回来!"+localStorage.getItem('uname'));
}else{
	$("#top .u-top1>li.login-fir").html('登录').css('color','#fff').next().css('display','block');
	$("h3.unam").css('display','none');
}