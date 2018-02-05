/*package pri.lsx.test.rest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
转 JAVA 调用HTTP接口POST或GET实现方式
afreon  afreon
发布时间: 2015/09/14 22:48 阅读: 3818 收藏: 15 点赞: 0 评论: 0
        HTTP是一个客户端和服务器端请求和应答的标准（TCP），客户端是终端用户，服务器端是网站。通过使用Web浏览器、网络爬虫或者其它的工具，客户端发起一个到服务器上指定端口（默认端口为80）的HTTP请求。



具体POST或GET实现代码如下：

public class HttpConnectUtil {
    
    private static String DUOSHUO_SHORTNAME = "yoodb";//多说短域名 ****.yoodb.****
    private static String DUOSHUO_SECRET = "xxxxxxxxxxxxxxxxx";//多说秘钥
    
    *//**
     * get方式
     * @param url
     * @author www.yoodb.com
     * @return
     *//*
    public static String getHttp(String url) {
        String responseMsg = "";
        HttpClient httpClient = new HttpClient();
        GetMethod getMethod = new GetMethod(url);
        getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,new DefaultHttpMethodRetryHandler());
        try {
            httpClient.executeMethod(getMethod);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            InputStream in = getMethod.getResponseBodyAsStream();
            int len = 0;
            byte[] buf = new byte[1024];
            while((len=in.read(buf))!=-1){
                out.write(buf, 0, len);
            } 
            responseMsg = out.toString("UTF-8");
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //释放连接
            getMethod.releaseConnection();
        }
        return responseMsg;
    }

    *//**
     * post方式
     * @param url
     * @param code
     * @param type
     * @author www.yoodb.com
     * @return
     *//*
    public static String postHttp(String url,String code,String type) {
        String responseMsg = "";
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset("GBK");
        PostMethod postMethod = new PostMethod(url);
        postMethod.addParameter(type, code);
        postMethod.addParameter("client_id", DUOSHUO_SHORTNAME);
        postMethod.addParameter("client_secret", DUOSHUO_SECRET);
        try {
            httpClient.executeMethod(postMethod);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            InputStream in = postMethod.getResponseBodyAsStream();
            int len = 0;
            byte[] buf = new byte[1024];
            while((len=in.read(buf))!=-1){
                out.write(buf, 0, len);
            }
            responseMsg = out.toString("UTF-8");
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            postMethod.releaseConnection();
        }
        return responseMsg;
    }
}*/