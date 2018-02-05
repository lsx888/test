<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html> 
  <head>
    <base href="<%=basePath%>">
    
    <title>李双喜</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>

  <ul>
      <li>
          <a href="<%=basePath%>webapp/test/chess/chess.html">中国象棋</a>
      </li>
      <li>
          <a href="<%=basePath%>webapp/test/echarts/helloecharts.jsp">echarts之柱形图</a>
      </li>
      <li>
          <a href="<%=basePath%>webapp\老师笔记two\readme.jsp">笔记Two</a>
      </li>
  </ul>

    <!-- <h1 style="color:red;">衣服洗完了？</h1> -->
  <%--    <a href="<%=basePath%>webapp/test/tag/tagDemo.jsp">tagDome</a> --%>
    <%--<a href="<%=basePath%>webapp/test/echarts/pie.jsp">echarts之饼状图</a>--%>
   <%--  <a href="<%=basePath%>webapp/test/echarts/map.jsp">echarts之地图</a>
  	<a href="<%=basePath%>webapp/test/jQuery/chajian.jsp">Jqueryd的使用</a> --%>
  <%-- 	<a href="<%=basePath%>webapp/test/jQuery2/rognroll.jsp">滚动条插件的使用</a> --%>
  	<%-- <a href="<%=basePath%>webapp/test/jQuery2/draweditor.jsp">图片编辑器插件的使用</a>
  	<a href="<%=basePath%>webapp/test/jQuery2/emailbauilder.jsp">邮箱插件的使用</a>
  	<a href="<%=basePath%>webapp/test/CA/ca.jsp">cA证书</a> 
  	<a href="<%=basePath%>webapp/test/CA2/qianming.jsp">cA证书2</a>
  	<a href="<%=basePath%>webapp/test/CA2/qianming2.html">cA证书2HTML</a>
  	<a href="<%=basePath%>webapp/test/html/test.html">notpad++</a>
  	<a href="<%=basePath%>webapp/test/noname/IE8.jsp">兼容性调整</a>
  	<a href="<%=basePath%>webapp/test/noname/siblings.jsp">siblings</a>
  	<a href="<%=basePath%>webapp/test/noname/shouye.jsp">设置首页</a>
  	<a href="<%=basePath%>webapp/test/noname/changan.jsp">长按触发事件</a>
  	<a href="<%=basePath%>webapp/test/noname/popup.html">chrome插件</a>
  	<a href="<%=basePath%>webapp/test/noname/forxunhuan.jsp">for循环使用</a> --%>
  </body>
</html>
