<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"
    pageEncoding="GBK"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String randStr = String.valueOf(System.currentTimeMillis());
	session.setAttribute("ToSign", randStr);
	//���ڰ�ȫ���ǣ�ǩ��ԭ�ı����ڷ���˲�����������֤ʱҲ�����Է����session�е�ǩ��ԭ��Ϊ׼
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- ����css --> 
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
				// û���ҵ�֤�飬�Ƿ������¼��
				// return true;�����¼�������ж��Ƿ�ǩ��
				// return false;��֤�鲻�����¼
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
			//����������ֵ
		}
	}
</script>
<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script> -->  
<!-- www.js�Ǹ��������Ĵ���������һ��www.js�ļ� -->
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
<title>����֤��ǩ����¼DEMO</title>
<link >
</head>
<body> 
<input type="text" value="<%=basePath%>" />
<h2>���Ǳ���</h2>
<p>����һ�����䡣</p>
<p>������һ�����䡣</p>
<button id="btn1">�����������Ԫ��</button>
<button id="btn2">���������ʾԪ��</button>
<button id="btn3" onclick="test()">����������js�¼�</button>
<script type="text/javascript">
$("p").css("background-color","red");
</script>  
<script src='test.js' type='text/javascript'></script>
</body>

</html>