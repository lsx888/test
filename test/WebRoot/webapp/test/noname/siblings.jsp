<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 引入css -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible"content="IE=EmulateIE9"/>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
<title>siblings用法</title>
<link >
</head>
<body> 
<p class="p1">电饭锅1</p>
<p class="p2">电饭锅2</p>
<p class="p3">电饭锅3</p>

<button onclick='$("p").siblings().css("color","red");' onkeyup=" alert('选择所有元素');">情况一</button>
<button onclick='$("p").siblings(".p3").css("color","green");' onkeyup=" alert('选择本元素');">情况二</button>
<button onclick='$("p.p3").siblings("").css("color","blue");' onkeyup=" alert('选择其他同胞元素');">情况三</button>

</body>

</html>