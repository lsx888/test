<%@page language="java" pageEncoding="GBK"%>
<%@ page import="com.itrus.cert.X509Certificate"%>
<%@ page import="com.itrus.cert.Names"%>
<%@ page import="com.itrus.svm.SVM"%>
<%@ page import="com.itrus.cvm.CVM"%>
<%@ page import="java.util.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>ǩ����¼</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="Content-Type" content="text/html; charset=GBK">
	</head>
	<body>
		<%
			String toSign = request.getParameter("ToSign");
			String signedData = request.getParameter("SignedData");
			String oriToSign = (String) session.getAttribute("ToSign"); //��session��ȡԭʼ����

			toSign = toSign == null ? "" : toSign;
			signedData = signedData == null ? "" : signedData;
			oriToSign = oriToSign == null ? "" : oriToSign;

			if (toSign.startsWith("LOGONDATA:")) //PTA2.0�汾
				oriToSign = "LOGONDATA:" + oriToSign;

			X509Certificate cert = null;
			String commonName = null;
			if (!oriToSign.equals("") && !signedData.equals("")) {
				out.println("ԭ�ģ�" + oriToSign + "<br>");
				out.println("ǩ�������" + signedData + "<p>");
				out.println("<hr />");
				try {
					java.security.cert.X509Certificate x509Cert = SVM
					.verifySignature(oriToSign, signedData);
					cert = X509Certificate.getInstance(x509Cert);
					int ret = CVM.verifyCertificate(cert);
					out.println("֤����֤�����Return=[" + ret + "]��");
					if (ret != CVM.VALID) {
				switch (ret) {
				case CVM.CVM_INIT_ERROR:
					out.println("CVM��ʼ���������������ļ����CVM����֧�ֵ�CA��");
					break;
				case CVM.CRL_UNAVAILABLE:
					out.println("CRL�����ã�δ֪״̬��");
					break;
				case CVM.EXPIRED:
					out.println("֤���ѹ��ڡ�");
					break;
				case CVM.ILLEGAL_ISSUER:
					out.println("�Ƿ��䷢�ߡ�");
					break;
				case CVM.REVOKED:
					out.println("֤���ѵ�����");
					break;
				case CVM.UNKNOWN_ISSUER:
					out.println("��֧�ֵİ䷢�ߡ�");
					break;
				case CVM.REVOKED_AND_EXPIRED:
					out.println("֤�鱻�������ѹ��ڡ�");
					break;
				}
				return;
					}
					out.println("֤��״̬��Ч��");

					Names certNames = cert.getSubjectNames();
					commonName = certNames.getItem("CN");
					out.println("<h3>ȡ֤�����ⵥ�CN=[" + commonName + "]</h3>");
					out.println("֤������ֽ����£�<ul>");
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
					out.println("ǩ����֤ʧ�ܣ�<br>");
					out.println("ǩ��ԭ��(Session)��" + oriToSign + "<br>");
					out.println("ǩ��ԭ��(Post)��" + toSign + "<br>");
					out.println("������Ϣ��" + e.getMessage());
				}
			} else {
				out.println("�ͻ���û���ҵ�����֤�飬�û���+�����¼����");
			}
		%> 
	</body>
</html>