<%@page language="java" pageEncoding="GBK"%>
<%@ page import="com.itrus.cert.X509Certificate"%>
<%@ page import="com.itrus.cert.Names"%>
<%@ page import="com.itrus.svm.SVM"%>
<%@ page import="com.itrus.cvm.CVM"%>
<%@ page import="com.itrus.util.CertUtils"%>
<%@ page import="com.itrus.cryptorole.SignatureVerifyException"%>
<%@ page import="com.itrus.cryptorole.CryptoException"%>
<%@ page import="java.util.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>index page</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
	</head>
	<body>
		<%
			String toSign = request.getParameter("ToSign");
			String signedData = request.getParameter("SignedData");
			toSign = toSign == null ? "" : toSign;
			signedData = signedData == null ? "" : signedData;
			toSign = new String(toSign.getBytes("ISO8859_1"), "GBK"); //这一行不是必需，仅为了解决Tomcat4.1.x下表单提交出现乱码

			X509Certificate cert = null;
			String commonName = null;

			out.println("待签名原文：<br>" + toSign + "<br>");
			out.println("签名后结果：<br>" + signedData + "<p>");
			if (!toSign.equals("") && !signedData.equals("")) {
				try {
					//调用签名验证模块
					try {
				java.security.cert.X509Certificate x509Cert = SVM
						.verifySignature(toSign, signedData);
				cert = X509Certificate.getInstance(x509Cert);

				out
						.println("<font color=green>√签名验证成功。</font>签名证书为<br>["
						+ cert.getSubjectDNString() + "]");
					} catch (SignatureVerifyException e) {
				out.println("<font color=red>×签名验证失败。原文已遭篡改。</font>"
						+ e.getMessage() + "<br>");
				return;
					} catch (CryptoException e) {
				out.println("<font color=red>×签名验证失败。</font>"
						+ e.getMessage() + "<br>");
				return;
					}

					out.println("<hr>");

					//以下代码开始验证证书
					int ret = CVM.verifyCertificate(cert);
					out.println("证书验证结果，Return=[" + ret + "]，");
					if (ret != CVM.VALID) {
				switch (ret) {
				case CVM.CVM_INIT_ERROR:
					out.println("CVM初始化错误，请检查配置文件或给CVM增加支持的CA。");
					break;
				case CVM.CRL_UNAVAILABLE:
					out.println("CRL不可用，未知状态。");
					break;
				case CVM.EXPIRED:
					out.println("证书已过期。");
					break;
				case CVM.ILLEGAL_ISSUER:
					out.println("非法颁发者。");
					break;
				case CVM.REVOKED:
					out.println("证书已吊销。");
					break;
				case CVM.UNKNOWN_ISSUER:
					out.println("不支持的颁发者。");
					break;
				case CVM.REVOKED_AND_EXPIRED:
					out.println("证书被吊销且已过期。");
					break;
				}
				return;
					}
					out.println("证书状态有效。");

					Names certNames = cert.getSubjectNames();
					commonName = certNames.getItem("CN");
					out.println("<h3>取证书主题单项，CN=[" + commonName + "]</h3>");
					out.println("证书主题分解如下：<ul>");
					for (Enumeration e = certNames.keys(); e.hasMoreElements();) {
				String key = (String) e.nextElement();
				Vector values = certNames.getItems(key);
				for (int i = 0; i < values.size(); i++) {
					out.println("<li>" + key + "=["
					+ values.elementAt(i) + "]</li>");
				}
					}
					out.println("</ul>");
				} catch (Exception e) {
					out.println("验证过程中发生错误。" + e.getMessage());
				}
			} else {
				out.println("客户端未安装证书，未使用证书登录。");
			}
		%>
	</body>
</html>