<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 引入css -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
<title>长按触发事件</title>
<link >
</head>  
<body>  

<div id="mydiv" style="width:100px; height:100px; background:#ddd;">out</div>  

</body>  
</html>  
<script>  
	/*设置一个长按的计时器，如果点击这个图层超过2秒则触发，mydiv里面的文字从out变in的动作*/  
	var timeout ;  
	$("#mydiv").mousedown(function() {  //mousedown 触屏的话一直触摸才能触发，非触屏一直点击才能触发该事件
	    setTimeout(function() {  
	        $("#mydiv").text("in");  
	    }, 2000);  
		
	});  
</script>