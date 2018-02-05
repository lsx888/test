/**
 * Copyright &copy; 2016-2018 <a href="rd.scca.com.cn">SCCA R&D</a> All rights reserved.
 */
package main.java.cn.com.scca.isignserver.sdk.domain;

import java.util.List;

/**
 *  返回信息
 * @author <a href="mailto:zhou_jiang@sicca.com.cn">Jack.Zhou</a>
 * @package cn.com.scca.isignserver.sdk.domain
 * @date 2016年12月6日
 * @version V1.0
 * @param <T>
 */
public class ReturnMsg {

	/**
	 *  返回状态码，成功为200，失败为500，默认为200
	 */
	private int code ;
	
	/**
	 *  消息
	 */
	private String message;
	
	/**
	 *  对应的数据
	 */
	private List<SignPdfData> data;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<SignPdfData> getData() {
		return data;
	}

	public void setData(List<SignPdfData> data) {
		this.data = data;
	}

}
