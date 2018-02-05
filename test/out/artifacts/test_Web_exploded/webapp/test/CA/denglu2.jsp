<%@page language="java" pageEncoding="GBK"%>
<%@ page import="com.itrus.cert.X509Certificate"%>
<%@ page import="com.itrus.cert.Names"%>
<%@ page import="com.itrus.svm.SVM"%>
<%@ page import="com.itrus.cvm.CVM"%>
<%@ page import="java.util.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>签名登录</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="Content-Type" content="text/html; charset=GBK">
	</head>
	<body>
		<%
			String toSign = request.getParameter("ToSign");
			String signedData = request.getParameter("SignedData");
			String oriToSign = (String) session.getAttribute("ToSign"); //从session中取原始数据

			toSign = toSign == null ? "" : toSign;
			signedData = signedData == null ? "" : signedData;
			oriToSign = oriToSign == null ? "" : oriToSign;

			if (toSign.startsWith("LOGONDATA:")) //PTA2.0版本
				oriToSign = "LOGONDATA:" + oriToSign;

			X509Certificate cert = null;
			String commonName = null;
			if (!oriToSign.equals("") && !signedData.equals("")) {
				out.println("原文：" + oriToSign + "<br>");
				out.println("签名结果：" + signedData + "<p>");
				out.println("<hr />");
				try {
					java.security.cert.X509Certificate x509Cert = SVM
					.verifySignature(oriToSign, signedData);
					cert = X509Certificate.getInstance(x509Cert);
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
					out.println("签名验证失败：<br>");
					out.println("签名原文(Session)：" + oriToSign + "<br>");
					out.println("签名原文(Post)：" + toSign + "<br>");
					out.println("错误信息：" + e.getMessage());
				}
			} else {
				out.println("客户端没有找到数字证书，用户名+口令登录……");
			}
		%> 
	</body>
</html>