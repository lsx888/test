/**
 * Copyright &copy; 2016-2018 <a href="rd.scca.com.cn">SCCA R&D</a> All rights reserved.
 *//*
package test.java.cn.com.scca.test;

import main.java.cn.com.scca.isignserver.sdk.SignServerSDK;

import org.junit.Assert;
import org.junit.Test;

*//**
 *  签章测试
 * @author <a href="mailto:zhou_jiang@sicca.com.cn">Jack.Zhou</a>
 * @package cn.com.scca.test
 * @date 2016年12月6日
 * @version V1.0
 *//*
public class SignPdfTest {

	@Test
	public void signedPdf(){
//		requestId 请求流水号
//		appCode 应用code，由服务器进行分配
//		srcPdf 需要签署的PDF文档
//		destPdf 保存目标文档
//		webserviceUrl 服务接口地址 
		try {
			String appCode = "Test";
			String srcPdf = "E:\\pdf\\a736e14702a8d9cef499.pdf";
//			http://125.69.77.63/
//			http://172.18.83.125:9191/iSignServer/webservice/pdf/signPdfByServer
			String webserviceUrl = "http://125.69.77.63:9191/iSignServer/webservice/pdf/signPdfByServer";
			String destPdf ="E:\\pdf\\fin1.pdf";
			String result = SignServerSDK.signPdfBySccaServer("9527",appCode, srcPdf,destPdf,webserviceUrl);
			
			Assert.assertTrue("有错误！" + result, result.equals("")); 
		} catch (Exception e) {
			e.printStackTrace(); 
		}
	}
}
*/