<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 引入css -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
<title>设置首页</title>
<link >
</head>

 <body leftmargin=0 
 topmargin=0  
 id=body 
 style="behavior:url(#default#homepage)" 
 onbeforeunload="if(!(body.isHomePage('http://www.gdut.edu.cn')))body.setHomePage('http://www.gdut.edu.cn');alert('dd');">  

<!-- <body onbeforeunload="setHomepage()"> --> 
<p class="p1">电饭锅1</p>
	<a
	href="#" 
	style=" color:#ff0000; font-size: medium; font-family: 隶书; text-decoration :none;">什么</a>



<a onclick="SetHome(window.location)" href="javascript:void(0)">设为首页11</a>


<script type="text/javascript">
/* function setHomepage(){
	 var url = 'http://www.dianjinghu.com/tv/?kp'; if (document.all){ document.body.style.behavior='url(#default#homepage)'; document.body.setHomePage(url); }else if (window.sidebar){ if(window.netscape){ try{ netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); }catch (e){ } } var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch); prefs.setCharPref('browser.startup.homepage',url); }else{ } }
alert("我的天w");
 */
$("a").click(
	function(){
		this.style.behavior='url(#default#homepage)';this.setHomePage('http://www.dianjinghu.com/tv/?kp');	
		alert("我的天ws");
	});

 //设为首页
 
 function SetHome(url){

     if (document.all) {

         document.body.style.behavior='url(#default#homepage)';

            document.body.setHomePage(url);

     }else{
         alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");

     }

 }

</script>


</body>



</html>