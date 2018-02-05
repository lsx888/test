/**
 * Copyright &copy; 2016-2018 <a href="rd.scca.com.cn">SCCA R&D</a> All rights reserved.
 *//*
package main.java.cn.com.scca.isignserver.sdk;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import main.java.cn.com.scca.isignserver.sdk.domain.ReturnMsg;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSON;

*//**
 *   四川CA 电子证明服务器 SDK工具接入
 * @author <a href="mailto:zhou_jiang@sicca.com.cn">Jack.Zhou</a>
 * @package cn.com.scca.isignserver.sdk
 * @date 2016年10月19日
 * @version V1.0
 *//*
public class SignServerSDK {

	*//**
	 * 四川CA电子证明服务器PDF盖章接口
	 * 
	 * @param requestId
	 *            请求流水号
	 * @param appCode
	 *            应用code，由服务器进行分配
	 * @param srcPdf
	 *            需要签署的PDF文档
	 * @param destPdf
	 *            保存目标文档
	 * @param webserviceUrl
	 * 			     服务接口地址           
	 * @throws Exception
	 *//*
	public static String signPdfBySccaServer(String requestId,String appCode,String srcPdf,String destPdf,String webserviceUrl) throws  Exception{
		try {
			CloseableHttpClient httpclient = HttpClients.createDefault();
			HttpPost postMethod = new HttpPost(webserviceUrl);
			
			FileBody fileBody = new FileBody(new File(srcPdf));  
			StringBody appCodeBody = new StringBody(appCode, ContentType.TEXT_PLAIN);
			StringBody requestIdBody = new StringBody(requestId, ContentType.TEXT_PLAIN);
			HttpEntity reqEntity = MultipartEntityBuilder.create().addPart("uploadPdfFile", fileBody)
			        .addPart("appCode", appCodeBody)
			        .addPart("requestId", requestIdBody)
			        .build();
			postMethod.setEntity(reqEntity);
			CloseableHttpResponse response = httpclient.execute(postMethod);
			StatusLine statusLine = response.getStatusLine();
			HttpEntity entity = response.getEntity();
			String resultData =  EntityUtils.toString(entity);
			if(statusLine.getStatusCode() == HttpStatus.SC_OK){
				try{
					 ReturnMsg data = JSON.parseObject(resultData,ReturnMsg.class);
					 if(data.getCode() != 200){
						 return data.getMessage();
					 }else{
						 String downloadUrl = data.getData().get(0).getPdfUrl();
						 downloadFile(downloadUrl,destPdf);
					 }
				}catch(Exception ex){
					System.err.println("解析接口返回数据出现异常:" + ex.getMessage());
					throw ex;
				}
			}else{
				System.err.println("["+statusLine.getStatusCode()+"]返回有错误信息：" + resultData);
				return "["+statusLine.getStatusCode()+"]" + resultData;
			}
			EntityUtils.consume(entity);
			response.close();
		} catch (Exception e) {
			System.err.println("未知错误：" + e.getMessage());
			return "未知错误:" + e.getMessage();
		}
		return "";
	}
	
	*//**
	 *  下载文件到本地
	 * @param downloadUrl
	 * @return
	 * @throws IOException 
	 * @throws  
	 *//*
	private static void downloadFile(String downloadUrl,String destPdf) throws Exception{
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet(downloadUrl);
		HttpResponse response = httpclient.execute(httpGet);
		HttpEntity entity = response.getEntity();
	    InputStream in = entity.getContent();
	    File file =new File(destPdf);
	    try{
	        FileOutputStream fout =new FileOutputStream(file);
	        int b = -1;
	        byte[] tmp =new byte[1024];
	        while((b = in.read(tmp)) != -1) {
	            fout.write(tmp,0, b);
	        }
	        fout.flush();
	        fout.close();
	    }finally{
	        in.close();
	    }
	    httpclient.close();
	}
}
*/