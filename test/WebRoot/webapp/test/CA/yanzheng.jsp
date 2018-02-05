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
			toSign = new String(toSign.getBytes("ISO8859_1"), "GBK"); //��һ�в��Ǳ��裬��Ϊ�˽��Tomcat4.1.x�±��ύ��������

			X509Certificate cert = null;
			String commonName = null;

			out.println("��ǩ��ԭ�ģ�<br>" + toSign + "<br>");
			out.println("ǩ��������<br>" + signedData + "<p>");
			if (!toSign.equals("") && !signedData.equals("")) {
				try {
					//����ǩ����֤ģ��
					try {
				java.security.cert.X509Certificate x509Cert = SVM
						.verifySignature(toSign, signedData);
				cert = X509Certificate.getInstance(x509Cert);

				out
						.println("<font color=green>��ǩ����֤�ɹ���</font>ǩ��֤��Ϊ<br>["
						+ cert.getSubjectDNString() + "]");
					} catch (SignatureVerifyException e) {
				out.println("<font color=red>��ǩ����֤ʧ�ܡ�ԭ������۸ġ�</font>"
						+ e.getMessage() + "<br>");
				return;
					} catch (CryptoException e) {
				out.println("<font color=red>��ǩ����֤ʧ�ܡ�</font>"
						+ e.getMessage() + "<br>");
				return;
					}

					out.println("<hr>");

					//���´��뿪ʼ��֤֤��
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
					out.println("��֤�����з�������" + e.getMessage());
				}
			} else {
				out.println("�ͻ���δ��װ֤�飬δʹ��֤���¼��");
			}
		%>
	</body>
</html>