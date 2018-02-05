<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 引入css -->
<link rel="stylesheet" type="text/css" href="yinrucss.css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script> -->  
<!-- www.js是复制了他的代码来建的一个www.js文件 -->
<script src="www.js"></script>  
<script> 
$(document).ready(function(){
  $("#btn1").click(function(){
    $("p").hide();  
  });
  $("#btn2").click(function(){
	    $("p").show();  
	  });
});  
</script>
<title>测试一下在jsp中使用jquery时是否需要加入jquery库的插件</title>
<link >
</head>
<body> 
<h2>这是标题</h2>
<p>这是一个段落。</p>
<p>这是另一个段落。</p>
<button id="btn1">点击这里隐藏元素</button>
<button id="btn2">点击这里显示元素</button>
<button id="btn3" onclick="test()">点击这里出发js事件</button>
<script type="text/javascript">
$("p").css("background-color","red");
</script>  
<script src='test.js' type='text/javascript'></script>
</body>

</html>