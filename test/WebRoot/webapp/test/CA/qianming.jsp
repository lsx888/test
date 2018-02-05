<HTML>
	<HEAD>
		<TITLE>PTA数字签名DEMO</TITLE>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK">
		<script src="js/pta.js" type="text/javascript"></script>
		<OBJECT id="iTrusPTA" codeBase="download/iTrusPta.cab#version=1,0,0,3"
			classid="clsid:1E0DFFCF-27FF-4574-849B-55007349FEDA">
		</OBJECT>
		<script language="javascript">
		<!--
		function CheckForm(form){
			if(form.ToSign.value == "" || form.SignedData.value == "") {
				alert("请先进行签名再到服务端验证。");
				form.SignMessage.focus();
				return false;
			}
			return true;
		}
		
		
		function clientSign() {
			var index = SignForm.CertList.value;
			if(index == -1) { //没有找到数字证书
				return false;
			} else {
				SignForm.SignedData.value = signMessage(SignForm.ToSign.value, arrayCerts[index]);
			}
		}
		
		function clientVerify() {
			verifySignature(SignForm.ToSign.value, SignForm.SignedData.value);
		}
		//-->
		</script>
	</HEAD>
	<BODY>
		本页演示的是在客户端对表单进行数字签名，然后提交到服务端验证签名
		<hr />
		<form name="SignForm" method="post" action="verifySignature.jsp"
			onsubmit="return CheckForm(this);">
			请选择证书：
			<select name="CertList"></select>
			<br>
			待签名原文：
			<textarea name="ToSign" cols="50" rows="10">小王于2006年12月13日提款10万元</textarea>
			<br>
			签名后结果：
			<textarea name="SignedData" cols="50" rows="10"></textarea>
			<br>
			<input name="sign" type="button" value="数字签名" onclick="clientSign();">
			<input name="verify" type="button" value="客户端验证签名"
				onclick="clientVerify();">
			<input name="submit" type="submit" value="服务端验证签名">
		</form>
		<script language="javascript">
		<!--
			/*
			var arrayIssuerDN = new Array(
				"C=CN, O=\"iTruschina Co., Ltd.\", OU=China Trust Network, CN=iTruschina XP Personal CA"
				//VeriSign Class1 free 60 days mail cert
				, "O=\"iTruschina Co., Ltd.\", OU=VeriSign Trust Network, OU=Terms of use at https://www.itrus.com.cn/rpa (c)01, CN=iTruschina Class 1 Consumer Individual Subscriber CA"
			);
			
			//只支持一个CA，可以设置IssuerDN的字符串
			//arrayIssuerDN = "O=\"iTruschina Co., Ltd.\", OU=VeriSign Trust Network, OU=Terms of use at https://www.itrus.com.cn/rpa (c)01, CN=iTruschina Class 1 Consumer Individual Subscriber CA";
			*/
			
			arrayIssuerDN = "C=CN, O=四川省数字证书认证管理中心有限公司, OU=China Trust Network, OU=Terms of use at https://www.itrus.com.cn/ctnrpa (c)2008, OU=Class 2 Enterprise Individual Subscriber CA, CN=SCEGB CA";
			
			/*
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
			
			var objCertList = SignForm.CertList; //定义<select>对象
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
			}
		//-->
		</script>
	</BODY>
</HTML>