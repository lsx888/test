<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String randStr = String.valueOf(System.currentTimeMillis());
	session.setAttribute("ToSign", randStr);
	//���ڰ�ȫ���ǣ�ǩ��ԭ�ı����ڷ���˲�����������֤ʱҲ�����Է����session�е�ǩ��ԭ��Ϊ׼
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>����֤��ǩ����¼DEMO</title>

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
		//-->
		</script>
	</head>

	<body>
		��ҳ��ʾ����ʹ������ǩ����ʵ������֤���¼
		<hr />
		<form name="LogonForm" method="post" action="doCertLogon.jsp"
			onsubmit="return checkForm(this);">
			�û�����
			<input name="UserName" type="text">
			<br>
			�ܡ��룺
			<input name="Password" type="password">
			<br>
			��ѡ��֤�飺
			<select name="CertList" onchange="selectCert(this.value);"></select>
			<br>
			<input name="Submit" type="submit" value="��¼">
			<input name="ToSign" type="hidden" value="<%=randStr%>">
			<!-- ���ڰ�ȫ���ǣ�����ʹ������ַ��� -->
			<input name="SignedData" type="hidden">
		</form>
		<script language="javascript">
		<!--
			//֧�ֶ��CA��Filter
			var arrayIssuerDN = new Array(
				"C=CN, O=\"iTruschina Co., Ltd.\", OU=China Trust Network, CN=iTruschina XP Personal CA"
				, "O=\"iTruschina Co., Ltd.\", OU=VeriSign Trust Network, OU=Terms of use at https://www.itrus.com.cn/rpa (c)01, CN=iTruschina Class 1 Consumer Individual Subscriber CA"
			);
			//ֻ֧��һ��CA����������IssuerDN���ַ���
			//arrayIssuerDN = "O=\"iTruschina Co., Ltd.\", OU=VeriSign Trust Network, OU=Terms of use at https://www.itrus.com.cn/rpa (c)01, CN=iTruschina Class 1 Consumer Individual Subscriber CA";
			
			/**
			 * filterCerts�ĵ�һ������Ϊ֤��İ䷢���ַ������ַ������飬֧�ֶ��CAʱʹ���ַ�������
			 * filterCerts�ĵڶ�������dateFlag
			 *	0��ʾ����֤��
			 *	1��ʾ������Ч���ڵ�֤��
			 *	2��ʾ������֤��
			 *	3��ʾδ��Ч���ѹ���֤��
			 *	ȱʡΪ����֤��
			 * filterCerts�ĵ���������serialNumberΪ֤�����кţ��ɹ��˳�Ψһһ��֤��
			 */
			var arrayCerts = filterCerts(arrayIssuerDN, 0, "");
			
			var objCertList = LogonForm.CertList; //����<select>����
			var objUserName = LogonForm.UserName; //����<input>����
			//�����CertList
			for(var i = objCertList.length - 1; i >= 0 ; i--)
				objCertList.options[i] = null;
			
			//������Ҫ���֤�����CertList
			if(arrayCerts.length == 0) {
				var el = document.createElement("option");
				el.text = "û���ҵ�����֤��";
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
				objUserName.readOnly = true; //����ֻ��
				objUserName.style.backgroundColor = "#DDDDDD"; //������ɫ
			}
		//-->
		</script>
	</body>
</html>