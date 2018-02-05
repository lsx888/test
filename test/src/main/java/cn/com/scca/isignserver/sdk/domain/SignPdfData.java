/**
 * Copyright &copy; 2016-2018 <a href="rd.scca.com.cn">SCCA R&D</a> All rights reserved.
 */
package main.java.cn.com.scca.isignserver.sdk.domain;

/**
 *  签署信息
 * @author <a href="mailto:zhou_jiang@sicca.com.cn">Jack.Zhou</a>
 * @package cn.com.scca.isignserver.sdk.domain
 * @date 2016年12月6日
 * @version V1.0
 */
public class SignPdfData {

	private String pdfUrl;
	
	private String pdfPath;
	
	private String appCode;
	
	private String requestId;

	public String getPdfUrl() {
		return pdfUrl;
	}

	public void setPdfUrl(String pdfUrl) {
		this.pdfUrl = pdfUrl;
	}

	public String getPdfPath() {
		return pdfPath;
	}

	public void setPdfPath(String pdfPath) {
		this.pdfPath = pdfPath;
	}

	public String getAppCode() {
		return appCode;
	}

	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}
	
	
}
