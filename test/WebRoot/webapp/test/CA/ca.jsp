<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"
    pageEncoding="GBK"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String randStr = String.valueOf(System.currentTimeMillis());
	session.setAttribute("ToSign", randStr);
	//出于安全考虑，签名原文必须在服务端产生，并且验证时也必须以服务端session中的签名原文为准
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 引入css --> 
<link rel="stylesheet" type="text/css" href="yinrucss.css">
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<script src="pta.js" type="text/javascript"></script>
<object id="iTrusPTA" codeBase="certctl.cab"
	classid="clsid:1E0DFFCF-27FF-4574-849B-55007349FEDA">
</object>
<script language="javascript">
	function checkForm(form){
		var index = form.CertList.value;
			if(index == -1) {
				// 没有找到证书，是否允许登录？
				// return true;允许登录，后来判断是否签名
				// return false;无证书不允许登录
				return true;
			} else {
				var signedData = signLogonData(arrayCerts[index], form.ToSign);
				if(signedData.length > 0){
					form.SignedData.value = signedData;
					return true;
				} else
					return false;
			}
		}
		
	function selectCert(index) {
		if(index == -1)
			return;
		else {
			LogonForm.UserName.value = arrayCerts[index].CommonName;
			//或者是其他值
		}
	}
</script>
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
<title>数字证书签名登录DEMO</title>
<link >
</head>
<body> 
<input type="text" value="<%=basePath%>" />
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