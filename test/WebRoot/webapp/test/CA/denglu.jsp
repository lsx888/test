<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String randStr = String.valueOf(System.currentTimeMillis());
	session.setAttribute("ToSign", randStr);
	//出于安全考虑，签名原文必须在服务端产生，并且验证时也必须以服务端session中的签名原文为准
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>数字证书签名登录DEMO</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="Content-Type" content="text/html; charset=GBK">
		<script src="js/pta.js" type="text/javascript"></script>
		<object id="iTrusPTA" codeBase="download/iTrusPta.cab#version=1,0,0,3"
			classid="clsid:1E0DFFCF-27FF-4574-849B-55007349FEDA">
		</object>
		<script language="javascript">
		<!--	
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
		//-->
		</script>
	</head>

	<body>
		本页演示的是使用数字签名来实现数字证书登录
		<hr />
		<form name="LogonForm" method="post" action="doCertLogon.jsp"
			onsubmit="return checkForm(this);">
			用户名：
			<input name="UserName" type="text">
			<br>
			密　码：
			<input name="Password" type="password">
			<br>
			请选择证书：
			<select name="CertList" onchange="selectCert(this.value);"></select>
			<br>
			<input name="Submit" type="submit" value="登录">
			<input name="ToSign" type="hidden" value="<%=randStr%>">
			<!-- 出于安全考虑，必须使用随机字符串 -->
			<input name="SignedData" type="hidden">
		</form>
		<script language="javascript">
		<!--
			//支持多个CA的Filter
			var arrayIssuerDN = new Array(
				"C=CN, O=\"iTruschina Co., Ltd.\", OU=China Trust Network, CN=iTruschina XP Personal CA"
				, "O=\"iTruschina Co., Ltd.\", OU=VeriSign Trust Network, OU=Terms of use at https://www.itrus.com.cn/rpa (c)01, CN=iTruschina Class 1 Consumer Individual Subscriber CA"
			);
			//只支持一个CA，可以设置IssuerDN的字符串
			//arrayIssuerDN = "O=\"iTruschina Co., Ltd.\", OU=VeriSign Trust Network, OU=Terms of use at https://www.itrus.com.cn/rpa (c)01, CN=iTruschina Class 1 Consumer Individual Subscriber CA";
			
			/**
			 * filterCerts的第一个参数为证书的颁发者字符串和字符串数组，支持多个CA时使用字符串数组
			 * filterCerts的第二个参数dateFlag
			 *	0表示所有证书
			 *	1表示处于有效期内的证书
			 *	2表示待更新证书
			 *	3表示未生效或已过期证书
			 *	缺省为所有证书
			 * filterCerts的第三个参数serialNumber为证书序列号，可过滤出唯一一张证书
			 */
			var arrayCerts = filterCerts(arrayIssuerDN, 0, "");
			
			var objCertList = LogonForm.CertList; //定义<select>对象
			var objUserName = LogonForm.UserName; //定义<input>对象
			//先清空CertList
			for(var i = objCertList.length - 1; i >= 0 ; i--)
				objCertList.options[i] = null;
			
			//把满足要求的证书加入CertList
			if(arrayCerts.length == 0) {
				var el = document.createElement("option");
				el.text = "没有找到数字证书";
				el.value = -1;
				objCertList.add(el);
			} else {
				for(var i = 0; i < arrayCerts.length ; i++) {
					var el = document.createElement("option");
					el.text = arrayCerts[i].CommonName;
					el.value = i;
					objCertList.add(el);
				}
				objUserName.value = arrayCerts[objCertList.value].CommonName;
				objUserName.readOnly = true; //设置只读
				objUserName.style.backgroundColor = "#DDDDDD"; //设置颜色
			}
		//-->
		</script>
	</body>
</html>